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
  padding: ${pxToRem(8)} ${pxToRem(16)};
  height: 37px;
  color: var(--colour-black);
  position: relative;
  z-index: 1;
`;

const IconTrigger = styled.div`
  height: 37px;
  width: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
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
  workType: "private" | "public";
  setListView: (view: "landscape" | "portrait" | "list") => void;
  setWorkType: (type: "private" | "public") => void;
};

const WorkViewToolbar: FC<Props> = ({
  listView,
  workType,
  setListView,
  setWorkType,
}) => {
  return (
    <WorkViewToolbarWrapper>
      <LayoutGroup>
        <ToggleWrapper>
          <TriggerContainer layout onClick={() => setWorkType("private")}>
            {workType === "private" && <Highlight layoutId="workType" />}
            <TextTrigger>Private</TextTrigger>
          </TriggerContainer>
          <TriggerContainer layout onClick={() => setWorkType("public")}>
            {workType === "public" && <Highlight layoutId="workType" />}
            <TextTrigger>Public</TextTrigger>
          </TriggerContainer>
        </ToggleWrapper>
      </LayoutGroup>
      <LayoutGroup>
        <ToggleWrapper>
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
    </WorkViewToolbarWrapper>
  );
};

export default WorkViewToolbar;
