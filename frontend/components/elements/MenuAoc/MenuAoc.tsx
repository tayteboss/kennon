import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

const MenuAocWrapper = styled.p`
  max-width: ${pxToRem(570)};
`;

type Props = {
  aoc: string;
};

const MenuAoc = (props: Props) => {
  const { aoc } = props;

  return <MenuAocWrapper>{aoc || ""}</MenuAocWrapper>;
};

export default MenuAoc;
