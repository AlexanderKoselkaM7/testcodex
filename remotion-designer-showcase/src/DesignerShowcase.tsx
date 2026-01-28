import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { IntroScene } from "./scenes/IntroScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { AnimationScene } from "./scenes/AnimationScene";
import { OutroScene } from "./scenes/OutroScene";

export const DesignerShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  // Smooth cross-fade transitions
  const scene1Opacity = interpolate(frame, [0, 60, 70], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene2Opacity = interpolate(frame, [60, 70, 140, 150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene3Opacity = interpolate(frame, [140, 150, 220, 230], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene4Opacity = interpolate(frame, [220, 230, 300], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0d0d0d" }}>
      {/* Scene 1: Intro */}
      <Sequence from={0} durationInFrames={80}>
        <AbsoluteFill style={{ opacity: scene1Opacity }}>
          <IntroScene />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Features */}
      <Sequence from={60} durationInFrames={100}>
        <AbsoluteFill style={{ opacity: scene2Opacity }}>
          <FeaturesScene />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Animation Demo */}
      <Sequence from={140} durationInFrames={100}>
        <AbsoluteFill style={{ opacity: scene3Opacity }}>
          <AnimationScene />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Outro */}
      <Sequence from={220} durationInFrames={80}>
        <AbsoluteFill style={{ opacity: scene4Opacity }}>
          <OutroScene />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
