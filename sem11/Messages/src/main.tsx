import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MessagesInfo from './MessagesInfo.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MessagesInfo />
  </StrictMode>,
)
