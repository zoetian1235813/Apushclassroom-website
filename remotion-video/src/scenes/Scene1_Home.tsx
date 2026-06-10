import { spring, interpolate, Easing, useCurrentFrame, AbsoluteFill } from 'remotion';
import React from 'react';
import { Cursor, Caption } from '../components/Primitives';

export const Scene1_Home = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const duration = 240;

  // 1. Zoom Entry Spring
  const zoomScale = interpolate(
    spring({ frame, fps, config: { damping: 14 } }),
    [0, 1],
    [0.96, 1]
  );

  // 2. Cursor Interpolation Coordinates
  // 0 - 90: Cursor moves from offscreen (1600, 900) to Study Flow Card (400, 450)
  // 90 - 110: Hovering on card
  // 110 - 120: Clicking
  // 120 - 135: Navigating, cursor follows to Sidebar / next button (380, 720)
  // 135 - 210: Moving to "Open Study Notes" button (420, 680)
  // 210 - 230: Clicking "Open Study Notes"
  // 230 - 240: Fade out
  const mouseX = interpolate(
    frame,
    [0, 90, 110, 120, 135, 210, 230, 240],
    [1600, 420, 420, 420, 420, 450, 450, 450],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }
  );

  const mouseY = interpolate(
    frame,
    [0, 90, 110, 120, 135, 210, 230, 240],
    [900, 460, 460, 460, 460, 690, 690, 690],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }
  );

  // Derived States
  const isHoverCard = frame >= 90 && frame < 120;
  const isClickingCard = frame >= 110 && frame < 120;

  const showStudyView = frame >= 120;
  const isHoverButton = frame >= 210 && frame < 230;
  const isClickingButton = frame >= 220 && frame < 230;

  // View transition opacity
  const homeOpacity = interpolate(frame, [120, 135], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const studyOpacity = interpolate(frame, [120, 135], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Spring animations for card and button
  const cardScale = isClickingCard
    ? 0.96
    : isHoverCard
    ? 1.03
    : 1;
  const buttonScale = isClickingButton
    ? 0.95
    : isHoverButton
    ? 1.05
    : 1;

  // Header progress bar stats
  const completedPercent = showStudyView ? 16 : 15;

  return (
    <AbsoluteFill style={{ transform: `scale(${zoomScale})`, backgroundColor: '#f8fafc' }}>
      {/* 1. Global Navigation Header Mockup */}
      <header
        style={{
          height: '90px',
          backgroundColor: '#ffffff',
          borderBottom: '4px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'between',
          padding: '0 48px',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 900,
              background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
            }}
          >
            APUSH Learning Site
          </h1>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
            AP US History Study Guide
          </span>
        </div>

        {/* Overall Progress Summary Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            backgroundColor: '#f1f5f9',
            padding: '10px 20px',
            borderRadius: '16px',
            marginLeft: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>OVERALL PROGRESS</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '160px',
                  height: '8px',
                  backgroundColor: '#cbd5e1',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${completedPercent}%`,
                    height: '100%',
                    backgroundColor: '#2563eb',
                    borderRadius: '4px',
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                {completedPercent}%
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', height: 'calc(100% - 90px)' }}>
        
        {/* SIDEBAR MOCKUP */}
        <aside
          style={{
            width: '280px',
            borderRight: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', letterSpacing: '1px' }}>MENU</span>
            <div style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: showStudyView ? 'transparent' : '#f1f5f9', color: showStudyView ? '#475569' : '#2563eb', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
              🏠 Dashboard
            </div>
            <div style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: showStudyView ? '#e0e7ff' : 'transparent', color: showStudyView ? '#2563eb' : '#475569', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
              📖 Study Flow
            </div>
            <div style={{ padding: '10px 14px', borderRadius: '12px', color: '#475569', fontWeight: 600, fontSize: '14px' }}>
              🎯 Practice Studio
            </div>
            <div style={{ padding: '10px 14px', borderRadius: '12px', color: '#475569', fontWeight: 600, fontSize: '14px' }}>
              Wrong Notebook
            </div>
          </div>
        </aside>

        {/* VIEW CONTAINER */}
        <div style={{ flex: 1, padding: '40px', position: 'relative' }}>
          
          {/* A. HOME VIEW (Dashboard) */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              opacity: homeOpacity,
              display: frame >= 135 ? 'none' : 'block',
              transition: 'transform 0.5s ease',
            }}
          >
            {/* Banner Section */}
            <div
              style={{
                background: 'linear-gradient(135deg, #eff6ff, #f3e8ff)',
                border: '1px solid rgba(37, 99, 235, 0.1)',
                borderRadius: '24px',
                padding: '36px',
                marginBottom: '32px',
                position: 'relative',
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', letterSpacing: '2px', textTransform: 'uppercase' }}>
                STUDY ASSISTANT
              </span>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#1e293b', margin: '8px 0 12px 0' }}>
                AP US History 学习总览
              </h2>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, maxWidth: '640px', margin: 0 }}>
                1491–1980 全九单元、86 个主题。集中查看任务、笔记与练习安排，清晰推进备考。
              </p>
            </div>

            {/* Grid Choices */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* Card 1: Study Guide Flow */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: isHoverCard ? '2px solid #2563eb' : '1px solid #e2e8f0',
                  borderRadius: '24px',
                  padding: '32px',
                  boxShadow: isHoverCard ? '0 12px 24px -10px rgba(37, 99, 235, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  transform: `scale(${cardScale})`,
                  transition: 'all 0.15s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'between',
                  height: '240px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'start', width: '100%' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px' }}>
                      Study Flow 📒
                    </span>
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', margin: '16px 0 8px 0' }}>
                    Complete Study Guide
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                    覆盖 9 个单元的笔记与学习步骤，按顺序完成即可掌握核心知识点。
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto', gap: '8px', color: '#2563eb', fontWeight: 600, fontSize: '14px' }}>
                  <span>Start Studying</span>
                  <span>→</span>
                </div>
              </div>

              {/* Card 2: Practice Studio */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '24px',
                  padding: '32px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  height: '240px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px' }}>
                    Practice Studio 🎯
                  </span>
                  <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', margin: '16px 0 8px 0' }}>
                    题型特训模式
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                    针对 MCQ、SAQ、LEQ、DBQ 的专项练习，支持拖拽匹配与即时提示。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* B. STUDY VIEW (Flow navigation target) */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              opacity: studyOpacity,
              display: frame < 120 ? 'none' : 'block',
            }}
          >
            {/* Header info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span
                style={{
                  background: 'linear-gradient(90deg, #f87171, #fb923c)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 700,
                  boxShadow: '0 4px 10px rgba(248, 113, 113, 0.3)',
                }}
              >
                Unit 1
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
                1491 - 1607
              </span>
            </div>

            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0' }}>
              A New World Begins
            </h2>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#4b5563', margin: '0 0 24px 0' }}>
              1.4 · Columbian Exchange
            </h3>

            {/* Selection Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '12px' }}>
              
              {/* Box 1: Study Notes */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: isHoverButton ? '2px solid #2563eb' : '1px solid #e2e8f0',
                  borderRadius: '24px',
                  padding: '32px',
                  boxShadow: isHoverButton ? '0 12px 24px -10px rgba(37, 99, 235, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  transform: `scale(${buttonScale})`,
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '240px',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px', width: 'fit-content' }}>
                  Notes 📓
                </span>
                <h4 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', margin: '16px 0 8px 0' }}>
                  Study Notes
                </h4>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, margin: '0 0 24px 0' }}>
                  关键概念、历史语境与图片速记，帮助梳理 Columbian Exchange 的每个知识点。
                </p>
                <div
                  style={{
                    marginTop: 'auto',
                    backgroundColor: '#1e293b',
                    color: '#ffffff',
                    textAlign: 'center',
                    padding: '12px 0',
                    borderRadius: '16px',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  打开学习材料
                </div>
              </div>

              {/* Box 2: Practice Questions */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '24px',
                  padding: '32px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  height: '240px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '20px', width: 'fit-content' }}>
                  Practice 🎯
                </span>
                <h4 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', margin: '16px 0 8px 0' }}>
                  Topic Questions
                </h4>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  拖拽匹配 + 提示功能，集中巩固本主题核心考点。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Virtual Actors */}
      <Cursor x={mouseX} y={mouseY} clicking={isClickingCard || isClickingButton} />
      
      <Caption
        text={
          frame < 120
            ? '欢迎来到 APUSH 学习网 —— 1491-1980 全单元核心考点精读。'
            : '点击“Complete Study Guide”，一键开启结构化学习流。'
        }
        duration={duration}
      />
    </AbsoluteFill>
  );
};
