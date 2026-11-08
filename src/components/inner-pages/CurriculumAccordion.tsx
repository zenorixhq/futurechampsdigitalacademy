"use client";

import React, { useState, useRef } from "react";
import styles from "./CurriculumAccordion.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Asterisk from "@/components/common/Asterisk";
import { courseData } from "@/data/content";

export default function CurriculumAccordion() {
  const containerRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".curriculum-anim", 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.curriculumSection}>
      <div className={styles.container}>
        
        <div className={styles.grid}>
          <div className={styles.headerCol}>
            <span className={`${styles.eyebrow} curriculum-anim`}>
              <Asterisk /> CURRICULUM
            </span>
            <h2 className={`${styles.title} curriculum-anim`}>What you&apos;ll learn</h2>
            <p className={`${styles.desc} curriculum-anim`}>
              A comprehensive deep dive into the digital ecosystem of modern sports.
            </p>
          </div>

          <div className={styles.accordionCol}>
            <div className={styles.accordionWrapper}>
              {courseData.curriculum.map((module, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.accordionItem} ${openIndex === idx ? styles.active : ''} curriculum-anim`}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <div className={styles.accordionHeader}>
                    <h3 className={styles.accordionTitle}>
                      <span className={styles.accordionNumber}>
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      {" "}{module.title}
                    </h3>
                    <div className={styles.icon}>
                      {openIndex === idx ? '-' : '+'}
                    </div>
                  </div>
                  <div 
                    className={styles.accordionContent}
                    style={{ 
                      maxHeight: openIndex === idx ? "800px" : "0px",
                      paddingTop: openIndex === idx ? "20px" : "0px",
                      opacity: openIndex === idx ? 1 : 0
                    }}
                  >
                    <ul className={styles.pointsList}>
                      {module.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                    {module.assignment && (
                      <span className={styles.assignmentTag}>{module.assignment}</span>
                    )}
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
