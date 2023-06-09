import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../hooks/useAuth";
import "../styles/globals.css";
import { Screen } from "../components/Screen";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <AuthProvider>
        <Screen>
          <Component {...pageProps} />
          <Toaster position="top-right" reverseOrder={true} />
        </Screen>
      </AuthProvider>
    </>
  );
}

export default MyApp;
