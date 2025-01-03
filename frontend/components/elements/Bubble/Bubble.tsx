import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type StyledProps = {
  $x: number;
  $y: number;
  $index: number;
};

const BubbleWrapper = styled(motion.div)<StyledProps>`
  position: absolute;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  transform: translate(-50%, -50%);
  background: ${(props) => `var(--colour-${(props.$index % 5) + 1})`};
  border-radius: 100%;
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
  z-index: 10;
`;

type Props = {
  data: {
    x: number;
    y: number;
  };
  index: number;
};

const Bubble = (props: Props) => {
  const { data, index } = props;
  const [duration, setDuration] = useState<number>(0);

  const audioRef = useRef(null);

  const handleLoadedMetadata = () => {
    if (!audioRef?.current) return;
    setDuration(Math.ceil(audioRef.current.duration));
  };

  useEffect(() => {
    if (duration <= 0) return;

    const audio: any = audioRef.current;

    audio.play();

    return () => audio.pause();
  }, [duration]);

  const wrapperVariants = {
    hidden: {
      height: "5vw",
      width: "5vw",
      filter: "blur(5px)",
      transition: {
        duration: duration / 2,
        ease: "easeInOut",
        repeat: 1,
        repeatType: "mirror",
        repeatDelay: duration / 2, // in ms
      },
    },
    visible: {
      height: "75vw",
      width: "75vw",
      filter: "blur(20px)",
      transition: {
        duration: duration / 2,
        ease: "easeInOut",
        repeat: 1,
        repeatType: "mirror",
      },
    },
    exit: {
      height: "5vw",
      width: "5vw",
      filter: "blur(5px)",
      opacity: 0,
      transition: {
        duration: duration / 2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      {duration > 0 && (
        <BubbleWrapper
          $x={data.x}
          $y={data.y}
          $index={(index % 5) + 1}
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
        />
      )}
      <audio ref={audioRef} onLoadedMetadata={handleLoadedMetadata}>
        <source src={`/sounds/${(index % 5) + 1}.mp3`} type="audio/mp3" />
      </audio>
    </>
  );
};

export default Bubble;
