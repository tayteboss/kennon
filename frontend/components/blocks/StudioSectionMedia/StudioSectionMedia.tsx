import styled from "styled-components";
import { SensitivePageType } from "../../../shared/types/types";
import MediaStack from "../../common/MediaStack";

const StudioSectionMediaWrapper = styled.section`
  .media-wrapper {
    padding-top: 56.25%;
  }
`;

type Props = {
  data: SensitivePageType["media"];
};

const StudioSectionMedia = (props: Props) => {
  const { data } = props;

  return (
    <StudioSectionMediaWrapper>
      <MediaStack data={data} />
    </StudioSectionMediaWrapper>
  );
};

export default StudioSectionMedia;
