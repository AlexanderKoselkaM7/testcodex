import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const clients = [
  "client-trivago.svg",
  "client-teamtv.svg",
  "client-sparked.svg",
  "client-repairlab.svg",
  "client-hylofit.svg",
];

const ClientLogo: React.FC<{ logo: string; index: number }> = ({ logo, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 8;

  const logoScale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const logoOpacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const float = Math.sin((frame + index * 20) * 0.05) * 8;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 280,
        height: 120,
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        borderRadius: 16,
        border: "1px solid rgba(255, 255, 255, 0.08)",
        transform: `scale(${Math.max(logoScale, 0)}) translateY(${float}px)`,
        opacity: logoOpacity,
      }}
    >
      <Img
        src={staticFile(`projects/m7/images/${logo}`)}
        style={{
          maxWidth: 180,
          maxHeight: 60,
          filter: "brightness(0) invert(1)",
          opacity: 0.7,
        }}
      />
    </div>
  );
};

export const M7Clients: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 20], [30, 0], {
    extrapolateRight: "clamp",
  });

  // Counter animation
  const counterValue = Math.floor(
    interpolate(frame, [20, 60], [0, 50], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 107, 107, 0.08) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
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
            }}
          >
            Trusted By
          </h2>
          <p
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#ff6b6b",
              fontFamily: "system-ui, -apple-system, sans-serif",
              margin: "16px 0 0 0",
            }}
          >
            {counterValue}+ Brands
          </p>
        </div>

        {/* Client logos grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 30,
            maxWidth: 1400,
          }}
        >
          {clients.map((logo, i) => (
            <ClientLogo key={logo} logo={logo} index={i} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
