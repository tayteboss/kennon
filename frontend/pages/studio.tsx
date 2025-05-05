import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  ContactPageType,
  PressCardType,
  SiteSettingsType,
  StudioPageType,
  TransitionsType,
} from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import {
  contactPageQueryString,
  pressPageQueryString,
  siteSettingsQueryString,
  studioPageQueryString,
} from "../lib/sanityQueries";
import pxToRem from "../utils/pxToRem";
import HeroTitle from "../components/blocks/HeroTitle";
import StudioHeroMedia from "../components/blocks/StudioHeroMedia";
import StudioContact from "../components/blocks/StudioContact";
import StudioInformation from "../components/blocks/StudioInformation";
import StudioPress from "../components/blocks/StudioPress";
import StudioSensitive from "../components/blocks/StudioSensitive";
import StudioTeam from "../components/blocks/StudioTeam";

const PageWrapper = styled(motion.div)`
  padding-top: var(--header-h);
  margin-bottom: ${pxToRem(120)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(80)};
  }
`;

type Props = {
  data: StudioPageType;
  siteSettings: SiteSettingsType;
  contactPageData: ContactPageType;
  pageTransitionVariants: TransitionsType;
  firstThreePressCards: PressCardType[];
};

const Page = (props: Props) => {
  const {
    data,
    siteSettings,
    contactPageData,
    firstThreePressCards,
    pageTransitionVariants,
  } = props;

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
      {/* <StudioHeroMedia data={data?.heroMedia} /> */}
      {/* <StudioSensitive data={data?.beingSensitiveSection} /> */}
      {/* <StudioPress
        data={data?.pressSection}
        pressCards={firstThreePressCards}
      /> */}
      {/* <StudioTeam data={data?.teamSection} /> */}
      <StudioInformation data={data?.studioSection} aoc={siteSettings?.aoc} />
      {/* <StudioContact
        siteSettings={siteSettings}
        contactPageData={contactPageData}
      /> */}
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(studioPageQueryString);
  const contactPageData = await client.fetch(contactPageQueryString);
  const siteSettings = await client.fetch(siteSettingsQueryString);
  const pressData = await client.fetch(pressPageQueryString);

  const firstThreePressCards = pressData?.pressCards.slice(0, 3);

  return {
    props: {
      data,
      siteSettings,
      contactPageData,
      firstThreePressCards,
    },
  };
}

export default Page;
