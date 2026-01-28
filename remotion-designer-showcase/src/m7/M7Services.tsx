import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const services = [
  { icon: "favorite.svg", title: "Brand Strategy", color: "#ff6b6b" },
  { icon: "edit.svg", title: "Visual Identity", color: "#4ecdc4" },
  { icon: "internet.svg", title: "Web Design", color: "#45b7d1" },
  { icon: "media.svg", title: "Digital Marketing", color: "#f9ca24" },
];

const ServiceCard: React.FC<{
  icon: string;
  title: string;
  color: string;
  index: number;
}> = ({ icon, title, color, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 10;

  const cardScale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const cardY = interpolate(frame - delay, [0, 25], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const iconBounce = Math.sin((frame - delay) * 0.08) * 5;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        transform: `scale(${Math.max(cardScale, 0)}) translateY(${cardY}px)`,
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: 28,
          background: `linear-gradient(135deg, ${color}20 0%, ${color}08 100%)`,
          border: `2px solid ${color}40`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: `0 20px 50px ${color}25`,
        }}
      >
        <Img
          src={staticFile(`projects/m7/icons/${icon}`)}
          style={{
            width: 60,
            height: 60,
            transform: `translateY(${iconBounce}px)`,
            filter: `brightness(0) saturate(100%) invert(1)`,
          }}
        />
      </div>

      {/* Title */}
      <span
        style={{
          fontSize: 20,
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

export const M7Services: React.FC = () => {
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
        background: "linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(78, 205, 196, 0.1) 0%, transparent 60%)",
          filter: "blur(100px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
            Our Services
          </h2>
          <p
            style={{
              fontSize: 20,
              color: "rgba(255, 255, 255, 0.5)",
              fontFamily: "system-ui, -apple-system, sans-serif",
              marginTop: 16,
            }}
          >
            Elevating brands through creative excellence
          </p>
        </div>

        {/* Service cards */}
        <div
          style={{
            display: "flex",
            gap: 60,
          }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
