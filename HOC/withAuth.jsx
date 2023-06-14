import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function withAuth(WrappedComponent) {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("token");

      if (!token) {
        router.replace("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}
