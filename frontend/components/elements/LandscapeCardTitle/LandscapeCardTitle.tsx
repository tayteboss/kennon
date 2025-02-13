import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { WorkType } from "../../../shared/types/types";
import formatType from "../../../utils/formatType";

const LandscapeCardTitleWrapper = styled.div`
  position: sticky;
  top: ${pxToRem(32)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  mix-blend-mode: difference;
  padding: ${pxToRem(32)};

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
    <LandscapeCardTitleWrapper className="landscape-card-title">
      <Text>{title || ""}</Text>
      <Text>{location || ""}</Text>
      <Text>
        {formatType(type) || ""} — {comingSoon ? "Coming soon" : yearCompleted}
      </Text>
    </LandscapeCardTitleWrapper>
  );
};

export default LandscapeCardTitle;
