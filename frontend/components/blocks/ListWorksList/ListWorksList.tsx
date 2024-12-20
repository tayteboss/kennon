import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import { motion } from "framer-motion";
import LayoutWrapper from "../../layout/LayoutWrapper";
import ListWorkCard from "../ListWorkCard";
import Link from "next/link";

const ListWorksListWrapper = styled(motion.section)``;

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
