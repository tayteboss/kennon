import { useEffect, useState } from "react";
import styled from "styled-components";
import getRatio from "../../../utils/getRatio";
import { useInView } from "react-intersection-observer";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import MediaStack from "../../common/MediaStack";
import pxToRem from "../../../utils/pxToRem";

const MultiColumnMediaWrapper = styled.section`
  .layout-grid {
    row-gap: ${pxToRem(24)};

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      row-gap: ${pxToRem(16)};
    }
  }
`;

const ImageWrapper = styled.div``;

const MultiColumnMedia = (props: any) => {
  const { multiColumnMedia } = props;

  const hasColumns = multiColumnMedia?.columns?.length > 0;

  const [ratio, setRatio] = useState(getRatio(multiColumnMedia?.aspectRatio));

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  useEffect(() => {
    setRatio(getRatio(multiColumnMedia?.aspectRatio));
  }, [multiColumnMedia]);

  console.log("multiColumnMedia", multiColumnMedia);

  return (
    <MultiColumnMediaWrapper
      className={`work-section work-section--${ratio} view-element-fade-in ${
        inView ? "view-element-fade-in--in-view" : ""
      }`}
      ref={ref}
    >
      <LayoutWrapper>
        <LayoutGrid>
          {hasColumns &&
            multiColumnMedia?.columns.map((item: any, i: number) => (
              <ImageWrapper
                className={`work-section__multi-inner work-section__multi-cols-${multiColumnMedia?.columns?.length}`}
                key={i}
              >
                <MediaStack data={item} />
              </ImageWrapper>
            ))}
        </LayoutGrid>
      </LayoutWrapper>
    </MultiColumnMediaWrapper>
  );
};

export default MultiColumnMedia;