"use client";

import React, { useRef } from "react";
import styles from "./CourseOverviewSection.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Asterisk from "@/components/common/Asterisk";
import { courseData } from "@/data/content";

export default function CourseOverviewSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".overview-anim", 
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

  return (
    <section ref={containerRef} className={styles.overviewSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          <div className={styles.contentCol}>
            <span className={`${styles.eyebrow} overview-anim`}>
              <Asterisk /> WHY THIS COURSE?
            </span>
            <h2 className={`${styles.title} overview-anim`}>The Industry Demands It.</h2>
            
            <p className={`${styles.desc} overview-anim`}>
              {courseData.overview}
            </p>
            
            <p className={`${styles.quote} overview-anim`}>
              &quot;Sports organizations are actively looking for skilled digital marketing and multimedia professionals.&quot;
            </p>
          </div>

          <div className={`${styles.listCol} overview-anim`}>
            <h3 className={styles.listTitle}>PRACTICAL EXPERIENCE</h3>
            <ul className={styles.practicalList}>
              {courseData.practicalExperience.map((item, idx) => (
                <li key={idx} className={styles.practicalItem}>
                  <Asterisk /> <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
