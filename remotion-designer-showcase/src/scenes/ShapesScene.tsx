import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { Trail } from "@remotion/motion-blur";

const Shape: React.FC<{
  type: string;
  color: string;
  delay: number;
  index: number;
}> = ({ type, color, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const rotation = interpolate(frame, [0, 75], [0, 180 + index * 45]);
  const float = Math.sin((frame + index * 10) * 0.1) * 10;

  let shapeStyle: React.CSSProperties = {
    width: 150,
    height: 150,
    backgroundColor: color,
    transform: `scale(${scale}) rotate(${rotation}deg) translateY(${float}px)`,
    boxShadow: `0 0 60px ${color}60`,
  };

  if (type === "circle") {
    shapeStyle.borderRadius = "50%";
  } else if (type === "square") {
    shapeStyle.borderRadius = 20;
  } else if (type === "triangle") {
    shapeStyle = {
      ...shapeStyle,
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderLeft: "75px solid transparent",
      borderRight: "75px solid transparent",
      borderBottom: `150px solid ${color}`,
      boxShadow: "none",
      filter: `drop-shadow(0 0 30px ${color}60)`,
    };
  } else if (type === "hexagon") {
    shapeStyle = {
      ...shapeStyle,
      clipPath:
        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
    };
  }

  return <div style={shapeStyle} />;
};

export const ShapesScene: React.FC = () => {
  const frame = useCurrentFrame();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const shapes = [
    { type: "circle", color: "#e63946", delay: 0 },
    { type: "square", color: "#f4a261", delay: 5 },
    { type: "triangle", color: "#2a9d8f", delay: 10 },
    { type: "hexagon", color: "#e9c46a", delay: 15 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          opacity: labelOpacity,
        }}
      >
        <span
          style={{
            fontSize: 14,
            color: "#2a9d8f",
            fontWeight: 600,
            letterSpacing: 4,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          02 / SHAPES & GEOMETRY
        </span>
      </div>

      {/* Grid of shapes with motion blur */}
      <div
        style={{
          display: "flex",
          gap: 80,
          alignItems: "center",
        }}
      >
        {shapes.map(({ type, color, delay }, i) => (
          <Trail key={type} lagInFrames={3} trailOpacity={0.6} layers={5}>
            <Shape type={type} color={color} delay={delay} index={i} />
          </Trail>
        ))}
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => {
        const particleX = interpolate(
          frame,
          [0, 75],
          [100 + i * 90, 150 + i * 90 + Math.sin(i) * 50]
        );
        const particleY = interpolate(
          frame,
          [0, 75],
          [900 - i * 30, 100 + Math.cos(i * 2) * 300]
        );
        const particleOpacity = interpolate(
          frame,
          [0, 20, 60, 75],
          [0, 0.6, 0.6, 0]
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: particleX,
              top: particleY,
              width: 6 + (i % 4) * 2,
              height: 6 + (i % 4) * 2,
              borderRadius: "50%",
              backgroundColor: shapes[i % 4].color,
              opacity: particleOpacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
