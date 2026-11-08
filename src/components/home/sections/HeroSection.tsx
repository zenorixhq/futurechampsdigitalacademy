"use client";

import React, { useRef } from "react";
import styles from "./HeroSection.module.css";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Asterisk from "@/components/common/Asterisk";

const ACCENT_WORD = "ACADEMY.";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // --- Load-in choreography ---
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.from(`.${styles.eyebrow}`, { y: 20, opacity: 0, duration: 0.8 }, 0.1)
      .from(".hero-line-inner", {
        yPercent: 115,
        rotate: 3,
        transformOrigin: "left bottom",
        duration: 1.25,
        stagger: 0.11,
      }, 0.2)
      .from(".hero-char-inner", {
        yPercent: 120,
        duration: 1.1,
        stagger: 0.04,
      }, 0.65)
      .from(`.${styles.description}`, { y: 24, opacity: 0, duration: 0.9 }, 0.95)
      .from(`.${styles.ctaRow} > *`, { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, 1.05)
      .from(`.${styles.visualDisc}`, { opacity: 0, scale: 0.9, duration: 1.2 }, 0.5)
      .from(`.${styles.visualRing}`, { opacity: 0, scale: 0.8, duration: 1.3 }, 0.6)
      .from(`.${styles.visualImg}`, { opacity: 0, scale: 1.08, duration: 1.5 }, 0.5)
      .from(".hero-chip", { scale: 0, opacity: 0, duration: 0.7, ease: "back.out(1.8)", stagger: 0.09 }, 1.15)
      .from(`.${styles.ghost}`, { opacity: 0, duration: 1.6 }, 0.4);

    // --- Icon chips drift on their own pivot (in place, no orbiting) ---
    gsap.utils.toArray<HTMLElement>(".hero-chip").forEach((chip, i) => {
      gsap.to(chip, {
        y: gsap.utils.random(-14, 14),
        x: gsap.utils.random(-9, 9),
        rotation: gsap.utils.random(-8, 8),
        duration: gsap.utils.random(2.4, 3.8),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.4 + i * 0.15,
      });
    });

    // --- Scroll-driven exit: type lifts, ghost text sinks against it ---
    gsap.to(`.${styles.container}`, {
      y: -80,
      opacity: 0.25,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom 35%",
        scrub: true,
      },
    });

    gsap.to(`.${styles.ghost}`, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // --- Mouse parallax on the ghost type (fine pointers only) ---
    if (window.matchMedia("(pointer: fine)").matches) {
      const ghostX = gsap.quickTo(`.${styles.ghost}`, "x", { duration: 1.2, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        ghostX(nx * -36);
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.heroSection}>
      {/* Atmosphere */}
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.ghost} aria-hidden="true">FUTURE CHAMPS</div>

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <Asterisk /> Future Champs Digital Academy
          </span>

          <h1 className={styles.title}>
            <span className={styles.lineMask}>
              <span className={`${styles.line} hero-line-inner`}>Kerala&apos;s first</span>
            </span>
            <span className={styles.lineMask}>
              <span className={`${styles.line} hero-line-inner`}>
                <span className={styles.lineOutline}>Sports digital</span>
              </span>
            </span>
            <span className={styles.lineMask}>
              <span className={`${styles.line} hero-line-inner`}>Marketing</span>
            </span>
            <span className={styles.lineMask}>
              <span className={styles.srOnly}>{ACCENT_WORD}</span>
              <span className={`${styles.line} ${styles.lineAccent}`} aria-hidden="true">
                {ACCENT_WORD.split("").map((ch, i) => (
                  <span key={i} className={styles.charMask}>
                    <span className={`${styles.char} hero-char-inner`}>{ch}</span>
                  </span>
                ))}
              </span>
            </span>
          </h1>

          <p className={styles.description}>
            Turning your passion for sports into a profession — train with the
            industry, inside the game, from day one.
          </p>

          <div className={styles.ctaRow}>
            <Link href="/contact" className="btn-primary">
              <span>Apply Now</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </Link>
            <Link href="/course" className="btn-secondary">
              Explore the Course
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualDisc} aria-hidden="true" />
          <div className={styles.visualRing} aria-hidden="true" />
          <Image
            src="/assets/images/hero-banner.webp"
            alt="Sports digital marketing professional with a laptop"
            width={1024}
            height={1024}
            priority
            className={styles.visualImg}
          />

          {/* Floating sports icon chips — each drifts on its own pivot */}
          <span className={`${styles.chip} hero-chip ${styles.chip1}`} aria-hidden="true">
            <svg {...iconProps}>
              <path d="M8 21h8" /><path d="M12 17v4" />
              <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
              <path d="M7 6H4.5A1.5 1.5 0 0 0 3 7.5C3 9.4 4.6 11 6.5 11H7" />
              <path d="M17 6h2.5A1.5 1.5 0 0 1 21 7.5C21 9.4 19.4 11 17.5 11H17" />
            </svg>
          </span>
          <span className={`${styles.chip} hero-chip ${styles.chip2}`} aria-hidden="true">
            <svg {...iconProps}>
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" /><path d="M12 3v18" />
              <path d="M5.5 5.5c3.2 3.2 3.2 9.8 0 13" />
              <path d="M18.5 5.5c-3.2 3.2-3.2 9.8 0 13" />
            </svg>
          </span>
          <span className={`${styles.chip} hero-chip ${styles.chip3}`} aria-hidden="true">
            <svg {...iconProps}>
              <circle cx="12" cy="12" r="9" />
              <polygon points="12,7.6 16.2,10.7 14.6,15.4 9.4,15.4 7.8,10.7" />
            </svg>
          </span>
          <span className={`${styles.chip} hero-chip ${styles.chip4}`} aria-hidden="true">
            <svg {...iconProps}>
              <circle cx="12" cy="13.5" r="7.5" />
              <path d="M12 9.5v4l2.5 2.5" />
              <path d="M9.5 2.5h5" />
            </svg>
          </span>
          <span className={`${styles.chip} hero-chip ${styles.chip5}`} aria-hidden="true">
            <svg {...iconProps}>
              <path d="m3 11 14-5v12L3 13v-2z" />
              <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
            </svg>
          </span>
          <span className={`${styles.chip} hero-chip ${styles.chip6}`} aria-hidden="true">
            <svg {...iconProps}>
              <circle cx="12" cy="15" r="5.5" />
              <path d="M8.7 9.9 6 3h12l-2.7 6.9" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
