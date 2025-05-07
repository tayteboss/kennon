import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import Link from "next/link";
import NavbarLinks from "../../blocks/NavbarLinks";
import MenuTrigger from "../../blocks/MenuTrigger";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: ${pxToRem(24)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  mix-blend-mode: difference;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(16)};
  }

  a {
    color: var(--colour-white);
    flex: 1;
    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      opacity: 0.5;
    }
  }
`;

const LogoWrapper = styled.div<{ $isVisible: boolean }>`
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: all var(--transition-speed-default) var(--transition-ease);
`;

type Props = {
  menuIsActive: boolean;
  setMenuIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  workTypeRefresh: any;
};

const Header = (props: Props) => {
  const { menuIsActive, setMenuIsActive, workTypeRefresh } = props;

  const [isVisible, setIsVisible] = useState(false);

  const { pathname } = useRouter();

  const handleScroll = () => {
    if (pathname === "/") {
      if (window.scrollY < 500) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    if (pathname === "/") {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (pathname === "/") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [pathname]);

  return (
    <HeaderWrapper className="header">
      <LogoWrapper $isVisible={isVisible}>
        <Link
          href="/"
          onClick={() => setMenuIsActive(false)}
          className="type-heading-small"
        >
          Kennon
        </Link>
      </LogoWrapper>
      {/* <NavbarLinks workTypeRefresh={workTypeRefresh} /> */}
      <MenuTrigger
        menuIsActive={menuIsActive}
        setMenuIsActive={setMenuIsActive}
      />
    </HeaderWrapper>
  );
};

export default Header;
