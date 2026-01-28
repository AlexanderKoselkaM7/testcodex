import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { M7_COLORS, DotPattern } from "./M7Styles";

const clients = [
  "client-trivago.svg",
  "client-teamtv.svg",
  "client-sparked.svg",
  "client-repairlab.svg",
  "client-hylofit.svg",
];

export const M7Clients: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Counter animation - fast count up
  const counterValue = Math.floor(
    interpolate(frame, [10, 40], [0, 50], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Staggered logo animations
  const getLogoAnimation = (index: number) => {
    const delay = 25 + index * 8;
    const scale = spring({
      frame: frame - delay,
      fps,
      config: { damping: 12, stiffness: 150 },
    });
    const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { scale: Math.max(scale, 0), opacity };
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: M7_COLORS.black,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      {/* Dot pattern - left */}
      <div style={{ position: "absolute", left: 60, top: "50%", transform: "translateY(-50%)" }}>
        <DotPattern
          rows={15}
          cols={6}
          dotSize={4}
          gap={10}
          color={M7_COLORS.gray}
          animate={true}
          direction="down"
          staggerDelay={0.3}
        />
      </div>

      {/* Dot pattern - right */}
      <div style={{ position: "absolute", right: 60, top: "50%", transform: "translateY(-50%)" }}>
        <DotPattern
          rows={15}
          cols={6}
          dotSize={4}
          gap={10}
          color={M7_COLORS.gray}
          animate={true}
          direction="up"
          staggerDelay={0.3}
        />
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 60,
          zIndex: 10,
        }}
      >
        {/* Title section */}
        <div
          style={{
            textAlign: "center",
            opacity: titleOpacity,
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: M7_COLORS.orange,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 700,
              letterSpacing: 3,
            }}
          >
            TRUSTED BY
          </span>

          {/* Big counter number */}
          <div
            style={{
              fontSize: 180,
              fontWeight: 900,
              color: M7_COLORS.white,
              fontFamily: "system-ui, -apple-system, sans-serif",
              lineHeight: 1,
              marginTop: 10,
            }}
          >
            {counterValue}
            <span style={{ color: M7_COLORS.orange }}>+</span>
          </div>

          <span
            style={{
              fontSize: 32,
              color: M7_COLORS.lightGray,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 600,
              letterSpacing: 4,
            }}
          >
            BRANDS WORLDWIDE
          </span>
        </div>

        {/* Orange bar */}
        <div
          style={{
            width: 100,
            height: 4,
            backgroundColor: M7_COLORS.orange,
          }}
        />

        {/* Client logos */}
        <div
          style={{
            display: "flex",
            gap: 50,
            alignItems: "center",
          }}
        >
          {clients.map((logo, i) => {
            const { scale, opacity } = getLogoAnimation(i);
            return (
              <div
                key={logo}
                style={{
                  width: 200,
                  height: 80,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity,
                  transform: `scale(${scale})`,
                }}
              >
                <Img
                  src={staticFile(`projects/m7/images/${logo}`)}
                  style={{
                    maxWidth: 160,
                    maxHeight: 50,
                    filter: "brightness(0) invert(1)",
                    opacity: 0.6,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
