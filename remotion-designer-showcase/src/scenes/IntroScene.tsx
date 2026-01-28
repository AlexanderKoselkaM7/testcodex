import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { Trail } from "@remotion/motion-blur";

const RotatingLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const rotation = interpolate(frame, [0, 75], [0, 360]);
  const glowIntensity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 120,
        height: 120,
        background: "linear-gradient(135deg, #e63946 0%, #f4a261 100%)",
        borderRadius: 24,
        transform: `scale(${logoScale}) rotate(${rotation * 0.1}deg)`,
        boxShadow: `0 0 60px rgba(230, 57, 70, ${glowIntensity * 0.8})`,
      }}
    />
  );
};

const RotatingRing: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const rotation = interpolate(frame, [0, 75], [0, 360]);

  return (
    <div
      style={{
        position: "absolute",
        width: 400 + index * 150,
        height: 400 + index * 150,
        borderRadius: "50%",
        border: `2px solid rgba(230, 57, 70, ${0.1 - index * 0.015})`,
        transform: `rotate(${rotation + index * 20}deg)`,
      }}
    />
  );
};

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const titleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [20, 45], [50, 0], {
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateRight: "clamp",
  });

  const glowIntensity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Animated background circles with motion blur */}
      {[...Array(5)].map((_, i) => (
        <Trail key={i} lagInFrames={2} trailOpacity={0.4} layers={4}>
          <RotatingRing index={i} />
        </Trail>
      ))}

      {/* Glowing orb */}
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(230, 57, 70, ${glowIntensity * 0.6}) 0%, transparent 70%)`,
          filter: `blur(40px)`,
          transform: `scale(${logoScale})`,
        }}
      />

      {/* Logo shape with motion blur */}
      <div style={{ marginBottom: 40 }}>
        <Trail lagInFrames={3} trailOpacity={0.5} layers={5}>
          <RotatingLogo />
        </Trail>
      </div>

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            fontFamily: "system-ui, sans-serif",
            margin: 0,
            letterSpacing: -2,
            textShadow: "0 0 40px rgba(230, 57, 70, 0.5)",
          }}
        >
          REMOTION
        </h1>
        <div
          style={{
            fontSize: 28,
            color: "#f4a261",
            fontWeight: 500,
            marginTop: 8,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: 8,
            opacity: subtitleOpacity,
          }}
        >
          FOR DESIGNERS
        </div>
      </div>
    </AbsoluteFill>
  );
};
