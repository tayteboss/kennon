import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import Link from "next/link";
import NavbarLinks from "../../blocks/NavbarLinks";
import MenuTrigger from "../../blocks/MenuTrigger";

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

type Props = {
  menuIsActive: boolean;
  setMenuIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  workTypeRefresh: any;
};

const Header = (props: Props) => {
  const { menuIsActive, setMenuIsActive, workTypeRefresh } = props;

  return (
    <HeaderWrapper className="header">
      <Link
        href="/"
        onClick={() => setMenuIsActive(false)}
        className="type-heading-small"
      >
        Kennon
      </Link>
      {/* <NavbarLinks workTypeRefresh={workTypeRefresh} /> */}
      <MenuTrigger
        menuIsActive={menuIsActive}
        setMenuIsActive={setMenuIsActive}
      />
    </HeaderWrapper>
  );
};

export default Header;
