"use client";

import React, { useRef } from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { scrollReveal } from "@/lib/motion";

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    scrollReveal(".footer-anim", {
      trigger: containerRef.current,
      start: "top 85%",
      stagger: 0.1,
    });
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className={styles.footer}>
      <div className={styles.container}>
        
        {/* Top Section */}
        <div className={styles.topSection}>
          
          <div className={`${styles.ctaCol} footer-anim`}>
            <h2 className={styles.ctaTitle}>
              Let&apos;s achieve sports<br/>
              <span className={styles.accentText}>excellence</span>
            </h2>
            <form className={styles.subscribeBox} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter Your Email" className={styles.emailInput} required />
              <button type="submit" className={styles.sendBtn} aria-label="Subscribe">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
            <div className={styles.directContactInfo}>
              <a href="tel:917907785757">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: '-2px' }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +91 790 778 57 57
              </a>
              <a href="mailto:futurechampsdigitalacademy@gmail.com">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: '-2px' }}>
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-10 6L2 7"/>
                </svg>
                futurechampsdigitalacademy@gmail.com
              </a>
            </div>
          </div>

          <div className={`${styles.linksGrid} footer-anim`}>
            
            <div className={styles.linksCol}>
              <h4 className={styles.linkTitle}>Quick Link <span className={styles.dot}></span></h4>
              <Link href="/">Home</Link>
              <Link href="/about">About us</Link>
              <Link href="/course">Courses</Link>
              <Link href="/faculty">Faculty</Link>
            </div>

            <div className={styles.linksCol}>
              <h4 className={styles.linkTitle}>Explore</h4>
              <Link href="/placements">Placements</Link>
              <Link href="/blog">Our Blog</Link>
              <Link href="#">News & Media</Link>
            </div>

            <div className={styles.linksCol}>
              <h4 className={styles.linkTitle}>Support</h4>
              <Link href="/contact">Help</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms & Conditions</Link>
              <Link href="/contact">Contact Us</Link>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`${styles.bottomBar} footer-anim`}>
          <p className={styles.copyright}>Copyright © {new Date().getFullYear()} Future Champs. All rights reserved.</p>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialPill} aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              Facebook
            </a>
            <a href="#" className={styles.socialPill} aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              Instagram
            </a>
            <a href="#" className={styles.socialPill} aria-label="Twitter">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
              </svg>
              Twitter
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
