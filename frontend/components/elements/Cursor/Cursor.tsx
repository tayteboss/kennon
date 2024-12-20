import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useMousePosition } from "../../../hooks/useMousePosition";
import pxToRem from "../../../utils/pxToRem";
import LinkArrow from "../../svgs/LinkArrow";

type Props = {
  cursorRefresh: () => void;
};

type StyledProps = {
  $isHoveringArrowLink?: boolean;
  $isOnDevice?: boolean;
  $isActive?: boolean;
};

const CursorWrapper = styled.div<StyledProps>`
  z-index: 1000;
  position: fixed;
  display: ${(props) => (props.$isOnDevice ? "none" : "block")};
  /* mix-blend-mode: difference; */

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    display: none;
  }
`;

const CursorRing = styled(motion.div)<StyledProps>`
  position: fixed;
  display: flex;
  flex-flow: row;
  align-content: center;
  justify-content: center;
  /* top: ${(props) => (props.$isHoveringArrowLink ? "-12px" : "-6px")};
  left: ${(props) => (props.$isHoveringArrowLink ? "-12px" : "-6px")}; */
  /* height: ${(props) => (props.$isHoveringArrowLink ? "24px" : "12px")};
  width: ${(props) => (props.$isHoveringArrowLink ? "24px" : "12px")}; */
  top: -30px;
  left: -12px;
  height: 24px;
  width: 24px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 4px;
  pointer-events: none;
  text-align: center;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};

  transition:
    height 300ms ease,
    width 300ms ease,
    background 200ms ease,
    top 300ms ease,
    left 300ms ease,
    border-radius 300ms ease,
    opacity 300ms ease;
`;

const Text = styled(motion.div)`
  font-size: ${pxToRem(14)};
  line-height: 1;
  color: var(--colour-black);
`;

const TextOuterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  padding: ${pxToRem(4)} ${pxToRem(8)};
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${pxToRem(24)};
  width: ${pxToRem(24)};

  svg {
    path {
      stroke: var(--colour-black);
    }
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

const Cursor = ({ cursorRefresh }: Props) => {
  const [isHoveringArrowLink, setIsHoveringArrowLink] = useState(false);
  const [isHoveringSeeWorkLink, setIsHoveringSeeWorkLink] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isOnDevice, setIsOnDevice] = useState(false);
  const router = useRouter();
  const position = useMousePosition();

  let mouseXPosition = position.x;
  let mouseYPosition = position.y;

  const variantsWrapper = {
    visible: {
      x: mouseXPosition,
      y: mouseYPosition,
      transition: {
        type: "spring",
        mass: 0.01,
        stiffness: 800,
        damping: 20,
        ease: "linear",
      },
    },
  };

  const clearCursor = () => {
    setIsHoveringArrowLink(false);
    setIsHoveringSeeWorkLink(false);
    setIsOnDevice(false);
    setCursorText("");
  };

  useEffect(() => {
    const cursorArrowLinks = document.querySelectorAll(".cursor-arrow-link");
    const cursorSeeWorkLinks = document.querySelectorAll(
      ".cursor-see-work-link"
    );

    cursorArrowLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        setIsHoveringArrowLink(true);
      });
      link.addEventListener("mouseleave", () => {
        setIsHoveringArrowLink(false);
      });
      link.addEventListener("mouseup", () => {
        setIsHoveringArrowLink(false);
      });
    });

    cursorSeeWorkLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        setIsHoveringSeeWorkLink(true);
        setCursorText("See work");

        setIsHoveringArrowLink(false);
      });
      link.addEventListener("mouseleave", () => {
        setIsHoveringSeeWorkLink(false);
        setCursorText("");

        setIsHoveringArrowLink(false);
      });
      link.addEventListener("mouseup", () => {
        setIsHoveringSeeWorkLink(false);
        setCursorText("");

        setIsHoveringArrowLink(false);
      });
    });

    // checking if on a device
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      setIsOnDevice(true);
    } else if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      setIsOnDevice(true);
    }

    return function cleanUp() {
      clearCursor();
    };
  }, [cursorRefresh]);

  // reset cursor on page change
  useEffect(() => {
    clearCursor();
  }, [router.pathname, router.asPath, router.query.slug, cursorRefresh]);

  return (
    <>
      <CursorWrapper $isOnDevice={isOnDevice} className="cursor-wrapper">
        <CursorRing
          $isActive={isHoveringArrowLink || isHoveringSeeWorkLink}
          $isHoveringArrowLink={isHoveringArrowLink}
          variants={variantsWrapper}
          animate="visible"
          layout
        >
          <AnimatePresence>
            {isHoveringArrowLink && (
              <IconWrapper
                key={1}
                variants={wrapperVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <LinkArrow />
              </IconWrapper>
            )}
            {isHoveringSeeWorkLink && (
              <TextOuterWrapper key={2}>
                <TextWrapper>{cursorText}</TextWrapper>
                <IconWrapper>
                  <LinkArrow />
                </IconWrapper>
              </TextOuterWrapper>
            )}
          </AnimatePresence>
        </CursorRing>
      </CursorWrapper>
    </>
  );
};

export default Cursor;
