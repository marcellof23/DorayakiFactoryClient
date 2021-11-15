import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import App from './App'
import "antd/dist/antd.css"
import "./App.scss"

const theme = extendTheme({
  fonts: {
    heading: "Playfair Display, Nunito Sans, sans-serif",
    body: "Nunito Sans, sans-serif",
  },
  colors: {
    brand: {
      primary: "#546B5C",
      primaryFade: "#92AC97",
      secondary: "#573524",
      secondaryFade: "#887863",
      dark: "#12130F",
      midBlack: "#555555",
      white: "#F3F4F3",
      midWhite: "#EAEAEA",
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
