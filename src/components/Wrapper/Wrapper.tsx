import React from 'react';
import {ThemeProvider} from '@gravity-ui/uikit';

import './Wrapper.scss';

const DARK = 'dark';
const DEFAULT_THEME = DARK;

export const DEFAULT_BODY_CLASSNAME = `g-root g-root_theme_${DEFAULT_THEME}`;

export type AppProps = {
    children: React.ReactNode;
};

export const Wrapper: React.FC<AppProps> = () => {
    return (
        <ThemeProvider>
            <div className={'wrapper'}>ksjd;asjkd</div>
        </ThemeProvider>
    );
};
