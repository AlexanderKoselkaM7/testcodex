import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BS_COLORS, StepIndicator, FadeInText, OrganicShape } from "./BuitenstateStyles";

const steps = [
  {
    number: 1,
    title: "Gratis waardebepaling",
    description: "Wij komen vrijblijvend bij u langs voor een realistische inschatting van de waarde.",
  },
  {
    number: 2,
    title: "Professionele presentatie",
    description: "Foto's, video en beschrijving die uw woning op zijn best laten zien.",
  },
  {
    number: 3,
    title: "Actieve verkoop",
    description: "Breed aanbieden via ons netwerk en de bekendste woningplatforms.",
  },
  {
    number: 4,
    title: "Succesvolle overdracht",
    description: "Wij begeleiden u van bezichtiging tot notaris.",
  },
];

export const BuitenstateProcess: React.FC = () => {
  const frame = useCurrentFrame();

  // Calculate current active step
  const stepDuration = 35;
  const currentStep = Math.min(
    Math.floor(frame / stepDuration),
    steps.length - 1
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BS_COLORS.cream,
        display: "flex",
        padding: 80,
      }}
    >
      {/* Background shapes */}
      <OrganicShape
        color={BS_COLORS.greenLight}
        size={500}
        style={{ left: -150, bottom: -100 }}
      />

      {/* Left side - Title */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingRight: 60,
          zIndex: 10,
        }}
      >
        <FadeInText delay={0} duration={20}>
          <span
            style={{
              fontSize: 16,
              color: BS_COLORS.green,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Hoe werkt het?
          </span>
        </FadeInText>

        <FadeInText delay={10} duration={20}>
          <h2
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: BS_COLORS.black,
              fontFamily: "system-ui, -apple-system, sans-serif",
              margin: "20px 0 0 0",
              lineHeight: 1.2,
            }}
          >
            In 4 stappen
            <br />
            <span style={{ color: BS_COLORS.green }}>naar verkoop</span>
          </h2>
        </FadeInText>

        {/* Decorative line */}
        <div
          style={{
            width: 80,
            height: 4,
            backgroundColor: BS_COLORS.green,
            marginTop: 30,
            borderRadius: 2,
          }}
        />

        {/* Leaf decoration */}
        <div
          style={{
            marginTop: 60,
            opacity: interpolate(frame, [30, 50], [0, 0.6], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Img
            src={staticFile("projects/buitenstate/images/leaf-icon.svg")}
            style={{ width: 100, opacity: 0.4 }}
          />
        </div>
      </div>

      {/* Right side - Steps */}
      <div
        style={{
          flex: 1.2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 35,
          zIndex: 10,
        }}
      >
        {steps.map((step, i) => (
          <StepIndicator
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            delay={15 + i * 25}
            isActive={i <= currentStep}
          />
        ))}
      </div>

      {/* Progress indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 12,
        }}
      >
        {steps.map((_, i) => (
          <div
            key={i}
            style={{
              width: i <= currentStep ? 40 : 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: i <= currentStep ? BS_COLORS.green : BS_COLORS.sand,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
