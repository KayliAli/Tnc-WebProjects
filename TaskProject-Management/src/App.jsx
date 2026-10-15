import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { ProjectDetail } from './pages/ProjectDetail'; // BNU EKLEDİK
import { InviteRoute } from './pages/InviteRoute';

/** @typedef {import('./interfaces/User').User} User */

function App() {
  /** @type {[User | null, (user: User | null) => void]} */
  const [user, setUser] = useLocalStorage('app_session', null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register onLogin={setUser} />} />
        <Route path="/davet/:inviteToken" element={<InviteRoute user={user} onLogin={setUser} />} />
        <Route path="/davet/:inviteToken/kayit" element={user ? <Navigate to="/dashboard" replace /> : <Register onLogin={setUser} />} />
        
        <Route path="/dashboard" element={user ? <Dashboard onLogout={() => setUser(null)} /> : <Navigate to="/login" replace />} />
        
        <Route path="/proje/:id" element={user ? <ProjectDetail /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;