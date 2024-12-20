import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const PortraitWorkCardWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  padding-top: 133.33%;
  width: 100%;
  position: relative;
  overflow: hidden;

  img {
    transition: all 3000ms var(--transition-ease);
  }

  &:hover {
    img {
      transform: scale(1.03);
    }
  }
`;

type Props = {
  title: WorkType["title"];
  image: WorkType["landscapeThumbnailImage"];
  slug: WorkType["slug"];
};

const PortraitWorkCard = (props: Props) => {
  const { title, image, slug } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  return (
    <Link
      className="cursor-arrow-link work-portrait-card"
      href={`/work/${slug.current}`}
    >
      <PortraitWorkCardWrapper ref={ref}>
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
      </PortraitWorkCardWrapper>
    </Link>
  );
};

export default PortraitWorkCard;
