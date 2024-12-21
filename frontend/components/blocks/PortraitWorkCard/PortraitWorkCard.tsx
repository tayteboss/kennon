import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const PortraitWorkCardWrapper = styled.div<{ $comingSoon: boolean }>`
  width: 100%;
  position: relative;
  overflow: hidden;

  &:hover {
    img {
      filter: ${(props) => props.$comingSoon && "blur(20px) brightness(1.2)"};
    }

    .work-portrait-card__comingsoon {
      opacity: 1;
    }
  }

  img {
    transform: ${(props) => props.$comingSoon && "scale(1.03)"};
  }
`;

const ImageWrapper = styled.div`
  padding-top: 133.33%;
  width: 100%;
  position: relative;
  overflow: hidden;

  img {
    transition:
      transform 3000ms var(--transition-ease),
      filter 500ms var(--transition-ease);
  }

  &:hover {
    img {
      transform: scale(1.03);
    }
  }
`;

const Comingsoon = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: var(--colour-white);
  mix-blend-mode: difference;
  opacity: 0;
  pointer-events: none;

  transition: all var(--transition-speed-slow) var(--transition-ease);
`;

type Props = {
  title: WorkType["title"];
  image: WorkType["landscapeThumbnailImage"];
  slug: WorkType["slug"];
  comingSoon: WorkType["comingSoon"];
};

const PortraitWorkCard = (props: Props) => {
  const { title, image, slug, comingSoon } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  return (
    <Link
      className="cursor-arrow-text-link work-portrait-card"
      href={`/works/${slug.current}`}
      data-title={title}
    >
      <PortraitWorkCardWrapper ref={ref} $comingSoon={comingSoon}>
        {image?.asset?.url && (
          <ImageWrapper
            className={`view-element-image-blur-in ${
              inView ? "view-element-image-blur-in--in-view" : ""
            }`}
          >
            <Image
              src={image.asset.url}
              alt={image?.asset?.alt || ""}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </ImageWrapper>
        )}
        {comingSoon && (
          <Comingsoon className="work-portrait-card__comingsoon">
            Coming soon
          </Comingsoon>
        )}
      </PortraitWorkCardWrapper>
    </Link>
  );
};

export default PortraitWorkCard;
