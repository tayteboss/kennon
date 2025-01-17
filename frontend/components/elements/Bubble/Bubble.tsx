import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

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

  // Duration for the bubble's animation
  const duration = 8;

  // Define the bubble's framer-motion variants
  const wrapperVariants = {
    hidden: {
      height: "5vw",
      width: "5vw",
      filter: "blur(10px)",
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
      filter: "blur(25px)",
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
      filter: "blur(25px)",
      opacity: 0,
      transition: {
        duration,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      {duration > 0 && (
        <BubbleWrapper
          $x={x}
          $y={y}
          $index={index}
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
        />
      )}
    </>
  );
};

export default Bubble;
