import React from 'react';
import ReactDOM from 'react-dom/client';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import '@/styles/globals.scss';
import '@/styles/theme.css';
import App from '@/App';
import {AppContextProvider} from '@/context/useContext';
import {ThemeProvider, Toaster, ToasterComponent, ToasterProvider} from '@gravity-ui/uikit';

const toaster = new Toaster();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={'dark'}>
            <AppContextProvider>
                <ToasterProvider toaster={toaster}>
                    <App />
                    <ToasterComponent className="optional additional classes" />
                </ToasterProvider>
            </AppContextProvider>
        </ThemeProvider>
    </React.StrictMode>,
);
