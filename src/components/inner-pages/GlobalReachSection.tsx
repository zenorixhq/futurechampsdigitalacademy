"use client";

import React, { useRef } from "react";
import styles from "./GlobalReachSection.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function GlobalReachSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".reach-title-anim", 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    );

    gsap.fromTo(".map-anim", 
      { scale: 0.95, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.reachSection}>
      <div className={styles.container}>
        
        <div className={`${styles.header} reach-title-anim`}>
          <h2 className={styles.subtitle}>GLOBAL NETWORK</h2>
          <h2 className={styles.title}>Connected to the world of sports</h2>
        </div>

        <div className={`${styles.mapContainer} map-anim`}>
          <div className={styles.mapPlaceholder}>
            {/* Dots representing connections/partner clubs */}
            <div className={styles.dot} style={{ top: "40%", left: "20%" }}>
              <div className={styles.pulse}></div>
              <span className={styles.tooltip}>UK & Europe</span>
            </div>
            <div className={styles.dot} style={{ top: "35%", left: "55%" }}>
              <div className={styles.pulse}></div>
              <span className={styles.tooltip}>Middle East</span>
            </div>
            <div className={styles.dot} style={{ top: "60%", left: "70%" }}>
              <div className={styles.pulse}></div>
              <span className={styles.tooltip}>Kerala, India (HQ)</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
