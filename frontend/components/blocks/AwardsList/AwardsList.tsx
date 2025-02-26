import styled from "styled-components";
import { StudioPageType } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";

const AwardsListWrapper = styled.div``;

const Award = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${pxToRem(4)};
`;

const Year = styled.p`
  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const Title = styled.p``;

type Props = {
  data: StudioPageType["studioSection"]["awards"];
};

const AwardsList = (props: Props) => {
  const { data } = props;

  const hasData = data?.length > 0;

  return (
    <AwardsListWrapper>
      {hasData &&
        data.map((award, i) => (
          <Award key={i}>
            <Year>{award?.year || ""}</Year>
            <Title>{award?.awardTitle || ""}</Title>
          </Award>
        ))}
    </AwardsListWrapper>
  );
};

export default AwardsList;
