import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import useViewportWidth from "../../../hooks/useViewportWidth";

type StyledProps = {
  $x: number;
  $y: number;
  $index: number;
};

const BubbleWrapper = styled(motion.div)<StyledProps>`
  position: absolute;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  transform: translate(-50%, -50%);
  background: ${(props) => `var(--colour-${(props.$index % 6) + 1})`};
  border-radius: 100%;
  mix-blend-mode: luminosity;
  z-index: 10;
`;

type BubbleData = {
  x: number;
  y: number;
  fileName: string | null;
};

type Props = {
  data: BubbleData;
  index: number;
};

const Bubble = ({ data, index }: Props) => {
  const { x, y } = data;

  const [isActive, setIsActive] = useState(true);

  // Duration for the bubble's animation
  const duration = 5;

  const isMobile = useViewportWidth() === "mobile";

  // Define the bubble's framer-motion variants
  const wrapperVariants = {
    hidden: {
      height: "5vw",
      width: "5vw",
      filter: isMobile ? "blur(5px)" : "blur(10px)",
      transition: {
        duration,
        ease: "easeInOut",
        repeat: 3,
        repeatType: "mirror",
        repeatDelay: duration,
      },
    },
    visible: {
      height: "100vw",
      width: "100vw",
      filter: isMobile ? "blur(10px)" : "blur(25px)",
      transition: {
        duration,
        ease: "easeInOut",
        repeat: 3,
        repeatType: "mirror",
      },
    },
    exit: {
      height: "5vw",
      width: "5vw",
      filter: isMobile ? "blur(10px)" : "blur(25px)",
      opacity: 0,
      transition: {
        duration,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isActive && (
        <BubbleWrapper
          $x={x}
          $y={y}
          $index={index}
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          key={`${x}-${y}-${index}`}
          onAnimationComplete={() => setIsActive(false)}
        />
      )}
    </AnimatePresence>
  );
};

export default Bubble;
