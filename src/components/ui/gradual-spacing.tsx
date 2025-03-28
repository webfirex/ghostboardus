"use client";

import { motion, useInView, Variants } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
  direction?: string;
}

export default function GradualSpacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps,
  className,
  direction,
}: GradualSpacingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex justify-center">
      {isInView &&
        text.split("").map((char, i) => (
          <motion.h1
            key={i}
            initial="hidden"
            animate="visible"
            variants={framerProps ?? {
              hidden: { opacity: 0, x: direction === 'left' ? 1 : -1 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration, delay: i * delayMultiple }}
            className={cn("drop-shadow-sm", className)}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.h1>
        ))}
    </div>
  );
}
