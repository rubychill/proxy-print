import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './reset.css'
import "@radix-ui/themes/styles.css";
import { Theme } from '@radix-ui/themes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme 
      appearance='dark'
      accentColor='amber'
      grayColor='slate'
    >
      <App />
    </Theme>
  </StrictMode>,
)
