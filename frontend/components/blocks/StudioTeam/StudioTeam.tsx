import styled from "styled-components";
import { StudioPageType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import SectionHeading from "../SectionHeading";
import StudioSectionMedia from "../StudioSectionMedia";

const StudioTeamWrapper = styled.section``;

type Props = {
  data: StudioPageType["teamSection"];
};

const StudioTeam = (props: Props) => {
  const { data } = props;

  return (
    <StudioTeamWrapper className="studio-section">
      <LayoutWrapper>
        <SectionHeading
          subheading={data.subheading}
          heading={data.heading}
          useTopBorder
        />
        <StudioSectionMedia data={data?.media} />
      </LayoutWrapper>
    </StudioTeamWrapper>
  );
};

export default StudioTeam;
