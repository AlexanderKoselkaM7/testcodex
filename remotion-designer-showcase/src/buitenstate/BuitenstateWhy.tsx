import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BS_COLORS, FadeInText, OrganicShape } from "./BuitenstateStyles";

const reasons = [
  {
    icon: "🏡",
    title: "Specialist in landelijk wonen",
    description: "Al jaren dé expert in boerderijen en landhuizen",
  },
  {
    icon: "🤝",
    title: "Persoonlijke aanpak",
    description: "Elke woning verdient unieke aandacht",
  },
  {
    icon: "📊",
    title: "600+ woningen per jaar",
    description: "Bewezen track record in de markt",
  },
];

const ReasonCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  index: number;
}> = ({ icon, title, description, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 20 + index * 20;

  const cardScale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const cardOpacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: 30,
        backgroundColor: BS_COLORS.white,
        borderRadius: 16,
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
        width: 320,
        transform: `scale(${Math.max(cardScale, 0)})`,
        opacity: cardOpacity,
      }}
    >
      {/* Icon */}
      <div
        style={{
          fontSize: 48,
          marginBottom: 20,
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: BS_COLORS.black,
          fontFamily: "system-ui, -apple-system, sans-serif",
          margin: 0,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 16,
          color: BS_COLORS.gray,
          fontFamily: "system-ui, -apple-system, sans-serif",
          margin: "12px 0 0 0",
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
    </div>
  );
};

export const BuitenstateWhy: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BS_COLORS.sand,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* Background shapes */}
      <OrganicShape
        color={BS_COLORS.green}
        size={400}
        style={{ right: -100, top: -50 }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 60,
          zIndex: 10,
        }}
      >
        {/* Section header */}
        <div style={{ textAlign: "center" }}>
          <FadeInText delay={0} duration={20}>
            <span
              style={{
                fontSize: 16,
                color: BS_COLORS.green,
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Waarom Buitenstate?
            </span>
          </FadeInText>

          <FadeInText delay={10} duration={20}>
            <h2
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: BS_COLORS.black,
                fontFamily: "system-ui, -apple-system, sans-serif",
                margin: "16px 0 0 0",
                lineHeight: 1.2,
              }}
            >
              De beste keuze voor
              <br />
              <span style={{ color: BS_COLORS.green }}>uw landelijke woning</span>
            </h2>
          </FadeInText>
        </div>

        {/* Reason cards */}
        <div
          style={{
            display: "flex",
            gap: 40,
          }}
        >
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.title} {...reason} index={i} />
          ))}
        </div>

        {/* Leaf decoration */}
        <div
          style={{
            position: "absolute",
            left: 80,
            bottom: 80,
            opacity: interpolate(frame, [60, 80], [0, 0.3], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Img
            src={staticFile("projects/buitenstate/images/leaf-icon.svg")}
            style={{ width: 80, opacity: 0.5 }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
