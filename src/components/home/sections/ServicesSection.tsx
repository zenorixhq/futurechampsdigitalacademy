"use client";

import React, { useRef } from "react";
import styles from "./ServicesSection.module.css";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MOTION, prefersReducedMotion, scrollReveal } from "@/lib/motion";

export default function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    scrollReveal(".services-header-anim", {
      trigger: containerRef.current,
      stagger: 0.12,
    });

    if (prefersReducedMotion()) return;

    // Cards unmask with a clipped wipe, fanning out from the center card
    gsap.fromTo(".services-card-anim",
      {
        y: 70,
        opacity: 0,
        clipPath: "inset(14% 10% 14% 10% round 24px)",
      },
      {
        y: 0,
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0% round 24px)",
        duration: MOTION.durationSlow,
        ease: MOTION.ease,
        stagger: { each: 0.12, from: "center" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );
  }, { scope: containerRef });

  const services = [
    {
      title: "Sports Marketing Strategies",
      description: "Ability to plan & execute matchday content strategies and understand audience engagement.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      ),
      link: "#"
    },
    {
      title: "Media & Press Relations",
      description: "Ability to write match reports, run press conferences, and conduct player & coach interviews.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      link: "#"
    },
    {
      title: "Social Media & Graphics",
      description: "Handle clubs and athletes social media professionally and master matchday graphics.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      ),
      link: "#"
    }
  ];

  return (
    <section ref={containerRef} className={styles.servicesSection} id="course">
      <div className={styles.container}>
        
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={`${styles.titleColumn} services-header-anim`}>
            <div className={styles.sectionTitleWrapper}>
              <h2 className={styles.sectionSubtitle}>CURRICULUM</h2>
              <h2 className={styles.sectionTitle}>Skills Students Will Gain</h2>
            </div>
          </div>
          
          <div className={`${styles.buttonColumn} services-header-anim`}>
            <p className={styles.description}>
              Master 8 comprehensive modules designed to make you industry-ready, from content strategy to sports media ethics and player branding.
            </p>
            <div className={styles.buttonWrapper}>
              <Link href="/contact" className={styles.primaryButton}>
                <span className={styles.buttonIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                </span>
                <span className={styles.buttonText}>Get Syllabus</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className={`${styles.servicesGrid} services-grid-trigger`}>
          {services.map((service, index) => (
            <div key={index} className={`${styles.serviceCard} services-card-anim`}>
              <div className={styles.cardTopRow}>
                <div className={styles.cardIcon}>
                  {service.icon}
                </div>
                <div className={styles.cardArrow}>
                  <Link href={service.link} className={styles.arrowButton}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"/>
                      <polyline points="7 7 17 7 17 17"/>
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className={styles.cardBottomRow}>
                <h3 className={styles.cardTitle}>
                  <Link href={service.link}>{service.title}</Link>
                </h3>
                <p className={styles.cardDescription}>{service.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
