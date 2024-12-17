import styled from "styled-components";
import { NextSeo } from "next-seo";
import { PressPageType, TransitionsType } from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import { pressPageQueryString } from "../lib/sanityQueries";

const PageWrapper = styled(motion.div)``;

type Props = {
  data: PressPageType;
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
      Press
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(pressPageQueryString);

  return {
    props: {
      data,
    },
  };
}

export default Page;
