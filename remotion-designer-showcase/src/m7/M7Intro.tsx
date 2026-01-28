import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const M7Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const logoRotate = interpolate(frame, [0, 90], [-10, 0], {
    extrapolateRight: "clamp",
  });

  // Tagline animation
  const taglineOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taglineY = interpolate(frame, [30, 50], [30, 0], {
    extrapolateRight: "clamp",
  });

  // Stars animation
  const star1Scale = spring({ frame: frame - 20, fps, config: { damping: 10 } });
  const star2Scale = spring({ frame: frame - 30, fps, config: { damping: 10 } });
  const star3Scale = spring({ frame: frame - 40, fps, config: { damping: 10 } });

  // Background pulse
  const pulse = Math.sin(frame * 0.02) * 0.1 + 1;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated gradient background */}
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 107, 107, 0.15) 0%, transparent 60%)",
          transform: `scale(${pulse})`,
          filter: "blur(80px)",
        }}
      />

      {/* Decorative stars */}
      <Img
        src={staticFile("projects/m7/images/star-1.png")}
        style={{
          position: "absolute",
          width: 60,
          left: "20%",
          top: "25%",
          transform: `scale(${Math.max(star1Scale, 0)}) rotate(${frame * 0.5}deg)`,
          opacity: 0.8,
        }}
      />
      <Img
        src={staticFile("projects/m7/images/star-2.png")}
        style={{
          position: "absolute",
          width: 40,
          right: "25%",
          top: "30%",
          transform: `scale(${Math.max(star2Scale, 0)}) rotate(${-frame * 0.3}deg)`,
          opacity: 0.6,
        }}
      />
      <Img
        src={staticFile("projects/m7/images/star-3.png")}
        style={{
          position: "absolute",
          width: 50,
          left: "30%",
          bottom: "30%",
          transform: `scale(${Math.max(star3Scale, 0)}) rotate(${frame * 0.4}deg)`,
          opacity: 0.7,
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
        {/* M7 Logo */}
        <Img
          src={staticFile("projects/m7/images/m7-logo.svg")}
          style={{
            width: 200,
            transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
            filter: "drop-shadow(0 20px 40px rgba(255, 107, 107, 0.3))",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            marginTop: 50,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "white",
              fontFamily: "system-ui, -apple-system, sans-serif",
              margin: 0,
              letterSpacing: 4,
            }}
          >
            BRANDING AGENCY
          </h1>
          <p
            style={{
              fontSize: 20,
              color: "rgba(255, 255, 255, 0.6)",
              fontFamily: "system-ui, -apple-system, sans-serif",
              marginTop: 16,
              letterSpacing: 2,
            }}
          >
            Design • Strategy • Digital
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
