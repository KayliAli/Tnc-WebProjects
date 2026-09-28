import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = ({ onLogin }) => {
  // Sadece ad soyad almamız yeterli, şifreye gerek yok
  const [adSoyad, setAdSoyad] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Doğrulama yok! Adı girildiyse direkt LocalStorage'a kaydet ve içeri al.
    if (adSoyad.trim() !== '') {
      const userData = { 
        id: crypto.randomUUID(), 
        name: adSoyad, 
        role: 'admin' 
      };
      onLogin(userData);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      {/* Ana Sayfaya Dön Butonu */}
      <Link 
        to="/" 
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Ana Sayfaya Dön
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">ProjeYönet</h1>
          <p className="text-gray-500">Çalışma alanınıza giriş yapın</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adınız Soyadınız</label>
            <input
              type="text"
              value={adSoyad}
              onChange={(e) => setAdSoyad(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="Örn: Hakan Yılmaz"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition-colors mt-2"
          >
            Çalışma Alanına Git
          </button>
        </form>
      </div>
    </div>
  );
};