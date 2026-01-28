import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

const palette = [
  { name: "Coral", hex: "#e63946" },
  { name: "Peach", hex: "#f4a261" },
  { name: "Sand", hex: "#e9c46a" },
  { name: "Teal", hex: "#2a9d8f" },
  { name: "Navy", hex: "#264653" },
];

export const ColorsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const gradientRotation = interpolate(frame, [0, 75], [0, 360]);

  return (
    <AbsoluteFill
      style={{
        background: `conic-gradient(from ${gradientRotation}deg at 50% 120%, #e63946, #f4a261, #e9c46a, #2a9d8f, #264653, #e63946)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10, 10, 10, 0.85)",
        }}
      />

      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          opacity: labelOpacity,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: 14,
            color: "#f4a261",
            fontWeight: 600,
            letterSpacing: 4,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          03 / COLOR PALETTES
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 150,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "white",
            fontFamily: "system-ui, sans-serif",
            margin: 0,
            opacity: interpolate(frame, [5, 20], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Dynamic Color Systems
        </h2>
      </div>

      {/* Color swatches */}
      <div
        style={{
          display: "flex",
          gap: 30,
          zIndex: 10,
          marginTop: 100,
        }}
      >
        {palette.map(({ name, hex }, i) => {
          const delay = 10 + i * 6;
          const swatchScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 100 },
          });

          const swatchY = interpolate(frame - delay, [0, 15], [80, 0], {
            extrapolateRight: "clamp",
          });

          const labelOpacityLocal = interpolate(frame - delay - 10, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                transform: `translateY(${swatchY}px)`,
              }}
            >
              <div
                style={{
                  width: 140,
                  height: 180,
                  backgroundColor: hex,
                  borderRadius: 16,
                  transform: `scale(${swatchScale})`,
                  boxShadow: `0 20px 60px ${hex}50`,
                }}
              />
              <div style={{ opacity: labelOpacityLocal, textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "white",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "monospace",
                    marginTop: 4,
                  }}
                >
                  {hex}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Animated gradient orbs */}
      {palette.map(({ hex }, i) => {
        const orbX = interpolate(
          frame,
          [0, 75],
          [200 + i * 350, 250 + i * 350 + Math.sin(i * 2) * 50]
        );
        const orbY = interpolate(
          frame,
          [0, 75],
          [800 + i * 30, 750 + Math.cos(i) * 100]
        );
        const orbScale = interpolate(frame, [0, 40], [0, 1], {
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: orbX,
              top: orbY,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${hex}60 0%, transparent 70%)`,
              filter: "blur(40px)",
              transform: `scale(${orbScale})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
