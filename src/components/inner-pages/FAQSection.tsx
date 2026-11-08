"use client";

import React, { useState, useRef } from "react";
import styles from "./FAQSection.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Asterisk from "@/components/common/Asterisk";

export default function FAQSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".faq-anim", 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, { scope: containerRef });

  const faqs = [
    {
      question: "Who is this diploma for?",
      answer: "This program is designed for aspiring sports media professionals, current marketing students, or content creators who want to specialize in the sports industry."
    },
    {
      question: "Do I need prior experience in sports marketing?",
      answer: "No prior experience is required, though a passion for sports and a basic understanding of digital platforms is highly recommended."
    },
    {
      question: "Will I get to work with Kannur Warriors FC?",
      answer: "Yes, the stadium internship phase involves working directly with the media team of Kannur Warriors FC during official Super League Kerala matches."
    },
    {
      question: "What equipment do I need?",
      answer: "Students are expected to have their own laptop and smartphone. All specialized broadcasting and media equipment will be provided during the practical sessions."
    },
    {
      question: "Is there job placement assistance?",
      answer: "Yes, our career outcomes team actively connects top graduates with sports clubs, leagues, and digital agencies across our extensive network."
    }
  ];

  return (
    <section ref={containerRef} className={styles.faqSection}>
      <div className={styles.container}>
        
        <div className={styles.grid}>
          <div className={styles.headerCol}>
            <span className={`${styles.eyebrow} faq-anim`}>
              <Asterisk /> FREQUENTLY ASKED
            </span>
            <h2 className={`${styles.title} faq-anim`}>Got questions?</h2>
            <p className={`${styles.desc} faq-anim`}>
              Find answers to the most common questions about the diploma program.
            </p>
          </div>

          <div className={styles.accordionCol}>
            <div className={styles.accordionWrapper}>
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.accordionItem} ${openIndex === idx ? styles.active : ''} faq-anim`}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <div className={styles.accordionHeader}>
                    <h3 className={styles.accordionTitle}>{faq.question}</h3>
                    <div className={styles.icon}>
                      {openIndex === idx ? '-' : '+'}
                    </div>
                  </div>
                  <div 
                    className={styles.accordionContent}
                    style={{ 
                      maxHeight: openIndex === idx ? "200px" : "0px",
                      paddingTop: openIndex === idx ? "20px" : "0px",
                      opacity: openIndex === idx ? 1 : 0
                    }}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
