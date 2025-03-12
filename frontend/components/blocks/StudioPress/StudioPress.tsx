import styled from "styled-components";
import { PressCardType, StudioPageType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import SectionHeading from "../SectionHeading";
import PressCard from "../PressCard";
import LayoutGrid from "../../layout/LayoutGrid";
import pxToRem from "../../../utils/pxToRem";
import ButtonLayout from "../../layout/ButtonLayout";

const StudioPressWrapper = styled.section`
  .press-card {
    a {
      padding-top: 133.33%;

      @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
        padding-top: 100%;
      }
    }
  }

  .layout-grid {
    row-gap: ${pxToRem(24)};

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      row-gap: ${pxToRem(16)};
    }
  }
`;

const CardsWrapper = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${pxToRem(64)};
`;

type Props = {
  data: StudioPageType["pressSection"];
  pressCards: PressCardType[];
};

const StudioPress = (props: Props) => {
  const { data, pressCards } = props;

  const hasPressCards = pressCards?.length > 0;

  return (
    <StudioPressWrapper className="studio-section">
      <LayoutWrapper>
        <SectionHeading
          subheading={data.subheading}
          heading={data.heading}
          useTopBorder
        />
        <CardsWrapper>
          <LayoutGrid>
            {hasPressCards &&
              pressCards?.map((card, i) => (
                <PressCard
                  key={i}
                  title={card?.title}
                  colour={card?.colour}
                  image={card?.image}
                  link={card?.link}
                />
              ))}
          </LayoutGrid>
        </CardsWrapper>
        {/* <ButtonWrapper>
          <ButtonLayout link="/press">See all press articles</ButtonLayout>
        </ButtonWrapper> */}
      </LayoutWrapper>
    </StudioPressWrapper>
  );
};

export default StudioPress;
