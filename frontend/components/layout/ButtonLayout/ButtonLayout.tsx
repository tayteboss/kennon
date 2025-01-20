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
  pointer-events: all;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${pxToRem(8)};

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: var(--colour-black);
    color: var(--colour-cream);
  }
`;

type Props = {
  children: React.ReactNode;
  link?: string;
};

const ButtonLayout = (props: Props) => {
  const { children, link } = props;

  return (
    <ButtonLayoutWrapper>
      {link && (
        <Link href={link}>
          <Inner className="button-inner">{children}</Inner>
        </Link>
      )}
      {!link && <Inner className="button-inner">{children}</Inner>}
    </ButtonLayoutWrapper>
  );
};

export default ButtonLayout;
