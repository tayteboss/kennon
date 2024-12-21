import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import router from "next/router";
import { useState, useRef, useEffect } from "react";

const WorkHeroImageWrapper = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const ImageWrapper = styled(motion.div)`
  height: 100%;
  width: 100%;
`;

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: var(--colour-white);
  mix-blend-mode: difference;
  font-family: var(--font-arizona-flare-light);
  font-weight: 200;
`;

type Props = {
  data: WorkType["landscapeThumbnailImage"];
  title: WorkType["title"];
};

const WorkHeroImage = (props: Props) => {
  const { data, title } = props;

  const [windowHeight, setWindowHeight] = useState(0);
  const [distanceToTop, setDistanceToTop] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const transform = useTransform(
    scrollY,
    [distanceToTop - windowHeight / 2, distanceToTop + windowHeight],
    ["scale(1.1)", "scale(1)"]
  );

  useEffect(() => {
    if (wrapperRef?.current) {
      setDistanceToTop(
        window.pageYOffset + wrapperRef.current.getBoundingClientRect().top
      );
    }

    setWindowHeight(window.innerHeight);

    const timer = setTimeout(() => {
      if (wrapperRef?.current) {
        setDistanceToTop(
          window.pageYOffset + wrapperRef.current.getBoundingClientRect().top
        );
      }

      setWindowHeight(window.innerHeight);
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <WorkHeroImageWrapper ref={wrapperRef}>
      {data?.asset?.url && (
        <ImageWrapper style={{ transform }}>
          <Image
            src={data?.asset?.url}
            alt={`${title} hero image`}
            priority={true}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
        </ImageWrapper>
      )}
      {title && <Title>{title}</Title>}
    </WorkHeroImageWrapper>
  );
};

export default WorkHeroImage;
