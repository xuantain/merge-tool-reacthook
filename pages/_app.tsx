import App from 'next/app';
import { withMuiApp } from '~/frontend/hocs/withMui';
import withRedux from '~/frontend/hocs/withRedux';

class MyApp extends App {
  public static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }
}

export default withRedux(withMuiApp(MyApp));
