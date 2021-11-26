import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import App from './App'
import "antd/dist/antd.css"
import "./App.scss"
import { UserProvider } from './context/UserContext'
import ContainerStyle from "./styles/containerstyle";
import HeadingStyle from "./styles/headingstyle";
import TableStyle from "./styles/tablestyle";

const theme = extendTheme({
	components: {
		Container: ContainerStyle,
		Heading: HeadingStyle,
		Table: TableStyle,
	},
	fonts: {
		heading: "Playfair Display, Nunito Sans, sans-serif",
		body: "Nunito Sans, sans-serif",
	},
	fontSizes: {
		h1: "42px",
		h2: "34px",
		h3: "28px",
		h4: "22px",
		h5: "18px",
		p: "14px",
		small: "12px",
	},
	colors: {
		brand: {
			primary: "#546B5C",
			primaryFade: "#92AC97",
			secondary: "#573524",
			secondaryFade: "#887863",
			dark: "#12130F",
			midDark: "#555555",
			white: "#F3F4F3",
			midWhite: "#EAEAEA",
			gray: "#EDF2F7",
		},
	},
	space: {
		small: "10px",
		medium: "20px",
		large: "40px",
		xlarge: "80px",
	},
	radii: {
		small: "8px",
		medium: "16px",
		large: "32px",
	},
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <App />
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
