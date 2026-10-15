import { useEmployeeService } from '../services/EmployeeService';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TaskCard } from './TaskCard';
import { TaskDetailsModal } from './TaskDetailsModal';

/** @typedef {import('../interfaces/User').User} User */

/** @param {{ user: User }} props */
export const EmployeeView = ({ user }) => {
  const { myProjects, myTasks, changeTaskStatus } = useEmployeeService(user);
  const [selectedTask, setSelectedTask] = useState(null);

  const stats = {
    total: myTasks.length,
    completed: myTasks.filter(t => t.durum === 'tamamlandi').length,
    inProgress: myTasks.filter(t => t.durum === 'devam_ediyor').length,
    pending: myTasks.filter(t => t.durum === 'bekliyor').length,
  };

  return (
    <div className="p-4 sm:p-8 w-full max-w-7xl mx-auto font-sans">
      
      {/* Karşılama */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Hoş geldin, {user?.ad_soyad?.split(' ')[0] || 'Çalışan'} 👋
        </h1>
        <p className="text-slate-500 mt-1">İşte dahil olduğun projeler ve üzerine atanan görevler.</p>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Toplam Görev</div>
          <div className="text-3xl font-bold text-slate-800">{stats.total}</div>
        </div>
        <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 shadow-sm">
          <div className="text-indigo-600 text-sm font-medium mb-1">Devam Eden</div>
          <div className="text-3xl font-bold text-indigo-700">{stats.inProgress}</div>
        </div>
        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 shadow-sm">
          <div className="text-amber-600 text-sm font-medium mb-1">Bekleyen</div>
          <div className="text-3xl font-bold text-amber-700">{stats.pending}</div>
        </div>
        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm">
          <div className="text-emerald-600 text-sm font-medium mb-1">Tamamlanan</div>
          <div className="text-3xl font-bold text-emerald-700">{stats.completed}</div>
        </div>
      </div>

      {/* Dahil Olunan Projeler Özeti */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Dahil Olduğum Projeler ({myProjects.length})</h2>
        {myProjects.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl border border-slate-100 text-slate-500 text-sm">
            Henüz ekli olduğunuz bir proje bulunmuyor. Yöneticinizden sizi bir projeye davet etmesini isteyebilirsiniz.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myProjects.map(proj => (
              <Link to={`/proje/${proj.id}`} key={proj.id} className="block rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 inline-block mb-2">
                  {proj.durum === 'devam_ediyor' ? 'Aktif Proje' : 'Beklemede'}
                </span>
                <h3 className="font-bold text-slate-800 text-base">{proj.proje_adi}</h3>
                <p className="text-slate-500 text-xs mt-1 line-clamp-2">{proj.aciklama}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-indigo-600">Proje detaylarını gör →</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <section>
        <h2 className="mb-4 text-lg font-bold text-slate-800">Projelerime Göre Görevler</h2>
        {myProjects.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center text-sm text-slate-500">
            Görevlerinizi görüntülemek için önce bir projeye dahil olmanız gerekir.
          </div>
        ) : (
          <div className="space-y-6">
            {myProjects.map((project) => {
              const projectTasks = myTasks.filter((task) => Number(task.proje_id) === Number(project.id));

              return (
                <section key={project.id} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-4">
                    <div>
                      <h3 className="font-bold text-slate-800">{project.proje_adi}</h3>
                      <p className="mt-1 text-xs text-slate-500">{projectTasks.length} atanmış görev</p>
                    </div>
                    <Link to={`/proje/${project.id}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                      Projeye git →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
                    {projectTasks.length === 0 ? (
                      <p className="py-3 text-sm text-slate-500">Bu projede size atanmış görev bulunmuyor.</p>
                    ) : (
                      projectTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          employee={user}
                          onDetailsClick={setSelectedTask}
                          onStatusChange={changeTaskStatus}
                        />
                      ))
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </section>

      <TaskDetailsModal
        task={selectedTask}
        project={myProjects.find((project) => Number(project.id) === Number(selectedTask?.proje_id))}
        assignee={user}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
};