import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/tooltip.jsx';


createRoot(document.getElementById('root')).render(
    <TooltipProvider>
  <Toaster position="top-right" richColors closeButton />
    <App />
    </TooltipProvider>
)
