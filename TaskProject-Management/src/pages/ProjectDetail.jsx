import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TaskModal } from '../components/TaskModal';
import { TaskCard } from '../components/TaskCard';
import { TaskDetailsModal } from '../components/TaskDetailsModal';
import { INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_USERS } from '../constants/mockData';
import { normalizeTaskStatus } from '../utils/taskStatus';

/** @typedef {import('../interfaces/Project').Project} Project */
/** @typedef {import('../interfaces/Task').Task} Task */
/** @typedef {import('../interfaces/Task').TaskInput} TaskInput */
/** @typedef {import('../interfaces/User').User} User */

export const ProjectDetail = () => {
  const { id } = useParams();
  
  /** @type {Project[]} */
  const [projects, setProjects] = useLocalStorage('app_projects', INITIAL_PROJECTS);
  /** @type {Task[]} */
  const [allTasks, setAllTasks] = useLocalStorage('app_tasks', INITIAL_TASKS);
  /** @type {User[]} */
  const [users] = useLocalStorage('app_users', INITIAL_USERS);
  /** @type {User | null} */
  const [user] = useLocalStorage('app_session', null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const project = projects.find(p => p.id === Number(id));
  const isManager = user?.rol === 'yonetici';
  const isProjectMember = (project?.ekip_uyeleri || []).some((memberId) => Number(memberId) === Number(user?.id));
  
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

  if (!isManager && !isProjectMember) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <p className="text-slate-700 font-bold text-lg mb-4">Bu projeyi görüntüleme yetkiniz bulunmuyor.</p>
        <Link to="/dashboard" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium shadow-sm hover:bg-indigo-700 transition-colors">
          Çalışma Alanıma Dön
        </Link>
      </div>
    );
  }

  // Bu projeye ait görevler ve ekip üyeleri
  const projectTasks = allTasks.filter(t => Number(t.proje_id) === Number(project.id));
  const projectTeam = users.filter(u => project.ekip_uyeleri?.some((memberId) => Number(memberId) === Number(u.id)));

  const handleNewTaskClick = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  /** @param {TaskInput} taskData */
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      const updatedTasks = allTasks.map(t => t.id === taskData.id
        ? { ...t, ...taskData, durum: normalizeTaskStatus(taskData.durum) }
        : t);
      setAllTasks(updatedTasks);
    } else {
      const finalTask = { 
        id: Date.now(),
        ...taskData, 
        proje_id: project.id,
        proje_adi: project.proje_adi,
        durum: normalizeTaskStatus(taskData.durum || 'bekliyor')
      };
      setAllTasks([finalTask, ...allTasks]);
    }
    
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleCopyInviteLink = () => {
    const inviteCode = project.davet_kodu || crypto.randomUUID();
    if (!project.davet_kodu) {
      setProjects((currentProjects) => currentProjects.map((currentProject) => (
        currentProject.id === project.id
          ? { ...currentProject, davet_kodu: inviteCode }
          : currentProject
      )));
    }

    const inviteUrl = new URL(`/davet/${encodeURIComponent(inviteCode)}`, window.location.origin).toString();
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }).catch(() => {
      prompt("Link kopyalanamadı, lütfen elle kopyalayın:", inviteUrl);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="sticky top-0 z-10 flex flex-col items-start justify-between gap-4 border-b border-slate-200/70 bg-white/85 px-4 py-4 shadow-sm shadow-slate-900/[0.02] backdrop-blur-xl sm:flex-row sm:items-center sm:px-8">
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
          {isManager && <button
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
                Davet Linki Kopyalandı!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                Davet Et
              </>
            )}
          </button>}
          
          {isManager && <button
            onClick={handleNewTaskClick} 
            className="flex-1 sm:flex-initial bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Yeni Görev
          </button>}
        </div>
      </header>

      <main className="p-4 sm:p-8 max-w-7xl mx-auto">
        <section className="relative mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-indigo-50/50 p-5 shadow-sm sm:p-6">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-bold text-slate-800">Proje Hakkında</h2>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${project.durum === 'devam_ediyor' ? 'bg-indigo-50 text-indigo-700' : 'bg-amber-50 text-amber-700'}`}>
              {project.durum === 'devam_ediyor' ? 'Aktif' : 'Beklemede'}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{project.aciklama || 'Bu proje için açıklama eklenmemiş.'}</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectTasks.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">Henüz Görev Yok</h3>
              <p className="text-slate-500 text-sm">{isManager ? 'Sağ üstten yeni bir görev ekleyerek başlayabilirsiniz.' : 'Bu projeye henüz görev eklenmemiş.'}</p>
            </div>
          ) : (
            projectTasks.map(task => {
              const assignedUserId = task.calisan_id ?? task.atanan_kullanici_id;
              const assignee = users.find(u => u.id === Number(assignedUserId));

              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  employee={assignee}
                  onDetailsClick={setSelectedTask}
                  onEdit={isManager ? handleEditClick : undefined}
                />
              );
            })
          )}
        </div>
      </main>

      {isManager && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditingTask(null); }}
          onSave={handleSaveTask}
          projectTeam={projectTeam}
          editingTask={editingTask}
        />
      )}
      <TaskDetailsModal
        task={selectedTask}
        project={project}
        assignee={users.find((member) => Number(member.id) === Number(selectedTask?.calisan_id ?? selectedTask?.atanan_kullanici_id))}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
};