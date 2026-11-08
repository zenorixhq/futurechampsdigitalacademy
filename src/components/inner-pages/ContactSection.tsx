"use client";

import React, { useRef, useActionState } from "react";
import styles from "@/app/contact/Contact.module.css";
import { useGSAP } from "@gsap/react";
import { scrollReveal } from "@/lib/motion";
import { submitEnquiry } from "@/app/contact/actions";

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    async (prev: Awaited<ReturnType<typeof submitEnquiry>>, formData: FormData) => {
      const result = await submitEnquiry(prev, formData);
      if (result?.success) formRef.current?.reset();
      return result;
    },
    undefined
  );

  useGSAP(() => {
    scrollReveal(".contact-anim", {
      trigger: containerRef.current,
      start: "top 85%",
      stagger: 0.15,
      from: { y: 30 },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* Contact Info */}
          <div className={`${styles.infoCol} contact-anim`}>
            <h3 className={styles.heading}>We&apos;d love to hear from you.</h3>
            <p className={styles.desc}>
              Whether you have a question about the diploma, admissions, or our partnership with Kannur Warriors FC, our team is ready to answer all your questions.
            </p>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iconBox}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Kerala, India</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconBox}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h4>Call / WhatsApp</h4>
                  <p><a href="https://wa.me/917907785757" target="_blank" rel="noopener noreferrer">+91 790 778 57 57</a></p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconBox}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-10 6L2 7"/>
                  </svg>
                </div>
                <div>
                  <h4>Email Us</h4>
                  <p><a href="mailto:futurechampsdigitalacademy@gmail.com">futurechampsdigitalacademy@gmail.com</a></p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconBox}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <div>
                  <h4>Website</h4>
                  <p><a href="https://futurechampsdigitalacademy.com" target="_blank" rel="noopener noreferrer">futurechampsdigitalacademy.com</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${styles.formCol} contact-anim`}>
            <form ref={formRef} action={formAction} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <input type="text" name="name" placeholder="Your Name" required className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <input type="email" name="email" placeholder="Your Email" required className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <input type="tel" name="phone" placeholder="Phone Number" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <textarea name="message" placeholder="How can we help you?" required className={styles.textarea}></textarea>
              </div>
              {state?.error && <p className={styles.formError}>{state.error}</p>}
              {state?.success && <p className={styles.formSuccess}>Thanks! We&apos;ll get back to you soon.</p>}
              <div className={styles.submitBtn}>
                <button type="submit" className="btn-primary" disabled={pending}>
                  {pending ? "Sending…" : "Send Message ↗"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
