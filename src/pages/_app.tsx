import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import "../styles/globals.scss";

const options: typeof SWRConfig.defaultProps.value = {
  errorRetryCount: 1,
  revalidateOnFocus: false,
  revalidateOnMount: false,
};

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={options}>
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
};

export default App;
