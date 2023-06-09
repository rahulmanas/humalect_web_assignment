import { useRouter } from "next/router";
// import { HeaderNav } from "./HeaderNav";
import { HeaderActions } from "./HeaderActions.jsx";

export const Header = ({ sticky, onScroll, isLoggedIn }) => {
  const router = useRouter();

  const isHomePage = router.asPath === "/app/";

  // const { isMobile } = useDevice();

  // const device = isMobile();
  // console.log(device);

  return (
    <div>
      <header
        onScroll={onScroll}
        style={sticky ? { position: "fixed", top: 0 } : {}}
        className="bg-white dark:bg-darkest-dark flex items-center py-4 px-6 w-full z-10 overflow-scroll scroller"
      >
        {/* <Logo /> */}
        {/* {!isLoggedIn && <HeaderNavLoggedOut />} */}
        {/* <HeaderNav /> */}
        <HeaderActions isLoggedIn={isLoggedIn} />
      </header>
    </div>
  );
};
