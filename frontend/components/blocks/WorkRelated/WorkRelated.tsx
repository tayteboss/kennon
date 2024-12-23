import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import formatType from "../../../utils/formatType";
import LayoutWrapper from "../../layout/LayoutWrapper";
import router from "next/router";
import { setWorkType } from "../../../utils/setWorkType";
import pxToRem from "../../../utils/pxToRem";
import LayoutGrid from "../../layout/LayoutGrid";
import PortraitWorkCard from "../PortraitWorkCard";

const WorkRelatedWrapper = styled.section`
  .layout-grid {
    row-gap: ${pxToRem(24)};

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      row-gap: ${pxToRem(16)};

      .work-portrait-card {
        grid-column: 1 / -1;
      }
    }
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: ${pxToRem(24)};
`;

const Title = styled.h3`
  font-family: var(--font-arizona-flare-light);
  font-weight: 200;
`;

const Button = styled.button`
  color: var(--colour-mid-grey);
  text-align: right;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    color: var(--colour-black);
  }
`;

type Props = {
  data: WorkType["relatedWork"];
  type: WorkType["_type"];
};

const WorkRelated = (props: Props) => {
  const { data, type } = props;

  const handleClick = () => {
    if (type === "publicWork") {
      setWorkType("public");
      router.push("/works");
    } else {
      setWorkType("private");
      router.push("/works");
    }
  };

  const hasData = data && data.length > 0;

  return (
    <WorkRelatedWrapper>
      <LayoutWrapper>
        <TitleWrapper>
          <Title className="type-h1">
            Other {formatType(type, true)} works
          </Title>
          <Button onClick={() => handleClick()}>Back to works</Button>
        </TitleWrapper>
        <LayoutGrid>
          {hasData &&
            data.map((item, i) => (
              <PortraitWorkCard
                key={i}
                title={item?.title}
                image={item?.portraitThumbnailImage}
                slug={item?.slug}
                comingSoon={item?.comingSoon}
              />
            ))}
        </LayoutGrid>
      </LayoutWrapper>
    </WorkRelatedWrapper>
  );
};

export default WorkRelated;
