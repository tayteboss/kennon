import styled from "styled-components";
import { StudioPageType } from "../../../shared/types/types";
import SectionHeading from "../SectionHeading";
import LayoutWrapper from "../../layout/LayoutWrapper";
import StudioSectionMedia from "../StudioSectionMedia";

const StudioSensitiveWrapper = styled.section``;

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
      </LayoutWrapper>
    </StudioSensitiveWrapper>
  );
};

export default StudioSensitive;
