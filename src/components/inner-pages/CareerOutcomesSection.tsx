"use client";
import GreyPlaceholder from "@/components/common/GreyPlaceholder";

import React, { useRef } from "react";
import styles from "./CareerOutcomesSection.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Asterisk from "@/components/common/Asterisk";
import { courseData } from "@/data/content";
import Image from "next/image";

interface CareerOutcomesSectionProps {
  imageSrc?: string | null;
}

export default function CareerOutcomesSection({ imageSrc }: CareerOutcomesSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".career-anim", 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.careerSection}>
      <div className={styles.container}>
        
        <div className={styles.grid}>
          <div className={styles.imageCol}>
            <div className={`${styles.imageWrapper} career-anim`}>
              {imageSrc ? (
                <Image src={imageSrc} alt="Careers Image" fill style={{ objectFit: 'cover' }} />
              ) : (
                <GreyPlaceholder label="Careers Image" />
              )}
            </div>
          </div>
          
          <div className={styles.contentCol}>
            <span className={`${styles.eyebrow} career-anim`}>
              <Asterisk /> CAREER OPPORTUNITIES
            </span>
            <h2 className={`${styles.title} career-anim`}>Work With:</h2>
            
            <div className={styles.careerList}>
              {courseData.careerOpportunities.map((opportunity, idx) => (
                <div key={idx} className={`${styles.careerItem} career-anim`}>
                  <div className={styles.careerNumber}>0{idx + 1}</div>
                  <div>
                    <h3 className={styles.careerTitle}>{opportunity}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
