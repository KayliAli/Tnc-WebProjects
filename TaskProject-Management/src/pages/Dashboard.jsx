import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_TASKS, INITIAL_EMPLOYEES } from '../constants/mockData';
import { TaskCard } from '../components/TaskCard';

export const Dashboard = ({ onLogout }) => {
  const [tasks] = useLocalStorage('app_tasks', INITIAL_TASKS);
  const [employees] = useLocalStorage('app_employees', INITIAL_EMPLOYEES);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sol Menü (Sidebar) */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col hidden md:flex">
        <div className="p-6">
          <h2 className="text-white text-2xl font-bold tracking-tight">ProjeYönet</h2>
        </div>
        <nav className="mt-2 flex-1">
          <a href="#" className="block px-6 py-3 bg-indigo-600 text-white font-medium">Görevler</a>
          <a href="#" className="block px-6 py-3 hover:bg-slate-800 transition-colors">Projeler</a>
          <a href="#" className="block px-6 py-3 hover:bg-slate-800 transition-colors">Ekip</a>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Ana İçerik */}
      <main className="flex-1">
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Aktif Görevler</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
            + Yeni Görev
          </button>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map(task => {
              const assignedEmployee = employees.find(emp => emp.id === task.calisan_id);
              return <TaskCard key={task.id} task={task} employee={assignedEmployee} />;
            })}
          </div>
        </div>
      </main>
    </div>
  );
};