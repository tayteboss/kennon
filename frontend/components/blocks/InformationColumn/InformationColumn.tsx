import styled from "styled-components";
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
  margin-bottom: ${pxToRem(8)};
  text-align: center;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(12)};
  }
`;

const ContentWrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: ${pxToRem(900)};

  a {
    text-decoration: underline;

    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      opacity: 0.5;
    }
  }
`;

const Content = styled.p``;

type Props = {
  title: string;
  data: any;
  useAwardsType?: boolean;
  useAocType?: boolean;
  useDefaultType?: boolean;
};

const InformationColumn = (props: Props) => {
  const {
    title,
    data,
    useAwardsType = false,
    useAocType = false,
    useDefaultType = false,
  } = props;

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
      <Title className="type-heading-small">{title}</Title>
      <ContentWrapper>
        {useAwardsType && <AwardsList data={data} />}
        {useDefaultType && <PortableText value={data} />}
        {useAocType && <Content>{data || ""}</Content>}
      </ContentWrapper>
    </InformationColumnWrapper>
  );
};

export default InformationColumn;
