import React from "react";
import styles from "./GreyPlaceholder.module.css";

interface GreyPlaceholderProps {
  label: string;
  className?: string;
}

/**
 * Intentional empty-state block: grey panel with a centered label.
 * Used wherever real photography is still pending from the client.
 */
export default function GreyPlaceholder({ label, className }: GreyPlaceholderProps) {
  return (
    <div className={`${styles.placeholder} ${className ?? ""}`} aria-hidden="true">
      <span className={styles.label}>{label}</span>
    </div>
  );
}
