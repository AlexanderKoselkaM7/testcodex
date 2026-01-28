import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { BuitenstateIntro } from "./BuitenstateIntro";
import { BuitenstateNature } from "./BuitenstateNature";
import { BuitenstateWhy } from "./BuitenstateWhy";
import { BuitenstateProcess } from "./BuitenstateProcess";
import { BuitenstateOutro } from "./BuitenstateOutro";
import { BS_COLORS } from "./BuitenstateStyles";

export const BuitenstateShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene transitions (adjusted for 5 scenes, total ~550 frames / ~9 seconds)
  const intro = interpolate(frame, [0, 80, 90], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nature = interpolate(frame, [80, 90, 180, 190], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const why = interpolate(frame, [180, 190, 290, 300], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const process = interpolate(frame, [290, 300, 450, 460], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outro = interpolate(frame, [450, 460, 550], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BS_COLORS.cream }}>
      {/* Scene 1: Intro */}
      <Sequence from={0} durationInFrames={100}>
        <AbsoluteFill style={{ opacity: intro }}>
          <BuitenstateIntro />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Nature - 3D Tree */}
      <Sequence from={80} durationInFrames={120}>
        <AbsoluteFill style={{ opacity: nature }}>
          <BuitenstateNature />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Why Buitenstate */}
      <Sequence from={180} durationInFrames={130}>
        <AbsoluteFill style={{ opacity: why }}>
          <BuitenstateWhy />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Process */}
      <Sequence from={290} durationInFrames={180}>
        <AbsoluteFill style={{ opacity: process }}>
          <BuitenstateProcess />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: Outro */}
      <Sequence from={450} durationInFrames={100}>
        <AbsoluteFill style={{ opacity: outro }}>
          <BuitenstateOutro />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
