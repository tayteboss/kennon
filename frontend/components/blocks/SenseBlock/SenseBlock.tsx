import styled from "styled-components";
import { SenseBlockType } from "../../../shared/types/types";
import Image from "next/image";
import pxToRem from "../../../utils/pxToRem";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import MuxPlayer from "@mux/mux-player-react/lazy";

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

  mux-player {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentWrapper = styled.div`
  padding-top: ${pxToRem(8)};
`;

const Text = styled.p``;

const SenseBlock = (props: SenseBlockType & { number: string }) => {
  const { title, description, image, video, number, link } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  return (
    <>
      {title && description && (
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
                  {video?.asset?.playbackId && (
                    <MuxPlayer
                      streamType="on-demand"
                      playbackId={video?.asset?.playbackId}
                      autoPlay="muted"
                      loop={true}
                      thumbnailTime={1}
                      loading="viewport"
                      preload="auto"
                      muted
                      playsInline={true}
                    />
                  )}
                </ImageWrapper>
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
                {video?.asset?.playbackId && (
                  <MuxPlayer
                    streamType="on-demand"
                    playbackId={video?.asset?.playbackId}
                    autoPlay="muted"
                    loop={true}
                    thumbnailTime={1}
                    loading="viewport"
                    preload="auto"
                    muted
                    playsInline={true}
                  />
                )}
              </ImageWrapper>
            </Inner>
          )}
          <ContentWrapper>
            <Text>
              {title || ""} — {description || ""}
            </Text>
          </ContentWrapper>
        </SenseBlockWrapper>
      )}
    </>
  );
};

export default SenseBlock;
