import styled from "styled-components";
import client from "../../client";
import { TransitionsType, WorkType } from "../../shared/types/types";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";

type Props = {
  data: WorkType;
  pageTransitionVariants: TransitionsType;
};

const PageWrapper = styled(motion.div)``;

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
      <NextSeo title={`TO BE FILLLED IN`} description={`TO BE FILLED IN`} />
    </PageWrapper>
  );
};

export async function getStaticPaths() {
  const publicWorkQuery = `
		*[_type == 'publicWork'] [0...100] {
			slug
		}
	`;
  const privateWorkQuery = `
		*[_type == 'privateWork'] [0...100] {
			slug
		}
	`;

  const allPublicWork = await client.fetch(publicWorkQuery);
  const allPrivateWork = await client.fetch(privateWorkQuery);

  const allWork = [...allPublicWork, ...allPrivateWork];

  return {
    paths: allWork.map((item: any) => {
      return `/work/${item?.slug?.current}`;
    }),
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  console.log("params", params);

  const workQuery = `
		*[_type in ['privateWork', 'publicWork'] && slug.current == "${params.slug[0]}"][0] {
			...,
		}
	`;
  const data = await client.fetch(workQuery);

  return {
    props: {
      data,
    },
  };
}

export default Page;
