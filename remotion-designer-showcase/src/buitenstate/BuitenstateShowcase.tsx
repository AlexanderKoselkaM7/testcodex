import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { BuitenstateIntro } from "./BuitenstateIntro";
import { BuitenstateWhy } from "./BuitenstateWhy";
import { BuitenstateProcess } from "./BuitenstateProcess";
import { BuitenstateOutro } from "./BuitenstateOutro";
import { BS_COLORS } from "./BuitenstateStyles";

export const BuitenstateShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene transitions
  const intro = interpolate(frame, [0, 90, 100], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const why = interpolate(frame, [90, 100, 200, 210], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const process = interpolate(frame, [200, 210, 360, 370], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outro = interpolate(frame, [360, 370, 450], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BS_COLORS.cream }}>
      {/* Scene 1: Intro */}
      <Sequence from={0} durationInFrames={110}>
        <AbsoluteFill style={{ opacity: intro }}>
          <BuitenstateIntro />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Why Buitenstate */}
      <Sequence from={90} durationInFrames={130}>
        <AbsoluteFill style={{ opacity: why }}>
          <BuitenstateWhy />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Process */}
      <Sequence from={200} durationInFrames={180}>
        <AbsoluteFill style={{ opacity: process }}>
          <BuitenstateProcess />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Outro */}
      <Sequence from={360} durationInFrames={90}>
        <AbsoluteFill style={{ opacity: outro }}>
          <BuitenstateOutro />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
