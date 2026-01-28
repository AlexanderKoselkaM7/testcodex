import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Tree3DScene } from "./Tree3D";
import { BS_COLORS, FadeInText } from "./BuitenstateStyles";

export const BuitenstateNature: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text animation
  const textOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textY = spring({
    frame: frame - 30,
    fps,
    config: {
      damping: 80,
      stiffness: 100,
      mass: 1,
    },
  });

  const textTranslate = interpolate(textY, [0, 1], [30, 0]);

  // Subtitle animation
  const subtitleOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BS_COLORS.cream }}>
      {/* 3D Tree Scene - full background */}
      <AbsoluteFill>
        <Tree3DScene
          cameraPosition={[0, 1.2, 4.5]}
          backgroundColor="transparent"
          showGround={true}
        />
      </AbsoluteFill>

      {/* Gradient overlay for text readability */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg,
            ${BS_COLORS.cream}00 0%,
            ${BS_COLORS.cream}00 40%,
            ${BS_COLORS.cream}CC 70%,
            ${BS_COLORS.cream} 100%
          )`,
        }}
      />

      {/* Text overlay at bottom */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 120,
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslate}px)`,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 64,
              fontWeight: 400,
              color: BS_COLORS.greenDark,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Wonen in het groen
          </h2>
        </div>

        <div
          style={{
            opacity: subtitleOpacity,
            marginTop: 20,
          }}
        >
          <p
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 28,
              color: BS_COLORS.gray,
              margin: 0,
              fontWeight: 300,
            }}
          >
            Waar natuur en thuis samenkomen
          </p>
        </div>
      </AbsoluteFill>

      {/* Decorative leaf accent */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 80,
          opacity: interpolate(frame, [20, 40], [0, 0.3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `rotate(${interpolate(frame, [0, 100], [0, 10])}deg)`,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100">
          <path
            d="M50 5 C20 25, 10 60, 50 95 C90 60, 80 25, 50 5"
            fill={BS_COLORS.greenLight}
            opacity={0.6}
          />
          <path
            d="M50 20 L50 85"
            stroke={BS_COLORS.green}
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
