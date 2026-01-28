import { Composition } from "remotion";
import { DesignerShowcase } from "./DesignerShowcase";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DesignerShowcase"
        component={DesignerShowcase}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
