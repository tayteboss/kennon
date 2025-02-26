import { FC } from "react";
import { motion, LayoutGroup } from "framer-motion";
import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import LandscapeIcon from "../../svgs/LandscapeIcon";
import PortraitIcon from "../../svgs/PortraitIcon";
import ListIcon from "../../svgs/ListIcon";

const WorkViewToolbarWrapper = styled.div`
  position: fixed;
  bottom: ${pxToRem(40)};
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: ${pxToRem(4)};
`;

const TypeWrapper = styled.div``;

const ViewWrapper = styled.div`
  .toggle-wrapper {
    gap: ${pxToRem(4)};
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const ToggleWrapper = styled.div`
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: ${pxToRem(4)};
  padding: ${pxToRem(4)};
  display: flex;
  position: relative;
`;

const TriggerContainer = styled(motion.button)`
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const TextTrigger = styled.div`
  padding: ${pxToRem(6)} ${pxToRem(8)} ${pxToRem(4)};
  height: 28px;
  color: var(--colour-black);
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(12)};
  }
`;

const IconTrigger = styled.div`
  height: 28px;
  width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;

  svg {
    height: ${pxToRem(16)};
    width: ${pxToRem(16)};
  }
`;

const Highlight = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--colour-white);
  border-radius: ${pxToRem(4)};
`;

type Props = {
  listView: "landscape" | "portrait" | "list";
  workType: "private" | "public" | "multi";
  setListView: (view: "landscape" | "portrait" | "list") => void;
  setWorkType: (type: "private" | "public" | "multi") => void;
};

const WorkViewToolbar: FC<Props> = ({
  listView,
  workType,
  setListView,
  setWorkType,
}) => {
  return (
    <WorkViewToolbarWrapper>
      <TypeWrapper>
        <LayoutGroup>
          <ToggleWrapper>
            <TriggerContainer layout onClick={() => setWorkType("private")}>
              {workType === "private" && <Highlight layoutId="workType" />}
              <TextTrigger className="type-heading-xsmall">
                Private Residences
              </TextTrigger>
            </TriggerContainer>
            <TriggerContainer layout onClick={() => setWorkType("public")}>
              {workType === "public" && <Highlight layoutId="workType" />}
              <TextTrigger className="type-heading-xsmall">
                Public Works
              </TextTrigger>
            </TriggerContainer>
            <TriggerContainer layout onClick={() => setWorkType("multi")}>
              {workType === "multi" && <Highlight layoutId="workType" />}
              <TextTrigger className="type-heading-xsmall">
                Multi Residential
              </TextTrigger>
            </TriggerContainer>
          </ToggleWrapper>
        </LayoutGroup>
      </TypeWrapper>
      <ViewWrapper>
        <LayoutGroup>
          <ToggleWrapper className="toggle-wrapper">
            <TriggerContainer layout onClick={() => setListView("landscape")}>
              {listView === "landscape" && <Highlight layoutId="listType" />}
              <IconTrigger>
                <LandscapeIcon />
              </IconTrigger>
            </TriggerContainer>
            <TriggerContainer layout onClick={() => setListView("portrait")}>
              {listView === "portrait" && <Highlight layoutId="listType" />}
              <IconTrigger>
                <PortraitIcon />
              </IconTrigger>
            </TriggerContainer>
            <TriggerContainer layout onClick={() => setListView("list")}>
              {listView === "list" && <Highlight layoutId="listType" />}
              <IconTrigger>
                <ListIcon />
              </IconTrigger>
            </TriggerContainer>
          </ToggleWrapper>
        </LayoutGroup>
      </ViewWrapper>
    </WorkViewToolbarWrapper>
  );
};

export default WorkViewToolbar;
