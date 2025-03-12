import styled from "styled-components";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import pxToRem from "../../../utils/pxToRem";
import { motion, useScroll, useTransform } from "framer-motion";
import router from "next/router";
import { useState, useRef, useEffect } from "react";

const HeroTitleWrapper = styled.section<{ $useSmallGrid: boolean }>`
  padding: ${pxToRem(64)} 0
    ${(props) => (props.$useSmallGrid ? pxToRem(40) : pxToRem(100))};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(64)} 0;
  }
`;

const Title = styled(motion.h1)<{ $useSmallGrid: boolean }>`
  grid-column: 3 / -3;
  text-align: center;
  font-family: var(--font-arizona-flare-light);
  font-weight: 200;
  max-width: ${pxToRem(600)};
  margin: 0 auto;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

type Props = {
  title?: string;
  useSmallGrid?: boolean;
};

const HeroTitle = (props: Props) => {
  const { title, useSmallGrid = false } = props;

  const [windowHeight, setWindowHeight] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const blur = useTransform(
    scrollY,
    [0, windowHeight],
    ["blur(0px)", "blur(10px)"]
  );

  const transform = useTransform(
    scrollY,
    [0, windowHeight],
    ["translateY(0px)", "translateY(100px)"]
  );

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const timer = setTimeout(() => {
      setWindowHeight(window.innerHeight);
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      {title && (
        <HeroTitleWrapper
          className="hero-title"
          $useSmallGrid={useSmallGrid}
          ref={wrapperRef}
        >
          <LayoutWrapper>
            <LayoutGrid>
              <Title
                $useSmallGrid={useSmallGrid}
                style={{ filter: blur, transform }}
              >
                {title || ""}
              </Title>
            </LayoutGrid>
          </LayoutWrapper>
        </HeroTitleWrapper>
      )}
    </>
  );
};

export default HeroTitle;
