import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import App from './App'

const theme = extendTheme({
  fonts: {
    heading: "Montserrat, sans-serif",
    body: "Montserrat, sans-serif",
  },
  colors: {
    brand: {
      primary: "#0D677C",
      primaryTint: "#5594a3",
      secondary: "#4FB1FE",
      secondaryTint: "#83c8fe",
      blue: "#35488B",
      blueTint: "#717ead",
      grey: "#F5F5F5",
      darkgrey: "#EAEAEA",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
