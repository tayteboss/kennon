import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { WorkType } from "../../../shared/types/types";

const LandscapeCardTitleWrapper = styled.div`
  position: sticky;
  top: ${pxToRem(32)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  mix-blend-mode: difference;
  padding: ${pxToRem(32)};
`;

const Text = styled.p`
  color: var(--colour-white);
`;

type Props = {
  title: WorkType["title"];
  location: WorkType["location"];
  yearCompleted: WorkType["yearCompleted"];
  type: WorkType["_type"];
};

const LandscapeCardTitle = (props: Props) => {
  const { title, location, yearCompleted, type } = props;

  const formatType = (type: WorkType["_type"]) => {
    if (type === "publicWork") {
      return "Public";
    } else if (type === "privateWork") {
      return "Private";
    }
  };

  return (
    <LandscapeCardTitleWrapper>
      <Text>{title || ""}</Text>
      <Text>{location || ""}</Text>
      <Text>
        {formatType(type) || ""} — {yearCompleted || ""}
      </Text>
    </LandscapeCardTitleWrapper>
  );
};

export default LandscapeCardTitle;
