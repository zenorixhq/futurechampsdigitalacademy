import React from "react";
import styles from "./LatestNewsSection.module.css";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import LatestNewsReveal from "./LatestNewsReveal";

export default async function LatestNewsSection() {
  const posts = await prisma.post.findMany({
    where: {
      showOnHome: true,
    },
    orderBy: [
      { homeOrder: 'asc' },
      { publishedAt: 'desc' }
    ],
    take: 3,
  });

  return (
    <section className={styles.latestNewsSection}>
      <div className={styles.container}>
        
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.titleColumn}>
            <h2 className={styles.sectionSubtitle}>LATEST NEWS</h2>
            <h2 className={styles.sectionTitle}>Insights on digital innovation and growth</h2>
          </div>
          <div className={styles.descColumn}>
            <p className={styles.description}>
              Explore the latest trends, strategies, and tools driving digital innovation and helping businesses thrive in a rapidly evolving digital landscape.
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <LatestNewsReveal className={styles.postsGrid}>
          {posts.map(post => (
            <div key={post.id} className={styles.postCard}>
              {post.image ? (
                <Link href={`/blog/${post.slug}`} className={styles.postImageWrapper}>
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    width={400}
                    height={300}
                    className={styles.postImage}
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              ) : (
                <div className={styles.postImagePlaceholder} />
              )}
              
              <div className={styles.postBody}>
                <h3 className={styles.postTitle}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <div className={styles.buttonWrapper}>
                  <Link href={`/blog/${post.slug}`} className={styles.readMoreButton}>
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </LatestNewsReveal>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <Link href="/blog" className="btn-primary">
            View All Posts
          </Link>
        </div>

      </div>
    </section>
  );
}
