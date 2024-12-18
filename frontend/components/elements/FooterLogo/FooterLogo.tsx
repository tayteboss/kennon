import styled from "styled-components";
import Logo from "../../svgs/Logo";
import pxToRem from "../../../utils/pxToRem";

const FooterLogoWrapper = styled.div`
  grid-column: 10 / -1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    flex-direction: row;
  }
`;

const LogoWrapper = styled.div`
  svg {
    width: ${pxToRem(140)};
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: flex;
    align-items: flex-end;
  }
`;

const Copy = styled.p`
  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding-bottom: ${pxToRem(15)};
  }
`;

const FooterLogo = () => {
  return (
    <FooterLogoWrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Copy className="type-small">
        Kennon Architecture © {new Date().getFullYear()}
      </Copy>
    </FooterLogoWrapper>
  );
};

export default FooterLogo;
