"use client";

import React, { useRef } from "react";
import styles from "./TickerSection.module.css";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function TickerSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const content = contentRef.current;
    if (!content || prefersReducedMotion()) return;

    // Base infinite loop (replaces the old CSS keyframe marquee)
    const loop = gsap.to(content, {
      xPercent: -50,
      ease: "none",
      duration: 28,
      repeat: -1,
    });

    // Scroll velocity boosts the belt and leans it into the scroll
    const speedProxy = { value: 1 };
    const skewTo = gsap.quickTo(content, "skewX", { duration: 0.5, ease: "power3.out" });
    const clampSkew = gsap.utils.clamp(-6, 6);

    ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = self.getVelocity();

        const targetSpeed = 1 + Math.min(Math.abs(velocity) / 600, 3);
        gsap.to(speedProxy, {
          value: targetSpeed,
          duration: 0.15,
          overwrite: true,
          onUpdate: () => loop.timeScale(speedProxy.value),
        });
        gsap.to(speedProxy, {
          value: 1,
          duration: 1.4,
          delay: 0.15,
          ease: "power2.out",
          overwrite: false,
          onUpdate: () => loop.timeScale(speedProxy.value),
        });

        skewTo(clampSkew(velocity / -250));
        gsap.delayedCall(0.3, () => skewTo(0));
      },
    });
  }, { scope: containerRef });

  const tickerItems = [
    "Sports Media Management",
    "Sports Digital Content",
    "Digital Marketing",
    "Club Sponsorship & PR",
    "Analytics & Reporting"
  ];

  // We duplicate the items enough times to create a seamless infinite scroll loop on ultra-wide screens
  const displayItems = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <section ref={containerRef} className={styles.tickerSection}>
      <div className={styles.tickerContainer}>
        <div className={styles.marqueeWrapper}>
          <div ref={contentRef} className={styles.marqueeContent}>
            {displayItems.map((item, index) => (
              <div key={index} className={styles.tickerItem}>
                <Image
                  src="/assets/images/asterisk-icon.svg"
                  alt="*"
                  width={24}
                  height={25}
                  className={styles.tickerIcon}
                />
                <span className={styles.tickerText}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
