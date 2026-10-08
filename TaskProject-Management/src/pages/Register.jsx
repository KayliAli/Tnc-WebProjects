import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_USERS, INITIAL_PROJECTS } from '../constants/mockData';

export const Register = ({ onLogin }) => {
  const [searchParams] = useSearchParams();
  const inviteId = searchParams.get('invite');
  
  const [kayitliKullanicilar, setKayitliKullanicilar] = useLocalStorage('app_users', INITIAL_USERS);
  const [projects, setProjects] = useLocalStorage('app_projects', INITIAL_PROJECTS);
  
  const [adSoyad, setAdSoyad] = useState('');
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [sifre, setSifre] = useState('');
  const [sifreTekrar, setSifreTekrar] = useState('');
  
  // Davet ile gelindiyse rol otomatik 'kullanici' olur
  const [rol, setRol] = useState(inviteId ? 'kullanici' : 'kullanici');
  const [hata, setHata] = useState('');
  
  const navigate = useNavigate();

  const invitedProject = inviteId ? projects.find(p => p.id === Number(inviteId)) : null;

  const handleRegister = (e) => {
    e.preventDefault();
    setHata('');

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
          if (!mevcutUyeler.includes(yeniKullanici.id)) {
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      <Link to="/" className="mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Ana Sayfaya Dön
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 max-w-md w-full border border-slate-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Hesap Oluştur</h1>
          <p className="text-slate-500 text-sm">GörevRotası'na katılın</p>
        </div>

        {invitedProject && (
          <div className="mb-6 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl text-center">
            <span className="block text-indigo-800 font-bold text-sm mb-1">🎉 Ekibe Davet Edildiniz!</span>
            <span className="block text-indigo-600/80 text-xs leading-relaxed">
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
              value={adSoyad} 
              onChange={(e) => setAdSoyad(e.target.value)} 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white" 
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
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white" 
              placeholder="Örn: hakanyilmaz" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Şifre</label>
              <input 
                type="password" 
                required 
                value={sifre} 
                onChange={(e) => setSifre(e.target.value)} 
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white" 
                placeholder="••••••" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Şifre (Tekrar)</label>
              <input 
                type="password" 
                required 
                value={sifreTekrar} 
                onChange={(e) => setSifreTekrar(e.target.value)} 
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white" 
                placeholder="••••••" 
              />
            </div>
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg mt-2"
          >
            {invitedProject ? "Projeye Katıl ve Kayıt Ol" : "Kayıt Ol"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6 font-medium">
          Zaten hesabınız var mı? <Link to={`/login${inviteId ? `?invite=${inviteId}` : ''}`} className="text-indigo-600 font-bold hover:underline">Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
};