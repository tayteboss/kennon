import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  ContactPageType,
  SiteSettingsType,
  TransitionsType,
} from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import {
  contactPageQueryString,
  siteSettingsQueryString,
} from "../lib/sanityQueries";
import HeroTitle from "../components/blocks/HeroTitle";
import ContactCard from "../components/blocks/ContactCard";
import pxToRem from "../utils/pxToRem";

const PageWrapper = styled(motion.div)`
  padding-top: var(--header-h);
  margin-bottom: ${pxToRem(240)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(120)};
  }
`;

type Props = {
  data: ContactPageType;
  siteSettings: SiteSettingsType;
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, siteSettings, pageTransitionVariants } = props;

  console.log("data", data);
  console.log("siteSettings", siteSettings);

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <NextSeo
        title={data?.seo?.title || ""}
        description={data?.seo?.description || ""}
      />
      <HeroTitle title={data?.heroTitle} />
      <ContactCard
        phone={siteSettings?.phone}
        email={siteSettings?.email}
        address={siteSettings?.address}
        googleMapsLink={siteSettings?.googleMapsLink}
        instagramUrl={siteSettings?.instagramUrl}
        media={data?.media}
      />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(contactPageQueryString);
  const siteSettings = await client.fetch(siteSettingsQueryString);

  return {
    props: {
      data,
      siteSettings,
    },
  };
}

export default Page;
