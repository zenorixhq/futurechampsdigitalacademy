"use client";

import React, { useRef } from "react";
import styles from "./AboutAgencySection.module.css";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MOTION, prefersReducedMotion } from "@/lib/motion";

export interface IconBoxData {
  title: string;
  description: string;
  icon: string;
}

export interface AboutAgencySectionProps {
  subtitle?: string;
  title?: string;
  description?: React.ReactNode;
  buttonText?: string;
  buttonLink?: string;
  iconBoxes?: IconBoxData[];
}

const defaultIconBoxes = [
  {
    title: "Global Football Standards",
    description: "Learn the marketing strategies used by European Clubs, FIFA, and top federations to engage global audiences.",
    icon: "/assets/images/glass_stadium.png"
  },
  {
    title: "Domestic Leagues (IPL, ISL)",
    description: "Understand the rapidly growing domestic sports ecosystem and how to market franchises locally.",
    icon: "/assets/images/glass_medal.png"
  },
  {
    title: "Athlete Personal Branding",
    description: "Master the art of building powerful personal brands for sports stars, a skill in massive demand.",
    icon: "/assets/images/glass_mic.png"
  },
  {
    title: "Startups & Agencies",
    description: "Get industry-ready to join fast-paced sports startups, media agencies, and production houses.",
    icon: "/assets/images/glass_whistle.png"
  }
];

export default function AboutAgencySection({
  subtitle = "ABOUT THE DIPLOMA",
  title = "Why is this course relevant right now?",
  description = "The sports industry is going digital. From European clubs, FIFA, federations, IPL, ISL, academies, agencies, startups, and athlete branding, the demand for sports digital marketing and multimedia professionals is growing rapidly.",
  buttonText = "DISCOVER MORE",
  buttonLink = "/about",
  iconBoxes = defaultIconBoxes
}: AboutAgencySectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    // Title block unmasks upward; button follows
    gsap.fromTo(".about-title-anim",
      {
        y: 48,
        opacity: 0,
        clipPath: "inset(0% 0% 100% 0%)",
      },
      {
        y: 0,
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: MOTION.durationSlow,
        ease: MOTION.ease,
        stagger: 0.14,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );

    // Icon cards rise with alternating depths for a loosened grid feel
    gsap.fromTo(".about-box-anim",
      {
        y: (i) => (i % 2 === 0 ? 90 : 48),
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: MOTION.durationSlow,
        ease: MOTION.ease,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 55%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.aboutAgencySection}>
      <div className={styles.container}>
        
        {/* Left Column (Sticky Title) */}
        <div className={styles.leftColumn}>
          <div className={styles.stickyContent}>
            <div className={`${styles.sectionTitleWrapper} about-title-anim`}>
              <h2 className={styles.sectionSubtitle}>{subtitle}</h2>
              <h2 className={styles.sectionTitle}>{title}</h2>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.6', marginTop: '20px' }}>
                {description}
              </div>
            </div>
            
            <div className={`${styles.buttonWrapper} about-title-anim`}>
              <Link href={buttonLink} className="btn-primary">
                <span>{buttonText}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column (Grid of Features) */}
        <div className={styles.rightColumn}>
          <div className={styles.gridContainer}>
            {iconBoxes.map((box, idx) => (
              <div key={idx} className={`${styles.iconBox} about-box-anim`}>
                <div className={styles.iconWrapper}>
                  <Image src={box.icon} alt={box.title} width={40} height={40} className={styles.boxIcon} />
                </div>
                <h3 className={styles.boxTitle}>{box.title}</h3>
                <p className={styles.boxDescription}>
                  {box.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
