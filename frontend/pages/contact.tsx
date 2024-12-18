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

const PageWrapper = styled(motion.div)``;

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
      Contact
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
