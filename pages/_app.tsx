import { AppProps } from "next/app";
import { CacheProvider, EmotionCache, ThemeProvider } from "@emotion/react";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./global.css";
import createEmotionCache from "../theme/createEmotionCache";
import Head from "next/head";
import theme from "../theme/theme";
import { getOrInitializeStore } from "../libs/state";
import { Provider } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "animate.css";

library.add(fas);

const redux_store = getOrInitializeStore();
const clientSideEmotionCache = createEmotionCache();
config.autoAddCss = false;
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
export function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <Provider store={redux_store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default MyApp;
