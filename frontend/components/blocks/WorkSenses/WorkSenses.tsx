import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import SenseBlock from "../SenseBlock";
import pxToRem from "../../../utils/pxToRem";

const WorkSensesWrapper = styled.section`
  margin-bottom: ${pxToRem(240)};
  padding: 0 ${pxToRem(24)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(120)};
    padding: 0;
  }

  .layout-grid {
    row-gap: ${pxToRem(24)};

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      row-gap: ${pxToRem(16)};
    }
  }
`;

type Props = {
  data: WorkType["senseBlocks"];
};

const WorkSenses = (props: Props) => {
  const { data } = props;

  const hasData = data?.length > 0;

  return (
    <WorkSensesWrapper>
      <LayoutGrid>
        {hasData &&
          data.map((item, i) => (
            <SenseBlock {...item} key={i} number={`0${i + 1}`} />
          ))}
      </LayoutGrid>
    </WorkSensesWrapper>
  );
};

export default WorkSenses;
