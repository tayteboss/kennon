import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { useInView } from "react-intersection-observer";

const SectionHeadingWrapper = styled.div<{ $useTopBorder: boolean }>`
  padding-top: ${pxToRem(24)};
  margin-bottom: ${pxToRem(40)};
  border-top: ${(props) =>
    props.$useTopBorder ? "1px solid var(--colour-cream)" : "none"};
`;

const Subheading = styled.h2`
  text-align: center;
  margin-bottom: ${pxToRem(16)};
`;

const Heading = styled.h3`
  font-family: var(--font-arizona-flare-light);
  width: 100%;
`;

type Props = {
  subheading: string;
  heading: string;
  useTopBorder?: boolean;
};

const SectionHeading = (props: Props) => {
  const { subheading, heading, useTopBorder = false } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  return (
    <>
      {subheading && heading && (
        <SectionHeadingWrapper
          $useTopBorder={useTopBorder}
          className={`view-element-fade-in ${
            inView ? "view-element-fade-in--in-view" : ""
          }`}
          ref={ref}
        >
          {subheading && (
            <Subheading className="type-heading-small">{subheading}</Subheading>
          )}
          {heading && <Heading className="type-h1">{heading}</Heading>}
        </SectionHeadingWrapper>
      )}
    </>
  );
};

export default SectionHeading;
