import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  HomePageType,
  SiteSettingsType,
  TransitionsType,
} from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import {
  homePageQueryString,
  siteSettingsQueryString,
} from "../lib/sanityQueries";
import HomeFeaturedWorks from "../components/blocks/HomeFeaturedWorks";
import HomeHero from "../components/blocks/HomeHero";
import HomeStudio from "../components/blocks/HomeStudio";
import HomeWorks from "../components/blocks/HomeWorks";

const PageWrapper = styled(motion.div)``;

type Props = {
  data: HomePageType;
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
      <HomeHero data={data?.heroMedia} />
      <HomeWorks
        privateWorkImage={siteSettings?.privateWorkImage}
        publicWorkImage={siteSettings?.publicWorkImage}
      />
      <HomeFeaturedWorks data={data?.featuredWork} />
      <HomeStudio data={data?.studioSection} />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const siteSettings = await client.fetch(siteSettingsQueryString);
  const data = await client.fetch(homePageQueryString);

  return {
    props: {
      data,
      siteSettings,
    },
  };
}

export default Page;
