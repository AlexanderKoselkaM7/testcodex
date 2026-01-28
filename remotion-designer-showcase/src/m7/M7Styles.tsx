import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

// M7 Brand Colors
export const M7_COLORS = {
  black: "#0a0a0a",
  darkGray: "#1a1a1a",
  gray: "#4a4a4a",
  lightGray: "#8a8a8a",
  white: "#ffffff",
  orange: "#F5A623",
  orangeDark: "#D4920F",
};

// Animated Dot Pattern Component
export const DotPattern: React.FC<{
  rows?: number;
  cols?: number;
  dotSize?: number;
  gap?: number;
  color?: string;
  style?: React.CSSProperties;
  animate?: boolean;
  direction?: "left" | "right" | "up" | "down" | "diagonal";
  staggerDelay?: number;
}> = ({
  rows = 8,
  cols = 15,
  dotSize = 4,
  gap = 12,
  color = M7_COLORS.gray,
  style = {},
  animate = true,
  direction = "diagonal",
  staggerDelay = 0.5,
}) => {
  const frame = useCurrentFrame();

  const dots = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let delay: number;
      switch (direction) {
        case "left":
          delay = col * staggerDelay;
          break;
        case "right":
          delay = (cols - col) * staggerDelay;
          break;
        case "up":
          delay = row * staggerDelay;
          break;
        case "down":
          delay = (rows - row) * staggerDelay;
          break;
        case "diagonal":
        default:
          delay = (row + col) * staggerDelay;
      }

      const opacity = animate
        ? interpolate(frame - delay, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        : 1;

      dots.push(
        <div
          key={`${row}-${col}`}
          style={{
            position: "absolute",
            left: col * (dotSize + gap),
            top: row * (dotSize + gap),
            width: dotSize,
            height: dotSize,
            backgroundColor: color,
            borderRadius: dotSize / 2,
            opacity,
          }}
        />
      );
    }
  }

  return (
    <div
      style={{
        position: "relative",
        width: cols * (dotSize + gap) - gap,
        height: rows * (dotSize + gap) - gap,
        ...style,
      }}
    >
      {dots}
    </div>
  );
};

// Text reveal animation - letter by letter
export const AnimatedText: React.FC<{
  text: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  letterSpacing?: number;
  delay?: number;
  speed?: number;
  style?: React.CSSProperties;
}> = ({
  text,
  fontSize = 72,
  fontWeight = 900,
  color = M7_COLORS.white,
  letterSpacing = -2,
  delay = 0,
  speed = 2,
  style = {},
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        fontSize,
        fontWeight,
        color,
        letterSpacing,
        fontFamily: "system-ui, -apple-system, sans-serif",
        ...style,
      }}
    >
      {text.split("").map((char, i) => {
        const charDelay = delay + i * speed;
        const opacity = interpolate(frame - charDelay, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(frame - charDelay, [0, 5], [20, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <span
            key={i}
            style={{
              opacity,
              transform: `translateY(${y}px)`,
              display: "inline-block",
              whiteSpace: "pre",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

// Wipe transition component
export const WipeReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "left" | "right" | "up" | "down";
}> = ({ children, delay = 0, duration = 15, direction = "left" }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame - delay, [0, duration], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let clipPath: string;
  switch (direction) {
    case "right":
      clipPath = `inset(0 ${100 - progress}% 0 0)`;
      break;
    case "up":
      clipPath = `inset(${100 - progress}% 0 0 0)`;
      break;
    case "down":
      clipPath = `inset(0 0 ${100 - progress}% 0)`;
      break;
    case "left":
    default:
      clipPath = `inset(0 0 0 ${100 - progress}%)`;
  }

  return <div style={{ clipPath }}>{children}</div>;
};
