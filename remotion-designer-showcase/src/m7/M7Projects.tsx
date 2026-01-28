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

const projects = [
  { image: "sparked-project.png", name: "SPARKED", category: "Brand Identity" },
  { image: "repairlab-project.png", name: "REPAIRLAB", category: "Web Design" },
  { image: "hylofit-project.png", name: "HYLOFIT", category: "Digital Strategy" },
];

export const M7Projects: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Calculate which project to show (carousel effect)
  const projectDuration = 35;
  const currentProject = Math.min(
    Math.floor(frame / projectDuration),
    projects.length - 1
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: M7_COLORS.black,
        overflow: "hidden",
      }}
    >
      {/* Dot pattern - bottom right */}
      <div style={{ position: "absolute", right: 60, bottom: 60 }}>
        <DotPattern
          rows={8}
          cols={12}
          dotSize={4}
          gap={10}
          color={M7_COLORS.gray}
          animate={true}
          direction="diagonal"
          staggerDelay={0.3}
        />
      </div>

      {/* Left side - Project info */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          maxWidth: 500,
        }}
      >
        <span
          style={{
            fontSize: 14,
            color: M7_COLORS.orange,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 700,
            letterSpacing: 3,
            opacity: titleOpacity,
          }}
        >
          FEATURED WORK
        </span>

        {/* Project cards */}
        {projects.map((project, i) => {
          const isActive = i === currentProject;
          const projectFrame = frame - i * projectDuration;

          const opacity = isActive
            ? interpolate(projectFrame, [0, 10, projectDuration - 5, projectDuration], [0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : 0;

          const slideY = isActive
            ? interpolate(projectFrame, [0, 15], [50, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : 50;

          return (
            <div
              key={project.name}
              style={{
                position: "absolute",
                top: 40,
                opacity,
                transform: `translateY(${slideY}px)`,
              }}
            >
              <h2
                style={{
                  fontSize: 80,
                  fontWeight: 900,
                  color: M7_COLORS.white,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {project.name}
              </h2>

              <div
                style={{
                  width: 80,
                  height: 4,
                  backgroundColor: M7_COLORS.orange,
                  marginTop: 30,
                  marginBottom: 30,
                }}
              />

              <p
                style={{
                  fontSize: 20,
                  color: M7_COLORS.lightGray,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontWeight: 500,
                  letterSpacing: 2,
                }}
              >
                {project.category}
              </p>

              {/* Project number */}
              <span
                style={{
                  fontSize: 120,
                  fontWeight: 900,
                  color: M7_COLORS.darkGray,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  position: "absolute",
                  right: -150,
                  top: -30,
                  opacity: 0.3,
                }}
              >
                0{i + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* Right side - Project images */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        {projects.map((project, i) => {
          const isActive = i === currentProject;
          const projectFrame = frame - i * projectDuration;

          const scale = isActive
            ? spring({
                frame: projectFrame,
                fps,
                config: { damping: 15, stiffness: 100 },
              })
            : 0;

          const opacity = isActive
            ? interpolate(projectFrame, [0, 10, projectDuration - 5, projectDuration], [0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : 0;

          return (
            <div
              key={project.name}
              style={{
                position: "absolute",
                right: 0,
                opacity,
                transform: `scale(${Math.max(scale, 0)})`,
              }}
            >
              <div
                style={{
                  width: 700,
                  height: 450,
                  overflow: "hidden",
                  border: `4px solid ${M7_COLORS.orange}`,
                }}
              >
                <Img
                  src={staticFile(`projects/m7/images/${project.image}`)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress dots */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 12,
        }}
      >
        {projects.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentProject ? 30 : 8,
              height: 8,
              backgroundColor: i === currentProject ? M7_COLORS.orange : M7_COLORS.gray,
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
