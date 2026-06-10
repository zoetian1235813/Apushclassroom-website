import { spring, interpolate, Easing, useCurrentFrame, AbsoluteFill } from 'remotion';
import React from 'react';
import { Cursor, Caption } from '../components/Primitives';

export const Scene2_Study = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const duration = 210; // 7 seconds

  // 1. Camera Zoom Entry Spring
  const zoomScale = interpolate(
    spring({ frame, fps, config: { damping: 14 } }),
    [0, 1],
    [0.97, 1]
  );

  // 2. Typewriter animation for Study Notes
  const fullText = "The Columbian Exchange was the widespread transfer of plants, animals, culture, human populations, technology, diseases, and ideas between the Americas, West Africa, and the Old World in the 15th and 16th centuries. It fundamentally reshaped the global ecosystem and societies.";
  const typedLength = Math.min(
    Math.floor(interpolate(frame, [20, 110], [0, fullText.length], { extrapolateRight: 'clamp' })),
    fullText.length
  );
  const displayedText = fullText.substring(0, typedLength);

  // 3. Bullet points fade in
  const opacityBullet1 = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const opacityBullet2 = interpolate(frame, [120, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const opacityBullet3 = interpolate(frame, [140, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 4. Cursor movement
  // Starts at the button position from Scene 1: (450, 690)
  // Moves to the next button "完成并进入练习" at the bottom right: (1120, 780)
  const mouseX = interpolate(
    frame,
    [0, 30, 160, 180, 200, 210],
    [450, 450, 1100, 1100, 1100, 1100],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
  );
  const mouseY = interpolate(
    frame,
    [0, 30, 160, 180, 200, 210],
    [690, 690, 800, 800, 800, 800],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
  );

  // Hover & Click states for bottom button
  const isHoverButton = frame >= 180 && frame < 210;
  const isClickingButton = frame >= 200 && frame < 210;

  const buttonScale = isClickingButton ? 0.96 : isHoverButton ? 1.04 : 1;
  const buttonBg = isHoverButton ? '#1d4ed8' : '#2563eb';

  return (
    <AbsoluteFill style={{ transform: `scale(${zoomScale})`, backgroundColor: '#fcfbf9' }}>
      
      {/* Sidebar - Topic navigation listing */}
      <div style={{ display: 'flex', height: '100%' }}>
        <aside
          style={{
            width: '320px',
            borderRight: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '1px' }}>
              UNIT 1 TOPICS
            </span>
            <div style={{ padding: '8px 12px', borderRadius: '8px', color: '#475569', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅</span>
              <span>1.1 Contextualizing Period 1</span>
            </div>
            <div style={{ padding: '8px 12px', borderRadius: '8px', color: '#475569', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅</span>
              <span>1.2 Native American Societies</span>
            </div>
            <div style={{ padding: '8px 12px', borderRadius: '8px', color: '#475569', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅</span>
              <span>1.3 European Exploration</span>
            </div>
            <div style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📝</span>
              <span>1.4 Columbian Exchange</span>
            </div>
          </div>
        </aside>

        {/* Notes Content Section */}
        <main style={{ flex: 1, padding: '48px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          {/* Breadcrumb */}
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>
            Unit 1 / Topic 1.4 / Study Notes
          </div>

          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#1e293b', marginBottom: '24px' }}>
            Columbian Exchange: The Great Conflux
          </h2>

          {/* Typewriting Notes Content Block */}
          <div
            style={{
              padding: '24px',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              minHeight: '130px',
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#334155',
              fontFamily: 'JetBrains Mono, monospace',
              marginBottom: '32px',
            }}
          >
            {displayedText}
            {typedLength < fullText.length && (
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '15px',
                  backgroundColor: '#2563eb',
                  marginLeft: '4px',
                  animation: 'blink 0.8s infinite',
                }}
              />
            )}
          </div>

          {/* Bullet cards fading in */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: 'auto' }}>
            
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '20px',
                opacity: opacityBullet1,
                transform: `translateY(${interpolate(opacityBullet1, [0, 1], [15, 0])}px)`,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌽</div>
              <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>Crops Exchange</h4>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4, margin: 0 }}>
                Maize, potatoes, tomatoes, and cassava introduced to Europe and Asia, boosting global populations.
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '20px',
                opacity: opacityBullet2,
                transform: `translateY(${interpolate(opacityBullet2, [0, 1], [15, 0])}px)`,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🐎</div>
              <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>Animals Introduced</h4>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4, margin: 0 }}>
                Horses, pigs, cattle, and sheep introduced to the Americas, transforming Indigenous culture and economics.
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '20px',
                opacity: opacityBullet3,
                transform: `translateY(${interpolate(opacityBullet3, [0, 1], [15, 0])}px)`,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🦠</div>
              <h4 style={{ fontWeight: 700, color: '#e11d48', marginBottom: '4px' }}>Disease Impact</h4>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4, margin: 0 }}>
                Smallpox, measles, and influenza devastated Native populations, with mortality rates reaching up to 90%.
              </p>
            </div>
          </div>

          {/* Complete Study Button */}
          <div
            style={{
              alignSelf: 'flex-end',
              backgroundColor: buttonBg,
              color: '#ffffff',
              fontWeight: 700,
              padding: '16px 36px',
              borderRadius: '20px',
              boxShadow: '0 8px 16px -4px rgba(37, 99, 235, 0.4)',
              cursor: 'pointer',
              transform: `scale(${buttonScale})`,
              transition: 'all 0.1s ease',
              marginTop: '24px',
            }}
          >
            完成学习，进入练习 &rarr;
          </div>
        </main>
      </div>

      {/* Global Virtual Actors */}
      <Cursor x={mouseX} y={mouseY} clicking={isClickingButton} />
      
      <Caption
        text={
          frame < 120
            ? '系统提供高频考点笔记与速记卡片，完美覆盖大纲细则。'
            : '通读完毕后，点击右下角“完成学习”，自动流转至课后训练。'
        }
        duration={duration}
      />
    </AbsoluteFill>
  );
};
