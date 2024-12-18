import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import MuxPlayer from "@mux/mux-player-react/lazy";
import pxToRem from "../../../utils/pxToRem";

const MenuShowreelWrapper = styled.div`
  position: absolute;
  bottom: ${pxToRem(24)};
  right: ${pxToRem(24)};
  z-index: 1;
  width: 25%;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    display: none;
  }

  mux-player {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Outer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 56.25%;
`;

const Inner = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
`;

type Props = {
  showreel: SiteSettingsType["showreel"];
};

const MenuShowreel = (props: Props) => {
  const { showreel } = props;

  return (
    <MenuShowreelWrapper>
      <Outer>
        <Inner>
          {showreel?.asset?.playbackId && (
            <MuxPlayer
              streamType="on-demand"
              playbackId={showreel?.asset?.playbackId}
              autoPlay="muted"
              loop={true}
              thumbnailTime={1}
              loading="viewport"
              preload="auto"
              muted
              playsInline={true}
            />
          )}
        </Inner>
      </Outer>
    </MenuShowreelWrapper>
  );
};

export default MenuShowreel;
