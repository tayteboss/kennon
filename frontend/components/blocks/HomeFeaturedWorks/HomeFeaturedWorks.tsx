import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import LandscapeWorkCard from "../LandscapeWorkCard";

const HomeFeaturedWorksWrapper = styled.section``;

type Props = {
  data: HomePageType["featuredWork"];
};

const HomeFeaturedWorks = (props: Props) => {
  const { data } = props;

  const hasData = data && data.length > 0;

  return (
    <HomeFeaturedWorksWrapper>
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
