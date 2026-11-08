"use client";

import React, { useRef } from "react";
import styles from "./InnerHero.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Asterisk from "@/components/common/Asterisk";
import Image from "next/image";
import GreyPlaceholder from "@/components/common/GreyPlaceholder";

interface InnerHeroProps {
  eyebrow: string;
  titleTop: React.ReactNode;
  titleBottom?: React.ReactNode;
  desc?: string;
  /** Giant outlined word behind the content */
  ghost: string;
  /** When set, renders the framed visual column (photography pending from client) */
  placeholderLabel?: string;
  /** Optional real image to replace the placeholder inside the frame */
  imageSrc?: string;
  imageAlt?: string;
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export default function InnerHero({ eyebrow, titleTop, titleBottom, desc, ghost, placeholderLabel, imageSrc, imageAlt }: InnerHeroProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // --- Load-in choreography ---
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.from(`.${styles.eyebrow}`, { y: 20, opacity: 0, duration: 0.8 }, 0.1)
      .from(".inner-line-inner", {
        yPercent: 115,
        rotate: 3,
        transformOrigin: "left bottom",
        duration: 1.2,
        stagger: 0.12,
      }, 0.2)
      .from(`.${styles.ghost}`, { opacity: 0, duration: 1.6 }, 0.4);

    if (desc) {
      tl.from(`.${styles.desc}`, { y: 24, opacity: 0, duration: 0.9 }, 0.9);
    }

    if (placeholderLabel || imageSrc) {
      tl.from(`.${styles.frame}`, { y: 40, opacity: 0, duration: 1.1 }, 0.6)
        .from(`.${styles.ring}`, { opacity: 0, scale: 0.85, duration: 1.2 }, 0.7)
        .from(".inner-chip", { scale: 0, opacity: 0, duration: 0.7, ease: "back.out(1.8)", stagger: 0.1 }, 1.1);
    }

    // --- Icon chips drift on their own pivot (same language as the home hero) ---
    gsap.utils.toArray<HTMLElement>(".inner-chip").forEach((chip, i) => {
      gsap.to(chip, {
        y: gsap.utils.random(-12, 12),
        x: gsap.utils.random(-8, 8),
        rotation: gsap.utils.random(-7, 7),
        duration: gsap.utils.random(2.4, 3.8),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.3 + i * 0.15,
      });
    });

    // --- Ghost word sinks gently against the scroll ---
    gsap.to(`.${styles.ghost}`, {
      yPercent: 25,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.heroSection}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.ghost} aria-hidden="true">{ghost}</div>

      <div className={`${styles.container} ${(placeholderLabel || imageSrc) ? "" : styles.containerSolo}`}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            <Asterisk /> {eyebrow}
          </span>

          <h1 className={styles.title}>
            <span className={styles.lineMask}>
              <span className={`${styles.line} inner-line-inner`}>{titleTop}</span>
            </span>
            {titleBottom && (
              <span className={styles.lineMask}>
                <span className={`${styles.line} inner-line-inner`}>
                  <span className={styles.lineOutline}>{titleBottom}</span>
                </span>
              </span>
            )}
          </h1>

          {desc && <p className={styles.desc}>{desc}</p>}
        </div>

        {(placeholderLabel || imageSrc) && (
          <div className={styles.visual}>
            <div className={styles.ring} aria-hidden="true" />
            <div className={styles.frame}>
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt || ""}
                  fill
                  className={styles.frameImage}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                />
              ) : (
                <GreyPlaceholder label={placeholderLabel || ""} />
              )}
            </div>

            <span className={`${styles.chip} inner-chip ${styles.chip1}`} aria-hidden="true">
              <svg {...iconProps}>
                <path d="M8 21h8" /><path d="M12 17v4" />
                <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
                <path d="M7 6H4.5A1.5 1.5 0 0 0 3 7.5C3 9.4 4.6 11 6.5 11H7" />
                <path d="M17 6h2.5A1.5 1.5 0 0 1 21 7.5C21 9.4 19.4 11 17.5 11H17" />
              </svg>
            </span>
            <span className={`${styles.chip} inner-chip ${styles.chip2}`} aria-hidden="true">
              <svg {...iconProps}>
                <circle cx="12" cy="13.5" r="7.5" />
                <path d="M12 9.5v4l2.5 2.5" />
                <path d="M9.5 2.5h5" />
              </svg>
            </span>
            <span className={`${styles.chip} inner-chip ${styles.chip3}`} aria-hidden="true">
              <svg {...iconProps}>
                <path d="m3 11 14-5v12L3 13v-2z" />
                <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
