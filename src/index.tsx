import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';

const elem = document.getElementById('root');
if (!elem) throw new Error('No root element');
ReactDOM.createRoot(elem).render(<App />);