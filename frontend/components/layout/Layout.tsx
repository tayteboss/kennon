import styled from "styled-components";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { ReactNode, useEffect, useState } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Menu from "../blocks/Menu";

const siteSettings = require("../../json/siteSettings.json");

const Main = styled.main``;

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;

  const [menuIsActive, setMenuIsActive] = useState(false);

  const lenis = useLenis(({ scroll }) => {});

  useEffect(() => {
    if (menuIsActive) {
      document.documentElement.classList.add("no-scroll");
    } else {
      document.documentElement.classList.remove("no-scroll");
    }
  }, [menuIsActive]);

  return (
    <>
      <Header menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive} />
      <Menu
        menuIsActive={menuIsActive}
        setMenuIsActive={setMenuIsActive}
        siteSettings={siteSettings}
      />
      <ReactLenis root>
        <Main>{children}</Main>
      </ReactLenis>
      <Footer siteSettings={siteSettings} />
    </>
  );
};

export default Layout;
