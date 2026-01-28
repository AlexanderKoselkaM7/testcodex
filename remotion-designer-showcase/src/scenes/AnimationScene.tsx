import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";

const AnimatedBar: React.FC<{
  label: string;
  color: string;
  index: number;
  easingFn: (t: number) => number;
}> = ({ label, color, index, easingFn }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 6;
  const labelOpacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Looping animation
  const cycleFrame = (frame - delay) % 90;
  const progress = cycleFrame / 90;
  const easedProgress = easingFn(Math.min(progress * 1.5, 1));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 30,
        opacity: labelOpacity,
      }}
    >
      {/* Label */}
      <div
        style={{
          width: 140,
          fontSize: 16,
          fontWeight: 600,
          color: color,
          fontFamily: "system-ui, -apple-system, sans-serif",
          textAlign: "right",
        }}
      >
        {label}
      </div>

      {/* Track */}
      <div
        style={{
          width: 800,
          height: 8,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Progress bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${easedProgress * 100}%`,
            background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
            borderRadius: 4,
            boxShadow: `0 0 20px ${color}60`,
          }}
        />

        {/* Ball indicator */}
        <div
          style={{
            position: "absolute",
            left: `${easedProgress * 100}%`,
            top: "50%",
            width: 20,
            height: 20,
            backgroundColor: color,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 15px ${color}`,
          }}
        />
      </div>
    </div>
  );
};

export const AnimationScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const easings = [
    { label: "Linear", color: "#6366f1", fn: (t: number) => t },
    { label: "Ease Out", color: "#8b5cf6", fn: Easing.out(Easing.cubic) },
    { label: "Ease In Out", color: "#ec4899", fn: Easing.inOut(Easing.cubic) },
    { label: "Bounce", color: "#f59e0b", fn: Easing.bounce },
    { label: "Elastic", color: "#10b981", fn: Easing.elastic(1) },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #0d0d0d 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 60,
          zIndex: 10,
          width: "100%",
        }}
      >
        {/* Title */}
        <div style={{ opacity: titleOpacity, marginBottom: 20 }}>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "white",
              fontFamily: "system-ui, -apple-system, sans-serif",
              margin: 0,
              letterSpacing: -1,
            }}
          >
            Smooth Easing Functions
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "rgba(255, 255, 255, 0.5)",
              fontFamily: "system-ui, -apple-system, sans-serif",
              margin: "12px 0 0 0",
            }}
          >
            Built-in animation curves for natural motion
          </p>
        </div>

        {/* Easing demos */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
          }}
        >
          {easings.map((easing, i) => (
            <AnimatedBar
              key={easing.label}
              label={easing.label}
              color={easing.color}
              index={i}
              easingFn={easing.fn}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
