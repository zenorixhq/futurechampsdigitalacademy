"use client";

import React, { useRef } from "react";
import styles from "./WhyChooseUsSection.module.css";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MOTION, prefersReducedMotion, scrollReveal } from "@/lib/motion";

const DEFAULT_PARTNER_PHOTO = "/assets/images/kannur-warriors-celebration.jpg";

export default function WhyChooseUsSection({ partnerPhoto }: { partnerPhoto?: string }) {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    scrollReveal(".why-header-anim", {
      trigger: containerRef.current,
      stagger: 0.12,
    });

    // List items slide in from the left, one after another
    scrollReveal(".why-item-anim", {
      trigger: containerRef.current,
      start: "top 70%",
      stagger: 0.12,
      from: { x: -48, y: 0 },
    });

    if (prefersReducedMotion()) return;

    // Image panel unclips from the bottom edge
    gsap.fromTo(".why-image-anim",
      { clipPath: "inset(100% 0% 0% 0% round 24px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 24px)",
        duration: MOTION.durationSlow,
        ease: MOTION.ease,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
        },
      }
    );
  }, { scope: containerRef });

  const items = [
    {
      title: "Stadium Field Access",
      description: "Gain exclusive access to the pitch and experience a professional football environment firsthand."
    },
    {
      title: "Matchday Accreditation",
      description: "Get official pitch-side accreditation to cover live matches and events."
    },
    {
      title: "Press Conference Access",
      description: "Participate in real post-match press conferences with players and coaches."
    }
  ];

  return (
    <section ref={containerRef} className={styles.whyChooseUsSection} id="partner">
      <div className={styles.container}>
        
        {/* Top Header Row */}
        <div className={styles.headerRow}>
          <div className={`${styles.titleColumn} why-header-anim`}>
            <Image
              src="/assets/images/kannur-warriors-logo.png"
              alt="Kannur Warriors FC logo"
              width={70}
              height={107}
              className={styles.partnerLogo}
              priority
            />
            <h2 className={styles.sectionSubtitle}>OUR FIELD PARTNER</h2>
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleHighlight}>Kannur Warriors FC</span>
            </h2>
          </div>
          <div className={`${styles.descColumn} why-header-anim`}>
            <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '15px' }}>DEFENDING SUPER LEAGUE KERALA CHAMPIONS</h3>
            <p className={styles.description}>
              Every student gets exclusive stadium field access, pitch-side matchday accreditation, one training session, press conference access, and hands-on sports media experience in a professional football environment.
            </p>
          </div>
        </div>

        {/* Bottom Content Row */}
        <div className={styles.contentRow}>
          
          {/* Left: Items */}
          <div className={styles.itemsColumn}>
            <div className={styles.itemsContainer}>
              {items.map((item, index) => (
                <div key={index} className={`${styles.itemBox} why-item-anim`}>
                  <div className={styles.itemContent}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemDesc}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className={`${styles.imageColumn} why-image-anim`}>
            <div className={styles.imageWrapper} style={{ height: '100%', minHeight: '400px', position: 'relative' }}>
              <Image
                src={partnerPhoto || DEFAULT_PARTNER_PHOTO}
                alt="Kannur Warriors FC celebrating their championship trophy"
                fill
                className={styles.partnerPhoto}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
