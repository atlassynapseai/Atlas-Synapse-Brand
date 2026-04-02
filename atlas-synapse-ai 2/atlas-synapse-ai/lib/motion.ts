/**
 * Lazy motion shim: use LazyMotion + domAnimation for smaller bundle.
 * Export m as motion so existing motion.* usage stays the same.
 */
export {
  LazyMotion,
  domAnimation,
  m as motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";
