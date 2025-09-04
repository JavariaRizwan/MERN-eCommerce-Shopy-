// GlobalScrollbar.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Firefox */
 
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(247, 100, 42); 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(247, 100, 42); 
}`;

export default GlobalStyles;
