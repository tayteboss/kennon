import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import { AnimatePresence, motion } from "framer-motion";
import LayoutGrid from "../../layout/LayoutGrid";
import { PortableText } from "@portabletext/react";
import WorkSketches from "../WorkSketches";
import WorkCredits from "../WorkCredits";
import pxToRem from "../../../utils/pxToRem";

const WorkDescriptionWrapper = styled(motion.div)`
  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    .layout-grid {
      grid-auto-flow: dense;
    }
  }
`;

const Inner = styled(motion.div)`
  padding-top: ${pxToRem(80)};
  margin-bottom: ${pxToRem(80)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding-top: 0;
  }
`;

const LHS = styled.div`
  grid-column: 1 / 5;
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(40)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    order: 2;
  }
`;

const RHS = styled.div`
  grid-column: 5 / -1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${pxToRem(24)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    order: 1;
  }
`;

const CloseTrigger = styled.button`
  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

const wrapperVariants = {
  hidden: {
    height: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
  visible: {
    height: "auto",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      when: "beforeChildren",
    },
  },
};

const childVariants = {
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
  isActive: boolean;
  description: WorkType["description"];
  credits: WorkType["credits"];
  sketches: WorkType["sketches"];
  setDescriptionIsActive: (isActive: boolean) => void;
};

const WorkDescription = (props: Props) => {
  const { isActive, description, credits, sketches, setDescriptionIsActive } =
    props;

  return (
    <AnimatePresence>
      {isActive && (
        <WorkDescriptionWrapper
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Inner variants={childVariants}>
            <LayoutWrapper>
              <LayoutGrid>
                <LHS>
                  <WorkSketches data={sketches} />
                </LHS>
                <RHS>
                  {description && <PortableText value={description} />}
                  <WorkCredits data={credits} />
                  <CloseTrigger onClick={() => setDescriptionIsActive(false)}>
                    Close
                  </CloseTrigger>
                </RHS>
              </LayoutGrid>
            </LayoutWrapper>
          </Inner>
        </WorkDescriptionWrapper>
      )}
    </AnimatePresence>
  );
};

export default WorkDescription;
