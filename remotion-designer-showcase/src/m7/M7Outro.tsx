import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { M7_COLORS, DotPattern, AnimatedText } from "./M7Styles";

export const M7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 150 },
  });

  // CTA animation
  const ctaOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateRight: "clamp",
  });

  const ctaScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Social icons
  const socials = [
    { icon: "facebook.svg", delay: 40 },
    { icon: "linkedin.svg", delay: 45 },
    { icon: "instagram.svg", delay: 50 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: M7_COLORS.black,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Dot patterns - corners */}
      <div style={{ position: "absolute", left: 40, top: 40 }}>
        <DotPattern
          rows={6}
          cols={10}
          dotSize={4}
          gap={10}
          color={M7_COLORS.gray}
          animate={true}
          direction="diagonal"
          staggerDelay={0.4}
        />
      </div>
      <div style={{ position: "absolute", right: 40, bottom: 40 }}>
        <DotPattern
          rows={6}
          cols={10}
          dotSize={4}
          gap={10}
          color={M7_COLORS.gray}
          animate={true}
          direction="diagonal"
          staggerDelay={0.4}
        />
      </div>

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
            transform: `scale(${logoScale})`,
            marginBottom: 50,
          }}
        >
          <Img
            src={staticFile("projects/m7/images/m7-logo.svg")}
            style={{
              width: 160,
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>

        {/* Orange bar */}
        <div
          style={{
            width: interpolate(frame, [10, 25], [0, 120], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            height: 4,
            backgroundColor: M7_COLORS.orange,
            marginBottom: 50,
          }}
        />

        {/* CTA Text */}
        <AnimatedText
          text="LET'S CREATE"
          fontSize={72}
          fontWeight={900}
          color={M7_COLORS.white}
          delay={15}
          speed={2}
          style={{ marginBottom: 8 }}
        />
        <AnimatedText
          text="TOGETHER."
          fontSize={72}
          fontWeight={900}
          color={M7_COLORS.orange}
          delay={28}
          speed={2}
        />

        {/* Website CTA button */}
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
              backgroundColor: M7_COLORS.orange,
              color: M7_COLORS.black,
              fontSize: 18,
              fontWeight: 700,
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: 2,
            }}
          >
            M7BRANDING.COM
          </div>
        </div>

        {/* Social icons */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 40,
          }}
        >
          {socials.map(({ icon, delay }) => {
            const iconScale = spring({
              frame: frame - delay,
              fps,
              config: { damping: 12, stiffness: 150 },
            });

            const iconOpacity = interpolate(frame - delay, [0, 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={icon}
                style={{
                  width: 50,
                  height: 50,
                  border: `2px solid ${M7_COLORS.gray}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: iconOpacity,
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

      {/* Orange glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${M7_COLORS.orange}10 0%, transparent 60%)`,
          filter: "blur(100px)",
        }}
      />
    </AbsoluteFill>
  );
};
