"use client";

import React, { useRef, useState } from "react";
import styles from "./FeaturesSection.module.css";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MOTION, prefersReducedMotion, scrollReveal } from "@/lib/motion";
import GreyPlaceholder from "@/components/common/GreyPlaceholder";

export interface PortfolioProject {
  id: string;
  title: string;
  categories: string[];
  image?: string | null;
  imageAlt?: string | null;
}

export default function FeaturesSection({ projects }: { projects: PortfolioProject[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filters = ["All", "Matchday Media", "Digital Marketing", "Club Marketing", "Broadcast Production"];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.categories.includes(activeFilter));

  useGSAP(() => {
    scrollReveal(`.${styles.headerRow} > *`, {
      trigger: containerRef.current,
      stagger: 0.12,
    });

    scrollReveal(`.${styles.filterItem}`, {
      trigger: containerRef.current,
      start: "top 75%",
      stagger: 0.06,
      from: { y: 24 },
    });

    if (prefersReducedMotion()) return;

    // Grid items scale-clip into view on first entry
    gsap.fromTo(`.${styles.portfolioItem}`,
      {
        y: 60,
        opacity: 0,
        clipPath: "inset(12% 12% 12% 12% round 20px)",
      },
      {
        y: 0,
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0% round 20px)",
        duration: MOTION.durationSlow,
        ease: MOTION.ease,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );
  }, { scope: containerRef });

  // Re-stagger grid items whenever the filter changes
  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    if (prefersReducedMotion() || !gridRef.current) return;
    requestAnimationFrame(() => {
      gsap.fromTo(gridRef.current!.children,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: MOTION.easeSoft, stagger: 0.06, overwrite: "auto" }
      );
    });
  };

  return (
    <section ref={containerRef} className={styles.featuresSection}>
      <div className={styles.container}>

        {/* Top Header Row for Portfolio */}
        <div className={styles.headerRow}>
          <div className={styles.titleColumn}>
            <h2 className={styles.sectionSubtitle}>PORTFOLIO</h2>
            <h2 className={styles.sectionTitle}>Our latest projects and case studies</h2>
          </div>
          <div className={styles.descColumn}>
            <p className={styles.description}>
              Explore our students&apos; work in real-world scenarios, from live matchday broadcasting to data-driven digital marketing campaigns for professional football clubs.
            </p>
          </div>
        </div>

        {/* Portfolio Filter */}
        <div className={styles.filterContainer}>
          <ul className={styles.filterList}>
            {filters.map(filter => (
              <li
                key={filter}
                className={`${styles.filterItem} ${activeFilter === filter ? styles.activeFilter : ''}`}
                onClick={() => handleFilter(filter)}
              >
                {filter}
              </li>
            ))}
          </ul>
        </div>

        {/* Portfolio Grid */}
        <div ref={gridRef} className={styles.portfolioGrid}>
          {filteredProjects.map(project => (
            <div key={project.id} className={styles.portfolioItem}>
              <div className={styles.portfolioImageWrapper}>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.imageAlt || project.title}
                    fill
                    className={styles.portfolioImage}
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                ) : (
                  <GreyPlaceholder label={project.title} className={styles.portfolioImage} />
                )}
                <div className={styles.portfolioOverlay}>
                  <div className={styles.portfolioCategories}>
                    {project.categories.map((cat, i) => (
                      <span key={i} className={styles.portfolioCategory}>{cat}</span>
                    ))}
                  </div>
                  <h3 className={styles.portfolioTitle}>{project.title}</h3>
                  <Link href="#" className={styles.portfolioArrow}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"/>
                      <polyline points="7 7 17 7 17 17"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
