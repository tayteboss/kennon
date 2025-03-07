import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import MenuNavigation from "../MenuNavigation";
import MenuAoc from "../../elements/MenuAoc";
import MenuStudioDetails from "../MenuStudioDetails";
import MenuShowreel from "../MenuShowreel";

const MenuWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 90;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(5px);
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: calc(var(--header-h) + 8px) 24px 24px 24px;
  height: 100%;
  position: relative;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: calc(var(--header-h) + 8px) 16px 16px 16px;
    align-items: center;
  }
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

type Props = {
  siteSettings: SiteSettingsType;
  menuIsActive: boolean;
  setMenuIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = (props: Props) => {
  const { siteSettings, menuIsActive, setMenuIsActive } = props;

  return (
    <AnimatePresence>
      {menuIsActive && (
        <MenuWrapper
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Inner>
            <MenuNavigation setMenuIsActive={setMenuIsActive} />
            <MenuStudioDetails
              phone={siteSettings?.phone}
              email={siteSettings?.email}
              address={siteSettings?.address}
              googleMapsLink={siteSettings?.googleMapsLink}
              instagramUrl={siteSettings?.instagramUrl}
            />
            {/* <MenuAoc aoc={siteSettings?.aoc} /> */}
            <MenuShowreel showreel={siteSettings?.showreel} />
          </Inner>
        </MenuWrapper>
      )}
    </AnimatePresence>
  );
};

export default Menu;
