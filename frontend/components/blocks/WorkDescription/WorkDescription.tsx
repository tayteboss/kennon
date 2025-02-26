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

const Inner = styled(motion.div)<{ $hasSketches: boolean }>`
  max-width: ${(props) =>
    props.$hasSketches ? `${pxToRem(1200)}` : `${pxToRem(800)}`};
  margin: 0 auto ${pxToRem(80)};
  padding-top: ${(props) => (props.$hasSketches ? `${pxToRem(80)}` : `0px`)};

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

const RHS = styled.div<{ $hasSketches: boolean }>`
  grid-column: ${(props) => (props.$hasSketches ? "5 / -1" : "1 / -1")};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${pxToRem(24)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    order: 1;
  }

  * {
    text-align: ${(props) => (props.$hasSketches ? "left" : "center")};
  }
`;

const CloseTrigger = styled.button<{ $hasSketches: boolean }>`
  transition: all var(--transition-speed-default) var(--transition-ease);
  text-align: ${(props) => (props.$hasSketches ? "left" : "center")};
  width: ${(props) => (props.$hasSketches ? "auto" : "100%")};

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

  const hasSketches = sketches && sketches.length > 0;

  return (
    <AnimatePresence>
      {isActive && (
        <WorkDescriptionWrapper
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Inner variants={childVariants} $hasSketches={hasSketches}>
            <LayoutWrapper>
              <LayoutGrid>
                {hasSketches && (
                  <LHS>
                    <WorkSketches data={sketches} />
                  </LHS>
                )}
                <RHS $hasSketches={hasSketches}>
                  {description && <PortableText value={description} />}
                  <WorkCredits data={credits} hasSketches={hasSketches} />
                  <CloseTrigger
                    $hasSketches={hasSketches}
                    onClick={() => setDescriptionIsActive(false)}
                  >
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
