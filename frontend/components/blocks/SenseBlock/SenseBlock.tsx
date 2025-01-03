import styled from "styled-components";
import { SenseBlockType } from "../../../shared/types/types";
import Image from "next/image";
import pxToRem from "../../../utils/pxToRem";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const SenseBlockWrapper = styled.div`
  grid-column: span 4;
  width: 100%;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

const Inner = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
  padding: ${pxToRem(24)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  mix-blend-mode: difference;
`;

const Text = styled.p`
  text-align: center;
  color: var(--colour-white);
`;

const SenseBlock = (props: SenseBlockType & { number: string }) => {
  const { title, description, image, number, link } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  return (
    <SenseBlockWrapper
      ref={ref}
      className={`view-element-fade-in ${
        inView ? "view-element-fade-in--in-view" : ""
      }`}
    >
      {link && (
        <Link href={link} target="_blank">
          <Inner>
            <ImageWrapper>
              {image?.asset?.url && (
                <Image
                  src={image?.asset?.url}
                  alt={image?.asset?.alt || ""}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
            </ImageWrapper>
            <ContentWrapper>
              {title && <Text>{title}</Text>}
              {description && <Text>{description}</Text>}
              <Text>{number}</Text>
            </ContentWrapper>
          </Inner>
        </Link>
      )}
      {!link && (
        <Inner>
          <ImageWrapper>
            {image?.asset?.url && (
              <Image
                src={image?.asset?.url}
                alt={image?.asset?.alt || ""}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </ImageWrapper>
          <ContentWrapper>
            {title && <Text>{title}</Text>}
            {description && <Text>{description}</Text>}
            <Text>{number}</Text>
          </ContentWrapper>
        </Inner>
      )}
    </SenseBlockWrapper>
  );
};

export default SenseBlock;
