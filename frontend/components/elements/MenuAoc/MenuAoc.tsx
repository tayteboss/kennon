import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

const MenuAocWrapper = styled.p`
  max-width: ${pxToRem(570)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin: 0 auto;
    text-align: center;
    font-size: ${pxToRem(12)};
    line-height: ${pxToRem(16)};
  }
`;

type Props = {
  aoc: string;
};

const MenuAoc = (props: Props) => {
  const { aoc } = props;

  return <MenuAocWrapper>{aoc || ""}</MenuAocWrapper>;
};

export default MenuAoc;
