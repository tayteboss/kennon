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

const PageWrapper = styled(motion.div)``;

type Props = {
  data: SensitivePageType;
  siteSettings: SiteSettingsType;
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, pageTransitionVariants } = props;

  console.log("data", data);

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
      Being Sensitive
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
