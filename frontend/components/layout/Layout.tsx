import styled from "styled-components";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { ReactNode, useEffect, useState } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Menu from "../blocks/Menu";
import { useRouter } from "next/router";

const siteSettings = require("../../json/siteSettings.json");

const Main = styled.main``;

type Props = {
  children: ReactNode;
  workTypeRefresh: any;
};

const Layout = (props: Props) => {
  const { children, workTypeRefresh } = props;

  const [menuIsActive, setMenuIsActive] = useState(false);

  const lenis = useLenis(({ scroll }) => {});
  const router = useRouter();

  useEffect(() => {
    setMenuIsActive(false);
  }, [router.asPath]);

  useEffect(() => {
    if (!lenis) return;

    if (menuIsActive) {
      document.documentElement.classList.add("no-scroll");
      lenis.stop();
    } else {
      document.documentElement.classList.remove("no-scroll");
      lenis.start();
    }
  }, [menuIsActive]);

  return (
    <>
      <Header
        menuIsActive={menuIsActive}
        setMenuIsActive={setMenuIsActive}
        workTypeRefresh={workTypeRefresh}
      />
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
