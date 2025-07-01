import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  SensitivePageType,
  SiteSettingsType,
  TransitionsType,
} from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import {
  sensitivePageQueryString,
  siteSettingsQueryString,
} from "../lib/sanityQueries";
import pxToRem from "../utils/pxToRem";
import SensitiveBoard from "../components/blocks/SensitiveBoard";
import { useEffect } from "react";

const PageWrapper = styled(motion.div)`
  padding-top: var(--header-h);
  margin-bottom: ${pxToRem(240)};
  min-height: 100vh;
  min-height: 100lvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(120)};
  }

  .hero-title {
    position: relative;
    z-index: 2;
    mix-blend-mode: difference;
    padding-bottom: ${pxToRem(40)};
    max-width: ${pxToRem(1200)};
    pointer-events: none;

    * {
      color: var(--colour-white);
    }
  }
`;

type Props = {
  data: SensitivePageType;
  siteSettings: SiteSettingsType;
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, siteSettings, pageTransitionVariants } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <SensitiveBoard
        phrases={data?.phrases}
        text={data?.text}
        useExtendedText={true}
        baseLoop={data?.baseLoop}
        melodySounds={data?.melodySounds}
        environmentalSounds={data?.environmentalSounds}
        buttonTitle={siteSettings?.beingSensitiveButtonTitle}
        url={siteSettings?.beingSensitiveGradientUrl}
      />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(sensitivePageQueryString);
  const siteSettings = await client.fetch(siteSettingsQueryString);

  return {
    props: {
      data,
      siteSettings,
    },
  };
}

export default Page;
