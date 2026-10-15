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
  const [sifreGoster, setSifreGoster] = useState(false);
  const [hata, setHata] = useState('');
  
  const navigate = useNavigate();

  const invitedProject = inviteId ? projects.find(p => p.id === Number(inviteId)) : null;

  const handleLogin = (e) => {
    e.preventDefault();
    setHata('');
    
    const cleanUsername = kullaniciAdi.trim().toLowerCase();

    const eslesenKullanici = kayitliKullanicilar.find(
      u => u.kullanici_adi.toLowerCase() === cleanUsername && u.sifre === sifre
    );

    if (eslesenKullanici) {
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
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex flex-col items-center justify-center p-4 font-sans"
      style={{ backgroundImage: "url('/bg-login.jpeg')" }} // Resim yolunu değiştirebilirsiniz
    >
      {/* Arka plan resminin üzerine karartma ve blurlama katmanı */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-0"></div>

      {/* İçerik Konteyneri */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <Link to="/" className="mb-8 flex items-center gap-2 text-slate-200 hover:text-white transition-colors font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Ana Sayfaya Dön
        </Link>

        <div className="bg-white/95 backdrop-blur p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">GörevRotası</h1>
            <p className="text-slate-500">Çalışma alanınıza giriş yapın</p>
          </div>

          {invitedProject && (
            <div className="mb-6 p-4 bg-indigo-50/80 border border-indigo-100 rounded-xl text-center">
              <span className="block text-indigo-800 font-bold text-sm mb-1">🎉 Ekibe Davet Edildiniz!</span>
              <span className="block text-indigo-600/90 text-xs leading-relaxed">
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
              <div className="relative">
                <input 
                  type={sifreGoster ? "text" : "password"} 
                  value={sifre} 
                  onChange={(e) => setSifre(e.target.value)} 
                  className="w-full px-4 py-3 pr-11 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white" 
                  placeholder="••••••••"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setSifreGoster(!sifreGoster)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
                >
                  {sifreGoster ? (
                    /* Şifre Gizle (Göz Kapalı) */
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.003 10.003 0 015.122 1.936M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 3a10.02 10.02 0 01-2.583 3.518M3 3l18 18" />
                    </svg>
                  ) : (
                    /* Şifre Göster (Göz Açık) */
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
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
    </div>
  );
};