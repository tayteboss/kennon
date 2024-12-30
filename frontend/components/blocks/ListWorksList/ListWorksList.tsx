import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import { motion } from "framer-motion";
import ListWorkCard from "../ListWorkCard";

const ListWorksListWrapper = styled(motion.section)`
  position: relative;
  background: var(--colour-white);
`;

type Props = {
  data: WorkType[];
  wrapperVariants: any;
};

const ListWorksList = (props: Props) => {
  const { data, wrapperVariants } = props;

  const hasData = data && data.length > 0;

  return (
    <ListWorksListWrapper
      variants={wrapperVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {hasData &&
        data.map((item, i) => (
          <ListWorkCard
            key={i}
            title={item?.title}
            location={item?.location}
            type={item?._type}
            yearCompleted={item?.yearCompleted}
            image={item?.portraitThumbnailImage}
            allImages={item?.allImages}
            slug={item?.slug}
            comingSoon={item?.comingSoon}
            isPriority={i < 4}
          />
        ))}
    </ListWorksListWrapper>
  );
};

export default ListWorksList;
