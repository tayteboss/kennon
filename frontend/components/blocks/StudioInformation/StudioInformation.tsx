import styled from "styled-components";
import { SiteSettingsType, StudioPageType } from "../../../shared/types/types";
import SectionHeading from "../SectionHeading";
import LayoutWrapper from "../../layout/LayoutWrapper";
import InformationColumn from "../InformationColumn";

const StudioInformationWrapper = styled.section``;

type Props = {
  data: StudioPageType["studioSection"];
  aoc: SiteSettingsType["aoc"];
};

const StudioInformation = (props: Props) => {
  const { data, aoc } = props;

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
          useDefaultType
        />
        <InformationColumn
          title="Associations"
          data={data.associations}
          useDefaultType
        />
        <InformationColumn title="Awards" data={data.awards} useAwardsType />
        <InformationColumn
          title="Acknowledgement of Country"
          data={aoc}
          useAocType
        />
      </LayoutWrapper>
    </StudioInformationWrapper>
  );
};

export default StudioInformation;
