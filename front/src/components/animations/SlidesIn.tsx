import { motion } from "framer-motion";
import Animation from "./props";

interface SlideSideWhenVisibleProps extends Animation {
  side: "left" | "right";
}
export function SlidesIn({
  children,
  side,
  duration = 0.3,
  once = false,
  className,
  props,
}: SlideSideWhenVisibleProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: once }}
      transition={{ duration: duration }}
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: side === "left" ? -100 : 100 },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
