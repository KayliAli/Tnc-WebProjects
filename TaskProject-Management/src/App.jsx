import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';

function App() {
  // Oturum bilgisi LocalStorage'da 'app_session' olarak tutuluyor
  const [user, setUser] = useLocalStorage('app_session', null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={setUser} />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/dashboard" replace /> : <Register onLogin={setUser} />} 
        />
        
        {/* : Çıkış yapıldığında  (Ana Sayfa) adresine yönlendirir */}
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard onLogout={() => setUser(null)} /> : <Navigate to="/" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;