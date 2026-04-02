"use client";

import { motion } from "@/lib/motion";

const items = [
  { id: "product", label: "Product" },
  { id: "fit", label: "Where We Fit" },
  { id: "offerings", label: "Offerings" },
  { id: "security", label: "Security" },
  { id: "contact", label: "Contact" }
];

const PulseDockJump: React.FC = () => {
  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="pointer-events-auto flex items-end gap-1 rounded-full bg-atlas-soft/80 px-3 py-1 ring-1 ring-white/10 backdrop-blur-xl shadow-atlas-soft"
        aria-label="Jump to sections"
      >
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => handleJump(item.id)}
            className="group relative flex h-8 w-8 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-atlas-secondary"
            aria-label={item.label}
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-slate-500 group-hover:bg-atlas-secondary"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.5, 1, 0.7]
              }}
              transition={{
                repeat: Infinity,
                duration: 3.2,
                delay: idx * 0.12,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-atlas-soft px-2 py-1 text-[10px] text-slate-200 shadow-atlas-soft"
              initial={{ opacity: 0, y: 4 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              {item.label}
            </motion.div>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default PulseDockJump;

