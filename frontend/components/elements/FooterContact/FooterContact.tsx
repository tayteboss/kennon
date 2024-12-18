import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import Link from "next/link";

const FooterContactWrapper = styled.div`
  grid-column: span 2;

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    grid-column: span 3;
  }
`;

const LinkTag = styled.div`
  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

type Props = {
  phone?: SiteSettingsType["phone"];
  email?: SiteSettingsType["email"];
};

const FooterContact = (props: Props) => {
  const { phone, email } = props;

  return (
    <FooterContactWrapper>
      {phone && (
        <Link href={`tel: ${phone}`}>
          <LinkTag className="type-small">{phone}</LinkTag>
        </Link>
      )}
      {email && (
        <Link href={`mailto: ${email}`}>
          <LinkTag className="type-small">{email}</LinkTag>
        </Link>
      )}
    </FooterContactWrapper>
  );
};

export default FooterContact;
