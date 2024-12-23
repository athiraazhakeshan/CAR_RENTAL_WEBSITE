
import { createRoot } from 'react-dom/client'

import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
//import { ThemeProvider } from './components/context/ThemeContext.jsx'
import App from './App.jsx'
import { SearchProvider } from './components/context/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
  <>
  
  <Provider store={store}>
    <SearchProvider>
    <ChakraProvider>
   <App/>
  </ChakraProvider></SearchProvider>
  </Provider>
  </>
)
