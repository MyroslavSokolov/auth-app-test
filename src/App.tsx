import './App.css';
import AuthForm from './components/AuthForm/AuthForm.tsx';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme.ts';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <AuthForm />
    </ThemeProvider>
  );
}

export default App;
