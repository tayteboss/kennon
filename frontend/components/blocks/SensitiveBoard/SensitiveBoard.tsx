import React, { useState, MouseEvent, useEffect, useRef } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Bubble from "../../elements/Bubble";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import pxToRem from "../../../utils/pxToRem";
import ButtonLayout from "../../layout/ButtonLayout";
import { useRouter } from "next/router";
import { SensitivePageType } from "../../../shared/types/types";
import SoundIcon from "../../svgs/SoundIcon";
import MuteTrigger from "../../elements/MuteTrigger";
import Logo from "../../svgs/Logo";

const SensitiveBoardWrapper = styled.section`
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

const PhraseWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  position: relative;
  z-index: 20;
  mix-blend-mode: luminosity;
  padding: 0 ${pxToRem(32)};
`;

const AnimatedPhraseContainer = styled(motion.div)`
  text-align: center;
  font-family: var(--font-arizona-flare-light);
  font-weight: 200;
  max-width: ${pxToRem(700)};
  margin: 0 auto;
`;

const Word = styled.span`
  display: inline-block;
  color: white;
`;

const Letter = styled(motion.span)``;

const ShaderOuter = styled.div`
  opacity: 0.5;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    opacity: 1;

    & > div {
      filter: brightness(0.85);
    }
  }
`;

const StartWrapper = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pxToRem(8)};
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  transition: all var(--transition-speed-extra-slow) var(--transition-ease);
`;

const ButtonWrapper = styled.div`
  padding: 0 ${pxToRem(16)};
  display: flex;
  justify-content: center;

  .button-inner {
    background: var(--colour-white);
    color: var(--colour-black);
  }

  * {
    pointer-events: none !important;
  }
`;

const Hint = styled.p`
  color: var(--colour-black);
  opacity: 0.5;
  text-align: center;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    opacity: 0.75;
  }
`;

const LogoWrapper = styled.div<{ $isReady: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  opacity: ${(props) => (props.$isReady ? 1 : 0)};
  filter: ${(props) => (props.$isReady ? "none" : "blur(5px)")};

  transition: all var(--transition-speed-slow) var(--transition-ease);

  svg {
    path {
      fill: var(--colour-black);
    }

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      width: ${pxToRem(130)};
    }
  }
`;

// -----------------------------
//   TYPES
// -----------------------------
interface BubblePosition {
  x: number;
  y: number;
  fileName: string | null;
  audio?: HTMLAudioElement;
}

type Props = {
  phrases?: SensitivePageType["phrases"];
  baseLoop?: SensitivePageType["baseLoop"];
  melodySounds?: SensitivePageType["melodySounds"];
  environmentalSounds?: SensitivePageType["environmentalSounds"];
  isHomePage?: boolean;
};

// -----------------------------
//   FRAMER VARIANTS
// -----------------------------
const containerVariants: Variants = {
  initial: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: {},
  },
};

const letterVariants: Variants = {
  initial: {
    opacity: 0,
    y: -1,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: 1,
    filter: "blur(4px)",
  },
};

interface AnimatedTextProps {
  text: string;
}

const AnimatedText = ({ text }: AnimatedTextProps) => {
  const words = text.split(" ");

  return (
    <AnimatedPhraseContainer
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.8 }}
      className="type-h1"
    >
      {words.map((word, wordIndex) => (
        <Word key={`word-${wordIndex}`} style={{ marginRight: "0.4rem" }}>
          {word.split("").map((letter, letterIndex) => (
            <Letter
              key={`letter-${wordIndex}-${letterIndex}`}
              variants={letterVariants}
              style={{ display: "inline-block" }}
            >
              {letter}
            </Letter>
          ))}
        </Word>
      ))}
    </AnimatedPhraseContainer>
  );
};

