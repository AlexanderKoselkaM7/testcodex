import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const logoRotation = interpolate(frame, [0, 80], [0, 360]);

  // Text animations
  const titleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [10, 30], [40, 0], {
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateRight: "clamp",
  });

  const ctaScale = spring({
    frame: frame - 35,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const ctaOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Particle positions
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: 100 + (i * 97) % 1720,
    startY: 1200,
    endY: -100,
    size: 4 + (i % 3) * 2,
    color: ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"][i % 5],
    speed: 0.8 + (i % 4) * 0.1,
  }));

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d0d 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated background rings */}
      {[0, 1, 2, 3].map((i) => {
        const ringScale = interpolate(frame, [0, 80], [0.8, 1.2]);
        const ringOpacity = 0.08 - i * 0.015;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 400 + i * 200,
              height: 400 + i * 200,
              borderRadius: "50%",
              border: `1px solid rgba(99, 102, 241, ${ringOpacity})`,
              transform: `scale(${ringScale}) rotate(${logoRotation * 0.5 + i * 15}deg)`,
            }}
          />
        );
      })}

      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 60%)",
          filter: "blur(60px)",
          transform: `scale(${logoScale})`,
        }}
      />

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
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
            borderRadius: 20,
            transform: `scale(${logoScale}) rotate(${logoRotation * 0.1}deg)`,
            boxShadow: "0 20px 60px rgba(99, 102, 241, 0.5)",
            marginBottom: 50,
          }}
        />

        {/* Title */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: 0,
            letterSpacing: -2,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          Start Creating
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 22,
            color: "rgba(255, 255, 255, 0.6)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: "20px 0 0 0",
            opacity: subtitleOpacity,
          }}
        >
          Build stunning videos with React
        </p>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 50,
            opacity: ctaOpacity,
            transform: `scale(${Math.max(ctaScale, 0)})`,
          }}
        >
          <div
            style={{
              padding: "18px 48px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              borderRadius: 40,
              fontSize: 18,
              fontWeight: 700,
              color: "white",
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: 1,
              boxShadow: "0 15px 40px rgba(99, 102, 241, 0.4)",
            }}
          >
            remotion.dev
          </div>
        </div>
      </div>

      {/* Rising particles */}
      {particles.map((particle, i) => {
        const particleY = interpolate(
          frame,
          [0, 80],
          [particle.startY, particle.endY],
        );
        const particleOpacity = interpolate(
          frame,
          [0, 15, 65, 80],
          [0, 0.8, 0.8, 0],
        );
        const wobble = Math.sin(frame * 0.1 + i) * 15;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: particle.x + wobble,
              top: particleY * particle.speed,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              backgroundColor: particle.color,
              opacity: particleOpacity,
              boxShadow: `0 0 10px ${particle.color}60`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
