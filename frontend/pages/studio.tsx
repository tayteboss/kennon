import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  ContactPageType,
  SiteSettingsType,
  StudioPageType,
  TransitionsType,
} from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import {
  siteSettingsQueryString,
  studioPageQueryString,
} from "../lib/sanityQueries";
import pxToRem from "../utils/pxToRem";
import HeroTitle from "../components/blocks/HeroTitle";
import StudioHeroMedia from "../components/blocks/StudioHeroMedia";

const PageWrapper = styled(motion.div)`
  padding-top: var(--header-h);
  margin-bottom: ${pxToRem(240)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(120)};
  }
`;

type Props = {
  data: StudioPageType;
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
      <HeroTitle title={data?.heroTitle} useSmallGrid />
      <StudioHeroMedia data={data?.heroMedia} />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(studioPageQueryString);
  const siteSettings = await client.fetch(siteSettingsQueryString);

  return {
    props: {
      data,
      siteSettings,
    },
  };
}

export default Page;
