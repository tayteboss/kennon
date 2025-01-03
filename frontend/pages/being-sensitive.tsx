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
import SensitiveBoard from "../components/blocks/SensitiveBoard";
import ButtonLayout from "../components/layout/ButtonLayout";
import { useState } from "react";

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

const ButtonWrapper = styled.div<{ $isActive: boolean }>`
  padding: 0 ${pxToRem(16)};
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  pointer-events: ${(props) => (props.$isActive ? "all" : "none")};

  transition: all var(--transition-speed-extra-slow) var(--transition-ease);

  .button-inner {
    background: rgba(255, 255, 255, 0.5);
    color: var(--colour-black);
  }
`;

type Props = {
  data: SensitivePageType;
  siteSettings: SiteSettingsType;
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, pageTransitionVariants } = props;

  const [isActive, setIsActive] = useState(false);

  const phrases = [
    "Being Sensitive is an on going dissertation into The Senses of Place",
    "With equal purpose to make ideas matter in both practice and theory",
    "Being Sensitive is a tool to communicate the theory behind purpose,",
    "pragmatism and philosophy that informs our work",
  ];

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={() => setIsActive(true)}
    >
      <NextSeo
        title={data?.seo?.title || ""}
        description={data?.seo?.description || ""}
      />
      {/* <HeroTitle title={data?.heroTitle} /> */}
      <ButtonWrapper $isActive={!isActive}>
        <ButtonLayout>Click anywhere</ButtonLayout>
      </ButtonWrapper>
      <SensitiveBoard isActive={isActive} phrases={phrases} />
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
