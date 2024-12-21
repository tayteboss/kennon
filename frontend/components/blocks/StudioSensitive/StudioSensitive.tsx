import styled from "styled-components";
import { StudioPageType } from "../../../shared/types/types";
import SectionHeading from "../SectionHeading";
import LayoutWrapper from "../../layout/LayoutWrapper";
import StudioSectionMedia from "../StudioSectionMedia";
import ButtonLayout from "../../layout/ButtonLayout";
import pxToRem from "../../../utils/pxToRem";

const StudioSensitiveWrapper = styled.section``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${pxToRem(64)};
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
        <StudioSectionMedia data={data?.media} />
        <ButtonWrapper>
          <ButtonLayout link="/being-sensitive">Learn more</ButtonLayout>
        </ButtonWrapper>
      </LayoutWrapper>
    </StudioSensitiveWrapper>
  );
};

export default StudioSensitive;
