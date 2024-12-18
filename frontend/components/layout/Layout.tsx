import styled from "styled-components";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { ReactNode, useState } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

const siteSettings = require("../../json/siteSettings.json");

const Main = styled.main``;

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;

  const [menuIsActive, setMenuIsActive] = useState(false);

  const lenis = useLenis(({ scroll }) => {});

  console.log("siteSettings", siteSettings);

  return (
    <>
      <Header menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive} />
      <ReactLenis root>
        <Main>{children}</Main>
      </ReactLenis>
      <Footer />
    </>
  );
};

export default Layout;
