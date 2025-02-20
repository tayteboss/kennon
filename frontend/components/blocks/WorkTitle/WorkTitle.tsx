import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import LayoutWrapper from "../../layout/LayoutWrapper";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import router from "next/router";
import { useState, useRef, useEffect } from "react";
import { WorkType } from "../../../shared/types/types";
import WorkDescription from "../WorkDescription";

const WorkTitleWrapper = styled(motion.section)`
  padding: ${pxToRem(80)} 0 ${pxToRem(40)};
`;

const Subheading = styled.h2`
  text-align: center;
  margin-bottom: ${pxToRem(16)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    text-align: left;
  }
`;

const Heading = styled.h3`
  font-family: var(--font-arizona-flare-light);
  width: 100%;
`;

const ReadmoreTrigger = styled(motion.span)`
  white-space: pre;

  button {
    font-family: var(--font-arizona-flare-light);
    font-weight: 200;
    opacity: 0.5;

    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      opacity: 1;
    }
  }
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

type Props = {
  subheading: string;
  heading: WorkType["excerpt"];
  description: WorkType["description"];
  credits: WorkType["credits"];
  sketches: WorkType["sketches"];
};

const WorkTitle = (props: Props) => {
  const { subheading, heading, description, credits, sketches } = props;

  const [windowHeight, setWindowHeight] = useState(0);
  const [descriptionIsActive, setDescriptionIsActive] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const blur = useTransform(
    scrollY,
    [0, windowHeight],
    ["blur(0px)", "blur(10px)"]
  );

  const transform = useTransform(
    scrollY,
    [0, windowHeight],
    ["translateY(0px)", "translateY(100px)"]
  );

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const timer = setTimeout(() => {
      setWindowHeight(window.innerHeight);
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <WorkTitleWrapper ref={wrapperRef} style={{ filter: blur, transform }}>
        <LayoutWrapper>
          {subheading && (
            <Subheading className="type-heading-small">{subheading}</Subheading>
          )}
          {heading && (
            <Heading className="type-h1">
              {heading}{" "}
              <AnimatePresence>
                {!descriptionIsActive && (
                  <ReadmoreTrigger
                    variants={wrapperVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <button
                      className="type-h1"
                      onClick={() =>
                        setDescriptionIsActive(!descriptionIsActive)
                      }
                    >
                      Read more
                    </button>
                  </ReadmoreTrigger>
                )}
              </AnimatePresence>
            </Heading>
          )}
        </LayoutWrapper>
      </WorkTitleWrapper>
      <WorkDescription
        isActive={descriptionIsActive}
        description={description}
        credits={credits}
        sketches={sketches}
        setDescriptionIsActive={setDescriptionIsActive}
      />
    </>
  );
};

export default WorkTitle;
