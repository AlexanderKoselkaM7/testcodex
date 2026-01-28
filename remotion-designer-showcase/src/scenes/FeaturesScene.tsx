import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

const features = [
  { icon: "◆", title: "React Components", color: "#6366f1" },
  { icon: "◇", title: "Smooth Animations", color: "#8b5cf6" },
  { icon: "○", title: "Export to MP4", color: "#ec4899" },
  { icon: "□", title: "Programmatic", color: "#f59e0b" },
];

const FeatureCard: React.FC<{
  icon: string;
  title: string;
  color: string;
  index: number;
}> = ({ icon, title, color, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 8;

  const cardScale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const cardY = interpolate(frame - delay, [0, 20], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const iconRotation = interpolate(frame, [0, 100], [0, 360]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        transform: `scale(${cardScale}) translateY(${cardY}px)`,
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 24,
          background: `linear-gradient(135deg, ${color}20 0%, ${color}05 100%)`,
          border: `2px solid ${color}30`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: `0 20px 40px ${color}20`,
        }}
      >
        <span
          style={{
            fontSize: 48,
            color: color,
            transform: `rotate(${iconRotation * (index % 2 === 0 ? 1 : -1) * 0.1}deg)`,
          }}
        >
          {icon}
        </span>
      </div>

      {/* Title */}
      <span
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: 1,
        }}
      >
        {title}
      </span>
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 20], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0d0d0d 0%, #1a1a2e 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* Background grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 80,
          zIndex: 10,
        }}
      >
        {/* Section title */}
        <div
          style={{
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <h2
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "white",
              fontFamily: "system-ui, -apple-system, sans-serif",
              margin: 0,
              letterSpacing: -1,
            }}
          >
            Design with Code
          </h2>
          <p
            style={{
              fontSize: 20,
              color: "rgba(255, 255, 255, 0.5)",
              fontFamily: "system-ui, -apple-system, sans-serif",
              margin: "16px 0 0 0",
            }}
          >
            Build videos using familiar React patterns
          </p>
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: "flex",
            gap: 60,
          }}
        >
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} index={i} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
