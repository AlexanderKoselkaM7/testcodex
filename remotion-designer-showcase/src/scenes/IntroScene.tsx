import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80, mass: 1 },
  });

  const logoRotation = interpolate(frame, [0, 80], [0, 45]);

  // Title animation
  const titleY = interpolate(frame, [15, 40], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle animation
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Background pulse
  const pulse = Math.sin(frame * 0.03) * 0.1 + 0.9;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d0d 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated background gradient */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          transform: `scale(${pulse})`,
          filter: "blur(60px)",
        }}
      />

      {/* Floating accent circles */}
      {[0, 1, 2].map((i) => {
        const delay = i * 10;
        const y = interpolate(frame - delay, [0, 80], [20, -20]);
        const opacity = interpolate(frame - delay, [0, 20], [0, 0.6], {
          extrapolateRight: "clamp",
        });
        const colors = ["#6366f1", "#8b5cf6", "#ec4899"];
        const positions = [
          { left: "20%", top: "30%" },
          { right: "25%", top: "25%" },
          { left: "15%", bottom: "35%" },
        ];

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              ...positions[i],
              width: 100 + i * 30,
              height: 100 + i * 30,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${colors[i]}40 0%, transparent 70%)`,
              transform: `translateY(${y}px)`,
              opacity,
              filter: "blur(30px)",
            }}
          />
        );
      })}

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: 100,
            height: 100,
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
            borderRadius: 24,
            transform: `scale(${logoProgress}) rotate(${logoRotation}deg)`,
            boxShadow: "0 20px 60px rgba(99, 102, 241, 0.4)",
            marginBottom: 50,
          }}
        />

        {/* Title */}
        <h1
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "white",
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: 0,
            letterSpacing: -2,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          REMOTION
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.6)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: "16px 0 0 0",
            letterSpacing: 6,
            opacity: subtitleOpacity,
            fontWeight: 500,
          }}
        >
          VIDEO FOR DESIGNERS
        </p>
      </div>
    </AbsoluteFill>
  );
};
