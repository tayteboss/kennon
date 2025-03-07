import styled from "styled-components";
import { PressCardType } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const PressCardWrapper = styled.div<{ $hex: string }>`
  grid-column: span 4;
  width: 100%;
  background: ${(props) => props.$hex};
  overflow: hidden;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: span 3;
  }

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    grid-column: 1 / -1;
  }

  a {
    display: block;
    width: 100%;
    padding-top: 75%;
    position: relative;
  }

  &:hover {
    .press-card__image {
      opacity: 1;

      img {
        filter: blur(0);
        transform: scale(1);
      }
    }

    .press-card__content {
      opacity: 0;
    }
  }
`;

const ContentInner = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  overflow: hidden;
  padding: ${pxToRem(16)};
  text-align: center;

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const ImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;

  transition: all var(--transition-speed-slow) var(--transition-ease);

  img {
    transition: all var(--transition-speed-extra-slow) var(--transition-ease);
    filter: blur(5px);
    transform: scale(1.05);
  }
`;

type Props = {
  title: PressCardType["title"];
  colour: PressCardType["colour"];
  image: PressCardType["image"];
  link: PressCardType["link"];
};

const PressCard = (props: Props) => {
  const { title, colour, image, link } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  return (
    <PressCardWrapper
      $hex={colour?.hex || "#F1F0EC"}
      ref={ref}
      className={`press-card view-element-fade-in ${
        inView ? "view-element-fade-in--in-view" : ""
      }`}
    >
      <Link href={link || "#"} target="_blank">
        <ContentInner className="press-card__content">
          <p>{title || ""}</p>
        </ContentInner>
        {image?.asset?.url && (
          <ImageWrapper className="press-card__image">
            <Image
              src={image?.asset?.url}
              alt={`Press image for ${title}`}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </ImageWrapper>
        )}
      </Link>
    </PressCardWrapper>
  );
};

export default PressCard;
