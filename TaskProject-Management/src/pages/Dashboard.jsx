import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_PROJECTS, INITIAL_USERS } from '../constants/mockData';

export const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [user] = useLocalStorage('app_session', null);
  const [projects] = useLocalStorage('app_projects', INITIAL_PROJECTS);
  const [users] = useLocalStorage('app_users', INITIAL_USERS);
  
  // YENİ: Mobilde sol menüyü açıp kapatmak için state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderAdminView = () => {
    if (!projects || !users) return <div className="p-4 md:p-8">Yükleniyor...</div>;

    return (
      <div className="p-4 md:p-8">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Tüm Projeler</h2>
          <button className="bg-indigo-600 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
            + Yeni Proje
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div 
              key={project.id} 
              onClick={() => navigate(`/proje/${project.id}`)}
              className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{project.proje_adi}</h3>
                <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold border uppercase tracking-wider ${project.durum === 'devam_ediyor' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'}`}>
                  {project.durum === 'devam_ediyor' ? 'Aktif' : 'Beklemede'}
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2">{project.aciklama}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <div className="flex -space-x-2">
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

  const renderEmployeeView = () => (
    <div className="p-4 md:p-8 flex items-center justify-center h-[70vh]">
      <div className="text-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm max-w-sm w-full">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Çalışan Paneli</h2>
        <p className="text-slate-500 text-sm">Burada sadece sizin dahil olduğunuz projeler ve size atanan görevler listelenecek.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans overflow-hidden">
      
      {/* MOBİL İÇİN ARKA PLAN KARARTMASI */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* SOL MENÜ (RESPONSIVE) */}
      <aside className={`
        w-64 bg-slate-900 text-slate-300 flex-col fixed inset-y-0 left-0 z-50 
        transform transition-transform duration-300 ease-in-out flex
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex justify-between items-center">
          <div>
            <h2 className="text-white text-2xl font-bold tracking-tight">GörevRotası</h2>
            <p className="text-xs text-indigo-400 mt-1">Oturum: {user?.ad_soyad || 'Bilinmiyor'}</p>
          </div>
          {/* Mobilde menüyü kapatma butonu (X) */}
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <nav className="mt-2 flex-1">
          <a href="#" className="block px-6 py-3 bg-indigo-600 text-white font-medium">Projeler</a>
          {user?.rol === 'yonetici' && (
            <a href="#" className="block px-6 py-3 hover:bg-slate-800 transition-colors">Ekip Yönetimi</a>
          )}
        </nav>

        {/* ÇIKIŞ YAP BUTONU HER ZAMAN MENÜNÜN ALTINDA */}
        <div className="p-4 border-t border-slate-800">
          <button onClick={onLogout} className="w-full py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-center">
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* SAĞ İÇERİK ALANI */}
      <main className="flex-1 overflow-y-auto h-screen w-full">
        <header className="bg-white shadow-sm border-b border-gray-100 px-4 md:px-8 py-3 md:py-4 flex items-center sticky top-0 z-10">
          
          {/* MOBİLDE MENÜYÜ AÇAN HAMBURGER İKONU */}
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="md:hidden mr-4 text-slate-600 hover:text-indigo-600 transition-colors bg-slate-50 p-2 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <h1 className="text-lg md:text-xl font-bold text-slate-800">
            {user?.rol === 'yonetici' ? 'Yönetici Paneli' : 'Çalışma Alanım'}
          </h1>
        </header>

        {user?.rol === 'yonetici' ? renderAdminView() : renderEmployeeView()}
        
      </main>
    </div>
  );
};