import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import MuteIcon from "../../svgs/MuteIcon";
import UnMuteIcon from "../../svgs/UnMuteIcon";

const MuteTriggerWrapper = styled(motion.button)`
  position: absolute;
  bottom: ${pxToRem(32)};
  left: ${pxToRem(32)};
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${pxToRem(4)};
`;

const MuteText = styled(motion.span)`
  background: var(--colour-cream);
  color: var(--colour-black);
  padding: 2px ${pxToRem(6)} 0;
  text-align: center;
  border-radius: ${pxToRem(4)};
  pointer-events: all;
  cursor: pointer;
  height: ${pxToRem(26)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.div`
  background: var(--colour-cream);
  color: var(--colour-black);
  padding: 0 ${pxToRem(6)};
  text-align: center;
  border-radius: ${pxToRem(4)};
  pointer-events: all;
  cursor: pointer;
  height: ${pxToRem(26)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MotionWrapper = styled(motion.div)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const muteTextVariants = {
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
  isActive: boolean;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
};

const MuteTrigger = (props: Props) => {
  const { isActive, isMuted, setIsMuted } = props;

  return (
    <MuteTriggerWrapper
      onClick={() => setIsMuted(!isMuted)}
      layout
      className="sensitive-board__mute"
    >
      <IconWrapper>
        <AnimatePresence mode="wait">
          {isMuted && (
            <MotionWrapper
              key={1}
              variants={wrapperVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <UnMuteIcon />
            </MotionWrapper>
          )}
          {!isMuted && (
            <MotionWrapper
              key={2}
              variants={wrapperVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <MuteIcon />
            </MotionWrapper>
          )}
        </AnimatePresence>
      </IconWrapper>{" "}
      <AnimatePresence mode="wait">
        {!isActive && (
          <MuteText
            className="type-small"
            variants={muteTextVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            mute sound
          </MuteText>
        )}
      </AnimatePresence>
    </MuteTriggerWrapper>
  );
};

export default MuteTrigger;
