import styled from "styled-components";
import { ContactPageType, SiteSettingsType } from "../../../shared/types/types";
import ContactCard from "../ContactCard";

const StudioContactWrapper = styled.section``;

type Props = {
  siteSettings: SiteSettingsType;
  contactPageData: ContactPageType;
};

const StudioContact = (props: Props) => {
  const { siteSettings, contactPageData } = props;

  return (
    <StudioContactWrapper>
      <ContactCard
        phone={siteSettings?.phone}
        email={siteSettings?.email}
        address={siteSettings?.address}
        googleMapsLink={siteSettings?.googleMapsLink}
        instagramUrl={siteSettings?.instagramUrl}
        media={contactPageData?.media}
      />
    </StudioContactWrapper>
  );
};

export default StudioContact;
