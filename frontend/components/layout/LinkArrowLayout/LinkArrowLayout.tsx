import { ReactNode, useState } from "react";
import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { AnimatePresence, motion } from "framer-motion";
import LinkArrow from "../../svgs/LinkArrow";

const LinkArrowLayoutWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${pxToRem(4)};
`;

const IconWrapper = styled(motion.div)``;

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
  children: ReactNode;
};

const LinkArrowLayout = (props: Props) => {
  const { children } = props;

  const [isActive, setIsActive] = useState(false);

  return (
    <LinkArrowLayoutWrapper
      onMouseOver={() => setIsActive(true)}
      onMouseOut={() => setIsActive(false)}
    >
      {children}
      <AnimatePresence>
        {isActive && (
          <IconWrapper
            variants={wrapperVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <LinkArrow />
          </IconWrapper>
        )}
      </AnimatePresence>
    </LinkArrowLayoutWrapper>
  );
};

export default LinkArrowLayout;
