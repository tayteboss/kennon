import styled from "styled-components";
import MediaStack from "../../common/MediaStack";
import { useInView } from "react-intersection-observer";
import getRatio from "../../../utils/getRatio";
import { useEffect, useState } from "react";
import pxToRem from "../../../utils/pxToRem";

const FullMediaSectionWrapper = styled.section``;

const Inner = styled.div`
  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: 0 ${pxToRem(16)};
  }
`;

const FullMediaSection = (props: any) => {
  const { fullMedia } = props;

  const [ratio, setRatio] = useState(getRatio(fullMedia?.aspectRatio));

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  useEffect(() => {
    setRatio(getRatio(fullMedia?.aspectRatio));
  }, [fullMedia]);

  return (
    <FullMediaSectionWrapper
      className={`work-section work-section--${ratio} view-element-fade-in ${
        inView ? "view-element-fade-in--in-view" : ""
      }`}
      ref={ref}
    >
      <Inner className="work-section__full-inner">
        {fullMedia?.media && <MediaStack data={fullMedia?.media} />}
      </Inner>
    </FullMediaSectionWrapper>
  );
};

export default FullMediaSection;
