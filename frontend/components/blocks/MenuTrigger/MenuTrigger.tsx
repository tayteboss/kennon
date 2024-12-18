import styled from "styled-components";

const MenuTriggerWrapper = styled.button`
  color: var(--colour-white);
  flex: 1;
  text-align: right;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

type Props = {
  menuIsActive: boolean;
  setMenuIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuTrigger = (props: Props) => {
  const { menuIsActive, setMenuIsActive } = props;

  return (
    <MenuTriggerWrapper onClick={() => setMenuIsActive(!menuIsActive)}>
      {menuIsActive ? "Close" : "Menu"}
    </MenuTriggerWrapper>
  );
};

export default MenuTrigger;
