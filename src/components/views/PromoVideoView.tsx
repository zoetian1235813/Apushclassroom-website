import { useEffect, useRef, useState, useMemo } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Math interpolation helper matching Remotion functionality
function interpolate(
  value: number,
  inputRange: number[],
  outputRange: number[]
): number {
  if (inputRange.length !== outputRange.length) {
    throw new Error("Input and output ranges must be of the same length");
  }

  // Handle boundary cases
  if (value <= inputRange[0]) {
    return outputRange[0];
  }
  if (value >= inputRange[inputRange.length - 1]) {
    return outputRange[outputRange.length - 1];
  }

  // Find index of the interval
  let index = 0;
  for (let i = 0; i < inputRange.length - 1; i++) {
    if (value >= inputRange[i] && value <= inputRange[i + 1]) {
      index = i;
      break;
    }
  }

  const inputMin = inputRange[index];
  const inputMax = inputRange[index + 1];
  const outputMin = outputRange[index];
  const outputMax = outputRange[index + 1];

  const progress = (value - inputMin) / (inputMax - inputMin);
  const result = outputMin + progress * (outputMax - outputMin);

  return result;
}

// Simple spring mockup matching Remotion config values
function getSpringProgress(frame: number, startFrame: number, duration = 15): number {
  const t = (frame - startFrame) / duration;
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return Math.sin((t * Math.PI) / 2) * 1.05 - (1 - t) * 0.05;
}

