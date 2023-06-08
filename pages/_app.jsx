import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../hooks/useAuth";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
        <Toaster position="top-right" reverseOrder={true} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
