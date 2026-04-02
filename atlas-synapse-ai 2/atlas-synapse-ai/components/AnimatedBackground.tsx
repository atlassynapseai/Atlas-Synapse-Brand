"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const MIN_NODES = 50;
const MAX_NODES = 72;
const MAX_EDGES = 12;
const CONNECTION_RADIUS = 150;
const NODE_RADIUS = 1.2;
const NODE_OPACITY = 0.32;
const EDGE_OPACITY_BASE = 0.1;
const EDGE_BREATHE_AMPLITUDE = 0.04;
const DRIFT_SPEED = 0.06;
const ACCENT_TRANSITION_MS = 1100;
const PULSE_DURATION_MS = 380;
const PULSE_EDGES_MIN = 3;
const PULSE_EDGES_MAX = 6;
const POINTER_PARALLAX = 28;

type SectionId = "hero" | "mission" | "problem" | "offering" | "cta" | "about" | "risks" | "solutions" | "contact";

const SECTION_ACCENTS: Record<SectionId, [number, number, number]> = {
  hero: [168, 85, 247],
  mission: [140, 90, 240],
  problem: [248, 113, 113],
  offering: [56, 189, 248],
  cta: [72, 160, 245],
  about: [120, 120, 240],
  risks: [200, 100, 255],
  solutions: [56, 189, 248],
  contact: [72, 160, 245],
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}

const HERO_ACCENT: [number, number, number] = [168, 85, 247];

type Node = { x: number; y: number; vx: number; vy: number };
type Edge = { i: number; j: number };

