"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* 1. Logo Column (20%) */}
        <div className={styles.logoColumn}>
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logoLink}>
              <Image 
                src="/assets/img/logo.png" 
                alt="Site Logo" 
                width={240} 
                height={60} 
                priority 
                className={styles.headerLogo}
              />
            </Link>
          </div>
        </div>

        {/* 2. Navigation Menu Column (60%) */}
        <div className={styles.navColumn}>
          {/* Desktop Nav */}
          <nav className={styles.navbar}>
            <div className={styles.navItem}>
              <Link href="/about" className={styles.navLink}>About</Link>
            </div>
            <div className={styles.navItem}>
              <Link href="/course" className={styles.navLink}>Courses</Link>
            </div>
            <div className={styles.navItem}>
              <Link href="/faculty" className={styles.navLink}>Faculty</Link>
            </div>
            <div className={styles.navItem}>
              <Link href="/placements" className={styles.navLink}>Placements</Link>
            </div>
            <div className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>Contact</Link>
            </div>
          </nav>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            className={styles.hamburgerBtn}
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>

        {/* 3. CTA Column */}
        <div className={styles.ctaColumn}>
          <a href="https://futurechampsgroup.com/" target="_blank" rel="noopener noreferrer" className={styles.navLink} style={{fontSize: '12px', borderBottom: '1px solid var(--color-accent)'}}>
            Visit Football Academy ↗
          </a>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`${styles.sidebarOverlay} ${isMobileMenuOpen ? styles.active : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
      <div className={`${styles.sidebarContainer} ${isMobileMenuOpen ? styles.active : ''}`}>
        <button className={styles.sidebarClose} onClick={() => setMobileMenuOpen(false)}>
          &#x2715;
        </button>
        
        <div className={styles.mobileNavLinks}>
          <Link href="/" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            <span className={styles.mobileNavIndex}>01</span> Home
          </Link>
          <Link href="/about" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            <span className={styles.mobileNavIndex}>02</span> About Us
          </Link>
          <Link href="/course" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            <span className={styles.mobileNavIndex}>03</span> Curriculum
          </Link>
          <Link href="/faculty" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            <span className={styles.mobileNavIndex}>04</span> Faculty
          </Link>
          <Link href="/placements" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            <span className={styles.mobileNavIndex}>05</span> Placements
          </Link>
          <Link href="/contact" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            <span className={styles.mobileNavIndex}>06</span> Contact
          </Link>
        </div>

        <div className={styles.mobileCtaWrapper}>
          <a href="https://futurechampsgroup.com/" target="_blank" rel="noopener noreferrer" className={styles.ctaButton} style={{marginTop: '40px'}}>
            Visit Football Academy ↗
          </a>
        </div>
      </div>
    </header>
  );
}
