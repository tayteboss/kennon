import styled from "styled-components";
import { StudioPageType } from "../../../shared/types/types";
import SectionHeading from "../SectionHeading";
import LayoutWrapper from "../../layout/LayoutWrapper";
import InformationColumn from "../InformationColumn";

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
        <InformationColumn
          title="Sector experience"
          data={data.sectorExperience}
        />
        <InformationColumn title="Associates" data={data.associations} />
        <InformationColumn title="Awards" data={data.awards} useAwardsType />
      </LayoutWrapper>
    </StudioInformationWrapper>
  );
};

export default StudioInformation;
