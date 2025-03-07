import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import LandscapeCardTitle from "../../elements/LandscapeCardTitle";

const LandscapeWorkCardWrapper = styled.div<{ $comingSoon: boolean }>`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: var(--colour-cream);

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
  position: relative;
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
};

const LandscapeWorkCard = (props: Props) => {
  const { title, image, location, slug, yearCompleted, type, comingSoon } =
    props;

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
            />
          </ImageWrapper>
        )}
      </LandscapeWorkCardWrapper>
      <LandscapeCardTitle
        title={title}
        location={location}
        yearCompleted={yearCompleted}
        comingSoon={comingSoon}
        type={type}
      />
    </Link>
  );
};

export default LandscapeWorkCard;
