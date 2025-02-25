import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useActiveLink from "../../../hooks/useActiveLink";
import { setWorkType } from "../../../utils/setWorkType";
import { useRouter } from "next/navigation";

const NavbarLinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  position: relative;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const DefaultLinks = styled.div<{ $fadeOut: boolean }>`
  display: flex;
  justify-content: center;
  opacity: ${(props) => (props.$fadeOut ? 0.33 : 1)};

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const WorkLinks = styled(motion.div)`
  display: flex;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
`;

const WorksTrigger = styled.button<{ $isActive: boolean }>`
  color: var(--colour-white);
  position: relative;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;

    &::after {
      opacity: ${(props) => props.$isActive && 0.5};
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

const StudioLink = styled.div<{ $isActive: boolean }>`
  color: var(--colour-white);
  position: relative;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;

    &::after {
      opacity: ${(props) => props.$isActive && 0.5};
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

const PrivateTrigger = styled.button`
  color: var(--colour-white);
  white-space: nowrap;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

const PublicTrigger = styled.button`
  color: var(--colour-white);
  white-space: nowrap;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

const MultiTrigger = styled.button`
  color: var(--colour-white);
  white-space: nowrap;

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

type Props = {
  workTypeRefresh: any;
};

const NavbarLinks = (props: Props) => {
  const { workTypeRefresh } = props;

  const [showWorkTypes, setShowWorkTypes] = useState(false);

  const activeLink = useActiveLink();
  const router = useRouter();

  const handlePrivateClick = () => {
    setShowWorkTypes(false);
    setWorkType("private");
    router.push("/works");
    workTypeRefresh();
  };

  const handlePublicClick = () => {
    setShowWorkTypes(false);
    setWorkType("public");
    router.push("/works");
    workTypeRefresh();
  };

  const handleMultiClick = () => {
    setShowWorkTypes(false);
    setWorkType("multi");
    router.push("/works");
    workTypeRefresh();
  };

  return (
    <NavbarLinksWrapper onMouseLeave={() => setShowWorkTypes(false)}>
      <DefaultLinks $fadeOut={showWorkTypes}>
        <WorksTrigger
          $isActive={activeLink === "Works"}
          onClick={() => setShowWorkTypes(true)}
        >
          Works
        </WorksTrigger>
        <Comma>, </Comma>
        <Link href="/studio">
          <StudioLink $isActive={activeLink === "Studio"}>Studio</StudioLink>
        </Link>
      </DefaultLinks>
      <AnimatePresence mode="wait">
        {showWorkTypes && (
          <WorkLinks
            variants={wrapperVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            key={1}
          >
            <PrivateTrigger onClick={() => handlePrivateClick()}>
              Private Residences
            </PrivateTrigger>
            <Comma>, </Comma>
            <PublicTrigger onClick={() => handlePublicClick()}>
              Public Works
            </PublicTrigger>
            <Comma>, </Comma>
            <MultiTrigger onClick={() => handleMultiClick()}>
              Multi Residential
            </MultiTrigger>
          </WorkLinks>
        )}
      </AnimatePresence>
    </NavbarLinksWrapper>
  );
};

export default NavbarLinks;
