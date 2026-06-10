import { Composition } from 'remotion';
import { VideoComposition } from './Video';

export const Root = () => {
  return (
    <>
      <Composition
        id="apush-promo"
        component={VideoComposition}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
