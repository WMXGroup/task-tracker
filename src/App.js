import React from 'react';
import Main from './components/Main';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from "@material-ui/core";
import { teal, indigo } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: indigo[500],
    },
  },

  typography: {

  },
  overrides: {
    MuiAutocomplete: {
      // paper: {
      //   backgroundColor: 'blue'
      // },
      // option: {
      //   backgroundColor: 'green'
      // },
      // listbox: {
      //   backgroundColor: '#bbdefb',
      // }
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
