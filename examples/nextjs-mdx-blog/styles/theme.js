// 1. Import the extendTheme util - it will merge with the default theme
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc.
const theme = {
  styles: {
    global: {
      'html, body': {
        scrollBehavior: 'smooth',
      },
      a: {
        color: 'inherit',
        textDecoration: 'none',
      },
      "h1,h2,h3,h4,h5,h6,p": {
        marginBottom: "0.25em",
        marginTop: "0.75em",
      }
    },
  },
  colors: {
    primary: {
      50: '#ddf2ff',
      100: '#aed6ff',
      200: '#7dbaff',
      300: '#4a9fff',
      400: '#1a83ff',
      500: '#006ae6',
      600: '#0052b4',
      700: '#003b82',
      800: '#002351',
      900: '#000d21',
    },
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    heading: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    mono: 'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
  },
  // Add component theme
  components: {
  },
};

// eslint-disable-next-line
export default extendTheme(theme);
