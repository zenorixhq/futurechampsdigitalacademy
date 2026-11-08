"use client";

import React, { useRef } from "react";
import styles from "./AgencyBenefitsSection.module.css";
import { useGSAP } from "@gsap/react";
import { scrollReveal } from "@/lib/motion";

export default function AgencyBenefitsSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    scrollReveal(".benefit-header-anim", {
      trigger: containerRef.current,
      stagger: 0.12,
    });

    // Numbered cards slide in from the right with a settling ease
    scrollReveal(".benefit-item-anim", {
      trigger: containerRef.current,
      start: "top 75%",
      stagger: 0.12,
      from: { x: 56, y: 0 },
    });
  }, { scope: containerRef });

  const benefits = [
    {
      number: "01",
      title: "Pitch Access",
      description: "We customize strategies to fit your brand's specific needs, ensuring alignment.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
          <circle cx="12" cy="9" r="2.5"></circle>
        </svg>
      )
    },
    {
      number: "02",
      title: "Industry Mentors",
      description: "Combines industry knowledge and creativity to exceptional results for your brand.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      number: "03",
      title: "Sports Marketing",
      description: "We utilize data insights to refine strategies, optimize and ensure impactful, measurable results.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
      )
    },
    {
      number: "04",
      title: "Live Coverage",
      description: "We provide continuous support and maintenance to keep your digital assets at their best.",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7"></polygon>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
      )
    }
  ];

  return (
    <section ref={containerRef} className={styles.agencyBenefits}>
      <div className={styles.container}>
        
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={`${styles.titleColumn} benefit-header-anim`}>
            <h2 className={styles.sectionSubtitle}>KEY BENEFITS</h2>
            <h2 className={styles.sectionTitle}>Discover the benefits of choosing us today</h2>
          </div>
          <div className={`${styles.descColumn} benefit-header-anim`}>
            <p className={styles.description}>
              Experience unparalleled creativity, data-driven strategies, and dedicated support that drive real results for your brand.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={`${styles.benefitCard} benefit-item-anim`}>
              <h2 className={styles.benefitNumber}>{benefit.number}</h2>
              <div className={styles.benefitContent}>
                <div className={styles.cardIcon}>
                  {benefit.icon}
                </div>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDesc}>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
