import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

const SectionHeadingWrapper = styled.div`
  padding-top: ${pxToRem(24)};
  margin-bottom: ${pxToRem(40)};
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
};

const SectionHeading = (props: Props) => {
  const { subheading, heading } = props;

  return (
    <SectionHeadingWrapper>
      {subheading && (
        <Subheading className="type-heading-small">{subheading}</Subheading>
      )}
      {heading && <Heading className="type-h1">{heading}</Heading>}
    </SectionHeadingWrapper>
  );
};

export default SectionHeading;
