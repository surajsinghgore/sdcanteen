import React,{useEffect, useState} from 'react'
import '../styles/globals.css'
import {Provider} from '../context/AllContext';
import LoadingBar from "react-top-loading-bar";
import { useRouter } from 'next/router';
import { CartProvider } from "react-use-cart"; 

function MyApp({ Component, pageProps }) {
const router=useRouter();
 const [progress, setProgress] = useState(0);
 
useEffect(()=>{
router.events.on('routeChangeStart',()=>{
setProgress(10)
setProgress(20)
setProgress(30)
setProgress(40)
})
router.events.on('routeChangeComplete',()=>{
setProgress(50)
setProgress(60)
setProgress(70)
setProgress(80)
setProgress(90)
setProgress(100)
})
 // eslint-disable-next-line react-hooks/exhaustive-deps
},[])


  return(
  <>
 <LoadingBar
        color="rgb(255 82 0)"
        height={3.5}
        waitingTime={400}
        progress={progress}
        transitionTime={100}
      />  
<Provider>
<CartProvider>
<Component {...pageProps} />
</CartProvider>
</Provider>
  </>)
}

export default MyApp
