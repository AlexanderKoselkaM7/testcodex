import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { Trail } from "@remotion/motion-blur";

const RotatingRing: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const rotation = interpolate(frame, [0, 75], [0, 360]);

  return (
    <div
      style={{
        position: "absolute",
        width: 200 + index * 200,
        height: 200 + index * 200,
        borderRadius: "50%",
        border: `1px solid rgba(230, 57, 70, ${0.15 - index * 0.015})`,
        transform: `rotate(${rotation + index * 15}deg)`,
      }}
    />
  );
};

const RotatingLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const rotation = interpolate(frame, [0, 75], [0, 360]);

  return (
    <div
      style={{
        width: 80,
        height: 80,
        background: "linear-gradient(135deg, #e63946 0%, #f4a261 100%)",
        borderRadius: 16,
        transform: `scale(${titleScale}) rotate(${rotation * 0.05}deg)`,
        boxShadow: "0 0 60px rgba(230, 57, 70, 0.6)",
      }}
    />
  );
};

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(frame, [15, 35], [30, 0], {
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const ctaScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const fadeOut = interpolate(frame, [60, 75], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 50%, #16213e 100%)",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Animated background rings with motion blur */}
      {[...Array(8)].map((_, i) => (
        <Trail key={i} lagInFrames={2} trailOpacity={0.4} layers={4}>
          <RotatingRing index={i} />
        </Trail>
      ))}

      {/* Glowing background orbs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(230, 57, 70, 0.2) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(42, 157, 143, 0.2) 0%, transparent 60%)",
          filter: "blur(40px)",
          transform: "translate(300px, 200px)",
        }}
      />

      {/* Main content */}
      <div
        style={{
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* Logo with motion blur */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <Trail lagInFrames={3} trailOpacity={0.5} layers={5}>
            <RotatingLogo />
          </Trail>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "white",
            fontFamily: "system-ui, sans-serif",
            margin: 0,
            letterSpacing: -3,
            transform: `scale(${titleScale})`,
            textShadow: "0 0 60px rgba(230, 57, 70, 0.4)",
          }}
        >
          START CREATING
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.7)",
            fontFamily: "system-ui, sans-serif",
            margin: "24px 0 0 0",
            fontWeight: 400,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          Programmatic video creation for designers
        </p>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 50,
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "20px 50px",
              background: "linear-gradient(135deg, #e63946 0%, #f4a261 100%)",
              borderRadius: 50,
              fontSize: 20,
              fontWeight: 700,
              color: "white",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: 2,
              boxShadow: "0 10px 40px rgba(230, 57, 70, 0.4)",
            }}
          >
            remotion.dev
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => {
        const x = 100 + (i * 60) % 1720;
        const startY = 1100;
        const endY = -100;
        const particleY = interpolate(
          frame,
          [0, 75],
          [startY - (i % 5) * 100, endY + (i % 3) * 50]
        );
        const particleOpacity = interpolate(
          frame,
          [0, 10, 65, 75],
          [0, 0.8, 0.8, 0]
        );
        const colors = ["#e63946", "#f4a261", "#e9c46a", "#2a9d8f", "#264653"];

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + Math.sin(frame * 0.05 + i) * 20,
              top: particleY,
              width: 4 + (i % 4) * 2,
              height: 4 + (i % 4) * 2,
              borderRadius: "50%",
              backgroundColor: colors[i % 5],
              opacity: particleOpacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
