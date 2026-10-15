import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_USERS, INITIAL_PROJECTS } from '../constants/mockData';

/** @typedef {import('../interfaces/User').User} User */
/** @typedef {import('../interfaces/Project').Project} Project */

export const Register = ({ onLogin }) => {
  const [searchParams] = useSearchParams();
  const { inviteToken } = useParams();
  const inviteId = inviteToken || searchParams.get('invite');
  
  /** @type {User[]} */
  const [kayitliKullanicilar, setKayitliKullanicilar] = useLocalStorage('app_users', INITIAL_USERS);
  /** @type {Project[]} */
  const [projects, setProjects] = useLocalStorage('app_projects', INITIAL_PROJECTS);
  
  const [adSoyad, setAdSoyad] = useState('');
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [sifre, setSifre] = useState('');
  const [sifreTekrar, setSifreTekrar] = useState('');
  
  // Şifre görünürlük durumları
  const [sifreGoster, setSifreGoster] = useState(false);
  const [sifreTekrarGoster, setSifreTekrarGoster] = useState(false);
  
  // Davet ile gelindiyse rol otomatik 'kullanici' olur
  const [rol, setRol] = useState(inviteId ? 'kullanici' : 'kullanici');
  const [hata, setHata] = useState('');
  
  const navigate = useNavigate();

  const invitedProject = inviteId
    ? projects.find((project) => project.davet_kodu === inviteId || String(project.id) === inviteId)
    : null;

  const handleRegister = (e) => {
    e.preventDefault();
    setHata('');

    if (inviteToken && !invitedProject) {
      return setHata('Davet bağlantısı geçersiz veya bu tarayıcıda projeye erişilemiyor. Proje yöneticisinden yeni bir bağlantı isteyin.');
    }

    if (sifre !== sifreTekrar) {
      return setHata('Şifreler birbiriyle uyuşmuyor!');
    }

    const cleanUsername = kullaniciAdi.trim().toLowerCase();

    if (kayitliKullanicilar.some(u => u.kullanici_adi.toLowerCase() === cleanUsername)) {
      return setHata('Bu kullanıcı adı zaten alınmış!');
    }

    const yeniKullanici = {
      id: Date.now(),
      ad_soyad: adSoyad.trim(),
      kullanici_adi: cleanUsername,
      sifre: sifre,
      rol: rol
    };

    // 1. Kullanıcıyı Kaydet
    setKayitliKullanicilar([...kayitliKullanicilar, yeniKullanici]);

    // 2. Davet linki varsa Projeye Ekle
    if (invitedProject) {
      const updatedProjects = projects.map(p => {
        if (p.id === invitedProject.id) {
          const mevcutUyeler = p.ekip_uyeleri || [];
          if (!mevcutUyeler.some((memberId) => Number(memberId) === Number(yeniKullanici.id))) {
            return { ...p, ekip_uyeleri: [...mevcutUyeler, yeniKullanici.id] };
          }
        }
        return p;
      });
      setProjects(updatedProjects);
    }
    
    // Otomatik Giriş Yap ve Dashboard'a Yönlendir
    onLogin(yeniKullanici);
    navigate('/dashboard');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex flex-col items-center justify-center p-4 font-sans"
      style={{ backgroundImage: "url('/bg-login.jpeg')" }} 
    >
      {/* Arka plan karartma ve blur katmanı */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-0"></div>

      {/* İçerik Konteyneri */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <Link to="/" className="mb-6 flex items-center gap-2 text-slate-200 hover:text-white transition-colors font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Ana Sayfaya Dön
        </Link>

        <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white/95 p-7 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Hesap Oluştur</h1>
            <p className="text-slate-500 text-sm">GörevRotası'na katılın</p>
          </div>

          {inviteToken && !invitedProject && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-sm text-amber-800">
              Davet bağlantısı geçersiz veya bu tarayıcıda projeye erişilemiyor. Proje yöneticisinden yeni bir bağlantı isteyin.
            </div>
          )}

          {invitedProject && (
            <div className="mb-6 p-4 bg-indigo-50/80 border border-indigo-100 rounded-xl text-center">
              <span className="block text-indigo-800 font-bold text-sm mb-1">🎉 Ekibe Davet Edildiniz!</span>
              <span className="block text-indigo-600/90 text-xs leading-relaxed">
                Kayıt olduğunuz an <strong>{invitedProject.proje_adi}</strong> projesine dahil edileceksiniz.
              </span>
            </div>
          )}

          {hata && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-xl text-sm text-center border border-red-100 font-medium">
              {hata}
            </div>
          )}

          {!invitedProject && (
            <div className="flex p-1 bg-slate-100/80 rounded-xl mb-6">
              <button 
                type="button" 
                onClick={() => setRol('kullanici')} 
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${rol === 'kullanici' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Kullanıcı Hesabı
              </button>
              <button 
                type="button" 
                onClick={() => setRol('yonetici')} 
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${rol === 'yonetici' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Yönetici Hesabı
              </button>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Ad Soyad</label>
              <input 
                type="text" 
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 outline-none transition-all focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                value={adSoyad} 
                onChange={(e) => setAdSoyad(e.target.value)} 
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                placeholder="Örn: Hakan Yılmaz" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Kullanıcı Adı</label>
              <input 
                type="text" 
                required 
                value={kullaniciAdi} 
                onChange={(e) => setKullaniciAdi(e.target.value)} 
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                placeholder="Örn: hakanyilmaz" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Şifre</label>
                <div className="relative">
                  <input 
                    type={sifreGoster ? "text" : "password"} 
                    required 
                    value={sifre} 
                    onChange={(e) => setSifre(e.target.value)} 
                    placeholder="••••••" 
                  />
                  <button
                    type="button"
                    onClick={() => setSifreGoster(!sifreGoster)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {sifreGoster ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.003 10.003 0 015.122 1.936M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 3a10.02 10.02 0 01-2.583 3.518M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Şifre (Tekrar)</label>
                <div className="relative">
                  <input 
                    type={sifreTekrarGoster ? "text" : "password"} 
                    required 
                    value={sifreTekrar} 
                    onChange={(e) => setSifreTekrar(e.target.value)} 
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 outline-none transition-all focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
                    placeholder="••••••" 
                  />
                  <button
                    type="button"
                    onClick={() => setSifreTekrarGoster(!sifreTekrarGoster)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {sifreTekrarGoster ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.003 10.003 0 015.122 1.936M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 3a10.02 10.02 0 01-2.583 3.518M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="mt-2 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-md shadow-indigo-600/15 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
            >
              {invitedProject ? "Projeye Katıl ve Kayıt Ol" : "Kayıt Ol"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6 font-medium">
            Zaten hesabınız var mı? <Link to={inviteToken ? `/davet/${encodeURIComponent(inviteToken)}` : `/login${inviteId ? `?invite=${encodeURIComponent(inviteId)}` : ''}`} className="text-indigo-600 font-bold hover:underline">Giriş Yap</Link>
          </p>
        </div>
      </div>
    </div>
  );
};