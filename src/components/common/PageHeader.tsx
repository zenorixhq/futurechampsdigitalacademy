"use client";

import React, { useRef } from "react";
import styles from "./PageHeader.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".page-header-anim", 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.1
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.pageHeader}>
      <div className={styles.container}>
        <div className="page-header-anim">
          <h2 className={styles.subtitle}>{subtitle}</h2>
        </div>
        <div className="page-header-anim">
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>
    </section>
  );
}
