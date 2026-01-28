import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BS_COLORS, AnimatedLeaf, FadeInText, OrganicShape } from "./BuitenstateStyles";

export const BuitenstateIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Tagline animation
  const taglineOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BS_COLORS.cream,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background organic shapes */}
      <OrganicShape
        color={BS_COLORS.green}
        size={600}
        style={{ left: -200, top: -100 }}
      />
      <OrganicShape
        color={BS_COLORS.greenLight}
        size={500}
        style={{ right: -150, bottom: -100 }}
      />

      {/* Decorative leaves */}
      <AnimatedLeaf
        size={60}
        delay={20}
        style={{ position: "absolute", left: "15%", top: "20%" }}
      />
      <AnimatedLeaf
        size={40}
        delay={30}
        style={{ position: "absolute", right: "20%", top: "25%" }}
      />
      <AnimatedLeaf
        size={50}
        delay={40}
        style={{ position: "absolute", left: "25%", bottom: "25%" }}
      />
      <AnimatedLeaf
        size={35}
        delay={50}
        style={{ position: "absolute", right: "15%", bottom: "30%" }}
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
        {/* Leaf icon above logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            marginBottom: 20,
          }}
        >
          <Img
            src={staticFile("projects/buitenstate/images/leaf-icon.svg")}
            style={{ width: 60, height: 60 }}
          />
        </div>

        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <Img
            src={staticFile("projects/buitenstate/images/logo.svg")}
            style={{ width: 400 }}
          />
        </div>

        {/* Tagline */}
        <FadeInText delay={35} duration={20}>
          <p
            style={{
              fontSize: 28,
              color: BS_COLORS.gray,
              fontFamily: "system-ui, -apple-system, sans-serif",
              marginTop: 30,
              fontWeight: 500,
              fontStyle: "italic",
            }}
          >
            Liefde voor het buitenleven
          </p>
        </FadeInText>

        {/* Decorative line */}
        <div
          style={{
            width: interpolate(frame, [50, 70], [0, 120], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            height: 3,
            backgroundColor: BS_COLORS.green,
            marginTop: 30,
            borderRadius: 2,
          }}
        />

        {/* Main headline */}
        <FadeInText delay={60} duration={25}>
          <h1
            style={{
              fontSize: 48,
              color: BS_COLORS.black,
              fontFamily: "system-ui, -apple-system, sans-serif",
              marginTop: 40,
              fontWeight: 700,
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            Uw woning verkopen?
            <br />
            <span style={{ color: BS_COLORS.green }}>Wij helpen u graag.</span>
          </h1>
        </FadeInText>
      </div>
    </AbsoluteFill>
  );
};
