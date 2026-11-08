"use client";

import React, { useRef } from "react";
import styles from "./HowItWorkSection.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MOTION, prefersReducedMotion, scrollReveal } from "@/lib/motion";
import Asterisk from "@/components/common/Asterisk";

export default function HowItWorkSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    scrollReveal(".process-anim", {
      trigger: containerRef.current,
      start: "top 75%",
      stagger: 0.1,
    });

    if (prefersReducedMotion()) return;

    // Each step row wipes open from the left edge as it enters
    gsap.fromTo(".step-anim",
      {
        clipPath: "inset(0% 100% 0% 0%)",
        x: -32,
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        x: 0,
        duration: MOTION.durationSlow,
        ease: MOTION.ease,
        stagger: 0.14,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
        },
      }
    );
  }, { scope: containerRef });

  const steps = [
    {
      phase: "Sports Marketing Fundamentals",
      description: "Classroom instruction on digital strategy, asset valuation, and club operations.",
    },
    {
      phase: "Matchday Simulation & Drills",
      description: "Hands-on training covering matchday media operations, press release drafting, live commentary, and sideline video production.",
    },
    {
      phase: "Official Stadium Internship",
      description: "Real-world execution at an official Super League Kerala match, working alongside professional broadcasters and club media teams.",
    }
  ];

  return (
    <section ref={containerRef} className={styles.howItWorkSection}>
      <div className={styles.container}>
        
        <div className={styles.headerRow}>
          <span className={`${styles.eyebrow} process-anim`}>
            <Asterisk /> THE PROCESS
          </span>
          <h2 className={`${styles.title} process-anim`}>Our proven pathway to success</h2>
          <p className={`${styles.desc} process-anim`}>
            A structured 3-step practical pathway taking you from classroom fundamentals to live stadium matchday execution.
          </p>
        </div>

        <div className={styles.stepsList}>
          {steps.map((step, index) => (
            <div key={index} className={`${styles.stepItem} step-anim`}>
              <div className={styles.stepHoverBg}></div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.phase}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
              <div className={styles.stepNumber}>0{index + 1}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
