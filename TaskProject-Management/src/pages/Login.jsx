import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_USERS, INITIAL_PROJECTS } from '../constants/mockData';

export const Login = ({ onLogin }) => {
  const [searchParams] = useSearchParams();
  const inviteId = searchParams.get('invite');

  const [kayitliKullanicilar] = useLocalStorage('app_users', INITIAL_USERS);
  const [projects, setProjects] = useLocalStorage('app_projects', INITIAL_PROJECTS);
  
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [sifre, setSifre] = useState('');
  const [hata, setHata] = useState('');
  
  const navigate = useNavigate();

  const invitedProject = inviteId ? projects.find(p => p.id === Number(inviteId)) : null;

  const handleLogin = (e) => {
    e.preventDefault();
    setHata('');
    
    const eslesenKullanici = kayitliKullanicilar.find(
      u => u.kullanici_adi === kullaniciAdi && u.sifre === sifre
    );

    if (eslesenKullanici) {
      
      // Davet linki ile gelindiyse ve kullanıcı henüz o projede yoksa, projeye ekle
      if (invitedProject) {
        if (!invitedProject.ekip_uyeleri.includes(eslesenKullanici.id)) {
          const updatedProjects = projects.map(p => {
            if (p.id === invitedProject.id) {
              return { ...p, ekip_uyeleri: [...p.ekip_uyeleri, eslesenKullanici.id] };
            }
            return p;
          });
          setProjects(updatedProjects);
        }
      }

      onLogin(eslesenKullanici);
      navigate('/dashboard');
    } else {
      setHata('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      <Link to="/" className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Ana Sayfaya Dön
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 max-w-md w-full border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">GörevRotası</h1>
          <p className="text-slate-500">Çalışma alanınıza giriş yapın</p>
        </div>

        {invitedProject && (
          <div className="mb-6 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl text-center">
            <span className="block text-indigo-800 font-bold text-sm mb-1">🎉 Ekibe Davet Edildiniz!</span>
            <span className="block text-indigo-600/80 text-xs leading-relaxed">
              Giriş yaptığınızda <strong>{invitedProject.proje_adi}</strong> projesine dahil edileceksiniz.
            </span>
          </div>
        )}

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
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white" 
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
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white" 
              placeholder="••••••••"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg mt-2"
          >
            {invitedProject ? "Projeye Katıl ve Giriş Yap" : "Giriş Yap"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6 font-medium">
          Hesabınız yok mu? <Link to={`/register${inviteId ? `?invite=${inviteId}` : ''}`} className="text-indigo-600 font-bold hover:underline">Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
};