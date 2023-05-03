import store from "@/redux/store";
import '../styles/globals.css'
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ToastContainer position="bottom-left" />
      <NextNProgress color="red"></NextNProgress>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
