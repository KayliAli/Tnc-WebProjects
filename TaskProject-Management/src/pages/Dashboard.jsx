import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_PROJECTS, INITIAL_USERS } from '../constants/mockData';

export const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [user] = useLocalStorage('app_session', null);
  const [projects] = useLocalStorage('app_projects', INITIAL_PROJECTS);
  const [users] = useLocalStorage('app_users', INITIAL_USERS);

  // --- YÖNETİCİ ARAYÜZÜ OLUŞTURUCU ---
  const renderAdminView = () => {
    // Verilerin yüklenmesini beklerken hata almamak için güvenlik kontrolü
    if (!projects || !users) return <div className="p-8">Yükleniyor...</div>;

    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Tüm Projeler</h2>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
            + Yeni Proje
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div 
              key={project.id} 
              onClick={() => navigate(`/proje/${project.id}`)}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{project.proje_adi}</h3>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${project.durum === 'devam_ediyor' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'}`}>
                  {project.durum === 'devam_ediyor' ? 'Aktif' : 'Beklemede'}
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2">{project.aciklama}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex -space-x-2">
                  {/* Projeye atanmış ekibin avatarları */}
                  {project.ekip_uyeleri && project.ekip_uyeleri.map(uyeId => {
                    const uye = users.find(u => u.id === uyeId);
                    return (
                      <div key={uyeId} title={uye?.ad_soyad} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">
                        {uye?.ad_soyad?.charAt(0) || '?'}
                      </div>
                    );
                  })}
                </div>
                <span className="text-indigo-600 text-sm font-medium">Yönet →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- KULLANICI ARAYÜZÜ OLUŞTURUCU ---
  const renderEmployeeView = () => (
    <div className="p-8 flex items-center justify-center h-full">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Çalışan Paneli</h2>
        <p className="text-slate-500">Burada sadece sizin dahil olduğunuz projeler ve size atanan görevler listelenecek.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex-col hidden md:flex">
        <div className="p-6">
          <h2 className="text-white text-2xl font-bold tracking-tight">GörevRotası</h2>
          <p className="text-xs text-indigo-400 mt-1">Oturum: {user?.ad_soyad || 'Bilinmiyor'}</p>
        </div>
        <nav className="mt-2 flex-1">
          <a href="#" className="block px-6 py-3 bg-indigo-600 text-white font-medium">Projeler</a>
          {user?.rol === 'yonetici' && (
            <a href="#" className="block px-6 py-3 hover:bg-slate-800 transition-colors">Ekip Yönetimi</a>
          )}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={onLogout} className="w-full py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            Çıkış Yap
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen">
        <header className="bg-white shadow-sm border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-bold text-slate-800">
            {user?.rol === 'yonetici' ? 'Yönetici Paneli' : 'Çalışma Alanım'}
          </h1>
        </header>

        {/* Bileşen olarak değil, düz fonksiyon olarak çağırıyoruz */}
        {user?.rol === 'yonetici' ? renderAdminView() : renderEmployeeView()}
        
      </main>
    </div>
  );
};