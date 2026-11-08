"use client";

import React, { useRef } from "react";
import styles from "./GuestLecturersGrid.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Asterisk from "@/components/common/Asterisk";
import type { Faculty } from "@prisma/client";

interface GuestLecturersGridProps {
  guestLecturers: Faculty[];
}

export default function GuestLecturersGrid({ guestLecturers }: GuestLecturersGridProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".guest-anim", 
      { y: 30, opacity: 0 },
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
    <section ref={containerRef} className={styles.guestSection}>
      <div className={styles.container}>
        {guestLecturers.map((guest, idx) => {
          return (
            <div key={idx} className={styles.highlightGrid}>
              
              <div className={styles.contentCol}>
                <span className={`${styles.eyebrow} guest-anim`}>
                  <Asterisk /> {guest.role}
                </span>
                <h2 className={`${styles.title} guest-anim`}>{guest.name}</h2>
                
                {guest.experienceYears && (
                  <p className={`${styles.experience} guest-anim`}>{guest.experienceYears}</p>
                )}

                <div className={`${styles.highlightsBlock} guest-anim`}>
                  <h3 className={styles.blockTitle}>CAREER EXPERIENCES</h3>
                  <ul className={styles.highlightsList}>
                    {guest.careerHighlights.map((item, hIdx) => (
                      <li key={hIdx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {guest.video && (
                  <div className={`${styles.videoBlock} guest-anim`}>
                    <h3 className={styles.blockTitle}>A MESSAGE FROM {guest.name.split(' ')[0]}</h3>
                    <video src={guest.video} controls className={styles.videoPlayer} poster={guest.image} preload="metadata"></video>
                  </div>
                )}
              </div>

              <div className={`${styles.imageCol} guest-anim`}>
                <div className={styles.imageWrapper}>
                  <Image src={guest.image} alt={guest.name} fill className={styles.image} />
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
