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

export const BuitenstateOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // CTA button animation
  const ctaScale = spring({
    frame: frame - 40,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const ctaOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BS_COLORS.green,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background organic shapes */}
      <OrganicShape
        color={BS_COLORS.greenDark}
        size={600}
        style={{ left: -200, top: -150 }}
      />
      <OrganicShape
        color={BS_COLORS.greenLight}
        size={500}
        style={{ right: -150, bottom: -100 }}
      />

      {/* Decorative leaves (white) */}
      <AnimatedLeaf
        size={50}
        delay={10}
        style={{ position: "absolute", left: "10%", top: "15%", filter: "brightness(10)" }}
      />
      <AnimatedLeaf
        size={35}
        delay={20}
        style={{ position: "absolute", right: "12%", top: "20%", filter: "brightness(10)" }}
      />
      <AnimatedLeaf
        size={45}
        delay={30}
        style={{ position: "absolute", left: "15%", bottom: "20%", filter: "brightness(10)" }}
      />
      <AnimatedLeaf
        size={30}
        delay={40}
        style={{ position: "absolute", right: "18%", bottom: "25%", filter: "brightness(10)" }}
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
        {/* Leaf icon */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            marginBottom: 30,
          }}
        >
          <Img
            src={staticFile("projects/buitenstate/images/leaf-icon.svg")}
            style={{
              width: 70,
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>

        {/* CTA headline */}
        <FadeInText delay={15} duration={20}>
          <h2
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: BS_COLORS.white,
              fontFamily: "system-ui, -apple-system, sans-serif",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            Klaar om te verkopen?
          </h2>
        </FadeInText>

        <FadeInText delay={25} duration={20}>
          <p
            style={{
              fontSize: 24,
              color: "rgba(255, 255, 255, 0.8)",
              fontFamily: "system-ui, -apple-system, sans-serif",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            Vraag vandaag nog een gratis waardebepaling aan
          </p>
        </FadeInText>

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
              padding: "20px 50px",
              backgroundColor: BS_COLORS.white,
              borderRadius: 50,
              fontSize: 20,
              fontWeight: 700,
              color: BS_COLORS.green,
              fontFamily: "system-ui, -apple-system, sans-serif",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            }}
          >
            Neem contact op
          </div>
        </div>

        {/* Website */}
        <FadeInText delay={55} duration={15}>
          <p
            style={{
              fontSize: 18,
              color: "rgba(255, 255, 255, 0.7)",
              fontFamily: "system-ui, -apple-system, sans-serif",
              marginTop: 30,
              letterSpacing: 2,
            }}
          >
            www.buitenstate.nl
          </p>
        </FadeInText>
      </div>
    </AbsoluteFill>
  );
};
