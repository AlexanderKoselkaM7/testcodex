import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const projects = [
  { image: "sparked-project.png", name: "Sparked", category: "Brand Identity" },
  { image: "repairlab-project.png", name: "Repairlab", category: "Web Design" },
  { image: "hylofit-project.png", name: "Hylofit", category: "Digital Strategy" },
];

const ProjectCard: React.FC<{
  image: string;
  name: string;
  category: string;
  index: number;
}> = ({ image, name, category, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 15;

  const cardScale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const cardX = interpolate(frame - delay, [0, 30], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(frame - delay, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        transform: `scale(${Math.max(cardScale, 0)}) translateX(${cardX}px)`,
      }}
    >
      {/* Project image */}
      <div
        style={{
          width: 480,
          height: 320,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Img
          src={staticFile(`projects/m7/images/${image}`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Project info */}
      <div style={{ opacity: labelOpacity }}>
        <h3
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "white",
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: 0,
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontSize: 16,
            color: "rgba(255, 255, 255, 0.5)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: "8px 0 0 0",
          }}
        >
          {category}
        </p>
      </div>
    </div>
  );
};

export const M7Projects: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 20], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* Background accents */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(69, 183, 209, 0.1) 0%, transparent 60%)",
          filter: "blur(80px)",
          left: "10%",
          top: "20%",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 60%)",
          filter: "blur(80px)",
          right: "15%",
          bottom: "20%",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 60,
          zIndex: 10,
        }}
      >
        {/* Section title */}
        <div
          style={{
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <h2
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "white",
              fontFamily: "system-ui, -apple-system, sans-serif",
              margin: 0,
            }}
          >
            Featured Work
          </h2>
          <p
            style={{
              fontSize: 20,
              color: "rgba(255, 255, 255, 0.5)",
              fontFamily: "system-ui, -apple-system, sans-serif",
              marginTop: 16,
            }}
          >
            Brands we've helped transform
          </p>
        </div>

        {/* Project cards */}
        <div
          style={{
            display: "flex",
            gap: 40,
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.name} {...project} index={i} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
