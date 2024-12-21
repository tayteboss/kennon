import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import Link from "next/link";

const ButtonLayoutWrapper = styled.div`
  a {
    display: inline-block;
  }
`;

const Inner = styled.div`
  padding: ${pxToRem(4)} ${pxToRem(12)} ${pxToRem(2)};
  text-align: center;
  background: var(--colour-cream);
  border-radius: ${pxToRem(4)};

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: var(--colour-black);
    color: var(--colour-cream);
  }
`;

type Props = {
  children: React.ReactNode;
  link: string;
};

const ButtonLayout = (props: Props) => {
  const { children, link } = props;

  return (
    <ButtonLayoutWrapper>
      <Link href={link}>
        <Inner>{children}</Inner>
      </Link>
    </ButtonLayoutWrapper>
  );
};

export default ButtonLayout;
