import styled from "styled-components";
import { WorkPageType } from "../../../shared/types/types";
import { AnimatePresence, motion } from "framer-motion";
import pxToRem from "../../../utils/pxToRem";
import LayoutGrid from "../../layout/LayoutGrid";
import LayoutWrapper from "../../layout/LayoutWrapper";

const WorksHeroTitleWrapper = styled.div`
  padding: ${pxToRem(64)} 0 ${pxToRem(100)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(64)} 0;
  }
`;

const Title = styled(motion.h1)`
  grid-column: 3 / -3;
  text-align: center;
  max-width: ${pxToRem(600)};
  margin: 0 auto;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

type Props = {
  workType: "private" | "public" | "multi";
  privateTitle: WorkPageType["privateResidencesTitle"];
  multiTitle: WorkPageType["multiResidentialTitle"];
  publicTitle: WorkPageType["publicWorksTitle"];
};

const WorksHeroTitle = (props: Props) => {
  const { workType, privateTitle, multiTitle, publicTitle } = props;
  return (
    <WorksHeroTitleWrapper className="hero-title">
      <LayoutWrapper>
        <LayoutGrid>
          <AnimatePresence mode="wait">
            {workType === "private" && (
              <Title
                variants={wrapperVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                key="private"
              >
                {privateTitle || ""}
              </Title>
            )}
            {workType === "public" && (
              <Title
                variants={wrapperVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                key="public"
              >
                {publicTitle || ""}
              </Title>
            )}
            {workType === "multi" && (
              <Title
                variants={wrapperVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                key="multi"
              >
                {multiTitle || ""}
              </Title>
            )}
          </AnimatePresence>
        </LayoutGrid>
      </LayoutWrapper>
    </WorksHeroTitleWrapper>
  );
};

export default WorksHeroTitle;
