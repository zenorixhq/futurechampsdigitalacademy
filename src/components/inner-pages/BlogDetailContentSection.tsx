"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./BlogDetailContentSection.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BlogDetailContentSection({ image, content }: { image: string, content: string }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".content-anim",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.contentSection}>
      <div className={styles.container}>
        <div className={`content-anim ${styles.featuredImageWrapper}`}>
          <Image
            src={image}
            alt="Article Featured Image"
            fill
            priority
            className={styles.featuredImage}
          />
        </div>

        <div className={`content-anim ${styles.contentBody}`}>
          <p>{content}</p>
        </div>

        <Link href="/blog" className={`content-anim ${styles.backLink}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Blog
        </Link>
      </div>
    </section>
  );
}
