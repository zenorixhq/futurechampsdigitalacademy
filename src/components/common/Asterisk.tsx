import React from 'react';

export default function Asterisk({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="18" height="18" viewBox="0 0 24 24" fill="none" 
      stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
      style={{ marginRight: '10px', display: 'inline-block', verticalAlign: 'middle', transform: 'translateY(-2px)' }}
    >
      <path d="M12 2v20M4.33 7.5l15.34 8.86M4.33 16.5l15.34-8.86"/>
    </svg>
  );
}
