"use client";

import React, { useState, useEffect } from 'react';
import { getLenis } from '@/lib/lenis';

interface VideoModalProps {
  videoId: string; // YouTube video ID, e.g., 'Y-x0efG1seA'
  children: React.ReactNode;
}

export default function VideoModal({ videoId, children }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    const lenis = getLenis();
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={openModal} style={{ cursor: 'pointer' }}>
        {children}
      </div>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer'
        }} onClick={closeModal}>
          
          <button 
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '40px',
              cursor: 'pointer',
              zIndex: 10000
            }}
          >
            &times;
          </button>

          <div 
            style={{ width: '80%', maxWidth: '1000px', aspectRatio: '16/9' }} 
            onClick={(e) => e.stopPropagation()} // Prevent clicking video from closing modal
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
