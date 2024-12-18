import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import HomeWorkCard from "../../elements/HomeWorkCard";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import pxToRem from "../../../utils/pxToRem";

const HomeWorksWrapper = styled.section`
  padding: ${pxToRem(24)} 0;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(16)} 0;

    .layout-grid {
      gap: ${pxToRem(16)};
    }
  }
`;

type Props = {
  privateWorkImage: SiteSettingsType["privateWorkImage"];
  publicWorkImage: SiteSettingsType["publicWorkImage"];
};

const HomeWorks = (props: Props) => {
  const { privateWorkImage, publicWorkImage } = props;

  return (
    <HomeWorksWrapper>
      <LayoutWrapper>
        <LayoutGrid>
          <HomeWorkCard title="Private work" image={privateWorkImage} />
          <HomeWorkCard title="Public work" image={publicWorkImage} />
        </LayoutGrid>
      </LayoutWrapper>
    </HomeWorksWrapper>
  );
};

export default HomeWorks;
