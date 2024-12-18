import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import LandscapeWorkCard from "../LandscapeWorkCard";

const HomeFeaturedWorksWrapper = styled.section`
  .work-landscape-card {
    display: block;
    height: 100lvh;
    width: 100%;
    position: relative;
  }
`;

type Props = {
  data: HomePageType["featuredWork"];
};

const HomeFeaturedWorks = (props: Props) => {
  const { data } = props;

  const hasData = data && data.length > 0;

  console.log("data", data);

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
          />
        ))}
    </HomeFeaturedWorksWrapper>
  );
};

export default HomeFeaturedWorks;
