import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import FooterOfficeTagline from "../../elements/FooterOfficeTagline";
import FooterNavigation from "../../blocks/FooterNavigation";
import FooterAddress from "../../elements/FooterAddress";
import FooterContact from "../../elements/FooterContact";
import FooterCredit from "../../elements/FooterCredit";
import FooterAoc from "../../elements/FooterAoc";
import FooterLogo from "../../elements/FooterLogo";
import pxToRem from "../../../utils/pxToRem";

const FooterWrapper = styled.footer``;

const Inner = styled.div`
  padding: ${pxToRem(24)} 0;
  border-top: ${pxToRem(1)} solid var(--colour-cream);
`;

const FooterMiddle = styled.div`
  grid-column: 2 / 10;
  display: grid;
  grid-template-columns: subgrid;
  grid-row-gap: ${pxToRem(24)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    grid-column: 1 / 10;
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    margin-bottom: ${pxToRem(24)};
  }

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    grid-row-gap: ${pxToRem(16)};
    margin-bottom: ${pxToRem(16)};
  }
`;

const FooterMiddleTop = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  align-items: end;
`;

const FooterMiddleBottom = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
`;

type Props = {
  siteSettings: SiteSettingsType;
};

const Footer = (props: Props) => {
  const {
    estYear,
    footerTagline,
    instagramUrl,
    aoc,
    googleMapsLink,
    address,
    phone,
    email,
  } = props.siteSettings;

  return (
    <FooterWrapper>
      <LayoutWrapper>
        <Inner>
          <LayoutGrid>
            <FooterNavigation instagramUrl={instagramUrl} />
            <FooterMiddle>
              <FooterMiddleTop>
                <FooterContact phone={phone} email={email} />
                <FooterAddress
                  address={address}
                  googleMapsLink={googleMapsLink}
                />
                <FooterOfficeTagline
                  estYear={estYear}
                  footerTagline={footerTagline}
                />
              </FooterMiddleTop>
              <FooterMiddleBottom>
                <FooterAoc aoc={aoc} />
              </FooterMiddleBottom>
            </FooterMiddle>
            <FooterLogo />
          </LayoutGrid>
        </Inner>
      </LayoutWrapper>
    </FooterWrapper>
  );
};

export default Footer;
