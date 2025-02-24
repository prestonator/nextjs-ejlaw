"use client";
import { useHeaderVisibility } from "@/hooks/useHeaderVisibility";
import styles from "./Nav.module.css";

const NavbarClient = ({ children }) => {
  const isVisible = useHeaderVisibility(200);

  return (
    <header
      className={`${styles.header} ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } fixed flex items-center justify-center w-screen h-12 lg:h-20 pt-12 lg:pt-16 xl:pt-12 pb-12 shrink-0 transition-transform duration-300 bg-white`}
    >
      <div className="h-[5vh] py-2 text-base text-center z-4 top-0 bg-white absolute">
        <a
          className="text-[#800000] hover:text-blue-700"
          href="https://elton-jenkins-attorney-at-law.mycase.com/paypage/DNMiVDCbKLCJvWyCSiPEe3FA"
          target="_blank"
          rel="noopener noreferrer"
        >
          Notice: Visit our payment page to settle your invoices online.
        </a>
      </div>
      {children}
    </header>
  );
};

export default NavbarClient;
