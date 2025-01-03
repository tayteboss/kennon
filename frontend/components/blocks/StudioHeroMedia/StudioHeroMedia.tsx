import styled from "styled-components";
import { SensitivePageType } from "../../../shared/types/types";
import MediaStack from "../../common/MediaStack";
import pxToRem from "../../../utils/pxToRem";
import StudioParallax from "../StudioParallax";

const StudioHeroMediaWrapper = styled.section`
  margin-bottom: ${pxToRem(120)};

  .media-wrapper {
    height: ${pxToRem(400)};

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      height: ${pxToRem(240)};
    }
  }
`;

const Inner = styled.div`
  max-width: ${pxToRem(1000)};
  margin: 0 auto;
  padding: 0 ${pxToRem(16)};

  img {
    object-fit: contain !important;
  }
`;

type Props = {
  data: SensitivePageType["media"];
};

const StudioHeroMedia = (props: Props) => {
  const { data } = props;

  return (
    <StudioHeroMediaWrapper>
      <Inner>
        {/* <MediaStack data={data} /> */}
        <StudioParallax />
      </Inner>
    </StudioHeroMediaWrapper>
  );
};

export default StudioHeroMedia;
