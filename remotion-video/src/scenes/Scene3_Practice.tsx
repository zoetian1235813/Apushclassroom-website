import { spring, interpolate, Easing, useCurrentFrame, AbsoluteFill } from 'remotion';
import React from 'react';
import { Cursor, Caption, TextHighlight } from '../components/Primitives';

export const Scene3_Practice = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const duration = 300; // 10 seconds

  // Camera scale entry spring
  const zoomScale = interpolate(
    spring({ frame, fps, config: { damping: 14 } }),
    [0, 1],
    [0.98, 1]
  );

  // Text selection highlight timing: frame 30 to 100
  const isHighlightActive = frame >= 30;
  const highlightFrame = frame - 30;

  // Cursor coordinates
  // Start: (1120, 780) (previous button location)
  // Move to left text to highlight: (420, 360) -> arrives frame 35
  // Sweeps right to (680, 360) -> selection sweep, arrives frame 95
  // Moves to Option B: (910, 480) -> arrives frame 150
  // Clicks Option B -> frame 160
  // Moves to "Submit Answer" button: (940, 680) -> arrives frame 200
  // Clicks "Submit Answer" -> frame 210
  // Remains stable
  const mouseX = interpolate(
    frame,
    [0, 35, 95, 150, 160, 200, 210, 300],
    [1100, 380, 640, 900, 900, 940, 940, 940],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
  );
  const mouseY = interpolate(
    frame,
    [0, 35, 95, 150, 160, 200, 210, 300],
    [800, 340, 340, 485, 485, 685, 685, 685],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
  );

  const isClickingOption = frame >= 155 && frame < 165;
  const isClickingSubmit = frame >= 205 && frame < 215;

  // Option states
  const optionSelected = frame >= 160;
  const showFeedback = frame >= 210;

  // Option scale when clicked
  const optionBScale = frame >= 155 && frame < 165 ? 0.97 : frame >= 160 ? 1.02 : 1;
  const submitScale = frame >= 205 && frame < 215 ? 0.95 : frame >= 200 && frame < 215 ? 1.03 : 1;

  // Streak Counter Increment Animation (spring scale)
  const streakProgress = spring({
    frame: frame - 225,
    fps,
    config: { damping: 8, stiffness: 100 },
  });
  const streakScale = showFeedback
    ? interpolate(streakProgress, [0, 1], [1, 1.25])
    : 1;
  const streakText = frame >= 225 ? '1' : '0';

  // Feedback modal popup spring
  const feedbackSpring = spring({
    frame: frame - 210,
    fps,
    config: { damping: 12 },
  });
  const feedbackOpacity = interpolate(feedbackSpring, [0, 1], [0, 1]);
  const feedbackTranslateY = interpolate(feedbackSpring, [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{ transform: `scale(${zoomScale})`, backgroundColor: '#fcfbf9' }}>
      
      {/* Header toolbar */}
      <header
        style={{
          height: '76px',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'between',
          padding: '0 32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '12px', color: '#475569' }}>
            Section I
          </span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>
            Unit 1 Practice · topic 1.4
          </span>
        </div>

        {/* Timer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e2e8f0', padding: '6px 14px', borderRadius: '20px', fontSize: '14px', color: '#475569', fontWeight: 600 }}>
          ⏱️ 44:52
        </div>

        {/* Streak Counter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginLeft: 'auto',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Streak
          </span>
          <div
            style={{
              width: '38px',
              height: '38px',
              backgroundColor: '#fef3c7',
              border: '1px solid #fde68a',
              color: '#d97706',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '18px',
              transform: `scale(${streakScale})`,
            }}
          >
            {streakText}
          </div>
        </div>
      </header>

      {/* Main interactive practice canvas */}
      <div style={{ display: 'flex', flex: 1, height: 'calc(100% - 76px)' }}>
        
        {/* Left pane: Stimulus reading passage */}
        <div style={{ width: '50%', borderRight: '1px solid #e2e8f0', padding: '36px', backgroundColor: '#faf9f6', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '1px' }}>
              DIRECTIONS: READ PASSAGE
            </span>
          </div>

          <div
            style={{
              padding: '24px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              fontSize: '15px',
              lineHeight: 1.7,
              color: '#1e293b',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              fontFamily: 'serif',
            }}
          >
            "...The Spanish arrival in the Americas initiated a series of exchanges that fundamentally transformed both hemispheres. Native populations were decimated by pathogens like smallpox, while{' '}
            <TextHighlight frame={highlightFrame} startFrame={0} duration={60} color="rgba(254, 240, 138, 0.7)">
              New World crops such as maize and potatoes revolutionized European agricultural practices
            </TextHighlight>{' '}
            and triggered massive demographic growth across the Old World..."
          </div>
        </div>

        {/* Right pane: MCQ question and options */}
        <div style={{ width: '50%', padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          
          {/* Question Title */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '1px' }}>
              QUESTION 1
            </span>
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: '8px 0 0 0', lineHeight: 1.5 }}>
              Which of the following was a primary consequence of the Columbian Exchange on the European population?
            </p>
          </div>

          {/* Options list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Option A */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                opacity: optionSelected ? 0.6 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              <span style={{ width: '28px', height: '28px', border: '1px solid #cbd5e1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#64748b' }}>
                A
              </span>
              <span style={{ fontSize: '14px', color: '#334155' }}>
                Rapid demographic decline due to imported pathogens.
              </span>
            </div>

            {/* Option B */}
            <div
              style={{
                backgroundColor: showFeedback ? '#ecfdf5' : optionSelected ? '#eff6ff' : '#ffffff',
                border: showFeedback
                  ? '2.5px solid #10b981'
                  : optionSelected
                  ? '2px solid #2563eb'
                  : '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                transform: `scale(${optionBScale})`,
                transition: 'all 0.1s ease',
              }}
            >
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: showFeedback ? '#10b981' : optionSelected ? '#2563eb' : 'transparent',
                  border: showFeedback ? '1px solid #10b981' : optionSelected ? '1px solid #2563eb' : '1px solid #cbd5e1',
                  color: optionSelected || showFeedback ? '#ffffff' : '#64748b',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                B
              </span>
              <span style={{ fontSize: '14px', color: '#334155', fontWeight: optionSelected ? 600 : 400 }}>
                Population growth spurred by introduction of American crops.
              </span>
            </div>

            {/* Option C */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                opacity: optionSelected ? 0.6 : 1,
              }}
            >
              <span style={{ width: '28px', height: '28px', border: '1px solid #cbd5e1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#64748b' }}>
                C
              </span>
              <span style={{ fontSize: '14px', color: '#334155' }}>
                Wide adoption of Spanish feudal structures in municipalities.
              </span>
            </div>
          </div>

          {/* Feedback message overlay */}
          {showFeedback && (
            <div
              style={{
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '16px',
                padding: '18px 20px',
                opacity: feedbackOpacity,
                transform: `translateY(${feedbackTranslateY}px)`,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#065f46', fontWeight: 700, fontSize: '14px' }}>
                <span>✅</span>
                <span>Great work!</span>
              </div>
              <p style={{ fontSize: '13px', color: '#065f46', margin: 0, lineHeight: 1.4 }}>
                Maize and potatoes were extremely calorie-dense and resilient, which directly led to agricultural revolution and population surge in Europe.
              </p>
            </div>
          )}

          {/* Submit button */}
          <div
            style={{
              backgroundColor: optionSelected ? '#1e293b' : '#cbd5e1',
              color: optionSelected ? '#ffffff' : '#94a3b8',
              fontWeight: 700,
              padding: '14px 0',
              borderRadius: '20px',
              textAlign: 'center',
              cursor: optionSelected ? 'pointer' : 'not-allowed',
              transform: `scale(${submitScale})`,
              transition: 'all 0.1s ease',
              marginTop: 'auto',
            }}
          >
            Submit Answer
          </div>
        </div>
      </div>

      {/* Global Virtual Actors */}
      <Cursor x={mouseX} y={mouseY} clicking={isClickingOption || isClickingSubmit} />
      
      <Caption
        text={
          frame < 120
            ? '独家支持类似 CB 真实考试界面的高亮、下划线及笔记标记功能。'
            : frame < 210
            ? '精准提炼题干关键信息，一键提交答案。'
            : '回答正确！Streak 连击翻倍，系统提供权威、清晰的文字解析。'
        }
        duration={duration}
      />
    </AbsoluteFill>
  );
};
