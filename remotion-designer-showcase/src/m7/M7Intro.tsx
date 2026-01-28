import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { M7_COLORS, DotPattern, AnimatedText, WipeReveal } from "./M7Styles";

export const M7Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation - fast snap in
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 200, mass: 0.8 },
  });

  const logoOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Orange accent bar
  const barWidth = interpolate(frame, [15, 30], [0, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline appears
  const taglineOpacity = interpolate(frame, [40, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: M7_COLORS.black,
        overflow: "hidden",
      }}
    >
      {/* Dot pattern - bottom left */}
      <div style={{ position: "absolute", left: 60, bottom: 80 }}>
        <DotPattern
          rows={10}
          cols={20}
          dotSize={4}
          gap={10}
          color={M7_COLORS.gray}
          animate={true}
          direction="diagonal"
          staggerDelay={0.3}
        />
      </div>

      {/* Dot pattern - top right */}
      <div style={{ position: "absolute", right: 100, top: 100 }}>
        <DotPattern
          rows={6}
          cols={12}
          dotSize={4}
          gap={10}
          color={M7_COLORS.gray}
          animate={true}
          direction="right"
          staggerDelay={0.4}
        />
      </div>

      {/* Main content - left aligned */}
      <div
        style={{
          position: "absolute",
          left: 140,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      >
        {/* M7 Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            marginBottom: 40,
          }}
        >
          <Img
            src={staticFile("projects/m7/images/m7-logo.svg")}
            style={{
              width: 140,
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>

        {/* Orange accent bar */}
        <div
          style={{
            width: barWidth,
            height: 6,
            backgroundColor: M7_COLORS.orange,
            marginBottom: 40,
          }}
        />

        {/* Main headline */}
        <AnimatedText
          text="WE MAKE PIXELS"
          fontSize={90}
          fontWeight={900}
          color={M7_COLORS.white}
          delay={20}
          speed={1.5}
          style={{ marginBottom: 8 }}
        />
        <AnimatedText
          text="TURN INTO STARS."
          fontSize={90}
          fontWeight={900}
          color={M7_COLORS.white}
          delay={35}
          speed={1.5}
        />

        {/* Subtitle */}
        <p
          style={{
            fontSize: 24,
            color: M7_COLORS.lightGray,
            fontFamily: "system-ui, -apple-system, sans-serif",
            marginTop: 40,
            opacity: taglineOpacity,
            fontWeight: 400,
            maxWidth: 500,
            lineHeight: 1.5,
          }}
        >
          Welcome to the world of top-notch brands and powerful digital solutions.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 40,
            opacity: taglineOpacity,
          }}
        >
          <WipeReveal delay={50} duration={12}>
            <div
              style={{
                padding: "16px 32px",
                backgroundColor: M7_COLORS.orange,
                color: M7_COLORS.black,
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: 1,
              }}
            >
              GET IN TOUCH
            </div>
          </WipeReveal>
          <WipeReveal delay={55} duration={12}>
            <div
              style={{
                padding: "16px 32px",
                backgroundColor: "transparent",
                color: M7_COLORS.white,
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: 1,
                border: `2px solid ${M7_COLORS.white}`,
              }}
            >
              SEE OUR WORK
            </div>
          </WipeReveal>
        </div>
      </div>

      {/* Orange glow accent */}
      <div
        style={{
          position: "absolute",
          right: -200,
          top: "30%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${M7_COLORS.orange}15 0%, transparent 60%)`,
          filter: "blur(80px)",
        }}
      />
    </AbsoluteFill>
  );
};
