import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useActiveLink = (): string => {
  const [activeLink, setActiveLink] = useState<string>("Home");
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      setActiveLink("Home");
    } else if (router.pathname.includes("/work")) {
      setActiveLink("Works");
    } else if (router.pathname === "/studio") {
      setActiveLink("Studio");
    } else if (router.pathname === "/sensitive") {
      setActiveLink("Sensitive");
    } else if (router.pathname === "/press") {
      setActiveLink("Press");
    } else if (router.pathname === "/contact") {
      setActiveLink("Contact");
    } else {
      setActiveLink("");
    }
  }, [router]);

  return activeLink;
};

export default useActiveLink;
