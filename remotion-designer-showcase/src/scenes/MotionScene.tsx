import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";

export const MotionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Different easing demonstrations
  const easings = [
    { name: "Linear", fn: (t: number) => t },
    { name: "Ease Out", fn: Easing.out(Easing.cubic) },
    { name: "Ease In Out", fn: Easing.inOut(Easing.cubic) },
    { name: "Spring", fn: null },
    { name: "Bounce", fn: Easing.bounce },
  ];

  const cycleFrame = frame % 60;
  const progress = cycleFrame / 60;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #16213e 0%, #1a1a2e 100%)",
        padding: 80,
      }}
    >
      {/* Section label */}
      <div style={{ opacity: labelOpacity }}>
        <span
          style={{
            fontSize: 14,
            color: "#e9c46a",
            fontWeight: 600,
            letterSpacing: 4,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          04 / MOTION & EASING
        </span>
      </div>

      {/* Title */}
      <h2
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: "white",
          fontFamily: "system-ui, sans-serif",
          margin: "40px 0",
          opacity: interpolate(frame, [5, 20], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Smooth Animations
      </h2>

      {/* Easing demonstrations */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 35,
          marginTop: 40,
        }}
      >
        {easings.map(({ name, fn }, i) => {
          const delay = 10 + i * 5;
          const rowOpacity = interpolate(frame - delay, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          let ballX: number;
          if (name === "Spring") {
            const springValue = spring({
              frame: cycleFrame,
              fps,
              config: { damping: 10, stiffness: 100 },
              durationInFrames: 60,
            });
            ballX = springValue * 1400;
          } else if (fn) {
            ballX = fn(progress) * 1400;
          } else {
            ballX = progress * 1400;
          }

          const colors = ["#e63946", "#f4a261", "#e9c46a", "#2a9d8f", "#264653"];

          return (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 40,
                opacity: rowOpacity,
              }}
            >
              <div
                style={{
                  width: 140,
                  fontSize: 18,
                  fontWeight: 600,
                  color: colors[i],
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {name}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 60,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: 30,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Track line */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 30,
                    right: 30,
                    height: 2,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    transform: "translateY(-50%)",
                  }}
                />
                {/* Ball */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 30 + ballX,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: colors[i],
                    transform: "translate(-50%, -50%)",
                    boxShadow: `0 0 30px ${colors[i]}80`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative wave */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          opacity: 0.3,
        }}
        viewBox="0 0 1920 200"
        preserveAspectRatio="none"
      >
        <path
          d={`M0,100 Q${480 + Math.sin(frame * 0.05) * 100},${50 + Math.sin(frame * 0.08) * 50} 960,100 T1920,100 V200 H0 Z`}
          fill="url(#waveGradient)"
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e63946" />
            <stop offset="50%" stopColor="#f4a261" />
            <stop offset="100%" stopColor="#2a9d8f" />
          </linearGradient>
        </defs>
      </svg>
    </AbsoluteFill>
  );
};
