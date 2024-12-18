import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import Link from "next/link";

const MenuStudioDetailsWrapper = styled.div`
  position: fixed;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const LinkTag = styled.div`
  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    text-align: center;
  }
`;

type Props = {
  phone: SiteSettingsType["phone"];
  email: SiteSettingsType["email"];
  address: SiteSettingsType["address"];
  googleMapsLink: SiteSettingsType["googleMapsLink"];
  instagramUrl: SiteSettingsType["instagramUrl"];
};

const MenuStudioDetails = (props: Props) => {
  const { phone, email, address, googleMapsLink, instagramUrl } = props;

  return (
    <MenuStudioDetailsWrapper>
      {phone && (
        <Link href={`tel: ${phone}`}>
          <LinkTag>{phone}</LinkTag>
        </Link>
      )}
      {email && (
        <Link href={`mailto: ${email}`}>
          <LinkTag>{email}</LinkTag>
        </Link>
      )}
      {address && googleMapsLink && (
        <Link href={googleMapsLink}>
          <LinkTag>{address}</LinkTag>
        </Link>
      )}
      {instagramUrl && (
        <Link href={instagramUrl} target="_blank">
          <LinkTag>Instagram</LinkTag>
        </Link>
      )}
    </MenuStudioDetailsWrapper>
  );
};

export default MenuStudioDetails;
