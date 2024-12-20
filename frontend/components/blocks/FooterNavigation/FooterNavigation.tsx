import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import { setWorkType } from "../../../utils/setWorkType";
import { useRouter } from "next/navigation";

const FooterNavigationWrapper = styled.div`
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    display: none;
  }
`;

const LinkTag = styled.div`
  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

const InstagramLink = styled.div`
  margin-top: auto;
`;

const PrivateTrigger = styled(motion.button)`
  display: block;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

const PublicTrigger = styled(motion.button)`
  display: block;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

type Props = {
  instagramUrl: SiteSettingsType["instagramUrl"];
};

const FooterNavigation = (props: Props) => {
  const { instagramUrl } = props;

  const router = useRouter();

  const handlePrivateClick = () => {
    setWorkType("private");
    router.push("/works");
  };

  const handlePublicClick = () => {
    setWorkType("public");
    router.push("/works");
  };

  return (
    <FooterNavigationWrapper>
      <PrivateTrigger
        className="type-small"
        onClick={() => handlePrivateClick()}
      >
        Private
      </PrivateTrigger>
      <PublicTrigger className="type-small" onClick={() => handlePublicClick()}>
        Public
      </PublicTrigger>
      <Link href="/press">
        <LinkTag className="type-small">Press</LinkTag>
      </Link>
      <Link href="/contact">
        <LinkTag className="type-small">Contact</LinkTag>
      </Link>
      {instagramUrl && (
        <InstagramLink>
          <Link href={instagramUrl} target="_blank">
            <LinkTag className="type-small">Instagram</LinkTag>
          </Link>
        </InstagramLink>
      )}
    </FooterNavigationWrapper>
  );
};

export default FooterNavigation;
