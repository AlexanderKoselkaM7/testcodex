import { Composition } from "remotion";
import { DesignerShowcase } from "./DesignerShowcase";
import { M7Showcase } from "./m7/M7Showcase";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DesignerShowcase"
        component={DesignerShowcase}
        durationInFrames={300}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="M7Showcase"
        component={M7Showcase}
        durationInFrames={420}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
