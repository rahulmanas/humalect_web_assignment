import { useRouter } from "next/router";
import { AuthButton } from "../Button/AuthButton";

export const HeaderActions = ({ isLoggedIn }) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between ml-auto text-white dark:text-black">
      <>
        <div className="flex items-center space-x-2">
          <AuthButton />
        </div>
      </>
    </div>
  );
};