export default function AnimatedBackground() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [size, setSize] = useState({ w: 1, h: 1 });

  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const accentTargetRef = useRef<[number, number, number]>(SECTION_ACCENTS.hero);
  const accentCurrentRef = useRef<[number, number, number]>(HERO_ACCENT);
  const transitionStartRef = useRef(0);
  const lastSectionRef = useRef<SectionId>("hero");
  const scrollRef = useRef(0);
  const prevScrollRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const breatheRef = useRef(EDGE_OPACITY_BASE);
  const pulseEdgesRef = useRef<Array<{ i: number; j: number; start: number }>>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const visibleRef = useRef(true);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    if (!sections.length) return;
    const ratios = new Map<SectionId, number>();
    const updateActive = () => {
      let best: SectionId = "hero";
      let bestRatio = 0;
      ratios.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      });
      setActiveSection(best);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target.getAttribute("data-section") || "hero") as SectionId;
          ratios.set(id, entry.intersectionRatio);
        });
        updateActive();
      },
      { root: null, rootMargin: "-15% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    accentTargetRef.current = SECTION_ACCENTS[activeSection];
    transitionStartRef.current = performance.now();
  }, [activeSection]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const onVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);
    visibleRef.current = document.visibilityState === "visible";
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useLayoutEffect(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 800;
    const h = typeof window !== "undefined" ? window.innerHeight : 600;
    widthRef.current = w;
    heightRef.current = h;
    setSize({ w, h });
    const count = Math.min(MAX_NODES, Math.max(MIN_NODES, Math.floor((w * h) / (130 * 130))));
    const initial: Node[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * DRIFT_SPEED,
      vy: (Math.random() - 0.5) * DRIFT_SPEED,
    }));
    nodesRef.current = initial;
    setNodes(initial);

    const pairs: Array<{ i: number; j: number; dist: number }> = [];
    for (let i = 0; i < initial.length; i++) {
      for (let j = i + 1; j < initial.length; j++) {
        const dist = Math.hypot(initial[i].x - initial[j].x, initial[i].y - initial[j].y);
        if (dist < CONNECTION_RADIUS) pairs.push({ i, j, dist });
      }
    }
    pairs.sort((a, b) => a.dist - b.dist);
    const edgeList = pairs.slice(0, MAX_EDGES).map((p) => ({ i: p.i, j: p.j }));
    edgesRef.current = edgeList;
    setEdges(edgeList);
  }, []);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const n = nodesRef.current;
      widthRef.current = w;
      heightRef.current = h;
      setSize({ w, h });
      if (n.length === 0) return;
      const pairs: Array<{ i: number; j: number; dist: number }> = [];
      for (let i = 0; i < n.length; i++) {
        for (let j = i + 1; j < n.length; j++) {
          const dist = Math.hypot(n[i].x - n[j].x, n[i].y - n[j].y);
          if (dist < CONNECTION_RADIUS) pairs.push({ i, j, dist });
        }
      }
      pairs.sort((a, b) => a.dist - b.dist);
      const edgeList = pairs.slice(0, MAX_EDGES).map((p) => ({ i: p.i, j: p.j }));
      edgesRef.current = edgeList;
      setEdges(edgeList);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (activeSection === lastSectionRef.current) return;
    lastSectionRef.current = activeSection;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const edgesList = edgesRef.current;
    if (edgesList.length === 0) return;
    const count = Math.min(edgesList.length, PULSE_EDGES_MIN + Math.floor(Math.random() * (PULSE_EDGES_MAX - PULSE_EDGES_MIN + 1)));
    const shuffled = [...edgesList].sort(() => Math.random() - 0.5);
    pulseEdgesRef.current = shuffled.slice(0, count).map((e) => ({ ...e, start: performance.now() }));
  }, [activeSection]);

  useEffect(() => {
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const tick = () => {
      if (!visibleRef.current || reduced) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const now = performance.now();
      const t = now * 0.001;
      scrollRef.current = typeof window !== "undefined" ? window.scrollY : 0;
      const scrollDelta = scrollRef.current - prevScrollRef.current;
      prevScrollRef.current = scrollRef.current;

      const w = widthRef.current;
      const h = heightRef.current;
      const n = nodesRef.current;

      if (n.length === 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      n.forEach((node) => {
        node.x += node.vx + scrollDelta * 0.012;
        node.y += node.vy;
        if (node.x < 0) node.x = w;
        if (node.x > w) node.x = 0;
        if (node.y < 0) node.y = h;
        if (node.y > h) node.y = 0;
      });

      const elapsed = now - transitionStartRef.current;
      const te = Math.min(1, elapsed / ACCENT_TRANSITION_MS);
      const ease = 1 - Math.pow(1 - te, 2);
      const [r0, g0, b0] = accentCurrentRef.current;
      const [r1, g1, b1] = accentTargetRef.current;
      const r = Math.round(lerp(r0, r1, ease));
      const g = Math.round(lerp(g0, g1, ease));
      const b = Math.round(lerp(b0, b1, ease));
      accentCurrentRef.current = [r, g, b];

      breatheRef.current = EDGE_OPACITY_BASE + EDGE_BREATHE_AMPLITUDE * Math.sin(t * 0.4);
      pulseEdgesRef.current = pulseEdgesRef.current.filter((pl) => now - pl.start < PULSE_DURATION_MS + 100);

      const [rA, gA, bA] = accentCurrentRef.current;
      const breatheVal = breatheRef.current;
      const pulseList = pulseEdgesRef.current;
      const edgeList = edgesRef.current;

      lineRefs.current.forEach((lineEl, k) => {
        if (!lineEl || !edgeList[k]) return;
        const e = edgeList[k];
        const a = n[e.i];
        const bNode = n[e.j];
        if (!a || !bNode) return;
        let alpha = breatheVal;
        const isPulsing = pulseList.some((pl) => (pl.i === e.i && pl.j === e.j) || (pl.i === e.j && pl.j === e.i));
        if (isPulsing) {
          const pl = pulseList.find((pl) => (pl.i === e.i && pl.j === e.j) || (pl.i === e.j && pl.j === e.i));
          if (pl) {
            const elapsedP = now - pl.start;
            if (elapsedP < PULSE_DURATION_MS) alpha = breatheVal + 0.22 * (1 - elapsedP / PULSE_DURATION_MS);
          }
        }
        lineEl.setAttribute("x1", String(a.x));
        lineEl.setAttribute("y1", String(a.y));
        lineEl.setAttribute("x2", String(bNode.x));
        lineEl.setAttribute("y2", String(bNode.y));
        lineEl.setAttribute("stroke", `rgba(${rA},${gA},${bA},${alpha})`);
      });

      circleRefs.current.forEach((circleEl, k) => {
        if (!circleEl || !n[k]) return;
        const node = n[k];
        circleEl.setAttribute("cx", String(node.x));
        circleEl.setAttribute("cy", String(node.y));
        circleEl.setAttribute("fill", `rgba(${rA},${gA},${bA},${NODE_OPACITY})`);
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeSection]);

  const mx = mouseRef.current.x;
  const my = mouseRef.current.y;
  const parallaxX = (mx - 0.5) * POINTER_PARALLAX;
  const parallaxY = (my - 0.5) * POINTER_PARALLAX;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[#050816]" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${size.w} ${size.h}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="edge-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g transform={`translate(${parallaxX}, ${parallaxY})`} filter="url(#edge-blur)">
          {edges.map((e, k) => {
            const a = nodes[e.i];
            const bNode = nodes[e.j];
            if (!a || !bNode) return null;
            return (
              <line
                key={k}
                ref={(el) => {
                  lineRefs.current[k] = el;
                }}
                x1={a.x}
                y1={a.y}
                x2={bNode.x}
                y2={bNode.y}
                stroke={`rgba(168,85,247,${EDGE_OPACITY_BASE})`}
                strokeWidth="1"
                strokeLinecap="round"
              />
            );
          })}
        </g>
        <g transform={`translate(${parallaxX}, ${parallaxY})`} filter="url(#node-glow)">
          {nodes.map((node, k) => (
            <circle
              key={k}
              ref={(el) => {
                circleRefs.current[k] = el;
              }}
              cx={node.x}
              cy={node.y}
              r={NODE_RADIUS}
              fill={`rgba(168,85,247,${NODE_OPACITY})`}
            />
          ))}
        </g>
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(5,8,22,0.25) 72%, rgba(5,8,22,0.7) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#050816]/30 via-transparent to-[#050816]/40" aria-hidden="true" />
    </div>
  );
}
