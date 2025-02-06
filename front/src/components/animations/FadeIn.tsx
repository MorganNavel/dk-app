import { motion } from "framer-motion";
import Animation from "./props";

interface FadeInWhenVisibleProps extends Animation {}

export function FadeInWhenVisible({
  children,
  duration = 0.3,
  once = false,
  className,
  ...props
}: FadeInWhenVisibleProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: once }}
      transition={{ duration: duration }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
