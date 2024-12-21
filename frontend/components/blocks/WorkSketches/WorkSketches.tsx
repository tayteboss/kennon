import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";

const WorkSketchesWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
`;

const Inner = styled.div`
  width: 100%;
  padding-top: 75%;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: var(--colour-cream);
`;

type Props = {
  data: WorkType["sketches"];
};

const WorkSketches = (props: Props) => {
  const { data } = props;

  return (
    <WorkSketchesWrapper>
      <Inner>
        <ImageWrapper></ImageWrapper>
      </Inner>
    </WorkSketchesWrapper>
  );
};

export default WorkSketches;
