import styled from "styled-components";
import { SensitivePageType } from "../../../shared/types/types";
import MediaStack from "../../common/MediaStack";
import LayoutGrid from "../../layout/LayoutGrid";
import LayoutWrapper from "../../layout/LayoutWrapper";

const StudioSectionMediaWrapper = styled.section``;

const Inner = styled.div`
  grid-column: 5 / span 4;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

type Props = {
  data: SensitivePageType["media"];
};

const StudioSectionMedia = (props: Props) => {
  const { data } = props;

  return (
    <StudioSectionMediaWrapper className="work-section work-section--portrait">
      {data && (
        <LayoutGrid>
          <Inner>
            <MediaStack data={data} />
          </Inner>
        </LayoutGrid>
      )}
    </StudioSectionMediaWrapper>
  );
};

export default StudioSectionMedia;
