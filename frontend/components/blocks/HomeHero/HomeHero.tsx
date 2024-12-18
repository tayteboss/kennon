import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import { useEffect, useState } from "react";
import MediaStack from "../../common/MediaStack";
import Logo from "../../svgs/Logo";
import pxToRem from "../../../utils/pxToRem";

const HomeHeroWrapper = styled.section`
  width: 100%;
  position: relative;

  .media-wrapper {
    width: 100%;
    height: 100lvh;
    object-fit: cover;
  }
`;

const LogoWrapper = styled.div<{ $isReady: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  opacity: ${(props) => (props.$isReady ? 1 : 0)};
  filter: ${(props) => (props.$isReady ? "none" : "blur(5px)")};
  mix-blend-mode: difference;

  transition: all var(--transition-speed-slow) var(--transition-ease);

  svg {
    path {
      fill: var(--colour-white);
    }

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      width: ${pxToRem(130)};
    }
  }
`;

type Props = {
  data: HomePageType["heroMedia"];
};

const HomeHero = (props: Props) => {
  const { data } = props;

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HomeHeroWrapper>
      <MediaStack data={data} />
      <LogoWrapper $isReady={isReady}>
        <Logo />
      </LogoWrapper>
    </HomeHeroWrapper>
  );
};

export default HomeHero;
