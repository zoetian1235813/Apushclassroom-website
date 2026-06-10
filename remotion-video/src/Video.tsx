import { Sequence, AbsoluteFill } from 'remotion';
import { BrowserFrame } from './components/BrowserFrame';
import { Scene1_Home } from './scenes/Scene1_Home';
import { Scene2_Study } from './scenes/Scene2_Study';
import { Scene3_Practice } from './scenes/Scene3_Practice';
import { Scene4_Outro } from './scenes/Scene4_Outro';

export const VideoComposition = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a' }}>
      
      {/* 1. Main interactive browser-framed UI sequence (0 - 750 frames) */}
      <Sequence from={0} durationInFrames={750}>
        <BrowserFrame url="apush-classroom.com/studyflow">
          
          {/* Scene 1: Home Dashboard View (0 - 240 frames / 8 seconds) */}
          <Sequence from={0} durationInFrames={240}>
            <Scene1_Home />
          </Sequence>

          {/* Scene 2: Study Notes View (240 - 450 frames / 7 seconds) */}
          <Sequence from={240} durationInFrames={210}>
            <Scene2_Study />
          </Sequence>

          {/* Scene 3: Practice Studio View (450 - 750 frames / 10 seconds) */}
          <Sequence from={450} durationInFrames={300}>
            <Scene3_Practice />
          </Sequence>

        </BrowserFrame>
      </Sequence>

      {/* 2. Outro and Call to Action scene (750 - 900 frames / 5 seconds) */}
      <Sequence from={750} durationInFrames={150}>
        <Scene4_Outro />
      </Sequence>

    </AbsoluteFill>
  );
};
