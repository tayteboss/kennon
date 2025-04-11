import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import Image from "next/image";

const WorkSketchesWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
  background: var(--colour-white);
`;

const Inner = styled.div`
  width: 100%;
  padding-top: 75%;
  position: relative;
  background: var(--colour-white);
`;

const FadeImageContainer = styled.div<{ $isFadingIn: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: opacity 1s ease-in-out;
  opacity: ${(props) => (props.$isFadingIn ? 1 : 0)};
  background: var(--colour-white);
`;

type Props = {
  data: WorkType["sketches"];
};

const WorkSketches: FC<Props> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFadingIn, setIsFadingIn] = useState(false);

  useEffect(() => {
    if (!data || data.length === 0) return;

    if (data.length === 1) {
      setIsFadingIn(true);
      return;
    }

    // Fade in immediately
    setIsFadingIn(true);

    // Fade out at 2 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsFadingIn(false);
    }, 2000);

    // Next image at 3 seconds
    const nextIndexTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 3000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(nextIndexTimer);
    };
  }, [currentIndex, data]);

  if (!data || data.length === 0) return null;

  const currentItem = data[currentIndex];
  const currentImageUrl = currentItem?.asset?.url || "";

  return (
    <WorkSketchesWrapper>
      <Inner>
        <FadeImageContainer $isFadingIn={isFadingIn}>
          {currentImageUrl && (
            <Image
              src={currentImageUrl}
              alt="Sketched image"
              fill
              style={{ objectFit: "contain" }}
            />
          )}
        </FadeImageContainer>
      </Inner>
    </WorkSketchesWrapper>
  );
};

export default WorkSketches;
