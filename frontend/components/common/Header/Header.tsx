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
};

const Header = (props: Props) => {
  const { menuIsActive, setMenuIsActive } = props;

  return (
    <HeaderWrapper className="header">
      <Link href="/">Kennon</Link>
      <NavbarLinks />
      <MenuTrigger
        menuIsActive={menuIsActive}
        setMenuIsActive={setMenuIsActive}
      />
    </HeaderWrapper>
  );
};

export default Header;
