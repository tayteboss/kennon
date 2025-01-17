import React, { useState, MouseEvent, useEffect, useRef } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Bubble from "../../elements/Bubble";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import pxToRem from "../../../utils/pxToRem";
import ButtonLayout from "../../layout/ButtonLayout";
import { useRouter } from "next/router";

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
    background: var(--colour-cream);
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
  phrases?: string[];
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
const SensitiveBoard = ({ phrases }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  // For the sample and melody files
  const sampleFiles = [
    "sample-1-breath.mp3",
    "sample-2-crowd.mp3",
    "sample-3-ferry.mp3",
    "sample-4-footy.mp3",
    "sample-5-pier.mp3",
    "sample-6-pizzicat.mp3",
    "sample-7-stopping.mp3",
  ];

  const melodyFiles = [
    "melody-1-piano.mp3",
    "melody-2-rhodes.mp3",
    "melody-3-scape.mp3",
    "melody-4-violin.mp3",
  ];

  // Track the bubble + audio data
  const [bubbles, setBubbles] = useState<BubblePosition[]>([]);
  // Keep track of the phrase index
  const [phraseIndex, setPhraseIndex] = useState<number>(0);

  // We only start counting clicks once isActive is true
  const [clickCount, setClickCount] = useState<number>(0);

  // For the base-loop reference
  const baseLoopRef = useRef<HTMLAudioElement | null>(null);

  // Keep track of the previous sample to avoid repeats
  const lastSampleRef = useRef<string | null>(null);

  // Cycle through melody in order
  const [melodyIndex, setMelodyIndex] = useState<number>(0);

  // -----------------------------
  //   PLAY BASE LOOP WHEN ACTIVE
  // -----------------------------
  useEffect(() => {
    if (isActive) {
      if (!baseLoopRef.current) {
        const audio = new Audio("/sounds/base-loop.mp3");
        audio.loop = true;
        audio.volume = 0; // start volume at 0 for fade
        baseLoopRef.current = audio;
      }

      const audioEl = baseLoopRef.current;
      if (audioEl) {
        audioEl.currentTime = 0;
        audioEl.play().catch((err) => {
          console.error("Could not play base loop:", err);
        });

        // Fade in if volume is 0
        if (audioEl.volume === 0) {
          let currentVolume = 0;
          const fadeInterval = setInterval(() => {
            if (!audioEl) return;
            currentVolume += 0.05;
            audioEl.volume = Math.min(currentVolume, 1);
            if (currentVolume >= 1) {
              clearInterval(fadeInterval);
            }
          }, 100);
        }
      }
    } else {
      // If user becomes inactive again, reset base loop
      if (baseLoopRef.current) {
        const fadeOutInterval = setInterval(() => {
          if (!baseLoopRef.current) return;
          const currentVolume = baseLoopRef.current.volume;
          baseLoopRef.current.volume = Math.max(currentVolume - 0.05, 0);
          if (currentVolume <= 0) {
            clearInterval(fadeOutInterval);
            baseLoopRef.current.pause();
            baseLoopRef.current.currentTime = 0;
          }
        }, 100);
      }
    }
  }, [isActive]);

  // Whenever isActive becomes true, *only* reset phrases to start
  useEffect(() => {
    if (isActive) {
      setPhraseIndex(0);
      // IMPORTANT: no longer resetting clickCount to 0 here
      // setClickCount(0);
    }
  }, [isActive]);

  // -----------------------------
  //   CLICK HANDLER
  // -----------------------------
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (!isActive) {
      setIsActive(true);
    }

    // This updatedCount will be the correct new click number
    const updatedCount = clickCount + 1;
    setClickCount(updatedCount);

    // Create the bubble
    const coords = { x: e.clientX, y: e.clientY };
    const fileName = getSoundFile(updatedCount);

    // Create a new audio only if there's a valid file
    let audio: HTMLAudioElement | undefined;
    if (fileName) {
      audio = new Audio(`/sounds/${fileName}`);
      audio.play().catch((err) => {
        console.error("Could not play bubble audio:", err);
      });
    }

    const newBubble: BubblePosition = {
      x: coords.x,
      y: coords.y,
      fileName: fileName,
      audio: audio,
    };

    // Add the bubble to the array (while limiting total to 10)
    setBubbles((prev) => {
      return [...prev, newBubble];
    });

    // Move to the next phrase on bubble creation (wrap around if needed)
    if (phrases && phrases.length > 0) {
      setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }
  };

  console.log("bubbles", bubbles);

  // Decide whether to play sample or melody on the nth click
  const getSoundFile = (nthClick: number): string | null => {
    // 1. First click => always play 'sample-1-breath.mp3'
    if (nthClick === 1) {
      return "sample-1-breath.mp3";
    }

    // 2. Second click => choose a specific sample (not random)
    if (nthClick === 2) {
      return "sample-2-crowd.mp3";
    }

    // 3. After that => 2 random samples, 1 melody, repeated
    const mod = nthClick % 3;
    if (mod === 1 || mod === 2) {
      // Play a random sample
      return getRandomSample();
    } else {
      // Every 3rd click => melody
      return getNextMelody();
    }
  };

  const getRandomSample = (): string => {
    if (sampleFiles.length === 0) return "";
    let chosenSample: string;
    do {
      const randomIndex = Math.floor(Math.random() * sampleFiles.length);
      chosenSample = sampleFiles[randomIndex];
    } while (chosenSample === lastSampleRef.current && sampleFiles.length > 1);
    lastSampleRef.current = chosenSample;
    return chosenSample;
  };

  const getNextMelody = (): string => {
    if (melodyFiles.length === 0) return "";
    const file = melodyFiles[melodyIndex % melodyFiles.length];
    setMelodyIndex(melodyIndex + 1);
    return file;
  };

  // Fade out the loop if user navigates away
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url !== "/being-sensitive" && baseLoopRef.current) {
        const fadeOutInterval = setInterval(() => {
          if (!baseLoopRef.current) return;
          const currentVolume = baseLoopRef.current.volume;
          baseLoopRef.current.volume = Math.max(currentVolume - 0.05, 0);
          if (currentVolume <= 0) {
            clearInterval(fadeOutInterval);
            baseLoopRef.current.pause();
            baseLoopRef.current.currentTime = 0;
          }
        }, 100);
      }
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
      <StartWrapper $isActive={!isActive}>
        <ButtonWrapper>
          <ButtonLayout>Click here to begin</ButtonLayout>
        </ButtonWrapper>
        <Hint className="type-small">
          Turn your volume up for the best experience
        </Hint>
      </StartWrapper>

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
