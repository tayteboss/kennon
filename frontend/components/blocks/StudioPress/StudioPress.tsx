import styled from "styled-components";
import { PressCardType, StudioPageType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import SectionHeading from "../SectionHeading";
import PressCard from "../PressCard";
import LayoutGrid from "../../layout/LayoutGrid";

const StudioPressWrapper = styled.section``;

const CardsWrapper = styled.div``;

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
      </LayoutWrapper>
    </StudioPressWrapper>
  );
};

export default StudioPress;
