import '@babel/polyfill';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from 'client/page/global/app/App';

// render
const root = createRoot(document.getElementById('main'));
root.render(<App />);
