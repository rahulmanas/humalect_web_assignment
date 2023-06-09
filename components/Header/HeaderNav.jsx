import { useRouter } from "next/router";

export const HeaderNav = () => {
  const router = useRouter();
  const pathName = router.pathname;

  return (
    <nav className="ml-10">
      <div className="flex items-center justify-between space-x-6">
        <div
          onClick={() => {
            router.push("/github");
          }}
        >
          <p
            className={`cursor-pointer font-semibold text-base leading-none ${
              pathName.includes("/github")
                ? "text-price-green font-bold"
                : "text-black  hover:text-price-green"
            }`}
          >
            Github
          </p>
        </div>
      </div>
    </nav>
  );
};
