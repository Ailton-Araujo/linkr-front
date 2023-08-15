import { createGlobalStyle } from "styled-components";
import ResetStyle from "./ResetStyled";

// Font css usage

// font-family: 'Lato', sans-serif;
// font-family: 'Oswald', sans-serif;
// font-family: 'Passion One', cursive;

const GlobalStyle = createGlobalStyle`
  ${ResetStyle}

  * {
    box-sizing: border-box;
  }

  body {
    background-color: #333;
  }


`;

export default GlobalStyle;
