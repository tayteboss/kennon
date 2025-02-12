import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useMousePosition } from "../../../hooks/useMousePosition";
import pxToRem from "../../../utils/pxToRem";
import LinkArrow from "../../svgs/LinkArrow";

type Props = {
  cursorRefresh: () => void;
  appCursorRefresh: number;
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
  left: -70px;
  height: 24px;
  width: 140px;
  pointer-events: none;
  text-align: center;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};

  transition:
    top 300ms ease,
    left 300ms ease,
    opacity 300ms ease;
`;

const TextOuterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  padding: ${pxToRem(4)} ${pxToRem(8)};
  border-radius: 4px;
  height: 24px;
  line-height: 0.2em;
  padding-bottom: 1px;
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${pxToRem(24)};
  width: ${pxToRem(24)};
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 4px;

  svg {
    path {
      stroke: var(--colour-black);
    }
  }
`;

const BubbleWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vw;
  width: 10vw;
  background: rgba(255, 255, 255, 0.3);
  /* backdrop-filter: blur(1px); */
  border-radius: 100px;
  filter: blur(1px);
`;

const BubbleCursor = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--colour-black);
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

const Cursor = ({ cursorRefresh, appCursorRefresh }: Props) => {
  const [isHoveringCursorBubbleLink, setIsHoveringCursorBubbleLink] =
    useState(false);
  const [isHoveringArrowLink, setIsHoveringArrowLink] = useState(false);
  const [isHoveringTextLink, setIsHoveringTextLink] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHoveringSenstive, setIsHoveringSensitive] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
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
    setIsHoveringTextLink(false);
    setIsOnDevice(false);
    setCursorText("");
  };

  const findActions = () => {
    const cursorArrowLinks = document.querySelectorAll(".cursor-arrow-link");
    const cursorBubbleLinks = document.querySelectorAll(".cursor-bubble");
    const cursorTextLinks = document.querySelectorAll(
      ".cursor-arrow-text-link"
    );
    const cursorSenstiveLinks = document.querySelectorAll(".cursor-senstive");

    cursorSenstiveLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        setIsHoveringSensitive(true);
      });
      link.addEventListener("mouseleave", () => {
        setIsHoveringSensitive(false);
      });
      link.addEventListener("mouseup", () => {
        setIsHoveringSensitive(false);
      });
    });

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

    cursorTextLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        setIsHoveringTextLink(true);
        const linkTitle = link.getAttribute("data-title");
        if (linkTitle) {
          setCursorText(linkTitle);
        }
      });
      link.addEventListener("mouseleave", () => {
        setIsHoveringTextLink(false);
        setCursorText("");
      });
      link.addEventListener("mouseup", () => {
        setIsHoveringTextLink(false);
        setCursorText("");
      });
      link.addEventListener("click", () => {
        setIsHoveringTextLink(false);
        setCursorText("");
      });
    });

    cursorBubbleLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        setIsHoveringCursorBubbleLink(true);
      });
      link.addEventListener("mouseleave", () => {
        setIsHoveringCursorBubbleLink(false);
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
  };

  useEffect(() => {
    findActions();

    const timer = setTimeout(() => {
      findActions();
    }, 1000);

    return function cleanUp() {
      clearCursor();
      clearTimeout(timer);
    };
  }, [cursorRefresh, appCursorRefresh]);

  // reset cursor on page change
  useEffect(() => {
    clearCursor();
  }, [router.pathname, router.asPath, router.query.slug, cursorRefresh]);

  return (
    <>
      <CursorWrapper $isOnDevice={isOnDevice} className="cursor-wrapper">
        <CursorRing
          $isActive={
            isHoveringArrowLink || isHoveringTextLink || isHoveringSenstive
          }
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
            {isHoveringTextLink && (
              <TextOuterWrapper key={2}>
                <TextWrapper>{cursorText}</TextWrapper>
                <IconWrapper>
                  <LinkArrow />
                </IconWrapper>
              </TextOuterWrapper>
            )}
            {false && (
              <BubbleWrapper
                key={3}
                variants={wrapperVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <BubbleCursor />
              </BubbleWrapper>
            )}
          </AnimatePresence>
        </CursorRing>
      </CursorWrapper>
    </>
  );
};

export default Cursor;
