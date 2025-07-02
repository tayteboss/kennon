import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import ImageComponent from "./ImageComponent";
import VideoComponent from "./VideoComponent";
import { MediaType } from "../../../shared/types/types";

const MediaStackWrapper = styled.div``;

type Props = {
  data: MediaType;
  isPriority?: boolean;
  sizes?: undefined | string;
  alt?: string;
  lazyLoad?: boolean;
  useSoundTriggers?: boolean;
};

const MediaStack = (props: Props) => {
  const {
    data,
    isPriority = false,
    sizes = undefined,
    alt,
    lazyLoad = false,
    useSoundTriggers = false,
  } = props ?? {};

  // sizes="(max-width: 768px) 38vw, (max-width: 1024px) 20vw, 15vw"

  const useVideo = data?.mediaType === "video";

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "-5%",
  });

  return (
    <MediaStackWrapper ref={ref}>
      {useVideo && (
        <VideoComponent
          data={data}
          inView={inView}
          isPriority={isPriority}
          lazyLoad={lazyLoad}
          useSoundTriggers={useSoundTriggers}
        />
      )}
      {!useVideo && (
        <ImageComponent
          data={data}
          isPriority={isPriority}
          inView={inView}
          sizes={sizes}
          alt={alt}
          lazyLoad={lazyLoad}
        />
      )}
    </MediaStackWrapper>
  );
};

export default MediaStack;
