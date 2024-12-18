import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";

const FooterOfficeTaglineWrapper = styled.div`
  grid-column: span 2;

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    grid-column: span 3;
  }
`;

const Text = styled.p``;

type Props = {
  estYear: SiteSettingsType["estYear"];
  footerTagline: SiteSettingsType["footerTagline"];
};

const FooterOfficeTagline = (props: Props) => {
  const { estYear, footerTagline } = props;

  return (
    <FooterOfficeTaglineWrapper>
      {footerTagline && <Text className="type-small">{footerTagline}</Text>}
      {estYear && <Text className="type-small">Established in {estYear}</Text>}
    </FooterOfficeTaglineWrapper>
  );
};

export default FooterOfficeTagline;
