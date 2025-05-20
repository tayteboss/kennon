import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  HomePageType,
  SiteSettingsType,
  TransitionsType,
} from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import { siteSettingsQueryString } from "../lib/sanityQueries";
import SensitiveBoard from "../components/blocks/SensitiveBoard";
import Screensavers from "../components/blocks/Screensavers";

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
  siteSettings: SiteSettingsType;
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { siteSettings, pageTransitionVariants } = props;

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <NextSeo
        title="Screensavers"
        description=""
        noindex={true}
        nofollow={true}
      />
      <Screensavers data={siteSettings?.screensavers} />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const siteSettings = await client.fetch(siteSettingsQueryString);

  return {
    props: {
      siteSettings,
    },
  };
}

export default Page;
