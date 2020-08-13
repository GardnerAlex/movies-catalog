import React from 'react';
import { render } from 'react-dom';
// import './index.css';
import { App } from './components/App/App';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  render(<App />, root);
});
