import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import Link from "next/link";

const FooterAddressWrapper = styled.div`
  grid-column: span 2;

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    display: none;
  }
`;

const LinkTag = styled.div`
  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

type Props = {
  address: SiteSettingsType["address"];
  googleMapsLink: SiteSettingsType["googleMapsLink"];
};

const FooterAddress = (props: Props) => {
  const { address, googleMapsLink } = props;

  return (
    <FooterAddressWrapper>
      {address && googleMapsLink && (
        <Link href={googleMapsLink} target="_blank">
          <LinkTag className="type-small">{address}</LinkTag>
        </Link>
      )}
    </FooterAddressWrapper>
  );
};

export default FooterAddress;
