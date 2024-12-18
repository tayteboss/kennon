import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const NavWorksImageButtonsWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Trigger = styled.button``;

const ImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

type Props = {
  isActive: boolean;
  privateWorkImage: SiteSettingsType["privateWorkImage"];
  publicWorkImage: SiteSettingsType["publicWorkImage"];
};

const NavWorksImageButtons = (props: Props) => {
  const { isActive, privateWorkImage, publicWorkImage } = props;

  return (
    <AnimatePresence>
      {isActive && (
        <NavWorksImageButtonsWrapper
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Trigger>
            <ImageWrapper>
              <Image
                src={privateWorkImage?.asset?.url}
                alt="Private work image button"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </ImageWrapper>
          </Trigger>
        </NavWorksImageButtonsWrapper>
      )}
    </AnimatePresence>
  );
};

export default NavWorksImageButtons;
