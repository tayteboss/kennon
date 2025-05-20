import styled from "styled-components";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { SiteSettingsType } from "../../../shared/types/types";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import pxToRem from "../../../utils/pxToRem";
import Logo from "../../svgs/Logo";

const ScreensaversWrapper = styled.div`
  height: 100lvh;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;

  .shader-gradient-canvas {
    pointer-events: none;

    * {
      pointer-events: none;
    }
  }
`;

const ShaderOuter = styled.div`
  opacity: 0.5;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    opacity: 1;

    & > div {
      filter: brightness(0.9);
    }
  }
`;

const SelectionBox = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 8px;
  color: white;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  z-index: 1000;
  cursor: pointer;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  h3 {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 900 !important;
    margin-bottom: 15px;
    padding-right: 40px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const ScreensaverOption = styled.div<{ isActive: boolean }>`
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  transition: background-color 0.2s;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  position: relative;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(255, 255, 255, 0.15)" : "transparent"};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &::after {
    content: "";
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: white;
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    transition: opacity 0.2s;
  }
`;

const ScreensaverContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
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
  data: SiteSettingsType["screensavers"];
};

const Screensavers = ({ data }: Props) => {
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [showSelectionBox, setShowSelectionBox] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [mouseTimeout, setMouseTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setIsMouseMoving(true);
      setShowSelectionBox(true);

      if (mouseTimeout) {
        clearTimeout(mouseTimeout);
      }

      const timeout = setTimeout(() => {
        setIsMouseMoving(false);
      }, 2000);

      setMouseTimeout(timeout);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimeout) {
        clearTimeout(mouseTimeout);
      }
    };
  }, [mouseTimeout]);

  const handleScreensaverSelect = (index: number) => {
    setSelectedIndex(index);
    setShowSelectionBox(false);
  };

  return (
    <ScreensaversWrapper style={{ cursor: isMouseMoving ? "auto" : "none" }}>
      <ShaderOuter>
        <AnimatePresence mode="wait">
          <ScreensaverContainer
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ShaderGradientCanvas
              style={{
                position: "absolute",
                top: 0,
                pointerEvents: "none",
              }}
              className="shader-gradient-canvas"
            >
              <ShaderGradient
                control="query"
                zoomOut={false}
                urlString={data[selectedIndex]?.url}
              />
            </ShaderGradientCanvas>
          </ScreensaverContainer>
        </AnimatePresence>
      </ShaderOuter>

      <LogoWrapper>
        <Logo />
      </LogoWrapper>

      <SelectionBox isVisible={showSelectionBox}>
        <CloseButton onClick={() => setShowSelectionBox(false)}>×</CloseButton>
        <h3>Select Screensaver</h3>
        {data.map((screensaver, index) => (
          <ScreensaverOption
            key={index}
            onClick={() => handleScreensaverSelect(index)}
            isActive={index === selectedIndex}
          >
            {screensaver.title}
          </ScreensaverOption>
        ))}
      </SelectionBox>
    </ScreensaversWrapper>
  );
};

export default Screensavers;
