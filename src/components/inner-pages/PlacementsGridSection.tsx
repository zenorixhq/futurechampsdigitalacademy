"use client";

import React, { useRef } from "react";
import Image from "next/image";
import styles from "./PlacementsGridSection.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Placement {
  id: string;
  studentName: string;
  companyName: string;
  role: string;
  image: string;
}

export default function PlacementsGridSection({ placements }: { placements: Placement[] }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".placement-card-anim",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.placementsSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {placements.map((placement) => (
            <div key={placement.id} className={`${styles.card} placement-card-anim`}>
              <div className={styles.imageWrapper}>
                <Image
                  src={placement.image}
                  alt={placement.studentName}
                  fill
                  className={styles.image}
                />
                <div className={styles.overlay}></div>
                <div className={styles.content}>
                  <h3 className={styles.name}>{placement.studentName}</h3>
                  <p className={styles.role}>{placement.role}</p>
                  <p className={styles.company}>
                    <svg className={styles.companyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {placement.companyName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {placements.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No placements added yet.</p>
        )}
      </div>
    </section>
  );
}
