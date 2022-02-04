import './App.css';
import './assets/Icons/style.css'
import AuthProvider from './context/authProvider';
import AppRouter from './routes/AppRouter';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
