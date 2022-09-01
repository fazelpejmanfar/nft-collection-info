import Layout from '../components/Layout'
import '../styles/globals.css'
import Header from '../components/Header'


function MyApp({ Component, pageProps }) {
  return (
    <>
          <Header/>
   <Layout>
   <Component {...pageProps} />
    </Layout>
    </>
    )
}

export default MyApp
