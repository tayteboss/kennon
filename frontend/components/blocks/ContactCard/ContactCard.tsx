import styled from "styled-components";
import { ContactPageType, SiteSettingsType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import pxToRem from "../../../utils/pxToRem";
import MediaStack from "../../common/MediaStack";
import Link from "next/link";

const ContactCardWrapper = styled.section``;

const Inner = styled.div<{ $noBorder: boolean }>`
  padding-top: ${pxToRem(24)};
  border-top: ${(props) =>
    props.$noBorder ? "none" : "1px solid var(--colour-cream)"};
`;

const ContentWrapper = styled.div`
  grid-column: 1 / 5;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    grid-column: 1 / -1;
    margin-bottom: ${pxToRem(24)};
  }
`;

const ImageWrapper = styled.div`
  grid-column: 5 / -1;
  width: 100%;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    grid-column: 1 / -1;
  }
`;

const ImageInner = styled.div`
  padding-top: 100%;
  width: 100%;
  position: relative;
`;

const ImageAbsolute = styled.div`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;

  * {
    height: 100%;
    width: 100%;
  }
`;

const LinkTag = styled.div`
  font-family: var(--font-arizona-flare-light);
  font-weight: 200;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

type Props = {
  email: SiteSettingsType["email"];
  phone: SiteSettingsType["phone"];
  address: SiteSettingsType["address"];
  googleMapsLink: SiteSettingsType["googleMapsLink"];
  instagramUrl: SiteSettingsType["instagramUrl"];
  media: ContactPageType["media"];
  noBorder?: boolean;
};

const ContactCard = (props: Props) => {
  const {
    email,
    phone,
    address,
    googleMapsLink,
    instagramUrl,
    media,
    noBorder = false,
  } = props;

  return (
    <ContactCardWrapper>
      <LayoutWrapper>
        <Inner $noBorder={noBorder}>
          <LayoutGrid>
            <ContentWrapper>
              {phone && (
                <Link href={`tel: ${phone}`}>
                  <LinkTag className="type-h1">{phone}</LinkTag>
                </Link>
              )}
              {email && (
                <Link href={`mailto: ${email}`}>
                  <LinkTag className="type-h1">{email}</LinkTag>
                </Link>
              )}
              {address && googleMapsLink && (
                <Link href={googleMapsLink} target="_blank">
                  <LinkTag className="type-h1">{address}</LinkTag>
                </Link>
              )}
              {instagramUrl && (
                <Link href={instagramUrl} target="_blank">
                  <LinkTag className="type-h1">Instagram</LinkTag>
                </Link>
              )}
            </ContentWrapper>
            <ImageWrapper>
              {media && (
                <ImageInner>
                  <ImageAbsolute>
                    <MediaStack data={media} />
                  </ImageAbsolute>
                </ImageInner>
              )}
            </ImageWrapper>
          </LayoutGrid>
        </Inner>
      </LayoutWrapper>
    </ContactCardWrapper>
  );
};

export default ContactCard;
