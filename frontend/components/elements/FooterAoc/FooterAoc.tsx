import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";

const FooterAocWrapper = styled.div`
  grid-column: 1 / -1;
`;

const Text = styled.p``;

type Props = {
  aoc: SiteSettingsType["aoc"];
};

const FooterAoc = (props: Props) => {
  const { aoc } = props;

  return (
    <FooterAocWrapper>
      <Text className="type-small">{aoc || ""}</Text>
    </FooterAocWrapper>
  );
};

export default FooterAoc;
