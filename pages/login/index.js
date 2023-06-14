import AuthComponent from "../../components/Auth/AuthComponent";

export default function Login() {
  return (
    <div>
      <div className="pt-40 min-h-screen">
        <div className="login-box">
          <div className="justify-center">
            <h1 className="text-center text-2xl leading-6 font-bold mb-7">
              Login
            </h1>
            <AuthComponent isSignup={false} />
          </div>
          <div className="flex space-x-2 justify-center items-center mt-8 text-center">
            <div className="">Don't have an account?</div>
            <div className="font-bold">
              <a href="/signup" className="underline cursor-pointer">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
