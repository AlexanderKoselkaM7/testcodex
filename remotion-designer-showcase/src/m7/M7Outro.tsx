import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const M7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Text animations
  const titleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [10, 30], [40, 0], {
    extrapolateRight: "clamp",
  });

  const ctaScale = spring({
    frame: frame - 25,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const ctaOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Social icons
  const socialOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateRight: "clamp",
  });

  const socials = ["facebook.svg", "linkedin.svg", "instagram.svg"];

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated rings */}
      {[0, 1, 2, 3].map((i) => {
        const ringOpacity = 0.1 - i * 0.02;
        const ringScale = interpolate(frame, [0, 70], [0.9, 1.1]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 300 + i * 150,
              height: 300 + i * 150,
              borderRadius: "50%",
              border: `1px solid rgba(255, 107, 107, ${ringOpacity})`,
              transform: `scale(${ringScale})`,
            }}
          />
        );
      })}

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 107, 107, 0.15) 0%, transparent 60%)",
          filter: "blur(60px)",
          transform: `scale(${logoScale})`,
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <Img
          src={staticFile("projects/m7/images/m7-logo.svg")}
          style={{
            width: 120,
            transform: `scale(${logoScale})`,
            filter: "drop-shadow(0 15px 30px rgba(255, 107, 107, 0.3))",
          }}
        />

        {/* CTA Text */}
        <div
          style={{
            marginTop: 50,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "white",
              fontFamily: "system-ui, -apple-system, sans-serif",
              margin: 0,
              letterSpacing: -1,
            }}
          >
            Let's Create Together
          </h1>
        </div>

        {/* Website button */}
        <div
          style={{
            marginTop: 40,
            opacity: ctaOpacity,
            transform: `scale(${Math.max(ctaScale, 0)})`,
          }}
        >
          <div
            style={{
              padding: "18px 48px",
              background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)",
              borderRadius: 40,
              fontSize: 20,
              fontWeight: 700,
              color: "white",
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: 1,
              boxShadow: "0 15px 40px rgba(255, 107, 107, 0.4)",
            }}
          >
            m7branding.com
          </div>
        </div>

        {/* Social icons */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 40,
            opacity: socialOpacity,
          }}
        >
          {socials.map((icon, i) => {
            const iconScale = spring({
              frame: frame - 45 - i * 5,
              fps,
              config: { damping: 12, stiffness: 100 },
            });

            return (
              <div
                key={icon}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: `scale(${Math.max(iconScale, 0)})`,
                }}
              >
                <Img
                  src={staticFile(`projects/m7/icons/${icon}`)}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
