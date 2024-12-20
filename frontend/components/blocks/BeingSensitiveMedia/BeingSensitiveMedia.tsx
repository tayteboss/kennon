import styled from "styled-components";
import { SensitivePageType } from "../../../shared/types/types";
import MediaStack from "../../common/MediaStack";
import pxToRem from "../../../utils/pxToRem";
import LayoutWrapper from "../../layout/LayoutWrapper";

const BeingSensitiveMediaWrapper = styled.section`
  .media-wrapper {
    height: ${pxToRem(775)};

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      height: 100vh;
    }
  }
`;

type Props = {
  data: SensitivePageType["media"];
};

const BeingSensitiveMedia = (props: Props) => {
  const { data } = props;

  return (
    <BeingSensitiveMediaWrapper>
      <LayoutWrapper>
        <MediaStack data={data} />
      </LayoutWrapper>
    </BeingSensitiveMediaWrapper>
  );
};

export default BeingSensitiveMedia;
