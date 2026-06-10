import { spring, interpolate, useCurrentFrame, AbsoluteFill } from 'remotion';
import React from 'react';
import { Caption } from '../components/Primitives';

export const Scene4_Outro = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const duration = 150; // 5 seconds

  // Logo spring animation
  const logoSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Features list item opacities
  const op1 = interpolate(spring({ frame: frame - 45, fps, config: { damping: 15 } }), [0, 1], [0, 1]);
  const op2 = interpolate(spring({ frame: frame - 55, fps, config: { damping: 15 } }), [0, 1], [0, 1]);
  const op3 = interpolate(spring({ frame: frame - 65, fps, config: { damping: 15 } }), [0, 1], [0, 1]);

  // CTA Button spring
  const buttonSpring = spring({
    frame: frame - 85,
    fps,
    config: { damping: 10, stiffness: 100 },
  });
  const buttonScale = interpolate(buttonSpring, [0, 1], [0.8, 1]);
  const buttonOpacity = interpolate(buttonSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0b0f19 0%, #1e1b4b 100%)',
        fontFamily: 'Inter, system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blurred background shapes */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
        }}
      />

      {/* Main Outro Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        {/* Logo Icon Mockup */}
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            boxShadow: '0 8px 30px rgba(99, 102, 241, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            marginBottom: '24px',
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          🇺🇸
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: '48px',
            fontWeight: 900,
            background: 'linear-gradient(90deg, #60a5fa, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 8px 0',
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          APUSH Learning Site
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '20px',
            fontWeight: 500,
            color: '#94a3b8',
            margin: '0 0 40px 0',
            maxWidth: '560px',
            lineHeight: 1.5,
            opacity: logoOpacity,
          }}
        >
          Unlock your 5-Score in AP United States History
        </p>

        {/* Key Selling Features checklist */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '48px',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '18px',
              fontWeight: 600,
              color: '#cbd5e1',
              opacity: op1,
              transform: `translateX(${interpolate(op1, [0, 1], [-20, 0])}px)`,
            }}
          >
            <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
            <span>Structured Study Flow covering all 9 College Board Units</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '18px',
              fontWeight: 600,
              color: '#cbd5e1',
              opacity: op2,
              transform: `translateX(${interpolate(op2, [0, 1], [-20, 0])}px)`,
            }}
          >
            <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
            <span>Interactive MCQs, SAQs with instant CB-style grading feedback</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '18px',
              fontWeight: 600,
              color: '#cbd5e1',
              opacity: op3,
              transform: `translateX(${interpolate(op3, [0, 1], [-20, 0])}px)`,
            }}
          >
            <span style={{ color: '#10b981', fontSize: '20px' }}>✓</span>
            <span>Wrong Notebook & exam analytics to target improvement areas</span>
          </div>
        </div>

        {/* Action button */}
        <div
          style={{
            backgroundColor: '#ffffff',
            color: '#0f172a',
            fontSize: '18px',
            fontWeight: 800,
            padding: '18px 48px',
            borderRadius: '24px',
            boxShadow: '0 10px 30px rgba(255, 255, 255, 0.15), 0 0 40px rgba(99, 102, 241, 0.25)',
            cursor: 'pointer',
            opacity: buttonOpacity,
            transform: `scale(${buttonScale})`,
            transition: 'all 0.15s ease',
          }}
        >
          Start Studying for Free
        </div>
      </div>

      <Caption text="即刻注册 APUSH Study Suite，高效冲刺五分满分！" duration={duration} />
    </AbsoluteFill>
  );
};
