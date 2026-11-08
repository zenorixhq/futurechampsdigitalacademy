"use client";

import React, { useRef } from "react";
import styles from "./FacultyHighlightSection.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Asterisk from "@/components/common/Asterisk";
import type { Faculty } from "@prisma/client";

export default function FacultyHighlightSection({ faculty }: { faculty?: Faculty }) {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".highlight-anim", 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, { scope: containerRef });

  if (!faculty) return null;

  return (
    <section ref={containerRef} className={styles.highlightSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          <div className={`${styles.imageCol} highlight-anim`}>
            <div className={styles.imageWrapper}>
              <Image 
                src={faculty.image} 
                alt={faculty.name} 
                fill 
                className={styles.image} 
              />
            </div>
          </div>

          <div className={styles.contentCol}>
            <span className={`${styles.eyebrow} highlight-anim`}>
              <Asterisk /> {faculty.role}
            </span>
            <h2 className={`${styles.title} highlight-anim`}>{faculty.name}</h2>
            
            <div className={`${styles.highlightsBlock} highlight-anim`}>
              <h3 className={styles.blockTitle}>CAREER EXPERIENCES</h3>
              <ul className={styles.highlightsList}>
                {faculty.careerHighlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            
            {faculty.teachingExperience && faculty.teachingExperience.length > 0 && (
              <div className={`${styles.highlightsBlock} highlight-anim`}>
                <h3 className={styles.blockTitle}>TEACHING EXPERIENCE</h3>
                <ul className={styles.highlightsList}>
                  {faculty.teachingExperience.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
          </div>

        </div>
      </div>
    </section>
  );
}
