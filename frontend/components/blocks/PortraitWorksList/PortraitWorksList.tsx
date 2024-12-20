import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import { motion } from "framer-motion";
import PortraitWorkCard from "../PortraitWorkCard";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import pxToRem from "../../../utils/pxToRem";

const PortraitWorksListWrapper = styled(motion.section)`
  .layout-grid {
    row-gap: ${pxToRem(24)};

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      row-gap: ${pxToRem(16)};
    }
  }
`;

type Props = {
  data: WorkType[];
  wrapperVariants: any;
};

const PortraitWorksList = (props: Props) => {
  const { data, wrapperVariants } = props;

  const hasData = data && data.length > 0;

  return (
    <PortraitWorksListWrapper
      variants={wrapperVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <LayoutWrapper>
        <LayoutGrid>
          {hasData &&
            data.map((item, i) => (
              <PortraitWorkCard
                key={i}
                title={item?.title}
                image={item?.portraitThumbnailImage}
                slug={item?.slug}
                comingSoon={item?.comingSoon}
              />
            ))}
        </LayoutGrid>
      </LayoutWrapper>
    </PortraitWorksListWrapper>
  );
};

export default PortraitWorksList;
