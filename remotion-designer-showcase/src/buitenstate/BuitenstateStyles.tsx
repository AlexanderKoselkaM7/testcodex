import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

// Buitenstate Brand Colors - Nature inspired palette
export const BS_COLORS = {
  // Primary
  green: "#2D5A27",        // Forest green - main brand
  greenLight: "#4A7C43",   // Lighter green
  greenDark: "#1E3D1A",    // Dark forest

  // Secondary
  cream: "#F5F2EB",        // Warm cream background
  sand: "#E8E2D5",         // Sandy beige
  brown: "#8B7355",        // Earthy brown

  // Neutrals
  white: "#FFFFFF",
  black: "#1A1A1A",
  gray: "#6B6B6B",
  grayLight: "#9B9B9B",

  // Accent
  gold: "#C9A227",         // Warm gold for premium feel
};

// Animated leaf component
export const AnimatedLeaf: React.FC<{
  size?: number;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ size = 40, delay = 0, style = {} }) => {
  const frame = useCurrentFrame();

  const rotation = interpolate(frame - delay, [0, 120], [-10, 10]);
  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame - delay, [0, 20], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const float = Math.sin((frame - delay) * 0.05) * 5;

  return (
    <div
      style={{
        width: size,
        height: size,
        opacity,
        transform: `scale(${scale}) rotate(${rotation}deg) translateY(${float}px)`,
        ...style,
      }}
    >
      <svg viewBox="0 0 100 100" fill={BS_COLORS.green}>
        <path d="M50 5 C20 30, 15 60, 50 95 C85 60, 80 30, 50 5 M50 25 L50 85"
          stroke={BS_COLORS.greenDark}
          strokeWidth="3"
          fill={BS_COLORS.green}
        />
      </svg>
    </div>
  );
};

// Text fade-in component
export const FadeInText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  style?: React.CSSProperties;
}> = ({ children, delay = 0, duration = 20, direction = "up", style = {} }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const offset = interpolate(frame - delay, [0, duration], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let transform: string;
  switch (direction) {
    case "down":
      transform = `translateY(${-offset}px)`;
      break;
    case "left":
      transform = `translateX(${offset}px)`;
      break;
    case "right":
      transform = `translateX(${-offset}px)`;
      break;
    case "up":
    default:
      transform = `translateY(${offset}px)`;
  }

  return (
    <div style={{ opacity, transform, ...style }}>
      {children}
    </div>
  );
};

// Step indicator component for process visualization
export const StepIndicator: React.FC<{
  number: number;
  title: string;
  description: string;
  delay?: number;
  isActive?: boolean;
}> = ({ number, title, description, delay = 0, isActive = true }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slideX = interpolate(frame - delay, [0, 20], [-50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const circleScale = interpolate(frame - delay, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 24,
        opacity,
        transform: `translateX(${slideX}px)`,
      }}
    >
      {/* Number circle */}
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: isActive ? BS_COLORS.green : BS_COLORS.sand,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${Math.max(circleScale, 0)})`,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: isActive ? BS_COLORS.white : BS_COLORS.gray,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {number}
        </span>
      </div>

      {/* Content */}
      <div style={{ paddingTop: 8 }}>
        <h3
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: BS_COLORS.black,
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 18,
            color: BS_COLORS.gray,
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: "8px 0 0 0",
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

// Organic shape background decoration
export const OrganicShape: React.FC<{
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({ color = BS_COLORS.greenLight, size = 400, style = {} }) => {
  const frame = useCurrentFrame();
  const scale = 1 + Math.sin(frame * 0.02) * 0.05;

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
        backgroundColor: color,
        opacity: 0.15,
        filter: "blur(60px)",
        transform: `scale(${scale})`,
        ...style,
      }}
    />
  );
};
