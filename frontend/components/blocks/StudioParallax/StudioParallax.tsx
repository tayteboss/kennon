import { motion, useScroll, useTransform } from "framer-motion";
import router from "next/router";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const StudioParallaxWrapper = styled.div`
  height: 440px;
  width: 100%;
  position: relative;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    height: 200px;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;

  img {
    object-fit: contain;
    height: 100%;
    width: 100%;
  }
`;

const StudioParallax = () => {
  const [windowHeight, setWindowHeight] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const transformFore1 = useTransform(
    scrollY,
    [0, windowHeight * 2],
    ["translateY(0px)", "translateY(120px)"]
  );

  const transformFore2 = useTransform(
    scrollY,
    [0, windowHeight * 2],
    ["translateY(0px)", "translateY(75px)"]
  );

  const transformTrees = useTransform(
    scrollY,
    [0, windowHeight * 2],
    ["translateY(0px)", "translateY(60px)"]
  );

  const transformBase = useTransform(
    scrollY,
    [0, windowHeight * 2],
    ["translateY(0px)", "translateY(0px)"]
  );

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const timer = setTimeout(() => {
      setWindowHeight(window.innerHeight);
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <StudioParallaxWrapper ref={wrapperRef}>
      <ImageWrapper style={{ transform: transformFore1 }}>
        <img src="/images/fore1.png" />
      </ImageWrapper>
      <ImageWrapper style={{ transform: transformFore2 }}>
        <img src="/images/fore2.png" />
      </ImageWrapper>
      <ImageWrapper style={{ transform: transformTrees }}>
        <img src="/images/trees.png" />
      </ImageWrapper>
      <ImageWrapper style={{ transform: transformBase }}>
        <img src="/images/base.png" />
      </ImageWrapper>
    </StudioParallaxWrapper>
  );
};

export default StudioParallax;
