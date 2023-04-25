import { createTheme, ThemeProvider } from '@mui/material/styles';
import { VacuumPage } from './pages/VacuumPage';
import { CommonColors } from './constants';
import { SnackbarProvider } from 'notistack';

import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: CommonColors.dark,
      contrastText: CommonColors.textLight
    },
    secondary: {
      main: CommonColors.light,
      contrastText: CommonColors.dark
    },
    
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={2}>
        <div className="vacuum-app" data-testid="app">
          <VacuumPage />
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
