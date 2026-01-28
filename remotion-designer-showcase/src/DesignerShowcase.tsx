import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { IntroScene } from "./scenes/IntroScene";
import { TypographyScene } from "./scenes/TypographyScene";
import { ShapesScene } from "./scenes/ShapesScene";
import { ColorsScene } from "./scenes/ColorsScene";
import { MotionScene } from "./scenes/MotionScene";
import { OutroScene } from "./scenes/OutroScene";

export const DesignerShowcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <Sequence from={0} durationInFrames={75}>
        <IntroScene />
      </Sequence>
      <Sequence from={75} durationInFrames={75}>
        <TypographyScene />
      </Sequence>
      <Sequence from={150} durationInFrames={75}>
        <ShapesScene />
      </Sequence>
      <Sequence from={225} durationInFrames={75}>
        <ColorsScene />
      </Sequence>
      <Sequence from={300} durationInFrames={75}>
        <MotionScene />
      </Sequence>
      <Sequence from={375} durationInFrames={75}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
