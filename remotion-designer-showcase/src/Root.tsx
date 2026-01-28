import { Composition } from "remotion";
import { DesignerShowcase } from "./DesignerShowcase";

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
    </>
  );
};
