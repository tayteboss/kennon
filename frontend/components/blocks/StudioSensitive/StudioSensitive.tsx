import styled from "styled-components";
import { StudioPageType } from "../../../shared/types/types";
import SectionHeading from "../SectionHeading";
import LayoutWrapper from "../../layout/LayoutWrapper";
import StudioSectionMedia from "../StudioSectionMedia";
import ButtonLayout from "../../layout/ButtonLayout";
import pxToRem from "../../../utils/pxToRem";
import SensitiveBoard from "../SensitiveBoard";

const StudioSensitiveWrapper = styled.section``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${pxToRem(64)};
`;

const BoardWrapper = styled.div`
  position: relative;
  height: ${pxToRem(775)};
  grid-column: 1 / -1;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    height: 75vh;
  }

  .sensitive-board {
    position: relative;
    height: 100%;
  }
`;

type Props = {
  data: StudioPageType["beingSensitiveSection"];
};

const StudioSensitive = (props: Props) => {
  const { data } = props;

  return (
    <StudioSensitiveWrapper className="studio-section">
      <LayoutWrapper>
        <SectionHeading
          subheading={data.subheading}
          heading={data.heading}
          useTopBorder
        />
        <BoardWrapper>
          <SensitiveBoard isActive={true} />
        </BoardWrapper>
        <ButtonWrapper>
          <ButtonLayout link="/being-sensitive">Learn more</ButtonLayout>
        </ButtonWrapper>
      </LayoutWrapper>
    </StudioSensitiveWrapper>
  );
};

export default StudioSensitive;
