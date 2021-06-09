import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ColorModeScript } from '@chakra-ui/react';

import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
