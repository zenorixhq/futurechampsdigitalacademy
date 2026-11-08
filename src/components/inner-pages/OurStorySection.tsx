"use client";

import React, { useRef } from "react";
import styles from "./OurStorySection.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Asterisk from "@/components/common/Asterisk";

export default function OurStorySection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".story-anim", 
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, { scope: containerRef });

  const timeline = [
    { year: "2014", title: "The Football Foundation", desc: "Future Champs Group was born. Over a decade, we built one of Bangalore's most successful football academies, training over 5,000 athletes." },
    { year: "2020", title: "The Digital Shift", desc: "As our athletes began reaching national levels, we realized the massive gap in sports media, branding, and digital marketing in the Indian sports ecosystem." },
    { year: "2024", title: "The Academy is Born", desc: "We launched the Future Champs Digital Academy—a specialized arm designed entirely to train the next generation of sports media and marketing professionals." },
    { year: "Future", title: "Global Reach", desc: "Partnering with European clubs and international federations to provide our digital academy students with world-class placement opportunities." }
  ];

  return (
    <section ref={containerRef} className={styles.storySection}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <span className={`${styles.eyebrow} story-anim`}>
            <Asterisk /> OUR JOURNEY
          </span>
        </div>

        <div className={styles.timelineList}>
          {timeline.map((item, idx) => (
            <div key={idx} className={`${styles.timelineItem} story-anim`}>
              <div className={styles.yearCol}>
                <div className={styles.year}>{item.year}</div>
              </div>
              <div className={styles.contentCol}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
