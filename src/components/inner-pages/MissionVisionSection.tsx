"use client";
import GreyPlaceholder from "@/components/common/GreyPlaceholder";

import React, { useRef } from "react";
import styles from "./MissionVisionSection.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Asterisk from "@/components/common/Asterisk";
import Image from "next/image";

interface MissionVisionSectionProps {
  missionImage?: string | null;
  visionImage?: string | null;
}

export default function MissionVisionSection({ missionImage, visionImage }: MissionVisionSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".mv-anim", 
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
    <section ref={containerRef} className={styles.mvSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Mission Editorial Block */}
          <div className={styles.contentCol}>
            <span className={`${styles.eyebrow} mv-anim`}>
              <Asterisk /> OUR MISSION
            </span>
            <h2 className={`${styles.title} mv-anim`}>
              We exist to prepare the people behind modern sport.
            </h2>
            <div className={`${styles.divider} mv-anim`}></div>
            <ul className={`${styles.list} mv-anim`}>
              <li>Digital marketing</li>
              <li>Broadcasting</li>
              <li>Media</li>
              <li>Strategy</li>
            </ul>
          </div>

          {/* Photo */}
          <div className={`${styles.imageCol} mv-anim`}>
            <div className={styles.imageWrapper}>
              {missionImage ? (
                <Image src={missionImage} alt="Mission Image" fill className={styles.missionImageObj} style={{ objectFit: 'cover' }} />
              ) : (
                <GreyPlaceholder label="Mission Image" />
              )}
            </div>
          </div>

        </div>

        <div className={styles.visionGrid}>
           <div className={`${styles.imageCol} mv-anim`}>
            <div className={styles.visionImageWrapper}>
              {visionImage ? (
                <Image src={visionImage} alt="Vision Image" fill className={styles.visionImageObj} style={{ objectFit: 'cover' }} />
              ) : (
                <GreyPlaceholder label="Vision Image" />
              )}
            </div>
          </div>
          <div className={styles.visionContentCol}>
            <span className={`${styles.eyebrow} mv-anim`}>
              <Asterisk /> OUR VISION
            </span>
            <p className={`${styles.visionDesc} mv-anim`}>
              To be the premier sports digital education academy in Asia, setting global standards for media and marketing training. We envision a future where our alumni are leading the digital transformation of football clubs, leagues, and sports brands worldwide.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
