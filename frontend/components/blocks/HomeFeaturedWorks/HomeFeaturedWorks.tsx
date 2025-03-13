import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import LandscapeWorkCard from "../LandscapeWorkCard";
import pxToRem from "../../../utils/pxToRem";
import { useInView } from "react-intersection-observer";

const HomeFeaturedWorksWrapper = styled.section``;

const Title = styled.h2`
  text-align: center;
  padding: ${pxToRem(64)} 0 ${pxToRem(80)};
`;

type Props = {
  data: HomePageType["featuredWork"];
};

const HomeFeaturedWorks = (props: Props) => {
  const { data } = props;

  const hasData = data && data.length > 0;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  return (
    <HomeFeaturedWorksWrapper>
      {/* <Title
        ref={ref}
        className={`type-h1 view-element-fade-in ${
          inView ? "view-element-fade-in--in-view" : ""
        }`}
      >
        Featured Works
      </Title> */}
      {hasData &&
        data.map((item, i) => (
          <LandscapeWorkCard
            key={i}
            title={item?.title}
            image={item?.landscapeThumbnailImage}
            location={item?.location}
            slug={item?.slug}
            yearCompleted={item?.yearCompleted}
            type={item?._type}
            comingSoon={item?.comingSoon}
          />
        ))}
    </HomeFeaturedWorksWrapper>
  );
};

export default HomeFeaturedWorks;
