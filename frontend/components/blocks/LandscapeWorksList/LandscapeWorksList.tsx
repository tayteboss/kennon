import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import LandscapeWorkCard from "../LandscapeWorkCard";
import { motion, Variants } from "framer-motion";

const LandscapeWorksListWrapper = styled(motion.section)`
  position: relative;
`;

type Props = {
  data: WorkType[];
  wrapperVariants: Variants;
};

const LandscapeWorksList = (props: Props) => {
  const { data, wrapperVariants } = props;

  const hasData = data && data.length > 0;

  return (
    <LandscapeWorksListWrapper
      variants={wrapperVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
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
    </LandscapeWorksListWrapper>
  );
};

export default LandscapeWorksList;
