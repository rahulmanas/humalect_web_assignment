import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export const AuthButton = () => {
  const router = useRouter();
  const [buttonText, setButtonText] = useState("Log In");
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) setButtonText("Log Out");
    else setButtonText("Log In");
  }, [isLoggedIn]);

  const handleClick = () => {
    if (!isLoggedIn) router.push("/login");
    else {
      //logout
      localStorage.removeItem("token");
      router.push("/login");
      setIsLoggedIn(false);
    }
  };

  console.log(isLoggedIn, "isl");

  return (
    <button
      className="w-max cursor-pointer font-bold text-sm leading-4 py-button-auth px-4 border border-solid border-border-bg dark:border-primary-dark rounded-xl text-price-green hover:border-primary-gray hover:bg-primary-gray dark:hover:bg-deals-card"
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};
