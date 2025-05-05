import Link from "next/link";
import styled from "styled-components";
import useActiveLink from "../../../hooks/useActiveLink";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { setWorkType } from "../../../utils/setWorkType";
import { useRouter } from "next/navigation";
import pxToRem from "../../../utils/pxToRem";

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
    align-items: right;
  }
`;

const PrivateTrigger = styled(motion.button)`
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

const PublicTrigger = styled(motion.button)`
  text-align: right;
  margin-bottom: ${pxToRem(16)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    text-align: center;
  }

  &:hover {
    & > div {
      opacity: 0.5;
    }
  }
`;

const MultiTrigger = styled(motion.button)`
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

type Props = {
  setMenuIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuNavigation = (props: Props) => {
  const { setMenuIsActive } = props;

  const [showWorkTypes, setShowWorkTypes] = useState(false);

  const activeLink = useActiveLink();
  const router = useRouter();

  const handlePrivateClick = () => {
    setShowWorkTypes(false);
    setMenuIsActive(false);
    setWorkType("private");
    router.push("/works");
  };

  const handlePublicClick = () => {
    setShowWorkTypes(false);
    setMenuIsActive(false);
    setWorkType("public");
    router.push("/works");
  };

  const handleMultiClick = () => {
    setShowWorkTypes(false);
    setMenuIsActive(false);
    setWorkType("multi");
    router.push("/works");
  };

  return (
    <MenuNavigationWrapper>
      <Link href="/">
        <LinkTag
          $isActive={activeLink === "Home"}
          $fadeOut={showWorkTypes}
          onClick={() => setMenuIsActive(false)}
        >
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
              key={1}
            >
              <InnerTrigger>Private Residences —</InnerTrigger>
            </PrivateTrigger>
            <MultiTrigger
              onClick={() => handleMultiClick()}
              variants={childVariants}
              key={2}
            >
              <InnerTrigger>Multi Residential —</InnerTrigger>
            </MultiTrigger>
            <PublicTrigger
              onClick={() => handlePublicClick()}
              variants={childVariants}
              key={3}
            >
              <InnerTrigger>Public Works —</InnerTrigger>
            </PublicTrigger>
          </WorkTypesList>
        )}
      </AnimatePresence>
      <Link href="/studio">
        <LinkTag
          $isActive={activeLink === "Studio"}
          $fadeOut={showWorkTypes}
          onClick={() => setMenuIsActive(false)}
        >
          Studio
        </LinkTag>
      </Link>
      <Link href="/being-sensitive">
        <LinkTag
          $isActive={activeLink === "Sensitive"}
          $fadeOut={showWorkTypes}
          onClick={() => setMenuIsActive(false)}
        >
          Being Sensitive
        </LinkTag>
      </Link>
      <Link href="/press">
        <LinkTag
          $isActive={activeLink === "Press"}
          $fadeOut={showWorkTypes}
          onClick={() => setMenuIsActive(false)}
        >
          Press
        </LinkTag>
      </Link>
      <Link href="/contact">
        <LinkTag
          $isActive={activeLink === "Contact"}
          $fadeOut={showWorkTypes}
          onClick={() => setMenuIsActive(false)}
        >
          Contact
        </LinkTag>
      </Link>
    </MenuNavigationWrapper>
  );
};

export default MenuNavigation;
