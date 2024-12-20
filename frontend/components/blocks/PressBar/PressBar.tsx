import styled from "styled-components";
import { PressCardType } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import LayoutWrapper from "../../layout/LayoutWrapper";

const PressBarWrapper = styled.section`
  margin-bottom: ${pxToRem(40)};
`;

const Inner = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Card = styled.div<{ $hex: string }>`
  flex: 2vw 0 0;
  width: 100%;
  background: ${(props) => props.$hex};
  border-radius: ${pxToRem(2)};
`;

const CardInner = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
`;

const CardBlock = styled.div`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
`;

type Props = {
  data: PressCardType[];
};

const PressBar = (props: Props) => {
  const { data } = props;

  const hasData = data?.length > 0;

  return (
    <PressBarWrapper>
      <LayoutWrapper>
        <Inner>
          {hasData &&
            data.map((card, i) => (
              <Card key={i} $hex={card?.colour?.hex || "#F1F0EC"}>
                <CardInner>
                  <CardBlock />
                </CardInner>
              </Card>
            ))}
        </Inner>
      </LayoutWrapper>
    </PressBarWrapper>
  );
};

export default PressBar;
