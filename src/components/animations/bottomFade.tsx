'use client'
import { motion } from "framer-motion";
import React from "react";

interface BottomFadeProps {
    children: React.ReactNode
    classname: string
    delay: number
    viewport?: boolean | null
}

export default function BottomFade(props: BottomFadeProps) {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

    return (
        <motion.div
            className={props.classname}
            initial={isMobile ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0, y: 100 }}
            transition={{ ease: "linear", duration: 0.3, delay: props.delay }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: props.viewport ? props.viewport : true }}
        >
            {props.children}
        </motion.div>
    );
}
