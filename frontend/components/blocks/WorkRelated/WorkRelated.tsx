import styled from "styled-components";
import { WorkType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import router from "next/router";
import { setWorkType } from "../../../utils/setWorkType";
import pxToRem from "../../../utils/pxToRem";
import Image from "next/image";
import LandscapeCardTitle from "../../elements/LandscapeCardTitle";
import Link from "next/link";

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
  color: var(--colour-mid-grey);
  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    color: var(--colour-black);
  }
`;

const Button = styled.button`
  color: var(--colour-mid-grey);
  text-align: right;

  transition: all var(--transition-speed-default) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }

  &:hover {
    color: var(--colour-black);
  }
`;

const NextProjectMediaWrapper = styled.section`
  padding-top: 56.25%;
  width: 100%;
  position: relative;
  overflow: hidden;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding-top: 133.33%;
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;

  .landscape-card-title {
    position: absolute;
    top: ${pxToRem(32)};
    left: 50%;
    transform: translateX(-50%);
  }
`;

type Props = {
  data?: WorkType["relatedWork"];
  type: WorkType["_type"];
  nextWork?: WorkType;
  previousWork?: WorkType;
};

const WorkRelated = (props: Props) => {
  const { data, type, nextWork, previousWork } = props;

  const handleClick = () => {
    if (type === "publicWork") {
      setWorkType("public");
      router.push("/works");
    } else {
      setWorkType("private");
      router.push("/works");
    }
  };

  const hasRelatedWork = data && data.length > 0;
  const hasNextWork = !!nextWork;
  const hasPreviousWork = !!previousWork;

  return (
    <>
      {hasNextWork && (
        <WorkRelatedWrapper>
          <LayoutWrapper>
            <TitleWrapper>
              <Link href={`/works/${previousWork?.slug?.current}`}>
                <Title className="type-h1">Previous</Title>
              </Link>
              <Link href={`/works/${nextWork?.slug?.current}`}>
                <Title className="type-h1">Next</Title>
              </Link>
              {/* <Button onClick={() => handleClick()}>Back to works</Button> */}
            </TitleWrapper>
          </LayoutWrapper>
          {/* <Link href={`/works/${nextWork?.slug?.current}`}>
            <NextProjectMediaWrapper
              className="cursor-arrow-text-link"
              data-title="Next work"
            >
              {nextWork?.landscapeThumbnailImage?.asset?.url && (
                <ImageWrapper>
                  <Image
                    src={nextWork?.landscapeThumbnailImage?.asset?.url}
                    alt={`${nextWork?.title} hero image`}
                    priority={false}
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  <LandscapeCardTitle
                    title={nextWork?.title}
                    location={nextWork?.location}
                    yearCompleted={nextWork?.yearCompleted}
                    comingSoon={nextWork?.comingSoon}
                    type={nextWork?._type}
                  />
                </ImageWrapper>
              )}
            </NextProjectMediaWrapper>
          </Link> */}
        </WorkRelatedWrapper>
      )}
    </>
  );
};

export default WorkRelated;
