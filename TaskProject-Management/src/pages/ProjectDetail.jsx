import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TaskModal } from '../components/TaskModal';
import { INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_USERS } from '../constants/mockData';

export const ProjectDetail = () => {
  const { id } = useParams();
  
  const [projects] = useLocalStorage('app_projects', INITIAL_PROJECTS);
  const [allTasks, setAllTasks] = useLocalStorage('app_tasks', INITIAL_TASKS);
  const [users] = useLocalStorage('app_users', INITIAL_USERS);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const project = projects.find(p => p.id === Number(id));
  
  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <p className="text-red-500 font-bold text-lg mb-4">Proje bulunamadı!</p>
        <Link to="/dashboard" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium shadow-sm hover:bg-indigo-700 transition-colors">
          Dashboard'a Dön
        </Link>
      </div>
    );
  }

  // Bu projeye ait görevler ve ekip üyeleri
  const projectTasks = allTasks.filter(t => t.proje_id === project.id);
  const projectTeam = users.filter(u => project.ekip_uyeleri?.includes(u.id));

  const handleNewTaskClick = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      const updatedTasks = allTasks.map(t => t.id === taskData.id ? { ...t, ...taskData } : t);
      setAllTasks(updatedTasks);
    } else {
      const finalTask = { 
        id: Date.now(),
        ...taskData, 
        proje_id: project.id,
        proje_adi: project.proje_adi,
        durum: taskData.durum || 'bekliyor'
      };
      setAllTasks([finalTask, ...allTasks]);
    }
    
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleCopyInviteLink = () => {
    const inviteUrl = `${window.location.origin}/login?invite=${project.id}`;
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }).catch(() => {
      prompt("Link kopyalanamadı, lütfen elle kopyalayın:", inviteUrl);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white shadow-sm border-b border-gray-100 px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-slate-400 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-indigo-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{project.proje_adi}</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{projectTeam.length} Ekip Üyesi • {projectTasks.length} Görev</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={handleCopyInviteLink} 
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 border shadow-sm ${
              isCopied 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {isCopied ? (
              <>
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Link Kopyalandı!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                Davet Linki
              </>
            )}
          </button>
          
          <button 
            onClick={handleNewTaskClick} 
            className="flex-1 sm:flex-initial bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Yeni Görev
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectTasks.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">Henüz Görev Yok</h3>
              <p className="text-slate-500 text-sm">Sağ üstten yeni bir görev ekleyerek başlayabilirsiniz.</p>
            </div>
          ) : (
            projectTasks.map(task => {
              // Atanan kullanıcıyı bul (calisan_id veya atanan_kullanici_id desteği)
              const assignedUserId = task.calisan_id || task.atanan_kullanici_id;
              const assignee = users.find(u => u.id === Number(assignedUserId));
              const taskTitle = task.gorev_adi || task.baslik;
              const taskDesc = task.gorev_detayi || task.aciklama;

              return (
                <div key={task.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group relative">
                  <button 
                    onClick={() => handleEditClick(task)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all bg-slate-50 hover:bg-indigo-50 p-1.5 rounded-lg"
                    title="Düzenle"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>

                  <div className="pr-8 mb-3">
                    <h3 className="font-bold text-slate-800 leading-tight">{taskTitle}</h3>
                  </div>
                  
                  <div className="mb-3">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border tracking-wide ${
                      task.durum === 'tamamlandi' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      task.durum === 'devam_ediyor' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {task.durum === 'tamamlandi' ? 'TAMAMLANDI' : task.durum === 'devam_ediyor' ? 'DEVAM EDİYOR' : 'BEKLİYOR'}
                    </span>
                  </div>

                  {taskDesc && (
                    <p className="text-sm text-slate-500 mb-5 line-clamp-2 leading-relaxed">{taskDesc}</p>
                  )}
                  
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100/60">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${assignee ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-50 text-slate-400 border border-dashed border-slate-300'}`}>
                        {assignee?.ad_soyad?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <span className={`text-sm font-medium ${assignee ? 'text-slate-700' : 'text-slate-400'}`}>
                        {assignee?.ad_soyad || 'Atanmadı'}
                      </span>
                    </div>
                    {task.oncelik && (
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${
                          task.oncelik.toLowerCase() === 'yüksek' || task.oncelik.toLowerCase() === 'yuksek' ? 'bg-red-500' : 
                          task.oncelik.toLowerCase() === 'orta' ? 'bg-amber-500' : 'bg-blue-500'
                        }`}></div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          {task.oncelik}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingTask(null); }} 
        onSave={handleSaveTask}
        projectTeam={projectTeam}
        editingTask={editingTask}
      />
    </div>
  );
};