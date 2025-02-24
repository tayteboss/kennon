import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import SectionHeading from "../SectionHeading";
import pxToRem from "../../../utils/pxToRem";
import MediaStack from "../../common/MediaStack";
import LayoutGrid from "../../layout/LayoutGrid";
import Link from "next/link";

const HomeStudioWrapper = styled.section`
  padding-top: ${pxToRem(8)};
  margin-bottom: ${pxToRem(240)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(80)};
  }

  a {
    grid-column: 2 / -2;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      grid-column: 1 / -1;
    }
  }

  .media-wrapper {
    background: transparent !important;
  }
`;

const ImageWrapper = styled.div`
  padding: ${pxToRem(40)} 0;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(24)} 0;
  }

  .media-wrapper {
    height: ${pxToRem(400)};

    img {
      object-fit: contain !important;
    }
  }
`;

type Props = {
  data: HomePageType["studioSection"];
};

const HomeStudio = (props: Props) => {
  const { data } = props;

  return (
    <HomeStudioWrapper>
      <LayoutWrapper>
        <SectionHeading
          subheading={data?.studioSubheading}
          heading={data?.studioHeading}
        />
        <LayoutGrid>
          <Link href="/studio">
            <ImageWrapper className="cursor-arrow-link">
              <MediaStack data={data?.studioMedia} />
            </ImageWrapper>
          </Link>
        </LayoutGrid>
      </LayoutWrapper>
    </HomeStudioWrapper>
  );
};

export default HomeStudio;
