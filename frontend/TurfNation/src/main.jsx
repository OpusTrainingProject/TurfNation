import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "linear-gradient(135deg, #16a34a, #22c55e)",
                color: "#fff",
                fontWeight: "600",
                borderRadius: "12px",
                boxShadow: "0 0 25px rgba(34,197,94,0.4)",
              },
              success: {
                iconTheme: {
                  primary: "#fff",
                  secondary: "#16a34a",
                },
              },
            }}
          />
    <App />
    </BrowserRouter>
  </StrictMode>,
)
