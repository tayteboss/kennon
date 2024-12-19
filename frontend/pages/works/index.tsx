import styled from "styled-components";
import client from "../../client";
import { motion } from "framer-motion";
import {
  TransitionsType,
  WorkPageType,
  WorkType,
} from "../../shared/types/types";
import { NextSeo } from "next-seo";
import {
  privateWorkQueryString,
  publicWorkQueryString,
  workPageQueryString,
} from "../../lib/sanityQueries";
import pxToRem from "../../utils/pxToRem";
import PageBuilder from "../../components/common/PageBuilder";
import { useState } from "react";
import HeroTitle from "../../components/blocks/HeroTitle";

const PageWrapper = styled(motion.div)`
  padding-top: var(--header-h);
  min-height: 150vh;
  padding-bottom: ${pxToRem(80)};
  background: var(--colour-white);
`;

type Props = {
  data: WorkPageType;
  publicWorkList: WorkType[];
  privateWorkList: WorkType[];
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, publicWorkList, privateWorkList, pageTransitionVariants } =
    props;

  const [listView, setListView] = useState("landscape");

  console.log("data", data);
  console.log("publicWorkList", publicWorkList);
  console.log("privateWorkList", privateWorkList);

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
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(workPageQueryString);
  const publicWorkList = await client.fetch(publicWorkQueryString);
  const privateWorkList = await client.fetch(privateWorkQueryString);

  return {
    props: {
      data,
      publicWorkList,
      privateWorkList,
    },
  };
}

export default Page;
