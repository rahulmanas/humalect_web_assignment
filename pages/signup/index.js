import { NextSeo } from "next-seo";
import AuthComponent from "../../components/Auth/AuthComponent";

export default function Signup() {
  return (
    <div>
      <NextSeo title={`Humalect - Signup`} noindex={true} nofollow={true} />
      <div className="pt-40 min-h-screen">
        <div className="login-box">
          <div className="justify-center">
            <h1 className="text-center text-2xl leading-6 font-bold mb-7">
              Signup
            </h1>
            <AuthComponent />
          </div>
          <div className="flex space-x-2 justify-center items-center mt-8 text-center">
            <div className="">Already have an account?</div>
            <div className="font-bold">
              <a href="/login" className="underline cursor-pointer">
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
