"use client";

import React, { useRef } from "react";
import styles from "./LeadershipSection.module.css";
import { useGSAP } from "@gsap/react";
import { scrollReveal } from "@/lib/motion";
import Asterisk from "@/components/common/Asterisk";
import GreyPlaceholder from "@/components/common/GreyPlaceholder";
import Image from "next/image";

const leaders = [
  { name: "Praveen Raman", role: "Founder" },
  { name: "Regin C", role: "Co-Founder" },
  { name: "Sayandh T M", role: "CEO, Academic Director" },
];

export interface TeamMember {
  name: string;
  role: string;
  /** Real photo URL; falls back to the grey placeholder when absent */
  photo?: string | null;
}

interface LeadershipSectionProps {
  eyebrow?: string;
  title?: string;
  members?: TeamMember[];
}

export default function LeadershipSection({
  eyebrow = "The Leadership",
  title = "Meet Our Team",
  members = leaders,
}: LeadershipSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    scrollReveal(".leadership-header-anim", { trigger: containerRef.current });

    scrollReveal(".leadership-card-anim", {
      trigger: containerRef.current,
      start: "top 75%",
      stagger: 0.15,
      from: { y: 70 },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} leadership-header-anim`}>
          <span className={styles.eyebrow}>
            <Asterisk /> {eyebrow}
          </span>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <div className={`${styles.grid} ${members.length === 4 ? styles.grid4 : ""}`}>
          {members.map((leader) => (
            <article key={leader.name} className={`${styles.card} leadership-card-anim`}>
              <div className={styles.portrait}>
                {leader.photo ? (
                  <Image
                    src={leader.photo}
                    alt={`${leader.name} photo`}
                    fill
                    className={styles.portraitImage}
                    sizes="(max-width: 767px) 100vw, 33vw"
                  />
                ) : (
                  <GreyPlaceholder label={`${leader.name} Photo`} />
                )}
              </div>
              <h3 className={styles.name}>{leader.name}</h3>
              <p className={styles.role}>{leader.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
