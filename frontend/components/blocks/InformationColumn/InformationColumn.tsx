import styled from "styled-components";
import LayoutGrid from "../../layout/LayoutGrid";
import pxToRem from "../../../utils/pxToRem";
import { PortableText } from "@portabletext/react";
import AwardsList from "../AwardsList";
import { useInView } from "react-intersection-observer";

const InformationColumnWrapper = styled.div`
  padding-top: ${pxToRem(12)};
  border-top: 1px solid var(--colour-cream);

  &:not(:last-child) {
    margin-bottom: ${pxToRem(40)};
  }
`;

const Title = styled.h3`
  grid-column: 1 / 5;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    margin-bottom: ${pxToRem(12)};
  }
`;

const ContentWrapper = styled.div`
  grid-column: 5 / -1;
  max-width: ${pxToRem(850)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }

  * {
    font-family: var(--font-helvetica-neue-roman);
  }

  a {
    text-decoration: underline;

    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      opacity: 0.5;
    }
  }
`;

type Props = {
  title: string;
  data: any;
  useAwardsType?: boolean;
};

const InformationColumn = (props: Props) => {
  const { title, data, useAwardsType = false } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
    rootMargin: "-50px",
  });

  return (
    <InformationColumnWrapper
      ref={ref}
      className={`view-element-fade-in ${
        inView ? "view-element-fade-in--in-view" : ""
      }`}
    >
      <LayoutGrid>
        <Title className="type-heading-xsmall">{title}</Title>
        <ContentWrapper>
          {useAwardsType ? (
            <AwardsList data={data} />
          ) : (
            <PortableText value={data} />
          )}
        </ContentWrapper>
      </LayoutGrid>
    </InformationColumnWrapper>
  );
};

export default InformationColumn;
