import styled from "styled-components";
import client from "../../client";
import { TransitionsType, WorkType } from "../../shared/types/types";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { workListString } from "../../lib/sanityQueries";
import WorkTitle from "../../components/blocks/WorkTitle";
import pxToRem from "../../utils/pxToRem";
import WorkHeroImage from "../../components/blocks/WorkHeroImage";
import PageBuilder from "../../components/common/PageBuilder";
import WorkSenses from "../../components/blocks/WorkSenses";
import WorkRelated from "../../components/blocks/WorkRelated";
import { useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";

const PageWrapper = styled(motion.div)`
  padding-top: var(--header-h);
  margin-bottom: ${pxToRem(120)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(80)};
  }
`;

type Props = {
  data: WorkType;
  pageTransitionVariants: TransitionsType;
  cursorRefresh: any;
};

const Page = (props: Props) => {
  const { data, pageTransitionVariants, cursorRefresh } = props;

  const subheading = `${data?.title} — ${data?.location} — ${data?.comingSoon ? "Coming soon" : data?.yearCompleted}`;

  const lenis = useLenis(({ scroll }) => {});

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
  }, [lenis]);

  useEffect(() => {
    cursorRefresh();
  }, []);

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <NextSeo
        title={`${data?.title} — Kennon`}
        description={data?.excerpt || ""}
      />
      <WorkTitle
        subheading={subheading}
        heading={data?.excerpt}
        description={data?.description}
        credits={data?.credits}
        sketches={data?.sketches}
      />
      <WorkHeroImage data={data?.landscapeThumbnailImage} title={data?.title} />
      <PageBuilder data={data?.pageBuilder} />
      <WorkSenses data={data?.senseBlocks} />
      <WorkRelated data={data?.relatedWork} type={data?._type} />
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
  const multiResWorkQuery = `
		*[_type == 'multiResWork'] [0...100] {
			slug
		}
	`;

  const allPublicWork = await client.fetch(publicWorkQuery);
  const allPrivateWork = await client.fetch(privateWorkQuery);
  const allMultiResWork = await client.fetch(multiResWorkQuery);

  const allWork = [...allPublicWork, ...allPrivateWork, ...allMultiResWork];

  return {
    paths: allWork.map((item: any) => {
      return `/works/${item?.slug?.current}`;
    }),
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const workQuery = `
		*[_type in ['privateWork', 'publicWork', 'multiResWork'] && slug.current == "${params.slug[0]}"][0] {
      ${workListString}
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
