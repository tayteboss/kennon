import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import LandscapeCardTitle from "../../elements/LandscapeCardTitle";

const Inner = styled.div`
  position: relative;
`;

const LandscapeWorkCardWrapper = styled.div<{ $comingSoon: boolean }>`
  width: 100%;
  padding-top: 75%;
  position: relative;
  z-index: 1;

  &:hover {
    img {
      filter: ${(props) => props.$comingSoon && "blur(3px)"};
    }

    .work-portrait-card__comingsoon {
      opacity: 1;
    }
  }

  img {
    transform: ${(props) => props.$comingSoon && "scale(1.1)"};

    transition: filter 2000ms var(--transition-ease);
  }
`;

const ImageWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
`;

type Props = {
  title: WorkType["title"];
  image: WorkType["landscapeThumbnailImage"];
  location: WorkType["location"];
  slug: WorkType["slug"];
  yearCompleted: WorkType["yearCompleted"];
  type: WorkType["_type"];
  comingSoon: WorkType["comingSoon"];
  isPriority: boolean;
};

const LandscapeWorkCard = (props: Props) => {
  const {
    title,
    image,
    location,
    slug,
    yearCompleted,
    type,
    comingSoon,
    isPriority,
  } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  return (
    <Link
      className={`work-landscape-card ${comingSoon ? "cursor-arrow-text-link" : "cursor-arrow-link"}`}
      data-title="Coming soon"
      href={`/works/${slug.current}`}
    >
      <Inner>
        <LandscapeCardTitle
          title={title}
          location={location}
          yearCompleted={yearCompleted}
          comingSoon={comingSoon}
          type={type}
        />
        <LandscapeWorkCardWrapper ref={ref} $comingSoon={comingSoon}>
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
                loading={isPriority ? "eager" : "lazy"}
                sizes="100vw"
                priority={isPriority}
              />
            </ImageWrapper>
          )}
        </LandscapeWorkCardWrapper>
      </Inner>
    </Link>
  );
};

export default LandscapeWorkCard;
