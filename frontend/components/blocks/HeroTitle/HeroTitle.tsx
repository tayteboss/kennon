import styled from "styled-components";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import pxToRem from "../../../utils/pxToRem";

const HeroTitleWrapper = styled.section<{ $useSmallGrid: boolean }>`
  padding: ${pxToRem(80)} 0
    ${(props) => (props.$useSmallGrid ? pxToRem(40) : pxToRem(100))};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(64)} 0;
  }
`;

const Title = styled.h1<{ $useSmallGrid: boolean }>`
  grid-column: ${(props) => (props.$useSmallGrid ? "3 / -3" : "2 / -2")};
  text-align: center;
  font-family: var(--font-arizona-flare-light);
  font-weight: 200;
  max-width: ${(props) => (props.$useSmallGrid ? pxToRem(700) : pxToRem(1200))};
  margin: 0 auto;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

type Props = {
  title?: string;
  useSmallGrid?: boolean;
};

const HeroTitle = (props: Props) => {
  const { title, useSmallGrid = false } = props;

  return (
    <HeroTitleWrapper $useSmallGrid={useSmallGrid}>
      <LayoutWrapper>
        <LayoutGrid>
          <Title $useSmallGrid={useSmallGrid}>{title || ""}</Title>
        </LayoutGrid>
      </LayoutWrapper>
    </HeroTitleWrapper>
  );
};

export default HeroTitle;
