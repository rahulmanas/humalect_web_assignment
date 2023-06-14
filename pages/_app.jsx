import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../hooks/useAuth";
import "../styles/globals.css";
import { Screen } from "../components/Screen";
import { GithubProvider } from "../hooks/useGithub";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <AuthProvider>
        <GithubProvider>
          <Screen>
            <Component {...pageProps} />
            <Toaster position="top-right" reverseOrder={true} />
          </Screen>
        </GithubProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
