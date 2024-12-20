import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import Image from "next/image";
import { setWorkType } from "../../../utils/setWorkType";
import { useRouter } from "next/navigation";

const HomeWorkCardWrapper = styled.button`
  grid-column: span 6;
  height: calc(100lvh - 48px);
  width: 100%;
  position: relative;
  overflow: hidden;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    height: calc(50lvh - 32px);
  }

  &:hover {
    img {
      transform: scale(1.03);
    }
  }

  img {
    transition: all 2000ms var(--transition-ease);
  }
`;

const Title = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: var(--colour-white);
  mix-blend-mode: difference;
  font-weight: 400;
`;

type Props = {
  title: string;
  image:
    | SiteSettingsType["privateWorkImage"]
    | SiteSettingsType["publicWorkImage"];
};

const HomeWorkCard = (props: Props) => {
  const { title, image } = props;

  const router = useRouter();

  const handleClick = () => {
    if (title === "Private work") {
      setWorkType("private");
    } else {
      setWorkType("public");
    }
    router.push("/works");
  };

  return (
    <HomeWorkCardWrapper
      onClick={() => handleClick()}
      className="cursor-arrow-link"
    >
      {image?.asset?.url && (
        <Image
          src={image.asset.url}
          alt="Work type image"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      )}
      <Title>{title}</Title>
    </HomeWorkCardWrapper>
  );
};

export default HomeWorkCard;
