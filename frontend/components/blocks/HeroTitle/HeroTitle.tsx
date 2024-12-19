import styled from "styled-components";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import pxToRem from "../../../utils/pxToRem";

const HeroTitleWrapper = styled.section`
  padding: ${pxToRem(80)} 0;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(64)} 0;
  }
`;

const Title = styled.h1`
  grid-column: 2 / -2;
  text-align: center;
  font-family: var(--font-arizona-flare-light);
  font-weight: 200;
`;

type Props = {
  title?: string;
};

const HeroTitle = (props: Props) => {
  const { title } = props;

  return (
    <HeroTitleWrapper>
      <LayoutWrapper>
        <LayoutGrid>
          <Title>{title || ""}</Title>
        </LayoutGrid>
      </LayoutWrapper>
    </HeroTitleWrapper>
  );
};

export default HeroTitle;
