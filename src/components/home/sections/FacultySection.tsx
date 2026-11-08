"use client";

import React, { useRef } from "react";
import styles from "./FacultySection.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion, scrollReveal } from "@/lib/motion";
import type { Faculty } from "@prisma/client";

interface FacultySectionProps {
  facultyData: Faculty[];
}

export default function FacultySection({ facultyData }: FacultySectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    scrollReveal(".faculty-header-anim", { trigger: containerRef.current });

    scrollReveal(".faculty-card-anim", {
      trigger: containerRef.current,
      start: "top 75%",
      stagger: 0.15,
      from: { y: 70 },
    });

    if (prefersReducedMotion()) return;

    // Portraits drift inside their frames while scrolling — quiet parallax
    gsap.utils.toArray<HTMLElement>(`.${styles.facultyImage} img`).forEach((img) => {
      gsap.fromTo(img,
        { yPercent: -6, scale: 1.12 },
        {
          yPercent: 6,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.facultySection} id="faculty">
      <div className={styles.container}>
        
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className="faculty-header-anim">
            <h2 className={styles.sectionSubtitle}>EXPERIENCED FACULTY</h2>
            <h2 className={styles.sectionTitle}>Learn from Industry Leaders</h2>
          </div>
        </div>

        {/* Faculty Grid */}
        <div className={styles.facultyGrid}>
          {facultyData.map((member, index) => {
            return (
              <div key={index} className={`${styles.facultyCard} faculty-card-anim`}>
                <div className={styles.facultyHeader}>
                  <div className={styles.facultyImage}>
                    {/* Using regular img for height: auto support instead of next/image fill which forces absolute positioning */}
                    <img src={member.image} alt={member.name} />
                  </div>
                  <h3 className={styles.facultyName}>{member.name}</h3>
                </div>
                
                <div className={styles.facultyContent}>
                  <h4>Career Experiences & Highlights</h4>
                  <ul className={styles.facultyList}>
                    {member.careerHighlights.map((highlight, i) => (
                      <li key={i}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full-width Video Showcase */}
        {facultyData.find(m => m.video) && (
          <div className={`${styles.videoShowcase} faculty-card-anim`}>
            {facultyData.filter(m => m.video).map((member, idx) => {
              return (
                <div key={idx} className={styles.videoWrapper}>
                  <div className={styles.videoHeader}>
                     A MESSAGE FROM {member.name.toUpperCase()}
                  </div>
                  <video 
                    src={member.video!} 
                    controls 
                    className={styles.fullVideo}
                    preload="metadata"
                    poster={member.image}
                  ></video>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
