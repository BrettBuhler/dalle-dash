import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppProvider } from './components/AppContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Router>
        <React.StrictMode>
            <AppProvider>
                <App />
            </AppProvider>
        </React.StrictMode>
    </Router>
)
