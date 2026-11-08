import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Site-standard motion tokens — one language, varied choreography. */
export const MOTION = {
  ease: "expo.out",
  easeSoft: "power3.out",
  duration: 1,
  durationSlow: 1.3,
} as const;

/** True when the user prefers reduced motion — skip entrance animations. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

interface ScrollRevealOptions {
  /** Element that triggers the reveal (usually the section root). */
  trigger: Element | null;
  /** Viewport start position, e.g. "top 80%". */
  start?: string;
  /** Stagger between targets. */
  stagger?: number;
  /** Extra gsap.from vars (merged over the defaults). */
  from?: gsap.TweenVars;
}

/**
 * Standard scroll-triggered reveal: rise + fade with the site easing.
 * Uses fromTo with explicit end values — a plain gsap.from records the
 * element's current state as its end state, so if a prior (reverted)
 * tween already applied the from-state, the reveal completes INTO
 * hidden and the content never appears.
 */
export function scrollReveal(targets: gsap.TweenTarget, options: ScrollRevealOptions) {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    targets,
    { y: 56, x: 0, scale: 1, opacity: 0, ...options.from },
    {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      duration: MOTION.duration,
      ease: MOTION.ease,
      stagger: options.stagger ?? 0.1,
      scrollTrigger: {
        trigger: options.trigger,
        start: options.start ?? "top 80%",
      },
    }
  );
}

/**
 * Masked line reveal for headlines: targets slide up inside an
 * overflow-hidden wrapper. Expects the same targets to be the inner spans.
 * fromTo for the same reason as scrollReveal — explicit end state.
 */
export function lineReveal(targets: gsap.TweenTarget, options: ScrollRevealOptions) {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    targets,
    { yPercent: 115, ...options.from },
    {
      yPercent: 0,
      duration: MOTION.durationSlow,
      ease: MOTION.ease,
      stagger: options.stagger ?? 0.12,
      scrollTrigger: {
        trigger: options.trigger,
        start: options.start ?? "top 80%",
      },
    }
  );
}

/**
 * Slow scrub drift for decorative background shapes — gives sections
 * depth without stealing focus.
 */
export function scrubDrift(
  target: gsap.TweenTarget,
  options: { trigger: Element | null; y?: number; rotate?: number }
) {
  if (prefersReducedMotion()) return;

  gsap.to(target, {
    y: options.y ?? -60,
    rotate: options.rotate ?? 0,
    ease: "none",
    scrollTrigger: {
      trigger: options.trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}
