import Link from "next/link";
import styled from "styled-components";
import useActiveLink from "../../../hooks/useActiveLink";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MenuNavigationWrapper = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const LinkTag = styled.div<{ $isActive: boolean; $fadeOut: boolean }>`
  text-align: right;
  opacity: ${(props) => (props.$fadeOut ? 0.25 : 1)};

  transition: all var(--transition-speed-default) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    text-align: center;
  }

  &:hover {
    opacity: 0.5;
  }
`;

const WorkTrigger = styled.button<{ $fadeOut: boolean }>`
  text-align: right;
  opacity: ${(props) => (props.$fadeOut ? 0.5 : 1)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    text-align: center;
  }
`;

const WorkTypesList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    align-items: center;
  }
`;

const PrivateTrigger = styled(motion.button)`
  text-align: right;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    text-align: center;
  }

  &:hover {
    opacity: 0.5;
  }
`;

const PublicTrigger = styled(motion.button)`
  text-align: right;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    text-align: center;
  }

  &:hover {
    & > div {
      opacity: 0.5;
    }
  }
`;

const InnerTrigger = styled.div`
  transition: all var(--transition-speed-default) ease;
`;

const wrapperVariants = {
  hidden: {
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "afterChildren",
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  visible: {
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
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

const MenuNavigation = () => {
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
    <MenuNavigationWrapper onMouseLeave={() => setShowWorkTypes(false)}>
      <Link href="/">
        <LinkTag $isActive={activeLink === "Home"} $fadeOut={showWorkTypes}>
          Home
        </LinkTag>
      </Link>
      <WorkTrigger
        onClick={() => setShowWorkTypes(!showWorkTypes)}
        $fadeOut={showWorkTypes}
      >
        Works
      </WorkTrigger>
      <AnimatePresence>
        {showWorkTypes && (
          <WorkTypesList
            variants={wrapperVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <PrivateTrigger
              onClick={() => handlePrivateClick()}
              variants={childVariants}
            >
              <InnerTrigger>Private</InnerTrigger>
            </PrivateTrigger>
            <PublicTrigger
              onClick={() => handlePublicClick()}
              variants={childVariants}
            >
              <InnerTrigger>Public</InnerTrigger>
            </PublicTrigger>
          </WorkTypesList>
        )}
      </AnimatePresence>
      <Link href="/studio">
        <LinkTag $isActive={activeLink === "Studio"} $fadeOut={showWorkTypes}>
          Studio
        </LinkTag>
      </Link>
      <Link href="/being-sensitive">
        <LinkTag
          $isActive={activeLink === "Sensitive"}
          $fadeOut={showWorkTypes}
        >
          Being Sensitive
        </LinkTag>
      </Link>
      <Link href="/press">
        <LinkTag $isActive={activeLink === "Press"} $fadeOut={showWorkTypes}>
          Press
        </LinkTag>
      </Link>
      <Link href="/contact">
        <LinkTag $isActive={activeLink === "Contact"} $fadeOut={showWorkTypes}>
          Contact
        </LinkTag>
      </Link>
    </MenuNavigationWrapper>
  );
};

export default MenuNavigation;
