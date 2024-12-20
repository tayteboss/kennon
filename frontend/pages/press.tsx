import styled from "styled-components";
import { NextSeo } from "next-seo";
import { PressPageType, TransitionsType } from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import { pressPageQueryString } from "../lib/sanityQueries";
import HeroTitle from "../components/blocks/HeroTitle";
import pxToRem from "../utils/pxToRem";
import LayoutWrapper from "../components/layout/LayoutWrapper";
import LayoutGrid from "../components/layout/LayoutGrid";
import PressCard from "../components/blocks/PressCard";
import PressBar from "../components/blocks/PressBar";

const PageWrapper = styled(motion.div)`
  padding-top: var(--header-h);
  margin-bottom: ${pxToRem(240)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(120)};
  }

  .layout-grid {
    row-gap: ${pxToRem(24)};

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      row-gap: ${pxToRem(16)};
    }
  }
`;

type Props = {
  data: PressPageType;
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, pageTransitionVariants } = props;

  const hasPressCards = data?.pressCards?.length > 0;

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
      {/* <PressBar data={data?.pressCards} /> */}
      <LayoutWrapper>
        <LayoutGrid>
          {hasPressCards &&
            data?.pressCards?.map((card, i) => (
              <PressCard
                key={i}
                title={card?.title}
                colour={card?.colour}
                image={card?.image}
                link={card?.link}
              />
            ))}
        </LayoutGrid>
      </LayoutWrapper>
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
