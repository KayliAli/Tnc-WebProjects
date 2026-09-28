import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Register = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Basit bir kayıt işlemi simülasyonu
    const newUser = { email, name, role: 'user' };
    onLogin(newUser); // Oturumu başlat
    navigate('/dashboard'); // Dashboard'a gönder
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">Aramıza Katıl</h1>
          <p className="text-gray-500">Yeni bir hesap oluşturun</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Hakan Yılmaz"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta Adresi</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="ornek@sirket.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              required minLength="6"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition-colors mt-2"
          >
            Kayıt Ol
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Zaten hesabınız var mı?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
};