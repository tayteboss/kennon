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
import SensitiveBoard from "../components/blocks/SensitiveBoard";
import { useEffect } from "react";

const PageWrapper = styled(motion.div)`
  .sensitive-board {
    position: relative;
    height: 100lvh;

    &__start {
      top: 60%;
    }

    &__hint {
      display: none;
    }
  }
`;

type Props = {
  data: HomePageType;
  siteSettings: SiteSettingsType;
  pageTransitionVariants: TransitionsType;
  cursorRefresh: any;
};

const Page = (props: Props) => {
  const { data, siteSettings, pageTransitionVariants, cursorRefresh } = props;

  const handleCursorRefresh = () => {
    cursorRefresh();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      cursorRefresh();
    }, 1000);

    return () => clearTimeout(timer);
  }, [data?.useBeingSensitiveBoard]);

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
      {!data?.useBeingSensitiveBoard && <HomeHero data={data?.heroMedia} />}
      {data?.useBeingSensitiveBoard && (
        <SensitiveBoard
          phrases={data?.beingSensitiveBoard?.phrases}
          baseLoop={data?.beingSensitiveBoard?.baseLoop}
          melodySounds={data?.beingSensitiveBoard?.melodySounds}
          environmentalSounds={data?.beingSensitiveBoard?.environmentalSounds}
          isHomePage={true}
          handleCursorRefresh={() => handleCursorRefresh()}
        />
      )}
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
