"use client";

import React, { useRef } from "react";
import styles from "./StatsSection.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function StatsSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".stat-anim", 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, { scope: containerRef });

  const stats = [
    { number: "10+", label: "Years of Experience" },
    { number: "5000+", label: "Players Trained" },
    { number: "4", label: "Training Centers" }
  ];

  return (
    <section ref={containerRef} className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.header} style={{textAlign: 'center', marginBottom: '40px'}}>
          <span className={`${styles.eyebrow} stat-anim`} style={{display: 'block', fontSize: '14px', fontWeight: 700, letterSpacing: '2px', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '10px'}}>
            BACKED BY FUTURE CHAMPS GROUP
          </span>
          <p className={`${styles.desc} stat-anim`} style={{fontFamily: 'var(--font-main)', fontSize: '16px', color: 'var(--color-text-muted)'}}>
            Our digital academy is built on the foundation of India&apos;s premier sports ecosystem.
          </p>
        </div>
        <div className={styles.grid}>
          {stats.map((stat, idx) => (
            <div key={idx} className={`${styles.statBlock} stat-anim`}>
              <h2 className={styles.number}>{stat.number}</h2>
              <p className={styles.label}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
