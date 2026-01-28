import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { Trail } from "@remotion/motion-blur";

const words = ["ANIMATE", "DESIGN", "CREATE", "INSPIRE"];
const colors = ["#e63946", "#f4a261", "#2a9d8f", "#e9c46a"];

const AnimatedWord: React.FC<{ word: string; index: number }> = ({ word, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 8;
  const wordSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const x = interpolate(frame - delay, [0, 15], [-100, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontSize: 120,
        fontWeight: 900,
        color: "white",
        fontFamily: "system-ui, sans-serif",
        letterSpacing: -4,
        opacity,
        transform: `translateX(${x}px) scale(${wordSpring})`,
        textShadow: `0 0 80px ${colors[index]}40`,
        WebkitTextStroke: index % 2 === 1 ? "2px white" : "none",
        WebkitTextFillColor: index % 2 === 1 ? "transparent" : "white",
      }}
    >
      {word.split("").map((char, charIndex) => {
        const charDelay = delay + charIndex * 2;
        const charOpacity = interpolate(
          frame - charDelay,
          [0, 5],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <span
            key={charIndex}
            style={{
              display: "inline-block",
              opacity: charOpacity,
              color: charIndex === 0 ? colors[index] : undefined,
              WebkitTextFillColor:
                charIndex === 0 ? colors[index] : index % 2 === 1 ? "transparent" : "white",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

export const TypographyScene: React.FC = () => {
  const frame = useCurrentFrame();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0f3460 0%, #1a1a2e 100%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          opacity: labelOpacity,
        }}
      >
        <span
          style={{
            fontSize: 14,
            color: "#e63946",
            fontWeight: 600,
            letterSpacing: 4,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          01 / TYPOGRAPHY
        </span>
      </div>

      {/* Animated words with motion blur */}
      {words.map((word, i) => (
        <Trail key={word} lagInFrames={3} trailOpacity={0.5} layers={5}>
          <AnimatedWord word={word} index={i} />
        </Trail>
      ))}
    </AbsoluteFill>
  );
};
