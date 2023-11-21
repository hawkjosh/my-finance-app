import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light dark;
    color: hsl(165, 100%, 35%);
    background: hsl(0, 0%, 15%);
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  *::-webkit-scrollbar {
    display: none;
  }

  html {
    height: 100%;
    scrollbar-width: none;

    & body {
      width: 100%;
      height: 100dvh;
      min-width: 20rem;
      max-width: 80rem;
      overflow-x: hidden;
      margin: auto;

      & #root {
        display: flex;
        place-content: center;
      }
    }
  }
`
