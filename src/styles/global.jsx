import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root{
    --bg: #f3f4f6;
    --card: #ffffff;
    --muted: #6b7280;
    --primary: #0ea5e9;
    --accent: #10b981;
    --card-shadow: 0 6px 18px rgba(15,23,42,0.08);
  }

  *{ box-sizing: border-box; }
  html,body,#root { height: 100%; }
  body {
    margin: 0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: var(--bg);
    color: #0f172a;
  }

  a { color: inherit; text-decoration: none; }
`;
