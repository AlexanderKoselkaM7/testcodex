import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { M7_COLORS, DotPattern, WipeReveal } from "./M7Styles";

const services = [
  { icon: "favorite.svg", title: "BRAND STRATEGY", num: "01" },
  { icon: "edit.svg", title: "VISUAL IDENTITY", num: "02" },
  { icon: "internet.svg", title: "WEB DESIGN", num: "03" },
  { icon: "media.svg", title: "DIGITAL MARKETING", num: "04" },
];

const ServiceItem: React.FC<{
  icon: string;
  title: string;
  num: string;
  index: number;
}> = ({ icon, title, num, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 15 + index * 12;

  const slideX = interpolate(frame - delay, [0, 15], [-100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const iconScale = spring({
    frame: frame - delay - 5,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 30,
        opacity,
        transform: `translateX(${slideX}px)`,
        paddingBottom: 30,
        borderBottom: `1px solid ${M7_COLORS.darkGray}`,
      }}
    >
      {/* Number */}
      <span
        style={{
          fontSize: 14,
          color: M7_COLORS.orange,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 700,
          letterSpacing: 2,
          width: 40,
        }}
      >
        {num}
      </span>

      {/* Icon */}
      <div
        style={{
          width: 60,
          height: 60,
          backgroundColor: M7_COLORS.darkGray,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${Math.max(iconScale, 0)})`,
        }}
      >
        <Img
          src={staticFile(`projects/m7/icons/${icon}`)}
          style={{
            width: 28,
            height: 28,
            filter: "brightness(0) invert(1)",
          }}
        />
      </div>

      {/* Title */}
      <span
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: M7_COLORS.white,
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: 2,
        }}
      >
        {title}
      </span>

      {/* Arrow */}
      <span
        style={{
          marginLeft: "auto",
          fontSize: 24,
          color: M7_COLORS.gray,
        }}
      >
        →
      </span>
    </div>
  );
};

export const M7Services: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 15], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: M7_COLORS.black,
        padding: 100,
        display: "flex",
      }}
    >
      {/* Dot pattern - right side */}
      <div style={{ position: "absolute", right: 80, bottom: 100 }}>
        <DotPattern
          rows={12}
          cols={8}
          dotSize={4}
          gap={10}
          color={M7_COLORS.gray}
          animate={true}
          direction="up"
          staggerDelay={0.4}
        />
      </div>

      {/* Left side - title */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 14,
            color: M7_COLORS.orange,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 700,
            letterSpacing: 3,
            marginBottom: 20,
          }}
        >
          WHAT WE DO
        </span>

        <h2
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: M7_COLORS.white,
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          OUR
          <br />
          SERVICES
        </h2>

        {/* Orange bar accent */}
        <div
          style={{
            width: 80,
            height: 6,
            backgroundColor: M7_COLORS.orange,
            marginTop: 30,
          }}
        />
      </div>

      {/* Right side - services list */}
      <div
        style={{
          flex: 1.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 25,
        }}
      >
        {services.map((service, i) => (
          <ServiceItem key={service.title} {...service} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
