
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Import the store

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <ThemeProvider>
    <App />
    </ThemeProvider>

    </Provider>,
  
)
