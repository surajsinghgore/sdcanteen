import '../styles/globals.css'
import {Provider} from './context/AllContext';



function MyApp({ Component, pageProps }) {
  return(<Provider><Component {...pageProps} /></Provider>)
}

export default MyApp