export const PromoVideoView = () => {
  const [frame, setFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const TOTAL_FRAMES = 900; // 30 seconds at 30 fps

  // Scene structure definition - Expanded to 5 scenes
  const scenes = useMemo(() => [
    {
      id: 0,
      title: "1. 沉浸式双源导学",
      startFrame: 0,
      endFrame: 200,
      description: "主页导航、学习卡片选择及进入学习流",
    },
    {
      id: 1,
      title: "2. 双语精读笔记",
      startFrame: 200,
      endFrame: 360,
      description: "双语骨架笔记、Columbian Exchange 精读内容及打字机效果",
    },
    {
      id: 2,
      title: "3. 视频同步互动测",
      startFrame: 360,
      endFrame: 540,
      description: "跳转至视频播放，视频在特定时间点暂停并弹出即时互动答题",
    },
    {
      id: 3,
      title: "4. 官方答题公式特训",
      startFrame: 540,
      endFrame: 740,
      description: "考试真题 MCQ、划词高亮选择、选项匹配及即时答案反馈",
    },
    {
      id: 4,
      title: "5. 智能错题与总结",
      startFrame: 740,
      endFrame: 900,
      description: "APUSH Classroom 亮点总结与免费体验引导",
    },
  ], []);

  // Determine active scene based on current frame
  const activeSceneIndex = useMemo(() => {
    const scene = scenes.find((s) => frame >= s.startFrame && frame < s.endFrame);
    return scene ? scene.id : scenes[scenes.length - 1].id;
  }, [frame, scenes]);

  // Audio feedback simulation (web audio api synth)
  const playClickSound = () => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); // click frequency
      oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.08);

      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
      console.warn("Audio context not supported or user gesture required", e);
    }
  };

  // Playback Loop
  useEffect(() => {
    const tick = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }
      const delta = time - lastTimeRef.current;
      const msPerFrame = 1000 / (30 * playbackRate); // Target 30fps scaled by playback speed

      if (delta >= msPerFrame) {
        const framesToAdvance = Math.floor(delta / msPerFrame);
        setFrame((prev) => {
          const nextFrame = prev + framesToAdvance;
          if (nextFrame >= TOTAL_FRAMES) {
            return 0; // Loop back
          }
          return nextFrame;
        });
        lastTimeRef.current = time - (delta % msPerFrame);
      }
      animationFrameId.current = requestAnimationFrame(tick);
    };

    if (isPlaying) {
      lastTimeRef.current = null;
      animationFrameId.current = requestAnimationFrame(tick);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying, playbackRate]);

  // Sound Visualizer Bars
  const soundBars = Array.from({ length: 12 }, (_, i) => i);

  // Sync Click sounds at specific frames where clicks happen in scenes
  useEffect(() => {
    // Click triggers based on expanded scenes
    // Scene 1: frame 90 (card click), frame 180 (button click)
    // Scene 2: frame 200 + 140 (button click)
    // Scene 3: frame 360 + 90 (select Option B), frame 360 + 140 (continue button click)
    // Scene 4: frame 540 + 130 (select option B), frame 540 + 180 (submit answer click)
    // Scene 5: frame 740 + 75 (CTA button click)
    const clicks = [90, 180, 200 + 140, 360 + 90, 360 + 140, 540 + 130, 540 + 180, 740 + 75];
    if (clicks.includes(frame)) {
      playClickSound();
    }
  }, [frame, isMuted]);

  // Interpolation calculations for rendering Scene elements
  // -------------------------------------------------------------
  
  // --- Scene 1: Dashboard Home (0 - 200 frames) ---
  const scene1Frame = frame - 0;
  const zoomScaleS1 = interpolate(getSpringProgress(scene1Frame, 0, 20), [0, 1], [0.96, 1]);
  const mouseXS1 = interpolate(scene1Frame, [0, 70, 90, 100, 120, 170, 190, 200], [83, 31, 31, 31, 31, 38, 38, 38]);
  const mouseYS1 = interpolate(scene1Frame, [0, 70, 90, 100, 120, 170, 190, 200], [83, 52, 52, 52, 52, 79, 79, 79]);
  
  const isClickingCardS1 = scene1Frame >= 90 && scene1Frame < 100;
  const showStudyViewS1 = scene1Frame >= 100;
  const isHoverButtonS1 = scene1Frame >= 170 && scene1Frame < 190;
  const isClickingButtonS1 = scene1Frame >= 180 && scene1Frame < 190;

  const homeOpacityS1 = interpolate(scene1Frame, [100, 115], [1, 0]);
  const studyOpacityS1 = interpolate(scene1Frame, [100, 115], [0, 1]);
  const cardScaleS1 = isClickingCardS1 ? 0.96 : scene1Frame >= 70 && scene1Frame < 100 ? 1.03 : 1;
  const buttonScaleS1 = isClickingButtonS1 ? 0.95 : isHoverButtonS1 ? 1.05 : 1;

  // --- Scene 2: Study Notes (200 - 360 frames) ---
  const scene2Frame = frame - 200;
  const zoomScaleS2 = interpolate(getSpringProgress(scene2Frame, 0, 20), [0, 1], [0.97, 1]);
  const fullTextS2 =
    "The Columbian Exchange was the widespread transfer of plants, animals, culture, human populations, technology, diseases, and ideas between the Americas, West Africa, and the Old World in the 15th and 16th centuries. It fundamentally reshaped the global ecosystem and societies.";
  const typedLengthS2 = Math.min(
    Math.floor(interpolate(scene2Frame, [20, 90], [0, fullTextS2.length])),
    fullTextS2.length
  );
  const displayedTextS2 = fullTextS2.substring(0, typedLengthS2);

  const opacityBullet1S2 = interpolate(scene2Frame, [80, 100], [0, 1]);
  const opacityBullet2S2 = interpolate(scene2Frame, [100, 120], [0, 1]);
  const opacityBullet3S2 = interpolate(scene2Frame, [120, 140], [0, 1]);

  const mouseXS2 = interpolate(scene2Frame, [0, 20, 120, 140, 150, 160], [38, 38, 91, 91, 91, 91]);
  const mouseYS2 = interpolate(scene2Frame, [0, 20, 120, 140, 150, 160], [79, 79, 82, 82, 82, 82]);

  const isClickingButtonS2 = scene2Frame >= 140 && scene2Frame < 150;
  const isHoverButtonS2 = scene2Frame >= 120 && scene2Frame < 150;
  const buttonScaleS2 = isClickingButtonS2 ? 0.96 : isHoverButtonS2 ? 1.04 : 1;

  // --- Scene 3: Video Sync Q&A (360 - 540 frames) [NEW SCENE] ---
  const scene3Frame = frame - 360;
  const zoomScaleS3 = interpolate(getSpringProgress(scene3Frame, 0, 20), [0, 1], [0.98, 1]);
  
  // Video progress bar timer calculations (03:55 to 04:20)
  const videoPlayProgress = interpolate(scene3Frame, [0, 40, 140, 180], [235, 252, 252, 260]); // 235 = 3m55s, 252 = 4m12s, 260 = 4m20s
  const formatVideoTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const isVideoPausedS3 = scene3Frame >= 40 && scene3Frame < 140;
  const showQAModalS3 = scene3Frame >= 40 && scene3Frame < 150;
  const isClickingOptionS3 = scene3Frame >= 90 && scene3Frame < 100;
  const isClickingContinueS3 = scene3Frame >= 140 && scene3Frame < 150;
  const optionSelectedS3 = scene3Frame >= 90;
  
  // Modal spring popup
  const modalProgressS3 = getSpringProgress(scene3Frame, 40, 15);
  const modalOpacityS3 = interpolate(modalProgressS3, [0, 1], [0, 1]);
  const modalScaleS3 = interpolate(modalProgressS3, [0, 1], [0.85, 1]);

  // Cursor interpolation for Scene 3
  // Starts at previous button location: (91%, 82%)
  // Moves to Option B: (50%, 62%) -> arrives frame 90
  // Clicks Option B -> frame 90 to 100
  // Moves to "继续播放" button: (72%, 78%) -> arrives frame 140
  // Clicks Continue -> frame 140 to 150
  // Remains stable
  const mouseXS3 = interpolate(scene3Frame, [0, 40, 90, 100, 140, 150, 180], [91, 91, 50, 50, 72, 72, 72]);
  const mouseYS3 = interpolate(scene3Frame, [0, 40, 90, 100, 140, 150, 180], [82, 82, 62, 62, 78, 78, 78]);

  const optionBScaleS3 = isClickingOptionS3 ? 0.96 : optionSelectedS3 ? 1.02 : 1;
  const continueBtnScaleS3 = isClickingContinueS3 ? 0.95 : scene3Frame >= 120 && scene3Frame < 150 ? 1.05 : 1;

  // --- Scene 4: Practice Studio (540 - 740 frames) ---
  const scene4Frame = frame - 540;
  const zoomScaleS4 = interpolate(getSpringProgress(scene4Frame, 0, 20), [0, 1], [0.98, 1]);
  const highlightProgressS4 = interpolate(scene4Frame, [20, 80], [0, 1]);

  const mouseXS4 = interpolate(scene4Frame, [0, 30, 80, 130, 140, 180, 190, 200], [72, 22, 44, 76, 76, 78, 78, 78]);
  const mouseYS4 = interpolate(scene4Frame, [0, 30, 80, 130, 140, 180, 190, 200], [78, 40, 40, 52, 52, 79, 79, 79]);

  const isClickingOptionS4 = scene4Frame >= 130 && scene4Frame < 140;
  const isClickingSubmitS4 = scene4Frame >= 180 && scene4Frame < 190;

  const optionSelectedS4 = scene4Frame >= 130;
  const showFeedbackS4 = scene4Frame >= 180;
  const optionBScaleS4 = isClickingOptionS4 ? 0.97 : optionSelectedS4 ? 1.02 : 1;
  const submitScaleS4 = isClickingSubmitS4 ? 0.95 : scene4Frame >= 160 ? 1.03 : 1;

  const streakProgressS4 = getSpringProgress(scene4Frame, 195, 15);
  const streakScaleS4 = showFeedbackS4 ? interpolate(streakProgressS4, [0, 1], [1, 1.25]) : 1;
  const streakTextS4 = scene4Frame >= 195 ? "1" : "0";

  const feedbackProgressS4 = getSpringProgress(scene4Frame, 180, 15);
  const feedbackOpacityS4 = interpolate(feedbackProgressS4, [0, 1], [0, 1]);
  const feedbackTranslateYS4 = interpolate(feedbackProgressS4, [0, 1], [20, 0]);

  // --- Scene 5: Outro CTA (740 - 900 frames) ---
  const scene5Frame = frame - 740;
  const logoProgressS5 = getSpringProgress(scene5Frame, 15, 15);
  const logoScaleS5 = interpolate(logoProgressS5, [0, 1], [0.5, 1]);
  const logoOpacityS5 = interpolate(logoProgressS5, [0, 1], [0, 1]);

  const op1S5 = interpolate(getSpringProgress(scene5Frame, 45, 15), [0, 1], [0, 1]);
  const op2S5 = interpolate(getSpringProgress(scene5Frame, 55, 15), [0, 1], [0, 1]);
  const op3S5 = interpolate(getSpringProgress(scene5Frame, 65, 15), [0, 1], [0, 1]);

  const buttonSpringS5 = getSpringProgress(scene5Frame, 75, 15);
  const buttonScaleS5 = interpolate(buttonSpringS5, [0, 1], [0.8, 1]);
  const buttonOpacityS5 = interpolate(buttonSpringS5, [0, 1], [0, 1]);

  const mouseXS5 = interpolate(scene5Frame, [0, 65, 75, 85, 160], [78, 50, 50, 50, 50]);
  const mouseYS5 = interpolate(scene5Frame, [0, 65, 75, 85, 160], [79, 72, 72, 72, 72]);
  const isClickingButtonS5 = scene5Frame >= 75 && scene5Frame < 85;

  // Deriving Cursor clicking and coordinates
  let activeMouseX = 50;
  let activeMouseY = 50;
  let isClicking = false;

  if (activeSceneIndex === 0) {
    activeMouseX = mouseXS1;
    activeMouseY = mouseYS1;
    isClicking = isClickingCardS1 || isClickingButtonS1;
  } else if (activeSceneIndex === 1) {
    activeMouseX = mouseXS2;
    activeMouseY = mouseYS2;
    isClicking = isClickingButtonS2;
  } else if (activeSceneIndex === 2) {
    activeMouseX = mouseXS3;
    activeMouseY = mouseYS3;
    isClicking = isClickingOptionS3 || isClickingContinueS3;
  } else if (activeSceneIndex === 3) {
    activeMouseX = mouseXS4;
    activeMouseY = mouseYS4;
    isClicking = isClickingOptionS4 || isClickingSubmitS4;
  } else if (activeSceneIndex === 4) {
    activeMouseX = mouseXS5;
    activeMouseY = mouseYS5;
    isClicking = isClickingButtonS5;
  }

  // Captions display synced
  const activeCaption = useMemo(() => {
    if (frame >= 0 && frame < 100) {
      return "欢迎来到 APUSH 学习网 —— 1491-1980 全单元核心考点精读。";
    }
    if (frame >= 100 && frame < 200) {
      return "点击“Complete Study Guide”，一键开启结构化学习流。";
    }
    if (frame >= 200 && frame < 300) {
      return "系统提供高频考点笔记与速记卡片，配合打字机输入，覆盖大纲细则。";
    }
    if (frame >= 300 && frame < 360) {
      return "通读完毕后，点击右下角“完成学习”，自动跳转至视频播放界面。";
    }
    if (frame >= 360 && frame < 400) {
      return "跳转到视频播放网站进行学习，国内备考也能畅享双源丝滑播放。";
    }
    if (frame >= 400 && frame < 450) {
      return "内置视频随堂即时测！视频播放到关键检测点时会自动暂停并弹出互动问答。";
    }
    if (frame >= 450 && frame < 500) {
      return "强制打断被动观看，选择正确选项并获取即时反馈解析。";
    }
    if (frame >= 500 && frame < 540) {
      return "点击继续播放视频，形成趁热打铁的强效抗走神闭环学习。";
    }
    if (frame >= 540 && frame < 630) {
      // Practice studio (highlighting text)
      return "答题公式特训，支持真题高亮标记及下划线功能，还原官方考试体验。";
    }
    if (frame >= 630 && frame < 700) {
      return "选项匹配与即时得分。通过拖拽逻辑块快速熟练答题框架。";
    }
    if (frame >= 700 && frame < 740) {
      return "回答正确后即可累加 Streak 连击得分，智能错题本自动分类。";
    }
    return "即刻注册 APUSH Classroom，轻松冲刺满分 5 分！";
  }, [frame]);

  // Format Frame to Timer string
  const formatTimer = (f: number) => {
    const totalSecs = Math.floor(f / 30);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const framesRemainder = f % 30;

    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${framesRemainder
      .toString()
      .padStart(2, "0")}`;
  };

  const handleExportSimulated = () => {
    setShowExportSuccess(true);
    setTimeout(() => {
      setShowExportSuccess(false);
      window.open("/promo.html", "_blank");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <section className="relative overflow-hidden glass-panel px-6 py-6 sm:px-8 sm:py-8 bg-white border border-white/20 rounded-3xl shadow-glow">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="zen-chip text-xs uppercase tracking-wider text-blue-600 font-bold bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                Interactive Preview
              </span>
              <span className="flex h-2 w-2 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPlaying ? "bg-emerald-400" : "bg-amber-400"}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? "bg-emerald-500" : "bg-amber-500"}`}></span>
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-midnight">
              🎬 宣传视频实时渲染预览
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-midnight/70">
              通过在浏览器内直连播放引擎，为您展示 APUSH Classroom 平台针对**双源导学**、**随堂即时互动答题**和**公式化特训**的核心亮点。
            </p>
          </div>

          <button
            onClick={handleExportSimulated}
            className="flex items-center gap-2 self-start md:self-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-5 py-3 rounded-2xl shadow-lg transition-transform hover:-translate-y-0.5"
          >
            {showExportSuccess ? (
              <>
                <span className="animate-spin text-white">⏳</span>
                正在跳转导出工具...
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4" />
                去往宣传组图导出页
              </>
            )}
          </button>
        </div>
      </section>

      {/* Main Player Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Scene Index Selector */}
        <div className="lg:col-span-1 glass-panel p-5 bg-white/80 border border-white/30 rounded-3xl space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              视频分镜大纲
            </h3>
            <p className="text-[11px] text-gray-500">点击场景直接跳转到指定画面</p>
          </div>

          <div className="space-y-3">
            {scenes.map((scene) => {
              const isActive = activeSceneIndex === scene.id;
              return (
                <button
                  key={scene.id}
                  onClick={() => {
                    setFrame(scene.startFrame);
                    playClickSound();
                  }}
                  className={`w-full text-left p-3 rounded-2xl border transition-all text-xs flex flex-col gap-1.5 ${
                    isActive
                      ? "bg-midnight border-midnight text-white shadow-glow"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-bold">{scene.title}</span>
                    <span className={`text-[10px] font-semibold ${isActive ? "text-blue-300" : "text-gray-400"}`}>
                      {formatTimer(scene.startFrame).split(".")[0]}
                    </span>
                  </div>
                  <p className={`text-[10px] leading-relaxed ${isActive ? "text-slate-300" : "text-gray-500"}`}>
                    {scene.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Sound Visualizer & Status Info */}
          <div className="pt-3 border-t border-gray-100 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase">音频输出</span>
              <span className="text-[10px] text-slate-500 font-semibold">{isMuted ? "静音" : "环境音轨激活"}</span>
            </div>
            
            {/* Bounce waves visualizer */}
            <div className="h-8 flex items-end justify-between px-2 bg-slate-50 rounded-xl py-1">
              {soundBars.map((bar) => {
                const randomHeight = isPlaying ? 15 + Math.sin(frame / 3 + bar) * 12 : 3;
                return (
                  <div
                    key={bar}
                    className="w-1 bg-gradient-to-t from-blue-500 to-indigo-500 rounded-full transition-all duration-75"
                    style={{ height: `${Math.max(3, randomHeight)}px` }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Simulator Canvas and player */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          {/* Main Video Viewport (Mac Safari Browser Mockup) */}
          <div
            ref={containerRef}
            className="w-full relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl aspect-[16/10] shadow-glass"
          >
            {/* 1. macOS Browser Window Header */}
            <div className="absolute top-0 left-0 right-0 h-11 bg-slate-800 border-b border-slate-900 px-4 flex items-center gap-4 z-30 select-none">
              {/* Traffic light buttons */}
              <div className="flex gap-1.5 shrink-0">
                <span className="w-3 h-3 rounded-full bg-rose-500 block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 block"></span>
              </div>
              
              {/* URL Address Bar */}
              <div className="bg-slate-900/60 text-slate-400 text-[10px] font-semibold py-1 px-4 rounded-lg flex-1 text-center truncate max-w-md mx-auto flex items-center justify-center gap-1.5 border border-slate-800">
                <span className="text-slate-600 text-xs">🔒</span>
                {activeSceneIndex === 2 
                  ? "apush-classroom.com/study/unit3/topic3.3" 
                  : "apush-classroom.com/studyflow"}
              </div>

              {/* Composition badge indicator */}
              <span className="text-[9px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded border border-indigo-500/30 shrink-0">
                REM COMP
              </span>
            </div>

            {/* 2. Main Virtual Screen (Content depending on active Scene) */}
            <div className="absolute top-11 bottom-0 left-0 right-0 overflow-hidden bg-slate-50 select-none">
              
              {/* --- SCENE 1: Home Dashboard (0 - 200 frames) --- */}
              {activeSceneIndex === 0 && (
                <div
                  className="w-full h-full flex flex-col transition-transform"
                  style={{
                    transform: `scale(${zoomScaleS1})`,
                    backgroundColor: "#f8fafc",
                  }}
                >
                  {/* Dashboard Header */}
                  <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
                    <div className="flex flex-col leading-none">
                      <span className="text-sm font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        APUSH Learning Site
                      </span>
                      <span className="text-[8px] font-bold text-slate-400 mt-0.5">AP US History Study Guide</span>
                    </div>

                    {/* Progress indicator */}
                    <div className="bg-slate-100 py-1 px-3 rounded-full flex items-center gap-2">
                      <span className="text-[8px] font-bold text-slate-500 uppercase">进度</span>
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${showStudyViewS1 ? 16 : 15}%` }}
                        />
                      </div>
                      <span className="text-[9px] font-extrabold text-slate-700">
                        {showStudyViewS1 ? 16 : 15}%
                      </span>
                    </div>
                  </div>

                  {/* Body layout */}
                  <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar mockup */}
                    <aside className="w-36 border-r border-slate-200 bg-white p-3 space-y-4 flex-shrink-0">
                      <div className="space-y-1">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">导航</span>
                        <div className={`p-1.5 rounded-lg text-[9px] font-bold cursor-pointer ${showStudyViewS1 ? "text-slate-600" : "bg-slate-100 text-blue-600"}`}>
                          🏠 Dashboard
                        </div>
                        <div className={`p-1.5 rounded-lg text-[9px] font-bold cursor-pointer ${showStudyViewS1 ? "bg-indigo-50 text-indigo-600" : "text-slate-600"}`}>
                          📖 Study Flow
                        </div>
                      </div>
                    </aside>

                    {/* Dashboard Views */}
                    <div className="flex-1 p-6 relative overflow-hidden">
                      
                      {/* Sub-view A: Dashboard Home */}
                      <div
                        className="absolute inset-6 flex flex-col justify-between"
                        style={{
                          opacity: homeOpacityS1,
                          display: scene1Frame >= 115 ? "none" : "flex",
                        }}
                      >
                        {/* Welcome Banner */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-100 rounded-2xl p-4 flex flex-col gap-1">
                          <span className="text-[8px] font-extrabold text-blue-600 uppercase tracking-wider">
                            STUDY ASSISTANT
                          </span>
                          <h3 className="text-base font-extrabold text-slate-800">AP US History 学习总览</h3>
                          <p className="text-[10px] text-slate-500 leading-normal">
                            1491–1980 全九单元。集中查看任务、笔记与练习安排，清晰推进备考。
                          </p>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          {/* Card 1: Study Guide Flow */}
                          <div
                            className="bg-white border rounded-2xl p-4 flex flex-col justify-between h-36 transition-all shadow-sm"
                            style={{
                              transform: `scale(${cardScaleS1})`,
                              borderColor: scene1Frame >= 70 && scene1Frame < 100 ? "#3b82f6" : "#e2e8f0",
                              borderWidth: scene1Frame >= 70 && scene1Frame < 100 ? "2px" : "1px",
                            }}
                          >
                            <div className="space-y-1.5">
                              <span className="text-[8px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                Study Flow 📒
                              </span>
                              <h4 className="text-xs font-black text-slate-800">Complete Study Guide</h4>
                              <p className="text-[9px] text-slate-500 leading-normal">
                                覆盖 9 个单元的笔记与步骤，按顺序即可掌握核心考点。
                              </p>
                            </div>
                            <span className="text-[9px] font-bold text-blue-600 flex items-center gap-1 mt-auto">
                              Start Studying →
                            </span>
                          </div>

                          {/* Card 2: Practice Studio */}
                          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col h-36 opacity-70">
                            <span className="text-[8px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full w-max">
                              Practice Studio 🎯
                            </span>
                            <h4 className="text-xs font-black text-slate-800 mt-1.5">题型特训模式</h4>
                            <p className="text-[9px] text-slate-500 leading-normal">
                              针对 MCQ、SAQ、LEQ 的专项练习，支持即时匹配反馈。
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Sub-view B: Study Flow Intro */}
                      <div
                        className="absolute inset-6 flex flex-col justify-between"
                        style={{
                          opacity: studyOpacityS1,
                          display: scene1Frame < 100 ? "none" : "flex",
                        }}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-red-500 text-white font-bold text-[8px] px-2 py-0.5 rounded-full shadow-sm">
                              Unit 1
                            </span>
                            <span className="text-[9px] text-slate-400 font-bold">1491 - 1607</span>
                          </div>
                          <h2 className="text-lg font-black text-slate-800">A New World Begins</h2>
                          <h3 className="text-xs font-bold text-slate-500 mt-1">1.4 · Columbian Exchange</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                          {/* Study Notes Card */}
                          <div
                            className="bg-white border rounded-2xl p-4 flex flex-col justify-between h-36 transition-all shadow-md"
                            style={{
                              transform: `scale(${buttonScaleS1})`,
                              borderColor: isHoverButtonS1 ? "#3b82f6" : "#e2e8f0",
                              borderWidth: isHoverButtonS1 ? "2px" : "1px",
                            }}
                          >
                            <span className="text-[8px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full w-max">
                              Notes 📓
                            </span>
                            <h4 className="text-xs font-black text-slate-800 mt-1.5">Study Notes</h4>
                            <p className="text-[9px] text-slate-500 leading-normal">
                              关键概念、历史语境与速记卡片，帮助梳理 Columbian Exchange。
                            </p>
                            <div className="bg-slate-800 text-white text-[9px] font-bold py-2 rounded-xl text-center mt-auto">
                              打开学习材料
                            </div>
                          </div>

                          {/* Topic Questions Card */}
                          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col h-36 opacity-70">
                            <span className="text-[8px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full w-max">
                              Practice 🎯
                            </span>
                            <h4 className="text-xs font-black text-slate-800 mt-1.5">Topic Questions</h4>
                            <p className="text-[9px] text-slate-500 leading-normal">
                              拖拽匹配 + 提示功能，集中巩固本主题核心考点。
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* --- SCENE 2: Study Notes View (200 - 360 frames) --- */}
              {activeSceneIndex === 1 && (
                <div
                  className="w-full h-full flex transition-transform"
                  style={{
                    transform: `scale(${zoomScaleS2})`,
                    backgroundColor: "#fcfbf9",
                  }}
                >
                  {/* Study Navigation Sidebar */}
                  <aside className="w-44 border-r border-slate-200 bg-white p-3 shrink-0 flex flex-col gap-4">
                    <div className="space-y-1">
                      <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block">
                        UNIT 1 TOPICS
                      </span>
                      <div className="p-1 rounded text-[9px] text-slate-500 flex items-center gap-1.5">
                        <span>✅</span> <span className="truncate">1.1 Contextualizing P1</span>
                      </div>
                      <div className="p-1 rounded text-[9px] text-slate-500 flex items-center gap-1.5">
                        <span>✅</span> <span className="truncate">1.2 Native American Soc</span>
                      </div>
                      <div className="p-1 rounded text-[9px] text-slate-500 flex items-center gap-1.5">
                        <span>✅</span> <span className="truncate">1.3 European Exploration</span>
                      </div>
                      <div className="p-1.5 bg-blue-50 border border-blue-100 rounded-lg text-[9px] text-blue-600 font-extrabold flex items-center gap-1.5">
                        <span>📝</span> <span className="truncate">1.4 Columbian Exchange</span>
                      </div>
                    </div>
                  </aside>

                  {/* Notes content */}
                  <main className="flex-1 p-6 flex flex-col justify-between overflow-hidden">
                    <div>
                      <div className="text-[9px] font-bold text-slate-400 mb-1">
                        Unit 1 / Topic 1.4 / Study Notes
                      </div>
                      <h2 className="text-base font-extrabold text-slate-800 leading-tight">
                        Columbian Exchange: The Great Conflux
                      </h2>

                      {/* Typewriter box */}
                      <div className="mt-3 bg-white border border-slate-200 rounded-xl p-3 text-[10px] leading-relaxed text-slate-600 min-h-[92px] font-mono whitespace-pre-wrap relative">
                        {displayedTextS2}
                        {typedLengthS2 < fullTextS2.length && (
                          <span className="inline-block w-1 h-3.5 bg-blue-500 ml-0.5 animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* Bullet Grid */}
                    <div className="grid grid-cols-3 gap-3 my-3">
                      {/* Bullet 1 */}
                      <div
                        className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col gap-1 transition-all"
                        style={{
                          opacity: opacityBullet1S2,
                          transform: `translateY(${(1 - opacityBullet1S2) * 15}px)`,
                        }}
                      >
                        <span className="text-lg">🌽</span>
                        <h4 className="font-extrabold text-[10px] text-slate-800">Crops Exchange</h4>
                        <p className="text-[8px] text-slate-500 leading-tight">
                          Maize, potatoes, and tomatoes introduced to Europe and Asia.
                        </p>
                      </div>

                      {/* Bullet 2 */}
                      <div
                        className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col gap-1 transition-all"
                        style={{
                          opacity: opacityBullet2S2,
                          transform: `translateY(${(1 - opacityBullet2S2) * 15}px)`,
                        }}
                      >
                        <span className="text-lg">🐎</span>
                        <h4 className="font-extrabold text-[10px] text-slate-800">Animals Introduced</h4>
                        <p className="text-[8px] text-slate-500 leading-tight">
                          Horses, pigs, and cattle introduced to the Americas.
                        </p>
                      </div>

                      {/* Bullet 3 */}
                      <div
                        className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col gap-1 transition-all"
                        style={{
                          opacity: opacityBullet3S2,
                          transform: `translateY(${(1 - opacityBullet3S2) * 15}px)`,
                        }}
                      >
                        <span className="text-lg">🦠</span>
                        <h4 className="font-extrabold text-[10px] text-rose-600">Disease Impact</h4>
                        <p className="text-[8px] text-slate-500 leading-tight">
                          Smallpox, measles decimated Native populations by 90%.
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA Next Button */}
                    <div
                      className="text-white text-[10px] font-bold py-2.5 px-6 rounded-xl self-end shadow-md transition-all mt-auto"
                      style={{
                        backgroundColor: isHoverButtonS2 ? "#1d4ed8" : "#2563eb",
                        transform: `scale(${buttonScaleS2})`,
                      }}
                    >
                      完成学习，进入练习 &rarr;
                    </div>
                  </main>
                </div>
              )}

              {/* --- SCENE 3: Video Sync Q&A (360 - 540 frames) [NEW SCENE] --- */}
              {activeSceneIndex === 2 && (
                <div
                  className="w-full h-full flex flex-col transition-transform"
                  style={{
                    transform: `scale(${zoomScaleS3})`,
                    backgroundColor: "#0f172a", // Dark screen for video player
                  }}
                >
                  {/* Browser frame representing video playing website */}
                  <div className="flex-1 flex flex-col relative bg-slate-950">
                    
                    {/* Video Source Top Tabs */}
                    <div className="absolute top-3 left-4 flex gap-2 z-10">
                      <span className="flex items-center gap-1 px-2.5 py-1 text-[9px] font-bold rounded bg-rose-500 text-white shadow-glow border border-rose-400/25">
                        B站优化视频源
                      </span>
                      <span className="px-2.5 py-1 text-[9px] font-bold text-slate-400 rounded bg-slate-800/80 border border-slate-700/50">
                        YouTube 原画源
                      </span>
                    </div>

                    <div className="absolute top-3 right-4 z-10 flex gap-2">
                      <span className="bg-black/60 text-white text-[9px] font-extrabold px-2 py-0.5 rounded border border-white/10">
                        Unit 3 · Topic 3.3
                      </span>
                    </div>

                    {/* Background Simulated History Video content */}
                    <div className="flex-1 flex flex-col items-center justify-center relative p-12 bg-gradient-to-tr from-slate-950 to-slate-800">
                      
                      {/* Video graphic layout */}
                      <div className="text-center space-y-4 max-w-md select-none opacity-80">
                        <div className="text-5xl">⚓️</div>
                        <h3 className="text-white text-base font-black tracking-wide">
                          No Taxation Without Representation!
                        </h3>
                        <p className="text-slate-400 text-[10px] leading-relaxed">
                          The Stamp Act of 1765 sparked widespread protests, leading to the Stamp Act Congress and coordinated boycotts of British goods.
                        </p>
                      </div>

                      {/* Video Center Play/Pause Indicator (Paused at 04:12) */}
                      {isVideoPausedS3 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-white/10 border border-white/30 text-white rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-lg">⏸️</span>
                            </div>
                            <span className="text-rose-400 text-[10px] font-bold tracking-widest bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full uppercase">
                              视频已暂停
                            </span>
                          </div>
                        </div>
                      )}

                      {/* --- CENTRAL INTERACTIVE Q&A MODAL OVERLAY --- */}
                      {showQAModalS3 && (
                        <div 
                          className="absolute z-20 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 flex flex-col gap-3 transition-all"
                          style={{
                            opacity: modalOpacityS3,
                            transform: `scale(${modalScaleS3})`,
                          }}
                        >
                          {/* Modal Header */}
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2 flex-shrink-0">
                            <span className="text-[10px] font-extrabold text-indigo-600 flex items-center gap-1">
                              💡 视频同步互动测 (Video Sync Q&A)
                            </span>
                            <span className="bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded text-[8px]">
                              检测点 1 (04:12)
                            </span>
                          </div>

                          <p className="text-[10.5px] font-black text-slate-800 leading-snug">
                            Which of the following describes the key colonial objection to the Stamp Act of 1765?
                          </p>

                          {/* Options */}
                          <div className="space-y-2">
                            {/* Option A */}
                            <div className="border border-slate-100 bg-slate-50 rounded-xl p-2.5 flex items-center gap-2 text-[9.5px] text-slate-500 opacity-60">
                              <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center font-bold text-[8px]">A</span>
                              <span>Acceptance of the tax as a regulation of external trade.</span>
                            </div>

                            {/* Option B */}
                            <div 
                              className="border rounded-xl p-2.5 flex items-center gap-2 text-[9.5px] font-bold transition-all"
                              style={{
                                transform: `scale(${optionBScaleS3})`,
                                borderColor: optionSelectedS3 ? "#10b981" : "#e2e8f0",
                                borderWidth: optionSelectedS3 ? "2px" : "1px",
                                backgroundColor: optionSelectedS3 ? "#ecfdf5" : "#ffffff",
                                color: optionSelectedS3 ? "#065f46" : "#334155",
                              }}
                            >
                              <span 
                                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                                style={{
                                  backgroundColor: optionSelectedS3 ? "#10b981" : "transparent",
                                  border: optionSelectedS3 ? "1px solid #10b981" : "1px solid #cbd5e1",
                                  color: optionSelectedS3 ? "#ffffff" : "#64748b",
                                }}
                              >
                                {optionSelectedS3 ? "✓" : "B"}
                              </span>
                              <span>Objection to direct taxes passed without colonial representation in Parliament.</span>
                            </div>
                          </div>

                          {/* Feedback Explanation */}
                          {optionSelectedS3 && (
                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 text-[9px] text-emerald-800 leading-relaxed">
                              <span className="font-extrabold block">🎉 回答正确！</span>
                              The Stamp Act was the first direct tax on colonists, sparking the famous slogan &ldquo;No taxation without representation.&rdquo;
                            </div>
                          )}

                          {/* Continue Button */}
                          {optionSelectedS3 && (
                            <button
                              className="self-end bg-slate-900 text-white font-extrabold text-[9px] py-1.5 px-4 rounded-full shadow transition-all hover:bg-slate-800"
                              style={{ transform: `scale(${continueBtnScaleS3})` }}
                            >
                              继续播放视频 →
                            </button>
                          )}
                        </div>
                      )}

                    </div>

                    {/* Video Player Bottom Controls bar */}
                    <div className="bg-slate-900/90 border-t border-slate-800 px-4 py-2 flex items-center justify-between shrink-0 select-none z-10">
                      <div className="flex items-center gap-3 text-white text-[10px]">
                        <span className="w-2.5 h-2.5 bg-rose-500 rounded-full block animate-pulse"></span>
                        <span className="font-mono">
                          {formatVideoTime(videoPlayProgress)} / 18:45
                        </span>
                      </div>

                      {/* Video Scrubber bar */}
                      <div className="flex-1 mx-4 h-1.5 bg-slate-700/60 rounded-full overflow-hidden relative">
                        {/* Play progress */}
                        <div 
                          className="h-full bg-rose-500 rounded-full"
                          style={{ width: `${(videoPlayProgress / 1125) * 100}%` }}
                        />
                        {/* Checkpoint Dots */}
                        <div 
                          className="absolute w-2.5 h-2.5 bg-amber-400 border border-slate-900 rounded-full top-1/2 -translate-y-1/2 cursor-pointer shadow"
                          style={{ left: `${(252 / 1125) * 100}%` }}
                          title="Interactive Checkpoint"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-slate-400">1080P</span>
                        <span className="text-[10px] text-slate-400">🔊</span>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* --- SCENE 4: Practice Studio (540 - 740 frames) --- */}
              {activeSceneIndex === 3 && (
                <div
                  className="w-full h-full flex flex-col transition-transform"
                  style={{
                    transform: `scale(${zoomScaleS4})`,
                    backgroundColor: "#fcfbf9",
                  }}
                >
                  {/* Practice Sub-header */}
                  <div className="h-12 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-extrabold bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                        Section I
                      </span>
                      <span className="text-[10px] font-black text-slate-700">Unit 1 Practice · Topic 1.4</span>
                    </div>

                    {/* Timer and Streak */}
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] font-semibold border border-slate-200 px-2.5 py-0.5 rounded-full text-slate-500">
                        ⏱️ 44:52
                      </span>
                      
                      {/* Streak counter */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Streak</span>
                        <div
                          className="w-6 h-6 rounded-full bg-amber-100 border border-amber-200 text-amber-600 flex items-center justify-center font-extrabold text-xs transition-transform"
                          style={{ transform: `scale(${streakScaleS4})` }}
                        >
                          {streakTextS4}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Work Pane splitting */}
                  <div className="flex-1 flex overflow-hidden">
                    {/* Left: Stimulus reading passage */}
                    <div className="w-1/2 border-r border-slate-200 bg-amber-50/10 p-5 flex flex-col gap-3">
                      <span className="text-[8px] font-bold text-slate-400 tracking-wider">
                        DIRECTIONS: READ PASSAGE
                      </span>
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 text-[10px] leading-relaxed text-slate-700 font-serif italic shadow-inner relative">
                        "...The Spanish arrival in the Americas initiated a series of exchanges that fundamentally transformed both hemispheres. Native populations were decimated by pathogens like smallpox, while{" "}
                        {/* Highlighting text effect */}
                        <span className="relative inline">
                          <span
                            className="absolute inset-0 bg-yellow-200/60 rounded-sm origin-left transition-transform duration-75"
                            style={{ transform: `scaleX(${highlightProgressS4})` }}
                          />
                          <span className="relative z-10 font-medium text-slate-800">
                            New World crops such as maize and potatoes revolutionized European agricultural practices
                          </span>
                        </span>{" "}
                        and triggered massive demographic growth across the Old World..."
                      </div>
                    </div>

                    {/* Right: Question and Answers */}
                    <div className="w-1/2 p-5 flex flex-col justify-between overflow-y-auto">
                      <div className="space-y-3">
                        {/* Question title card */}
                        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                            QUESTION 1
                          </span>
                          <p className="text-[10px] font-extrabold text-slate-800 mt-1 leading-snug">
                            Which of the following was a primary consequence of the Columbian Exchange on the European population?
                          </p>
                        </div>

                        {/* Options Stack */}
                        <div className="space-y-2">
                          {/* Option A */}
                          <div className={`bg-white border border-slate-200 rounded-xl p-2.5 flex items-center gap-3 transition-opacity ${optionSelectedS4 ? "opacity-60" : "opacity-100"}`}>
                            <span className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center font-bold text-[9px] text-slate-500 bg-slate-50">
                              A
                            </span>
                            <span className="text-[9px] text-slate-600">
                              Rapid demographic decline due to imported pathogens.
                            </span>
                          </div>

                          {/* Option B (The Target Option) */}
                          <div
                            className="rounded-xl p-2.5 flex items-center gap-3 transition-all border"
                            style={{
                              transform: `scale(${optionBScaleS4})`,
                              borderColor: showFeedbackS4 ? "#10b981" : optionSelectedS4 ? "#2563eb" : "#e2e8f0",
                              borderWidth: showFeedbackS4 || optionSelectedS4 ? "2.5px" : "1px",
                              backgroundColor: showFeedbackS4 ? "#ecfdf5" : optionSelectedS4 ? "#eff6ff" : "#ffffff",
                            }}
                          >
                            <span
                              className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] transition-colors"
                              style={{
                                backgroundColor: showFeedbackS4 ? "#10b981" : optionSelectedS4 ? "#2563eb" : "#f1f5f9",
                                color: optionSelectedS4 || showFeedbackS4 ? "#ffffff" : "#64748b",
                              }}
                            >
                              {showFeedbackS4 ? "✓" : "B"}
                            </span>
                            <span className="text-[9px] text-slate-700 font-bold">
                              Population growth spurred by introduction of American crops.
                            </span>
                          </div>

                          {/* Option C */}
                          <div className={`bg-white border border-slate-200 rounded-xl p-2.5 flex items-center gap-3 transition-opacity ${optionSelectedS4 ? "opacity-60" : "opacity-100"}`}>
                            <span className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center font-bold text-[9px] text-slate-500 bg-slate-50">
                              C
                            </span>
                            <span className="text-[9px] text-slate-600">
                              Wide adoption of Spanish feudal structures in municipalities.
                            </span>
                          </div>
                        </div>

                        {/* Explanation feedback block */}
                        {showFeedbackS4 && (
                          <div
                            className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex flex-col gap-0.5 transition-all"
                            style={{
                              opacity: feedbackOpacityS4,
                              transform: `translateY(${feedbackTranslateYS4}px)`,
                            }}
                          >
                            <span className="text-[10px] font-extrabold text-emerald-800 flex items-center gap-1.5">
                              ✨ 回答正确！(Correct Answer)
                            </span>
                            <p className="text-[8px] text-emerald-600 leading-normal">
                              Maize and potatoes were calorie-dense and led to agricultural boom and population rise in Europe.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Submit button at bottom */}
                      <div
                        className="text-[10px] font-bold py-2 rounded-xl text-center transition-all cursor-pointer mt-4"
                        style={{
                          backgroundColor: optionSelectedS4 ? "#1e293b" : "#cbd5e1",
                          color: optionSelectedS4 ? "#ffffff" : "#94a3b8",
                          transform: `scale(${submitScaleS4})`,
                        }}
                      >
                        Submit Answer
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- SCENE 5: CTA Outro screen (740 - 900 frames) --- */}
              {activeSceneIndex === 4 && (
                <div
                  className="w-full h-full relative flex flex-col items-center justify-center overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #0b0f19 0%, #1e1b4b 100%)",
                    color: "#ffffff",
                  }}
                >
                  {/* Blurred backgrounds */}
                  <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[50px] pointer-events-none" />
                  <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[50px] pointer-events-none" />

                  {/* Outro container content */}
                  <div className="flex flex-col items-center text-center relative z-10 px-6 max-w-lg">
                    {/* Glowing Logo Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-[0_8px_30px_rgba(99,102,241,0.4)] flex items-center justify-center text-2xl mb-4 transition-all"
                      style={{
                        opacity: logoOpacityS5,
                        transform: `scale(${logoScaleS5})`,
                      }}
                    >
                      🇺🇸
                    </div>

                    {/* Title & Subtitle */}
                    <h2
                      className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-none mb-1.5 transition-all"
                      style={{
                        opacity: logoOpacityS5,
                        transform: `scale(${logoScaleS5})`,
                      }}
                    >
                      APUSH Learning Site
                    </h2>
                    <p
                      className="text-xs font-semibold text-slate-400 leading-normal mb-5 transition-all"
                      style={{ opacity: logoOpacityS5 }}
                    >
                      Unlock your 5-Score in AP United States History
                    </p>

                    {/* Feature bullet list */}
                    <div className="flex flex-col gap-2.5 text-left mb-6 font-semibold text-[10.5px]">
                      {/* Point 1 */}
                      <div
                        className="flex items-center gap-2 text-slate-200 transition-all"
                        style={{
                          opacity: op1S5,
                          transform: `translateX(${(1 - op1S5) * -20}px)`,
                        }}
                      >
                        <span className="text-emerald-500 text-sm">✓</span>
                        <span>覆盖全九个 College Board 核心单元的学习流</span>
                      </div>
                      
                      {/* Point 2 */}
                      <div
                        className="flex items-center gap-2 text-slate-200 transition-all"
                        style={{
                          opacity: op2S5,
                          transform: `translateX(${(1 - op2S5) * -20}px)`,
                        }}
                      >
                        <span className="text-emerald-500 text-sm">✓</span>
                        <span>交互式视频随堂测，提供即时判分与同步解析</span>
                      </div>

                      {/* Point 3 */}
                      <div
                        className="flex items-center gap-2 text-slate-200 transition-all"
                        style={{
                          opacity: op3S5,
                          transform: `translateX(${(1 - op3S5) * -20}px)`,
                        }}
                      >
                        <span className="text-emerald-500 text-sm">✓</span>
                        <span>智能错题本自动分类，助力考前靶向冲刺备战</span>
                      </div>
                    </div>

                    {/* Pulsing CTA Action Button */}
                    <div
                      className="bg-white text-slate-900 font-extrabold text-xs py-3 px-8 rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.15)] transition-all cursor-pointer hover:bg-slate-50"
                      style={{
                        opacity: buttonOpacityS5,
                        transform: `scale(${isClickingButtonS5 ? 0.95 : buttonScaleS5})`,
                      }}
                    >
                      Start Studying for Free
                    </div>
                  </div>
                </div>
              )}

              {/* --- SIMULATED MOUSE CURSOR --- */}
              <div
                className="absolute w-5 h-5 pointer-events-none z-50 transition-all duration-75 select-none"
                style={{
                  left: `${activeMouseX}%`,
                  top: `${activeMouseY}%`,
                  transform: "translate(-2px, -2px)",
                }}
              >
                {/* Click Ripple Indicator */}
                <AnimatePresence>
                  {isClicking && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0.8 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-blue-500 pointer-events-none"
                      style={{ transform: "translate(-50%, -50%)" }}
                    />
                  )}
                </AnimatePresence>

                {/* macOS style cursor arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`transition-transform duration-100 ${isClicking ? "scale-90" : "scale-100"}`}
                >
                  <path
                    d="M3.1 1.7L17.5 13.9C17.9 14.2 17.8 14.8 17.3 14.9L11.5 15.6C11.1 15.7 10.8 15.9 10.6 16.2L6.8 21.3C6.4 21.7 5.8 21.4 5.8 20.9L5.3 14.1C5.3 13.7 5.0 13.4 4.7 13.2L0.7 11.2C0.2 10.9 0.2 10.3 0.7 10.1L16.2 1.3C16.6 1.1 17.0 1.4 16.8 1.9L12.3 15.3C12.1 15.8 11.4 15.8 11.2 15.3L8.6 10.3C8.4 10.0 8.1 9.8 7.8 9.7L2.4 8.7C1.9 8.6 1.8 7.9 2.2 7.7L3.1 1.7Z"
                    fill="white"
                  />
                  <path
                    d="M4.3 3.6L15.3 12.9L10.9 13.4C10.4 13.5 10.0 13.8 9.7 14.2L6.8 18.2L6.4 13.1C6.4 12.6 6.0 12.2 5.5 12.0L2.5 10.5L14.3 3.8L10.8 14.1C10.6 14.7 9.8 14.7 9.6 14.1L7.6 10.3C7.3 9.8 6.9 9.5 6.4 9.4L2.3 8.6L4.3 3.6Z"
                    fill="black"
                  />
                </svg>
              </div>

              {/* Subtitles Overlay Bar */}
              <div className="absolute bottom-5 left-10 right-10 z-40 flex justify-center select-none pointer-events-none">
                <span className="bg-black/75 text-white font-medium text-xs md:text-sm px-6 py-2 rounded-xl text-center leading-normal max-w-xl shadow-lg border border-white/10 backdrop-blur-sm">
                  {activeCaption}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Global Playback Controller Bar */}
          <div className="glass-panel px-6 py-4 bg-white/95 border border-white/30 rounded-3xl flex flex-col gap-3 shadow-md select-none">
            {/* Timeline track and scrubber */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 font-mono shrink-0">
                {formatTimer(frame).split(".")[0]}
              </span>

              {/* Range slider */}
              <input
                type="range"
                min="0"
                max={TOTAL_FRAMES - 1}
                value={frame}
                onChange={(e) => {
                  setFrame(Number.parseInt(e.target.value, 10));
                  setIsPlaying(false); // Pause on scrub
                }}
                className="flex-1 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
              />

              <span className="text-[10px] font-bold text-slate-400 font-mono shrink-0">
                {formatTimer(TOTAL_FRAMES).split(".")[0]}
              </span>
            </div>

            {/* Playback Controls buttons row */}
            <div className="flex items-center justify-between">
              {/* Play Pause Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    playClickSound();
                  }}
                  className="w-10 h-10 rounded-full bg-midnight hover:bg-midnight/90 text-white flex items-center justify-center transition-all shadow-md active:scale-95"
                  aria-label={isPlaying ? "暂停" : "播放"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white translate-x-0.5" />}
                </button>

                <button
                  onClick={() => {
                    setFrame(0);
                    setIsPlaying(true);
                    playClickSound();
                  }}
                  className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors"
                  aria-label="重放"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Sound Toggle */}
                <button
                  onClick={() => {
                    setIsMuted(!isMuted);
                    if (isMuted) {
                      setTimeout(() => {
                        try {
                          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                          const osc = audioCtx.createOscillator();
                          osc.connect(audioCtx.destination);
                          osc.start();
                          osc.stop(audioCtx.currentTime + 0.1);
                        } catch(e){}
                      }, 100);
                    }
                  }}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                    isMuted
                      ? "border-slate-200 text-slate-400 hover:bg-slate-50"
                      : "border-blue-200 text-blue-600 bg-blue-50/50 hover:bg-blue-50"
                  }`}
                  aria-label={isMuted ? "解禁音效" : "静音音效"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Subtitles status text indicator */}
              <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400 font-semibold bg-slate-50 border border-slate-200/50 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
                <span>正在播放: {scenes[activeSceneIndex].title}</span>
              </div>

              {/* Playback speed rate toggler */}
              <div className="flex items-center gap-1.5">
                {[1, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => {
                      setPlaybackRate(rate);
                      playClickSound();
                    }}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                      playbackRate === rate
                        ? "bg-blue-500 border-blue-500 text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
