import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import getRatio from "../../../utils/getRatio";
import LayoutWrapper from "../../layout/LayoutWrapper";
import MediaStack from "../../common/MediaStack";
import LayoutGrid from "../../layout/LayoutGrid";
import pxToRem from "../../../utils/pxToRem";

const IsolatedMediaSectionWrapper = styled.section`
  padding: ${pxToRem(240)} 0;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(120)} 0;
  }
`;

const Inner = styled.div``;

const IsolatedMediaSection = (props: any) => {
  const { isolatedMedia } = props;

  const [ratio, setRatio] = useState(getRatio(isolatedMedia?.aspectRatio));

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  useEffect(() => {
    setRatio(getRatio(isolatedMedia?.aspectRatio));
  }, [isolatedMedia]);

  return (
    <IsolatedMediaSectionWrapper
      className={`work-section work-section--${ratio} view-element-fade-in ${
        inView ? "view-element-fade-in--in-view" : ""
      }`}
      ref={ref}
    >
      <LayoutWrapper>
        <LayoutGrid>
          <Inner className="work-section__isolated-inner">
            {isolatedMedia?.media && <MediaStack data={isolatedMedia?.media} />}
          </Inner>
        </LayoutGrid>
      </LayoutWrapper>
    </IsolatedMediaSectionWrapper>
  );
};

export default IsolatedMediaSection;
