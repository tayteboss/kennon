import React, {
  useState,
  MouseEvent,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import styled from "styled-components";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Bubble from "../../elements/Bubble"; // Assuming Bubble is memoized: export default React.memo(Bubble);
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import pxToRem from "../../../utils/pxToRem";
import ButtonLayout from "../../layout/ButtonLayout";
import { useRouter } from "next/router";
import { SensitivePageType } from "../../../shared/types/types";
import SoundIcon from "../../svgs/SoundIcon";
import MuteTrigger from "../../elements/MuteTrigger"; // Assuming MuteTrigger is memoized
import Logo from "../../svgs/Logo";

// Define isMobile outside the component as it doesn't depend on props or state
const isClient = typeof window !== "undefined";
const isMobile = () =>
  isClient && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
  max-width: ${pxToRem(700)};
  margin: 0 auto;
`;

const Word = styled.span`
  display: inline-block;
  color: white;
`;

const Letter = styled(motion.span)`
  font-size: ${pxToRem(26)};
  line-height: 1.2;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(18)};
    line-height: 1.1;
  }
`;

const ShaderOuter = styled.div`
  opacity: 0.5;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    opacity: 1;

    & > div {
      filter: brightness(0.8);
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

const HintWrapper = styled.div<{ $isActive: boolean }>`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  transition: all var(--transition-speed-extra-slow) var(--transition-ease);
`;

const ButtonWrapper = styled.div`
  padding: 0 ${pxToRem(16)};
  display: flex;
  justify-content: center;

  .button-inner {
    background: transparent;
    color: var(--colour-black);
  }

  * {
    pointer-events: none !important;
  }
`;

const Hint = styled.p`
  color: var(--colour-black);
  opacity: 0.75;
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

interface BubbleData {
  // Define a more specific type for bubble data
  x: number;
  y: number;
  fileName: string | null;
  audio?: HTMLAudioElement;
  id: number; // Add a unique ID for key prop
}

type Props = {
  phrases?: SensitivePageType["phrases"];
  baseLoop?: SensitivePageType["baseLoop"];
  melodySounds?: SensitivePageType["melodySounds"];
  environmentalSounds?: SensitivePageType["environmentalSounds"];
  isHomePage?: boolean;
  handleCursorRefresh?: () => void;
  buttonTitle?: string;
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

const AnimatedText = React.memo(({ text }: AnimatedTextProps) => {
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
});
AnimatedText.displayName = "AnimatedText"; // Good practice for React DevTools

export const SensitiveBoard = ({
  phrases,
  baseLoop,
  melodySounds,
  environmentalSounds,
  isHomePage = false,
  buttonTitle = "Be Sensitive?",
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [clickCount, setClickCount] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showClickAgainHint, setShowClickAgainHint] = useState(false);
  const [hintTriggered, setHintTriggered] = useState(false);

  const router = useRouter();
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const [phraseIndex, setPhraseIndex] = useState<number>(0);

  const baseLoopRef = useRef<HTMLAudioElement | null>(null);
  // Use refs for indices to avoid state updates causing re-renders when only sound logic changes
  const envIndexRef = useRef<number>(0);
  const melIndexRef = useRef<number>(0);
  // Store audio elements in refs for direct manipulation without re-renders
  const environmentalAudioRefs = useRef<Set<HTMLAudioElement>>(new Set());
  const melodyAudioRefs = useRef<Set<HTMLAudioElement>>(new Set());
  const nextBubbleId = useRef(0); // For stable keys

  const environmentalFiles = useMemo(
    () => environmentalSounds?.map((item: any) => item.file.asset.url) || [],
    [environmentalSounds]
  );

  const melodyFiles = useMemo(
    () => melodySounds?.map((item: any) => item.file.asset.url) || [],
    [melodySounds]
  );

  const baseLoopUrl = useMemo(() => baseLoop?.asset?.url, [baseLoop]);

  // Effect for playing/pausing base loop
  useEffect(() => {
    let audioEl: HTMLAudioElement | null = baseLoopRef.current;

    if (isActive && baseLoopUrl) {
      if (!audioEl) {
        audioEl = new Audio(baseLoopUrl);
        audioEl.loop = true;
        baseLoopRef.current = audioEl;
      }
      audioEl.volume = isMuted ? 0 : 1;
      // Check if already playing to avoid unnecessary play calls/errors
      if (audioEl.paused) {
        audioEl.play().catch((err) => {
          console.error("Could not play base loop:", err);
        });
      }
    } else if (audioEl && !audioEl.paused) {
      audioEl.pause();
      audioEl.currentTime = 0; // Resetting time might be desired
    }
  }, [isActive, baseLoopUrl, isMuted]); // Add isMuted dependency

  // Effect for resetting phrase index when activated
  useEffect(() => {
    if (isActive) {
      setPhraseIndex(0);
    }
  }, [isActive]);

  // Effect for showing hint after delay
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isActive && !hintTriggered) {
      timer = setTimeout(() => {
        setShowClickAgainHint(true);
      }, 10000);
    }
    // Cleanup function
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isActive, hintTriggered]);

  // Effect for hiding hint on click
  useEffect(() => {
    if (showClickAgainHint) {
      const handleClick = () => {
        setShowClickAgainHint(false);
        setHintTriggered(true); // Ensure hint doesn't reappear
      };
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }
  }, [showClickAgainHint]); // Keep hintTriggered out, it's handled by the click itself

  const getSoundFile = useCallback(
    (nthClick: number): string | null => {
      const currentEnvIndex = envIndexRef.current;
      const currentMelIndex = melIndexRef.current;

      let file: string | undefined;

      if (nthClick === 1 && environmentalFiles.length > 0) {
        file = environmentalFiles[0];
        if (file) envIndexRef.current = 1;
      } else if (nthClick === 2 && melodyFiles.length > 0) {
        file = melodyFiles[0];
        if (file) melIndexRef.current = 1;
      } else if (nthClick > 2) {
        const offset = nthClick - 3;
        const patternIndex = offset % 3;
        if (
          (patternIndex === 0 || patternIndex === 1) &&
          environmentalFiles.length > 0
        ) {
          file =
            environmentalFiles[currentEnvIndex % environmentalFiles.length];
          if (file) envIndexRef.current = currentEnvIndex + 1;
        } else if (melodyFiles.length > 0) {
          file = melodyFiles[currentMelIndex % melodyFiles.length];
          if (file) melIndexRef.current = currentMelIndex + 1;
        }
      }
      return file || null;
    },
    [environmentalFiles, melodyFiles]
  ); // Depends only on the file lists

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!isActive) {
        setIsActive(true);
      }
      const updatedCount = clickCount + 1;
      setClickCount(updatedCount); // Still need to track clicks for sound logic

      const coords = { x: e.clientX, y: e.clientY };
      const fileName = getSoundFile(updatedCount);

      let audio: HTMLAudioElement | undefined;
      if (fileName) {
        try {
          audio = new Audio(fileName);
          audio.volume = isMuted ? 0 : 1;
          audio.play().catch((err) => {
            console.error("Could not play bubble audio:", err);
            // Don't add failed audio elements to refs
            audio = undefined;
          });

          // Add successfully created/playing audio to the correct ref set
          if (audio) {
            const isEnv = environmentalFiles.includes(fileName);
            const isMel = melodyFiles.includes(fileName);

            if (isEnv) {
              environmentalAudioRefs.current.add(audio);
            } else if (isMel) {
              melodyAudioRefs.current.add(audio);
            }
            // Remove from set when finished playing
            audio.addEventListener(
              "ended",
              () => {
                if (isEnv)
                  environmentalAudioRefs.current.delete(
                    audio as HTMLAudioElement
                  );
                if (isMel)
                  melodyAudioRefs.current.delete(audio as HTMLAudioElement);
              },
              { once: true }
            ); // Use once: true for automatic cleanup
          }
        } catch (error) {
          console.error("Error creating or playing audio:", error);
          audio = undefined; // Ensure audio is undefined on error
        }
      }

      const newBubble: BubbleData = {
        x: coords.x,
        y: coords.y,
        fileName,
        audio, // Can still pass audio if needed by Bubble, though Bubble shouldn't control it
        id: nextBubbleId.current++, // Use unique ID for key
      };

      setBubbles((prev) => [...prev, newBubble]);

      if (phrases && phrases.length > 0) {
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    },
    [
      isActive,
      clickCount,
      getSoundFile,
      isMuted,
      phrases,
      environmentalFiles,
      melodyFiles,
    ]
  ); // Added file lists

  const handleVolumeChange = useCallback(() => {
    const targetVolume = isMuted ? 0 : 1;
    if (baseLoopRef.current) {
      baseLoopRef.current.volume = targetVolume;
    }
    // Iterate over Sets
    environmentalAudioRefs.current.forEach((audio) => {
      audio.volume = targetVolume;
    });
    melodyAudioRefs.current.forEach((audio) => {
      audio.volume = targetVolume;
    });
  }, [isMuted]); // Only depends on isMuted

  const fadeOutAndPause = useCallback((audio: HTMLAudioElement) => {
    if (!audio || audio.paused) return; // Don't fade if already paused

    if (isMobile()) {
      audio.pause();
      // Optional: Reset volume immediately if needed, or keep it for resume
      // audio.volume = 1;
    } else {
      let currentVolume = audio.volume;
      // Clear previous interval if any (safety measure)
      const existingInterval = (audio as any)._fadeInterval;
      if (existingInterval) {
        clearInterval(existingInterval);
      }

      (audio as any)._fadeInterval = setInterval(() => {
        currentVolume -= 0.05;
        if (currentVolume > 0) {
          try {
            // Add try-catch for potential errors setting volume
            audio.volume = Math.max(0, currentVolume);
          } catch (e) {
            console.error("Error setting volume during fade:", e);
            clearInterval((audio as any)._fadeInterval);
            audio.pause(); // Force pause on error
          }
        } else {
          audio.pause();
          audio.volume = 1; // Reset volume for next play
          clearInterval((audio as any)._fadeInterval);
          delete (audio as any)._fadeInterval; // Clean up property
        }
      }, 50); // Fade duration ~1 second (20 * 50ms)
    }
  }, []); // No dependencies

  const handleFadeOutAllSound = useCallback(() => {
    if (baseLoopRef.current) fadeOutAndPause(baseLoopRef.current);
    // Iterate Sets for fading
    environmentalAudioRefs.current.forEach(fadeOutAndPause);
    melodyAudioRefs.current.forEach(fadeOutAndPause);
  }, [fadeOutAndPause]); // Depends on fadeOutAndPause

  // Effect for handling volume changes when isMuted toggles
  useEffect(() => {
    handleVolumeChange();
  }, [handleVolumeChange]); // Depends on the memoized function

  // Effect for cleaning up sound on route change or component unmount
  useEffect(() => {
    const handleRouteChange = () => {
      handleFadeOutAllSound();
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // Cleanup on unmount
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      handleFadeOutAllSound(); // Also fade out on unmount
      // Clear audio refs completely on unmount
      baseLoopRef.current?.pause();
      baseLoopRef.current = null;
      environmentalAudioRefs.current.clear();
      melodyAudioRefs.current.clear();
    };
  }, [router.events, handleFadeOutAllSound]); // Depend on router.events and the memoized function

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
          <ButtonLayout>{buttonTitle}</ButtonLayout>
        </ButtonWrapper>
        <Hint className="type-small sensitive-board__hint">
          Turn your volume up for the best experience
        </Hint>
      </StartWrapper>

      <HintWrapper $isActive={isActive && showClickAgainHint}>
        <Hint className="type-small">Click anywhere to continue</Hint>
      </HintWrapper>

      {/* Assuming MuteTrigger is memoized */}
      {isActive && (
        <MuteTrigger
          setIsMuted={setIsMuted} // State setter is stable
          isMuted={isMuted}
          isActive={isActive}
        />
      )}

      {/* Assuming Bubble is memoized and handles its own animation */}
      {/* Use stable unique id for key prop */}
      {bubbles.map((bubble) => (
        <Bubble data={bubble} index={bubble.id} key={bubble.id} />
      ))}

      <PhraseWrapper className="cursor-sensitive">
        <AnimatePresence mode="wait">
          {isActive && phrases && phrases.length > 0 && (
            <AnimatedText key={phraseIndex} text={phrases[phraseIndex]} />
          )}
        </AnimatePresence>
      </PhraseWrapper>

      {/* Shader component likely won't benefit much from memoization unless its props change */}
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
            urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.3&cAzimuthAngle=190&cDistance=2.8&cPolarAngle=130&cameraZoom=1&color1=%23E3C19D&color2=%23edebf0&color3=%23E3E4E2&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=40&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=-0.3&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=-90&shader=defaults&type=waterPlane&uDensity=1&uFrequency=5.5&uSpeed=0.1&uStrength=3&uTime=0.2&wireframe=false"
          />
        </ShaderGradientCanvas>
      </ShaderOuter>
    </SensitiveBoardWrapper>
  );
};

export default SensitiveBoard; // Keep default export if needed
