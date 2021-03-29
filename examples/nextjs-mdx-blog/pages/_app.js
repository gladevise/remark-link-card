import { ChakraProvider } from '@chakra-ui/react'
import customTheme from '../styles/theme';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
