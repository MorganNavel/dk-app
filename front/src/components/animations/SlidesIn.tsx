import { motion } from "framer-motion";
import Animation from "./props";
import { cn } from "@/lib/utils";

interface SlideSideWhenVisibleProps extends Animation {
  side: "left" | "right" | "top" | "bottom";
}

export function SlidesIn({
  children,
  side,
  duration = 0.3,
  once = false,
  className,
  props,
}: SlideSideWhenVisibleProps) {
  let y = 0;
  if (side === "top") {
    y = -100;
  } else if (side === "bottom") {
    y = 100;
  }

  let x = 0;
  if (side === "left") {
    x = -100;
  } else if (side === "right") {
    x = 100;
  }

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: once }}
      transition={{ duration: duration }}
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: {
          opacity: 0,
          x: x,
          y: y,
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