// -----------------------------
//   SENSITIVE BOARD COMPONENT
// -----------------------------
export const SensitiveBoard = ({
  phrases,
  baseLoop,
  melodySounds,
  environmentalSounds,
  isHomePage = false,
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const [bubbles, setBubbles] = useState<any[]>([]);
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);

  const baseLoopRef = useRef<HTMLAudioElement | null>(null);
  const environmentalAudioRefs = useRef<HTMLAudioElement[]>([]);
  const melodyAudioRefs = useRef<HTMLAudioElement[]>([]);

  const [envIndex, setEnvIndex] = useState<number>(0);
  const [melIndex, setMelIndex] = useState<number>(0);

  const environmentalFiles =
    environmentalSounds?.map((item: any) => item.file.asset.url) || [];

  const melodyFiles =
    melodySounds?.map((item: any) => item.file.asset.url) || [];

  useEffect(() => {
    if (isActive) {
      if (!baseLoopRef.current) {
        const audio = new Audio(baseLoop?.asset?.url || "");
        audio.loop = true;
        audio.volume = isMuted ? 0 : 1;
        baseLoopRef.current = audio;
      }
      const audioEl = baseLoopRef.current;
      if (audioEl) {
        audioEl.currentTime = 0;
        audioEl.play().catch((err) => {
          console.error("Could not play base loop:", err);
        });
      }
    } else {
      if (baseLoopRef.current) {
        baseLoopRef.current.pause();
        baseLoopRef.current.currentTime = 0;
      }
    }
  }, [isActive, baseLoop]);

  useEffect(() => {
    if (isActive) {
      setPhraseIndex(0);
    }
  }, [isActive]);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (!isActive) {
      setIsActive(true);
    }
    const updatedCount = clickCount + 1;
    setClickCount(updatedCount);

    const coords = { x: e.clientX, y: e.clientY };
    const fileName = getSoundFile(updatedCount);

    let audio: HTMLAudioElement | undefined;
    if (fileName) {
      audio = new Audio(fileName);
      audio.volume = isMuted ? 0 : 1;
      audio.play().catch((err) => {
        console.error("Could not play bubble audio:", err);
      });
      if (environmentalFiles.includes(fileName)) {
        environmentalAudioRefs.current.push(audio);
      } else if (melodyFiles.includes(fileName)) {
        melodyAudioRefs.current.push(audio);
      }
    }

    const newBubble = {
      x: coords.x,
      y: coords.y,
      fileName,
      audio,
    };

    setBubbles((prev) => [...prev, newBubble]);

    if (phrases && phrases.length > 0) {
      setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }
  };

  const getSoundFile = (nthClick: number): string | null => {
    if (nthClick === 1) {
      const file = environmentalFiles[0];
      if (file) setEnvIndex((prev) => prev + 1);
      return file || null;
    }
    if (nthClick === 2) {
      const file = melodyFiles[0];
      if (file) setMelIndex((prev) => prev + 1);
      return file || null;
    }
    const offset = nthClick - 3;
    const patternIndex = offset % 3;
    if (patternIndex === 0 || patternIndex === 1) {
      const file = environmentalFiles[envIndex % environmentalFiles.length];
      setEnvIndex((prev) => prev + 1);
      return file || null;
    } else {
      const file = melodyFiles[melIndex % melodyFiles.length];
      setMelIndex((prev) => prev + 1);
      return file || null;
    }
  };

  const handleVolumeChange = () => {
    const targetVolume = isMuted ? 0 : 1;
    if (baseLoopRef.current) {
      baseLoopRef.current.volume = targetVolume;
    }
    environmentalAudioRefs.current.forEach((audio) => {
      audio.volume = targetVolume;
    });
    melodyAudioRefs.current.forEach((audio) => {
      audio.volume = targetVolume;
    });
  };

  const handleFadeOutAllSound = () => {
    const targetVolume = 0;
    if (baseLoopRef.current) {
      baseLoopRef.current.volume = targetVolume;
    }
    environmentalAudioRefs.current.forEach((audio) => {
      audio.volume = targetVolume;
    });
    melodyAudioRefs.current.forEach((audio) => {
      audio.volume = targetVolume;
    });
  };

  useEffect(() => {
    handleVolumeChange();
  }, [isMuted]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      handleFadeOutAllSound();
    };
    handleRouteChange(router.asPath);
  }, [router]);

  // -----------------------------
  //   RENDER
  // -----------------------------
  return (
    <SensitiveBoardWrapper
      onClick={handleClick}
      className="performance sensitive-board"
    >
      {isHomePage && (
        <LogoWrapper $isReady={!isActive}>
          <Logo />
        </LogoWrapper>
      )}

      <StartWrapper $isActive={!isActive} className="sensitive-board__start">
        <ButtonWrapper>
          <ButtonLayout>Click here to begin</ButtonLayout>
        </ButtonWrapper>
        <Hint className="type-small sensitive-board__hint">
          Turn your volume up for the best experience
        </Hint>
      </StartWrapper>

      {isActive && (
        <MuteTrigger
          setIsMuted={setIsMuted}
          isMuted={isMuted}
          isActive={isActive}
        />
      )}

      {bubbles.map((bubble, index) => (
        <Bubble data={bubble} index={index} key={index} />
      ))}

      <PhraseWrapper className="cursor-sensitive">
        <AnimatePresence mode="wait">
          {isActive && phrases && phrases.length > 0 && (
            <AnimatedText key={phraseIndex} text={phrases[phraseIndex]} />
          )}
        </AnimatePresence>
      </PhraseWrapper>

      <ShaderOuter>
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
            urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.4&cAzimuthAngle=190&cDistance=2.8&cPolarAngle=130&cameraZoom=1&color1=%23E3C19D&color2=%23edebf0&color3=%23E3E4E2&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=40&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=-0.3&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=-90&shader=defaults&type=waterPlane&uDensity=1&uFrequency=5.5&uSpeed=0.1&uStrength=3&uTime=0.2&wireframe=false"
          />
        </ShaderGradientCanvas>
      </ShaderOuter>
    </SensitiveBoardWrapper>
  );
};

export default SensitiveBoard;
