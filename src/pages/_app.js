import '../styles/globals.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ru from 'dayjs/locale/ru';
dayjs.extend(relativeTime);
dayjs.locale('ru');

function MyApp({Component, pageProps}) {
  return <Component {...pageProps} />;
}

export default MyApp;
