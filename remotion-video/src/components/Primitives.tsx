import { interpolate, Easing, useCurrentFrame } from 'remotion';
import React from 'react';

// 1. Premium bottom caption system with backdrop blur and smooth fade transitions
export const Caption = ({ text, duration }: { text: string; duration: number }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 15, duration - 15, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        opacity,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          padding: '14px 28px',
          borderRadius: '20px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
          fontSize: '24px',
          fontWeight: 500,
          fontFamily: 'Inter, system-ui, sans-serif',
          textAlign: 'center',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
          maxWidth: '80%',
        }}
      >
        {text}
      </div>
    </div>
  );
};

// 2. Realistic cursor pointer with wave ripples on click
export const Cursor = ({
  x,
  y,
  clicking = false,
}: {
  x: number;
  y: number;
  clicking?: boolean;
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        zIndex: 10000,
        pointerEvents: 'none',
        transform: 'translate(-2px, -2px)',
      }}
    >
      {/* CSS Keyframes injected inline */}
      <style>{`
        @keyframes pingClick {
          0% {
            transform: scale(0.3);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>

      {clicking && (
        <div
          style={{
            position: 'absolute',
            top: -24,
            left: -24,
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: '3px solid #3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            animation: 'pingClick 0.4s ease-out forwards',
          }}
        />
      )}
      <div
        style={{
          transform: clicking ? 'scale(0.85)' : 'scale(1)',
          transition: 'transform 0.08s ease',
          filter: 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.25))',
        }}
      >
        {/* Modern styled cursor SVG */}
        <svg
          width="28"
          height="32"
          viewBox="0 0 28 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.12 1.34L25.8 24.02C26.58 24.8 26.12 26.14 25.02 26.28L15.34 27.52L10.14 31.66C9.36 32.28 8.16 31.72 8.16 30.72V21.16L1.12 14.12C0.12 13.12 0.68 11.42 2.02 11.16L12.02 9.16L3.12 1.34Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.54 3.46L23.68 22.6L14.7 23.74L8.76 28.48V20.12L2.76 14.12L12.02 12.26L4.54 3.46Z"
            fill="#0f172a"
          />
        </svg>
      </div>
    </div>
  );
};

// 3. Sweeping highlight effect for text selection
export const TextHighlight = ({
  frame,
  startFrame,
  duration,
  color = 'rgba(254, 240, 138, 0.6)', // default Sunny Yellow
  children,
}: {
  frame: number;
  startFrame: number;
  duration: number;
  color?: string;
  children: React.ReactNode;
}) => {
  const progress = Math.max(0, Math.min(1, (frame - startFrame) / duration));
  const easedProgress = Easing.out(Easing.quad)(progress);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span
        style={{
          width: `${easedProgress * 100}%`,
          backgroundColor: color,
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          zIndex: 0,
          borderRadius: '4px',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </span>
  );
};
