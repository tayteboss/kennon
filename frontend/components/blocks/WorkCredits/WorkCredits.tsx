import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";

const WorkCreditsWrapper = styled.div<{ $hasSketches: boolean }>`
  display: flex;
  justify-content: ${({ $hasSketches }) =>
    $hasSketches ? "flex-start" : "center"};
  width: ${({ $hasSketches }) => ($hasSketches ? "auto" : "100%")};
  gap: ${pxToRem(24)};
`;

const TitleWrapper = styled.div``;

const CreditTitle = styled.p``;

const CreditLink = styled.a`
  text-decoration: underline;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

type Props = {
  data: WorkType["credits"];
  hasSketches: boolean;
};

const WorkCredits = (props: Props) => {
  const { data, hasSketches } = props;

  const hasCredits = data?.length > 0;

  return (
    <WorkCreditsWrapper $hasSketches={hasSketches}>
      <TitleWrapper>
        {hasCredits &&
          data.map((item, i) => (
            <CreditTitle key={`title-${i}`}>{item?.title}</CreditTitle>
          ))}
      </TitleWrapper>
      <NameWrapper>
        {hasCredits &&
          data.map((item, i) => (
            <>
              {item?.link ? (
                <CreditLink key={`link-${i}`} href={item?.link} target="_blank">
                  {item?.name}
                </CreditLink>
              ) : (
                <CreditTitle key={`name-${i}`}>{item?.name}</CreditTitle>
              )}
            </>
          ))}
      </NameWrapper>
    </WorkCreditsWrapper>
  );
};

export default WorkCredits;
