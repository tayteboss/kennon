import Link from "next/link";
import styled from "styled-components";

const FooterCreditWrapper = styled.div`
  grid-column: span 2;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const LinkTag = styled.div`
  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

const FooterCredit = () => {
  return (
    <FooterCreditWrapper>
      <Link href="https://tayte.co/" target="_blank">
        <LinkTag className="type-small">Built by tayte.co</LinkTag>
      </Link>
    </FooterCreditWrapper>
  );
};

export default FooterCredit;
