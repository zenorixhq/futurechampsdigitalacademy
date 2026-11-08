"use client";
import GreyPlaceholder from "@/components/common/GreyPlaceholder";

import React, { useRef } from "react";
import Link from "next/link";
import styles from "./EditorialCTASection.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

interface EditorialCTASectionProps {
  imageSrc?: string | null;
}

export default function EditorialCTASection({ imageSrc }: EditorialCTASectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".cta-anim", 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          <div className={styles.contentCol}>
            <h2 className={`${styles.title} cta-anim`}>
              Build your career <br/>
              <span className={styles.titleHighlight}>behind the game.</span>
            </h2>
            <div className="cta-anim">
              <Link href="/course" className={styles.ctaLink}>
                Explore our courses 
                <span className={styles.arrow}>→</span>
              </Link>
            </div>
          </div>

          <div className={`${styles.imageCol} cta-anim`}>
            <div className={styles.imageWrapper}>
              {imageSrc ? (
                <Image src={imageSrc} alt="Students On The Field" fill style={{ objectFit: 'cover' }} />
              ) : (
                <GreyPlaceholder label="Students On The Field" />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
