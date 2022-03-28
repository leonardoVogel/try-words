import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #036b52;
    --verde-escuro: #036b52;
    --verde-claro: #2fc18c;
    --roxo-escuro: #41197f;
    --roxo-claro: #8958a3;
    --azul-escuro: #006dfb;
    --azul-claro: #00d5e2;
    --branco: #ffffff;
    --cinza1: #e1e5eb;
    --cinza2: #444955;
    --cinza3: #1a1b1c;
    --wrong: #dc2525
    --right: #2fc18c
    --displaced: #facc15
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    --webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Mukta', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    filter: brightness(0.6);
    cursor: default;
  }
`;
