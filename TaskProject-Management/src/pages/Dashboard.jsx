import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAdminService } from '../services/AdminService';

// İki yeni componentimizi import ediyoruz
import { AdminView } from '../components/AdminView';
import { EmployeeView } from '../components/EmployeeView';

/** @typedef {import('../interfaces/User').User} User */

/** @param {{ onLogout: () => void }} props */
export const Dashboard = ({ onLogout }) => {
  /** @type {User | null} */
  const [user] = useLocalStorage('app_session', null);
  const { projects, users, createProject, updateProject, deleteProject } = useAdminService();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen overflow-hidden bg-transparent font-sans">
      
      {/* MOBİL İÇİN ARKA PLAN KARARTMASI */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* SOL MENÜ */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col bg-gradient-to-b from-slate-950 to-slate-900 text-slate-300 shadow-2xl shadow-slate-950/10 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-lg font-black text-white shadow-lg shadow-indigo-950/30">G</div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">GörevRotası</h2>
              <p className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-indigo-300">Çalışma alanı</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white md:hidden" aria-label="Menüyü kapat">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="mx-4 mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-400/15 text-sm font-bold text-indigo-200 ring-1 ring-inset ring-indigo-300/20">
              {user?.ad_soyad?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{user?.ad_soyad || 'Bilinmiyor'}</p>
              <p className="text-xs text-slate-400">{user?.rol === 'yonetici' ? 'Yönetici' : 'Çalışan'}</p>
            </div>
          </div>
          <p className="mt-3 border-t border-white/10 pt-2 text-[11px] text-slate-500">Oturum açık</p>
        </div>

        <nav className="mt-6 flex-1 px-3">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Menü</p>
          <Link to="/dashboard" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 rounded-xl bg-indigo-500/15 px-3 py-2.5 text-sm font-semibold text-indigo-100 ring-1 ring-inset ring-indigo-400/20">
            <svg className="h-4 w-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 10.5L12 3l9 7.5M5.5 9v11h13V9M9 20v-6h6v6" /></svg>
            Ana Sayfa
          </Link>
          {user?.rol === 'yonetici' && (
            <div className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.4-1.8M17 20H7m10 0v-2c0-.7-.1-1.3-.4-1.9M7 20H2v-2a3 3 0 015.4-1.8M7 20v-2c0-.7.1-1.3.4-1.9m0 0a5 5 0 019.2 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Ekip Yönetimi
              <span className="ml-auto rounded-md bg-white/5 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-slate-500">Yakında</span>
            </div>
          )}
        </nav>

        <div className="p-4">
          <button onClick={onLogout} className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-200">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3H9m0 0l3-3m-3 3l3 3" /></svg>
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* SAĞ İÇERİK ALANI */}
      <main className="flex-1 overflow-y-auto h-screen w-full">
        <header className="sticky top-0 z-10 flex items-center border-b border-slate-200/70 bg-white/85 px-4 py-3 shadow-sm shadow-slate-900/[0.02] backdrop-blur-xl md:px-8 md:py-4">
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="mr-4 rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm hover:border-indigo-200 hover:text-indigo-600 md:hidden"
            aria-label="Menüyü aç"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-800 md:text-xl">
              {user?.rol === 'yonetici' ? 'Yönetici Paneli' : 'Çalışma Alanım'}
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">Projelerinizi ve görevlerinizi tek yerden takip edin.</p>
          </div>
        </header>

        {/* EĞER KULLANICI YÖNETİCİ İSE ADMIN VIEW, DEĞİLSE EMPLOYEE VIEW GÖSTER */}
        {user?.rol === 'yonetici' ? (
           <AdminView
             projects={projects}
             users={users}
             onCreateProject={createProject}
             onUpdateProject={updateProject}
             onDeleteProject={deleteProject}
             currentUser={user}
           />
        ) : (
           <EmployeeView user={user} />
        )}
        
      </main>
    </div>
  );
};