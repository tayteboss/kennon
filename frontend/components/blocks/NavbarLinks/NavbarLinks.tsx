import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useActiveLink from "../../../hooks/useActiveLink";

const NavbarLinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;

const DefaultLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

const WorkLinks = styled(motion.div)`
  display: flex;
`;

const WorksTrigger = styled.button<{ $isActive: boolean }>`
  color: var(--colour-white);
  position: relative;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;

    &::after {
      opacity: 0.5;
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 3px;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--colour-white);
    opacity: ${(props) => (props.$isActive ? 1 : 0)};
    mix-blend-mode: difference;

    transition: all var(--transition-speed-default) var(--transition-ease);
  }
`;

const Comma = styled.span`
  color: var(--colour-white);
  white-space: pre;
`;

const StudioLink = styled.div`
  color: var(--colour-white);

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

const PrivateTrigger = styled.button`
  color: var(--colour-white);

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

const PublicTrigger = styled.button`
  color: var(--colour-white);

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
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

const NavbarLinks = () => {
  const [showWorkTypes, setShowWorkTypes] = useState(false);

  const activeLink = useActiveLink();

  const handlePrivateClick = () => {
    setShowWorkTypes(false);

    // UTIL FN
  };

  const handlePublicClick = () => {
    setShowWorkTypes(false);

    // UTIL FN
  };

  return (
    <NavbarLinksWrapper onMouseLeave={() => setShowWorkTypes(false)}>
      <AnimatePresence mode="wait">
        {showWorkTypes ? (
          <WorkLinks
            variants={wrapperVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            key={1}
          >
            <PrivateTrigger onClick={() => handlePrivateClick()}>
              Private
            </PrivateTrigger>
            <Comma>, </Comma>
            <PublicTrigger onClick={() => handlePublicClick()}>
              Public
            </PublicTrigger>
          </WorkLinks>
        ) : (
          <DefaultLinks
            variants={wrapperVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            key={2}
          >
            <WorksTrigger
              $isActive={activeLink === "Works"}
              onClick={() => setShowWorkTypes(true)}
            >
              Works
            </WorksTrigger>
            <Comma>, </Comma>
            <Link href="/studio">
              <StudioLink $isActive={activeLink === "Studio"}>
                Studio
              </StudioLink>
            </Link>
          </DefaultLinks>
        )}
      </AnimatePresence>
    </NavbarLinksWrapper>
  );
};

export default NavbarLinks;
