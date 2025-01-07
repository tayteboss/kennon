import { useState, MouseEvent, useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Bubble from "../../elements/Bubble";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import pxToRem from "../../../utils/pxToRem";

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
  /* mix-blend-mode: normal; */
  /* mix-blend-mode: multiply; */
  /* mix-blend-mode: screen; */
  /* mix-blend-mode: overlay; */
  /* mix-blend-mode: darken; */
  /* mix-blend-mode: lighten; */
  /* mix-blend-mode: color-dodge; */
  /* mix-blend-mode: color-burn; */
  /* mix-blend-mode: hard-light; */
  /* mix-blend-mode: soft-light; */
  /* mix-blend-mode: difference; */
  /* mix-blend-mode: exclusion; */
  /* mix-blend-mode: hue; */
  /* mix-blend-mode: saturation; */
  /* mix-blend-mode: color; */
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

interface BubblePosition {
  x: number;
  y: number;
}

type Props = {
  phrases?: string[];
  isActive: boolean;
};

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

const SensitiveBoard = ({ phrases, isActive }: Props) => {
  const [bubbles, setBubbles] = useState<BubblePosition[]>([]);
  const [phraseIndex, setPhraseIndex] = useState<number>(0);

  // Reset to first phrase whenever isActive changes to true
  useEffect(() => {
    if (isActive) {
      setPhraseIndex(0);
    }
  }, [isActive]);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const coords = {
      x: e.clientX,
      y: e.clientY,
    };

    setBubbles((prev) => [...prev, coords]);

    // Move to the next phrase on bubble creation
    // Wraps around with modulo
    setPhraseIndex(
      (prevIndex) => (prevIndex + 1) % (phrases ? phrases.length : 0)
    );
  };

  return (
    <SensitiveBoardWrapper
      onClick={handleClick}
      className="performance cursor-bubble sensitive-board"
    >
      {/* Render all bubbles */}
      {bubbles.map((bubble, index) => (
        <Bubble data={bubble} index={index} key={index} />
      ))}

      {/* AnimatePresence handles mounting/unmounting animations */}
      <PhraseWrapper>
        <AnimatePresence mode="wait">
          {isActive && phrases && (
            <AnimatedText key={phraseIndex} text={phrases[phraseIndex]} />
          )}
        </AnimatePresence>
      </PhraseWrapper>

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
          urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=190&cDistance=2.8&cPolarAngle=130&cameraZoom=1&color1=%23E3C19D&color2=%23F0E1CE&color3=%23E3E4E2&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=40&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=1.8&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=-90&shader=defaults&type=waterPlane&uDensity=1&uFrequency=5.5&uSpeed=0.2&uStrength=3&uTime=0.2&wireframe=false"
        />
      </ShaderGradientCanvas>
    </SensitiveBoardWrapper>
  );
};

export default SensitiveBoard;
