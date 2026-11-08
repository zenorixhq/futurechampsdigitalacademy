"use client";

import React, { useRef } from "react";
import Image from "next/image";
import styles from "./FacultyPreviewSection.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Asterisk from "@/components/common/Asterisk";

export default function FacultyPreviewSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".faculty-anim", 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, { scope: containerRef });

  const faculty = [
    { name: "Sarah Jenkins", role: "Head of Digital Media", desc: "Former Marketing Director at Arsenal FC.", img: "/assets/images/editorial/photo_3.jpg" },
    { name: "David Russo", role: "Lead Broadcaster", desc: "20 years of experience producing live ISL matches.", img: "/assets/images/editorial/photo_4.jpg" },
    { name: "Elena Rostova", role: "Strategy Consultant", desc: "Specializes in athlete personal branding and PR.", img: "/assets/images/editorial/photo_5.jpg" }
  ];

  return (
    <section ref={containerRef} className={styles.facultySection}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <span className={`${styles.eyebrow} faculty-anim`}>
            <Asterisk /> THE FACULTY
          </span>
          <h2 className={`${styles.title} faculty-anim`}>Meet the people teaching it.</h2>
        </div>

        <div className={styles.grid}>
          {faculty.map((member, idx) => (
            <div key={idx} className={`${styles.memberBlock} faculty-anim`}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={member.img} 
                  alt={member.name} 
                  fill
                  className={styles.image}
                />
              </div>
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
              <p className={styles.desc}>{member.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
