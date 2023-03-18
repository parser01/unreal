import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import App from "./components/App";

const GlobalStyle = createGlobalStyle`
   * {
      padding: 0;
      margin: 0;
      border: 0; 
   }
   
   *, 
   *::before, 
   *::after {
      box-sizing: border-box; 
   }
   
   :focus, 
   :active {
      outline: none; 
   }
   
   a:focus, 
   a:active {
      outline: none; 
   }
   
   header, 
   nav, 
   main, 
   section, 
   aside, 
   footer, 
   article, 
   figure {
      display: block; 
   }

   html {
      background: #000;
   }
   
   html, 
   body {
      width: 100%;
      height: 100%;
      font-size: 100%;
      line-height: 1;
      font-size: 14px;
      text-size-adjust: 100%;
   }

   a, 
   a:hover,
   a:visited {
      text-decoration: none; 
   }
   
   ul li {
      list-style: none; 
   }
   
   img {
      vertical-align: top; 
      user-select: none;
   }

   button {
      cursor: pointer;
      user-select: none;
   }

   input::placeholder {
		user-select: none;
	}

   body {
      font-family: Arial, Helvetica, sans-serif;
   }

   #root {
      min-height: 100%;
   }
`;

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<>
		<GlobalStyle />
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</>
);
