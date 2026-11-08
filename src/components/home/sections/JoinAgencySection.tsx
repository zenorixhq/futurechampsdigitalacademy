"use client";

import React, { useRef } from "react";
import styles from "./JoinAgencySection.module.css";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MOTION, prefersReducedMotion, scrollReveal } from "@/lib/motion";

export default function JoinAgencySection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    scrollReveal(".join-header-anim", {
      trigger: containerRef.current,
      stagger: 0.12,
    });

    if (prefersReducedMotion()) return;

    // Social cards pop in with a slight fan rotation
    gsap.fromTo(".join-card-anim",
      {
        y: 60,
        opacity: 0,
        scale: 0.92,
        rotation: (i) => (i - 1) * 2.5,
        transformOrigin: "center bottom",
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.1,
        ease: MOTION.ease,
        stagger: 0.12,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, { scope: containerRef });

  const socials = [
    {
      title: "Follow Us On Twitter",
      handle: "@futurechampsdigitalacademy",
      link: "https://twitter.com/futurechampsdigitalacademy",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      title: "Follow Us On LinkedIn",
      handle: "@futurechampsdigitalacademy",
      link: "https://www.linkedin.com/company/futurechampsdigitalacademy",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
        </svg>
      )
    },
    {
      title: "Follow Us On Instagram",
      handle: "@futurechampsdigitalacademy",
      link: "https://www.instagram.com/futurechampsdigitalacademy",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    }
  ];

  return (
    <section ref={containerRef} className={styles.joinAgency}>
      <div className={styles.container}>
        
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={`${styles.titleColumn} join-header-anim`}>
            <h2 className={styles.sectionSubtitle}>JOIN AGENCY</h2>
            <h2 className={styles.sectionTitle}>Join our agency of creative innovators</h2>
          </div>
          <div className={`${styles.descColumn} join-header-anim`}>
            <p className={styles.description}>
              Explore specialized sports industry roles designed to launch your career in football club management and digital sports media.
            </p>
          </div>
        </div>

        {/* Social Cards Grid */}
        <div className={styles.socialGrid}>
          {socials.map((social, index) => (
            <div key={index} className={`${styles.socialCard} join-card-anim`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  {social.icon}
                </div>
              </div>
              
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{social.title}</h3>
                <p className={styles.cardHandle}>{social.handle}</p>
                <div className={styles.cardFooter}>
                  <Link href={social.link} target="_blank" rel="noreferrer" className={styles.arrowButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translate(1px, -1px)' }}>
                      <path d="M5 19L19 5"/>
                      <path d="M9 5H19V15"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
