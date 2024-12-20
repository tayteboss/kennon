import styled from "styled-components";
import { StudioPageType } from "../../../shared/types/types";
import SectionHeading from "../SectionHeading";
import LayoutWrapper from "../../layout/LayoutWrapper";

const StudioInformationWrapper = styled.section``;

type Props = {
  data: StudioPageType["studioSection"];
};

const StudioInformation = (props: Props) => {
  const { data } = props;

  return (
    <StudioInformationWrapper className="studio-section">
      <LayoutWrapper>
        <SectionHeading
          subheading={data.subheading}
          heading={data.heading}
          useTopBorder
        />
      </LayoutWrapper>
    </StudioInformationWrapper>
  );
};

export default StudioInformation;
