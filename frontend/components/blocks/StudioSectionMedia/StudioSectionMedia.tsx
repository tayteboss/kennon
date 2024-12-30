import styled from "styled-components";
import { SensitivePageType } from "../../../shared/types/types";
import MediaStack from "../../common/MediaStack";
import pxToRem from "../../../utils/pxToRem";

const StudioSectionMediaWrapper = styled.section`
  .media-wrapper {
    height: ${pxToRem(775)};

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      height: 75vh;
    }
  }
`;

type Props = {
  data: SensitivePageType["media"];
};

const StudioSectionMedia = (props: Props) => {
  const { data } = props;

  return (
    <StudioSectionMediaWrapper>
      <MediaStack data={data} />
    </StudioSectionMediaWrapper>
  );
};

export default StudioSectionMedia;
