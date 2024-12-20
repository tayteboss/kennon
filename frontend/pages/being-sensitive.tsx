import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  SensitivePageType,
  SiteSettingsType,
  TransitionsType,
} from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import { sensitivePageQueryString } from "../lib/sanityQueries";
import HeroTitle from "../components/blocks/HeroTitle";
import BeingSensitiveMedia from "../components/blocks/BeingSensitiveMedia";
import pxToRem from "../utils/pxToRem";

const PageWrapper = styled(motion.div)`
  padding-top: var(--header-h);
  margin-bottom: ${pxToRem(240)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(120)};
  }
`;

type Props = {
  data: SensitivePageType;
  siteSettings: SiteSettingsType;
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, pageTransitionVariants } = props;

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
      <BeingSensitiveMedia data={data?.media} />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(sensitivePageQueryString);

  return {
    props: {
      data,
    },
  };
}

export default Page;
