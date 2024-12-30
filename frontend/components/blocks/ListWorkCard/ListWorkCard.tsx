import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import LayoutGrid from "../../layout/LayoutGrid";
import formatType from "../../../utils/formatType";
import Link from "next/link";
import Image from "next/image";
import LayoutWrapper from "../../layout/LayoutWrapper";
import { useMousePosition } from "../../../hooks/useMousePosition";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import LandscapeCardTitle from "../../elements/LandscapeCardTitle";
import { useInView } from "react-intersection-observer";

const ListWorkCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(24)};
  margin-bottom: ${pxToRem(64)};

  .landscape-card-title {
    position: relative;
    top: unset;
    padding: 0;
  }
`;

const DesktopContentWrapper = styled.div`
  padding-top: ${pxToRem(8)};
  border-top: 1px solid var(--colour-cream);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const MobileContentWrapper = styled.div`
  display: none;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding-top: ${pxToRem(16)};
    border-top: 1px solid var(--colour-cream);
    display: block;
  }
`;

const Title = styled.h4`
  grid-column: 1 / 5;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

const Text = styled.p`
  grid-column: span 3;
  font-family: var(--font-helvetica-neue-roman);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

const Year = styled.p`
  grid-column: span 2;
  text-align: right;
  font-family: var(--font-helvetica-neue-roman);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    text-align: left;
  }
`;

const ImagesWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    overflow: auto;
    padding-right: ${pxToRem(16)};

    scrollbar-width: none;
    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
  }
`;

const DesktopImagesInner = styled(motion.div)`
  display: flex;
  flex-wrap: nowrap;
  gap: ${pxToRem(8)};
  padding-left: ${pxToRem(24)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const MobileImagesInner = styled.div`
  display: none;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: flex;
    flex-wrap: nowrap;
    padding-left: ${pxToRem(16)};
    padding-right: ${pxToRem(16)};
    gap: ${pxToRem(4)};
  }
`;

const ImageWrapper = styled.div`
  flex: 7vw 0 0;
  overflow: hidden;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    flex: 15vw 0 0;

    &:last-child {
      margin-right: 16px;
    }
  }
`;

const ImageInner = styled.div`
  position: relative;
  padding-top: 100%;
`;

type Props = {
  title: WorkType["title"];
  location: WorkType["location"];
  type: WorkType["_type"];
  yearCompleted: WorkType["yearCompleted"];
  image: WorkType["landscapeThumbnailImage"];
  slug: WorkType["slug"];
  allImages: WorkType["allImages"];
  comingSoon: WorkType["comingSoon"];
  isPriority: boolean;
};

const ListWorkCard = (props: Props) => {
  const {
    title,
    location,
    type,
    yearCompleted,
    slug,
    allImages,
    comingSoon,
    isPriority,
  } = props;

  const hasImages = allImages && allImages.length > 0;
  const position = useMousePosition();

  const imagesRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    if (!imagesRef.current || !hasImages) return;
    const containerWidth = imagesRef.current.clientWidth;
    const contentWidth = Array.from(imagesRef.current.children).reduce(
      (acc, child) => acc + (child as HTMLElement).offsetWidth,
      0
    );
    setOverflow(contentWidth > containerWidth);
    setMaxScroll(Math.max(contentWidth - containerWidth, 0));
  }, [allImages, hasImages]);

  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1;
  const mouseX = useMotionValue(position.x);

  useEffect(() => {
    mouseX.set(position.x);
  }, [position.x, mouseX]);

  // Convert mouseX (0 to windowWidth) to a 0-1 ratio
  const cursorPositionRelativeToWindow = useTransform(mouseX, (x) => {
    return windowWidth ? x / windowWidth : 0;
  });

  // We'll have a hovered state that we use as a motion value
  const hovered = useMotionValue(0);

  // When hovered is true (1), we map mouse position to a small translation range
  // We use a very subtle range: ±2% of maxScroll
  // If maxScroll = 1000px, this results in a ±20px movement max.
  const hoveredValue = useTransform(
    cursorPositionRelativeToWindow,
    [0, 1],
    [maxScroll * 0.02, -maxScroll * 0.1]
  );

  // Combine hovered and hoveredValue so that when hovered = 0, we return to 0 translation
  const finalX = useTransform([hoveredValue, hovered], ([hVal, h]) => {
    return h ? hVal : 0;
  });

  // Use a spring to smooth out the movement
  const smoothX = useSpring(finalX as MotionValue<number>, {
    stiffness: 80,
    damping: 20,
  });

  const handleMouseEnter = () => {
    hovered.set(1);
  };

  const handleMouseLeave = () => {
    hovered.set(0);
  };

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  return (
    <Link
      href={`/works/${slug.current}`}
      ref={ref}
      className={`cursor-arrow-link view-element-fade-in ${
        inView ? "view-element-fade-in--in-view" : ""
      }`}
    >
      <ListWorkCardWrapper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <LayoutWrapper>
          <DesktopContentWrapper>
            <LayoutGrid>
              <Title className="type-p">{title || ""}</Title>
              <Text>{location || ""}</Text>
              <Text>{formatType(type) || ""}</Text>
              <Year>
                {comingSoon
                  ? "Coming soon"
                  : yearCompleted
                    ? yearCompleted
                    : ""}
              </Year>
            </LayoutGrid>
          </DesktopContentWrapper>
          <MobileContentWrapper>
            <LandscapeCardTitle
              title={title}
              location={location}
              yearCompleted={yearCompleted}
              comingSoon={comingSoon}
              type={type}
            />
          </MobileContentWrapper>
        </LayoutWrapper>
        <ImagesWrapper>
          <DesktopImagesInner ref={imagesRef} style={{ x: smoothX }}>
            {hasImages &&
              allImages.map((img, i) => (
                <ImageWrapper key={i}>
                  <ImageInner>
                    <Image
                      src={img}
                      alt="thumbnail work image"
                      priority={isPriority}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="10vw"
                    />
                  </ImageInner>
                </ImageWrapper>
              ))}
          </DesktopImagesInner>
          <MobileImagesInner>
            {hasImages &&
              allImages.map((img, i) => (
                <ImageWrapper key={i}>
                  <ImageInner>
                    <Image
                      src={img}
                      alt="thumbnail work image"
                      priority={isPriority}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="25vw"
                    />
                  </ImageInner>
                </ImageWrapper>
              ))}
          </MobileImagesInner>
        </ImagesWrapper>
      </ListWorkCardWrapper>
    </Link>
  );
};

export default ListWorkCard;
