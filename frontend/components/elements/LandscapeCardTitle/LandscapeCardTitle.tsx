import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { WorkType } from "../../../shared/types/types";
import formatType from "../../../utils/formatType";

const Outer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LandscapeCardTitleWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  mix-blend-mode: difference;
  padding: ${pxToRem(32)};
  z-index: 2;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(32)} 0;
  }
`;

const Text = styled.p`
  color: var(--colour-white);
  text-align: center;
  white-space: nowrap;
`;

type Props = {
  title: WorkType["title"];
  location: WorkType["location"];
  yearCompleted: WorkType["yearCompleted"];
  type: WorkType["_type"];
  comingSoon: WorkType["comingSoon"];
};

const LandscapeCardTitle = (props: Props) => {
  const { title, location, yearCompleted, type, comingSoon } = props;

  return (
    <Outer>
      <LandscapeCardTitleWrapper className="landscape-card-title">
        <Text>{title || ""}</Text>
        <Text>{location || ""}</Text>
        <Text>
          {formatType(type) || ""} —{" "}
          {comingSoon ? `Coming ${yearCompleted || "soon"}` : yearCompleted}
        </Text>
      </LandscapeCardTitleWrapper>
    </Outer>
  );
};

export default LandscapeCardTitle;
