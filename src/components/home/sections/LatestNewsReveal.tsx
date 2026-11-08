"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { scrollReveal } from "@/lib/motion";

interface LatestNewsRevealProps {
  className?: string;
  children: React.ReactNode;
}

/** Client wrapper that reveals the news cards on scroll (data renders server-side). */
export default function LatestNewsReveal({ className, children }: LatestNewsRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    scrollReveal(Array.from(ref.current.children), {
      trigger: ref.current,
      start: "top 82%",
      stagger: 0.12,
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
