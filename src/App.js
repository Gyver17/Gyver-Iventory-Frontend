import './App.css';
import './Icons/style.css'
import AuthProvider from './context/authProvider';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
