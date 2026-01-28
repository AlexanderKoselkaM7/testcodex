import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { M7Intro } from "./M7Intro";
import { M7Services } from "./M7Services";
import { M7Clients } from "./M7Clients";
import { M7Projects } from "./M7Projects";
import { M7Outro } from "./M7Outro";

export const M7Showcase: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene transitions with cross-fade
  const intro = interpolate(frame, [0, 70, 80], [1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const services = interpolate(frame, [70, 80, 160, 170], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const clients = interpolate(frame, [160, 170, 250, 260], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const projects = interpolate(frame, [250, 260, 350, 360], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const outro = interpolate(frame, [350, 360, 420], [0, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Scene 1: Intro with M7 Logo */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill style={{ opacity: intro }}>
          <M7Intro />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Services */}
      <Sequence from={70} durationInFrames={110}>
        <AbsoluteFill style={{ opacity: services }}>
          <M7Services />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Clients */}
      <Sequence from={160} durationInFrames={110}>
        <AbsoluteFill style={{ opacity: clients }}>
          <M7Clients />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Projects */}
      <Sequence from={250} durationInFrames={120}>
        <AbsoluteFill style={{ opacity: projects }}>
          <M7Projects />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: Outro */}
      <Sequence from={350} durationInFrames={70}>
        <AbsoluteFill style={{ opacity: outro }}>
          <M7Outro />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
