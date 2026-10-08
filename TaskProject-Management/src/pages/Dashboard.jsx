import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_PROJECTS, INITIAL_USERS } from '../constants/mockData';

// İki yeni componentimizi import ediyoruz
import { AdminView } from '../components/AdminView';
import { EmployeeView } from '../components/EmployeeView';

export const Dashboard = ({ onLogout }) => {
  const [user] = useLocalStorage('app_session', null);
  const [projects] = useLocalStorage('app_projects', INITIAL_PROJECTS);
  const [users] = useLocalStorage('app_users', INITIAL_USERS);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans overflow-hidden">
      
      {/* MOBİL İÇİN ARKA PLAN KARARTMASI */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* SOL MENÜ */}
      <aside className={`w-64 bg-slate-900 text-slate-300 flex-col fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out flex md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center">
          <div>
            <h2 className="text-white text-2xl font-bold tracking-tight">GörevRotası</h2>
            <p className="text-xs text-indigo-400 mt-1">
              Oturum: {user?.ad_soyad || 'Bilinmiyor'} ({user?.rol === 'yonetici' ? 'Yönetici' : 'Çalışan'})
            </p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <nav className="mt-2 flex-1">
          <a href="#" className="block px-6 py-3 bg-indigo-600 text-white font-medium">Ana Sayfa</a>
          {user?.rol === 'yonetici' && (
            <a href="#" className="block px-6 py-3 hover:bg-slate-800 transition-colors">Ekip Yönetimi</a>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={onLogout} className="w-full py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-center">
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* SAĞ İÇERİK ALANI */}
      <main className="flex-1 overflow-y-auto h-screen w-full">
        <header className="bg-white shadow-sm border-b border-gray-100 px-4 md:px-8 py-3 md:py-4 flex items-center sticky top-0 z-10">
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

        {/* EĞER KULLANICI YÖNETİCİ İSE ADMIN VIEW, DEĞİLSE EMPLOYEE VIEW GÖSTER */}
        {user?.rol === 'yonetici' ? (
           <AdminView projects={projects} users={users} />
        ) : (
           <EmployeeView user={user} />
        )}
        
      </main>
    </div>
  );
};