# Atlas Synapse Rebrand — Deliverables Summary

## 1) Reference site style cues extracted

From https://atlassynapseai.github.io/Atlas-Synapse-Homepage/ and the brief:

1. **Trust Layer / sovereign messaging** — Hero-level “Setting the Trust Layer of the AI Era” and “Sovereign AI Infrastructure”. Dark, executive tone. Carried into tagline “Trust Engine for AI Systems” and headline “Atlas Synapse”.

2. **Dark executive palette** — Dark background (#050816), purple/cyan gradients aligned with logo, soft borders and glass surfaces. Implemented in `tailwind.config.ts` and `globals.css` (atlas-primary, atlas-secondary, atlas-radial, glass-panel).

3. **Constellation / neural field** — Reference implied a “neural” feel. Implemented in `AnimatedBackground.tsx`: drifting nodes (80), connecting lines within max distance, subtle parallax on mouse move, and occasional “signal pulses” along edges (synapse vibe). Reduced-motion skips animation.

4. **Premium glass surfaces** — Blur, subtle borders, soft backgrounds. Standardized as `.glass-panel` and CSS variables `--glass-bg`, `--glass-border`, `--blur-panel` in `globals.css`. Used on nav, hero orb container, risk/solution teasers, cards, and page content panels.

5. **Large type + confident hierarchy** — Clamp-based typography scale in `:root` and Tailwind (`text-hero`, `text-display`, `text-h2`, `text-body`, `text-small`). Display font (Space Grotesk) for headings, Inter for body.

6. **Smooth motion language** — Framer Motion for nav active state, hero orb (pulses, orbiting particles, gate motion), risk distortion hovers, solution teaser packets and stamps, and reduced-motion fallbacks via `useReducedMotion()`.

7. **Layout rhythm and spacing** — Consistent spacing scale (CSS variables and Tailwind) and section padding (py-20 / py-24, max-w-5xl / max-w-7xl) for a continuous, non-disconnected feel.

---

## 2) Implementation summary

### Final page structure

| Route     | Purpose |
|----------|---------|
| `/`      | Home — hero, risks teaser, solution teaser, capabilities, CTA |
| `/about` | Brand story: Atlas, Synapse, enterprise value |
| `/risks` | Deep-dive risk scenarios with visible outcomes and live audit log |
| `/solutions` | Trust layer visualization (simulator) |
| `/contact` | Contact form (name, email, company, message; validation, success, honeypot) |

Redirects: `/platform`, `/security` → `/solutions`; `/portal` → `/contact`.

### What changed on the homepage

- **Hero:** Tagline is “Trust Engine for AI Systems” (hero-level). Headline is “Atlas Synapse” only. Supporting copy: “We sit at the boundaries of agentic AI. Validate signals before they run. Verify outcomes before they ship.” Right-side visual replaced with **Celestial Atlas Orb / Neural Core**: sphere, orbiting rings, Input Gate (Validated) and Output Gate (Verified), orbiting particles, pulse rings. CTAs: Request Demo (primary), Explore Solutions / Visualize the Trust Layer (secondary).
- **Risks teaser:** Single lifecycle line (Inputs → Agents → Outputs) with six distortion nodes (governance drift, policy conflict, data leakage, fabricated outputs, missing audit trails, agent unpredictability). Hover shows micro-panel: title, one sentence, “Learn more →”. CTA: “Explore all risks” → `/risks`.
- **Solution teaser:** Inputs → Input Gate → Agentic AI → Output Gate → Outputs with looping packets and “Validated” / “Verified” stamps. CTA: “Visualize the Trust Layer” → `/solutions`.
- **Capabilities:** Four cards (Govern, Validate, Verify, Audit) unchanged; “Explore Platform” now links to `/solutions`.
- **CTA:** “Put a trust layer around your AI” with Request Demo and See Solutions.

### What moved to Risks / Solutions / About

- **Risks page:** Six scenarios with distinct visuals: packet **blocked** (stop + “Blocked” badge), **redacted** (mosaic-style + “Redacted” badge), **quarantine** container when policy blocked, and **live audit log** that streams entries per scenario. Each scenario drives different log lines and packet behavior.
- **Solutions page:** Renamed to “Trust layer visualization”; copy updated to “signals move through the gates… audit trail in real time.” Same simulator with five scenarios (PII, policy, prompt injection, hallucination, sensitive output); packet and log behavior unchanged but framed as brand Atlas Synapse.
- **About page:** Sections for **Atlas** (integrity layer, strength, governance), **Synapse** (signal checkpoint, validate/verify at boundary), and **Enterprise value** (governance, regulation, auditability, reliability). Links to Solutions and Contact.

### New visuals built

- **Constellation/neural background:** Nodes, connecting lines, drift, mouse parallax, periodic signal pulses; canvas-based, reduced-motion safe.
- **Hero orb:** Sphere with gradient border, two dashed rings (rotating), center core, two gates (IN/Validated, OUT/Verified) with pulse rings, two orbiting particles. Implemented with Framer Motion + divs (no Three.js). Dynamic import with `ssr: false` for HeroOrb.
- **Risks teaser:** SVG lifecycle line with interference-style curves at each risk node; hoverable nodes with micro-panels.
- **Risks page:** Packet animation with blocked/redacted/quarantine states and live audit log feed.

### Performance and reduced motion

- **Background:** `AnimatedBackground` is behind `AnimatedBackgroundWrapper` (dynamic import, `ssr: false`). When `prefers-reduced-motion` is set, canvas animation is not run; only the static radial gradient shows.
- **Hero orb:** `useReducedMotion()` disables glow pulse, gate bobbing, orbiting particles, and pulse rings; orb and labels remain static.
- **Global:** `@media (prefers-reduced-motion: reduce)` in `globals.css` shortens animations and transitions site-wide.
- **No Three.js:** Orb and background use canvas + DOM + Framer Motion to avoid heavy 3D and keep first load and interaction cost low.

---

## 3) Design system tokens (reference)

- **Colors:** atlas-bg, atlas-surface, atlas-elevated, atlas-border, atlas-soft, atlas-primary, atlas-primary-soft, atlas-secondary, atlas-accent, atlas-danger, atlas-success.
- **Typography:** --text-hero, --text-display, --text-h2, --text-body, --text-small (clamp-based). Fonts: --font-inter (sans), --font-space-grotesk (display).
- **Spacing:** --space-1 … --space-32.
- **Radii:** --radius-sm … --radius-full; Tailwind atlas-sm … atlas-2xl.
- **Glass:** --glass-bg, --glass-border, --blur-panel; .glass-panel class.
