"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./BlogGridSection.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image: string;
  publishedAt: Date;
}

export default function BlogGridSection({ posts }: { posts: Post[] }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".blog-card-anim",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.blogSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post.id} className={`${styles.card} blog-card-anim`}>
              <div className={styles.imageWrapper}>
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className={styles.image}
                  />
                </Link>
              </div>
              <div className={styles.content}>
                <p className={styles.date}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                <h2 className={styles.postTitle}>
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                  Read Article
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No blog posts found.</p>
        )}
      </div>
    </section>
  );
}
