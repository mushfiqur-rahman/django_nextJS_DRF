import '../styles/globals.css'
import {Manrope} from '@next/font/google'

const manrope = Manrope({
  weight: ['400'],
  })

function MyApp({ Component, pageProps }) {
  return (
    <main className={manrope.className}>
      <Component {...pageProps} />
    </main>
    );
}

export default MyApp
