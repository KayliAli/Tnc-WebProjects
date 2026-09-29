import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_USERS } from '../constants/mockData';

export const Login = ({ onLogin }) => {
  // Sistemi kontrol edeceğimiz kayıtlı kullanıcılar listesi
  const [kayitliKullanicilar] = useLocalStorage('app_users', INITIAL_USERS);
  
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [sifre, setSifre] = useState('');
  const [hata, setHata] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setHata('');
    
    // 1. Yazılan kullanıcı adı ve şifreye sahip biri var mı bul
    const eslesenKullanici = kayitliKullanicilar.find(
      (u) => u.kullanici_adi === kullaniciAdi && u.sifre === sifre
    );

    if (eslesenKullanici) {
      // 2. Varsa giriş yap
      onLogin(eslesenKullanici);
      navigate('/dashboard');
    } else {
      // 3. Yoksa hata ver
      setHata('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <Link to="/" className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Ana Sayfaya Dön
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 max-w-md w-full border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">GörevRotası</h1>
          <p className="text-slate-500">Çalışma alanınıza giriş yapın</p>
        </div>

        {hata && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-xl text-sm text-center border border-red-100 font-medium">
            {hata}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Kullanıcı Adı</label>
            <input
              type="text"
              value={kullaniciAdi}
              onChange={(e) => setKullaniciAdi(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-slate-50 hover:bg-white focus:bg-white"
              placeholder="Kullanıcı adınızı giriniz"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Şifre</label>
            <input
              type="password"
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-slate-50 hover:bg-white focus:bg-white"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg mt-2">
            Giriş Yap
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Hesabınız yok mu? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
};