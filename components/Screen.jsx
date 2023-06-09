import { useRouter } from "next/router";
import { useState } from "react";

import { useAuth } from "../hooks/useAuth";
import { Header } from "./Header/Header.jsx";

export const Screen = ({ children }) => {
  const [sticky, setSticky] = useState(false);

  const { isLoggedIn } = useAuth();

  const handleScroll = () => {
    if (window.pageYOffset > 40) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const router = useRouter();

  return (
    <div className="screen scroller">
      <Header sticky={sticky} onScroll={handleScroll} isLoggedIn={isLoggedIn} />
      <main className={"min-h-screen"}>{children}</main>
    </div>
  );
};
