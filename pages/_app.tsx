import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { ThemeProvider } from 'react-jss';

const _App = ({ Component, pageProps }: AppProps) => {
  const initialTheme = {
    background: '#222222',
    text: '#e7f1fe',
  };

  const [theme, setTheme] = useState(initialTheme);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} setTheme={setTheme} />
    </ThemeProvider>
  );
};
export default _App;
