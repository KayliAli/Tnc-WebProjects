import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_PROJECTS } from '../constants/mockData';

// Örnek başlangıç görevleri (Eğer LocalStorage boşsa yüklenir)
const INITIAL_TASKS = [
  { id: 101, baslik: 'Ana sayfa tasarımı revizesi', proje_id: 1, proje_adi: 'Website Yenileme', durum: 'devam_ediyor', son_tarih: '2026-10-10', oncelik: 'Yüksek', atanan_kullanici_id: 2 },
  { id: 102, baslik: 'API entegrasyonu testleri', proje_id: 2, proje_adi: 'Mobil Uygulama', durum: 'bekliyor', son_tarih: '2026-10-12', oncelik: 'Orta', atanan_kullanici_id: 2 },
  { id: 103, baslik: 'Veritabanı optimizasyonu', proje_id: 1, proje_adi: 'Website Yenileme', durum: 'tamamlandi', son_tarih: '2026-10-05', oncelik: 'Yüksek', atanan_kullanici_id: 3 },
];

export const EmployeeView = ({ user }) => {
  const [projects] = useLocalStorage('app_projects', INITIAL_PROJECTS);
  const [allTasks, setAllTasks] = useLocalStorage('app_tasks', INITIAL_TASKS);

  // 1. Sadece kullanıcının dahil olduğu projeler
  const myProjects = projects.filter(p => p.ekip_uyeleri && p.ekip_uyeleri.includes(user?.id));

  // 2. Sadece oturum açan kullanıcıya atanmış görevler
  const myTasks = allTasks.filter(task => task.atanan_kullanici_id === user?.id);

  // Görev durumunu güncelleyip LocalStorage'a yazma
  const changeTaskStatus = (taskId, newStatus) => {
    const updatedTasks = allTasks.map(task => 
      task.id === taskId ? { ...task, durum: newStatus } : task
    );
    setAllTasks(updatedTasks);
  };

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
              <div key={proj.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 inline-block mb-2">
                  {proj.durum === 'devam_ediyor' ? 'Aktif Proje' : 'Beklemede'}
                </span>
                <h3 className="font-bold text-slate-800 text-base">{proj.proje_adi}</h3>
                <p className="text-slate-500 text-xs mt-1 line-clamp-2">{proj.aciklama}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Görev Listesi */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">Bana Atanan Görevler</h2>
        </div>

        <div className="divide-y divide-slate-100">
          {myTasks.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              Şu an üzerinize atanan herhangi bir görev yok. 🎉
            </div>
          ) : (
            myTasks.map((task) => (
              <div key={task.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className={`text-base font-bold ${task.durum === 'tamamlandi' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                      {task.baslik}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${task.oncelik === 'Yüksek' ? 'bg-red-100 text-red-700' : 
                        task.oncelik === 'Orta' ? 'bg-orange-100 text-orange-700' : 
                        'bg-slate-100 text-slate-700'}`}>
                      {task.oncelik}
                    </span>
                  </div>
                  <div className="text-sm text-slate-500 flex items-center gap-3">
                    <span>📁 {task.proje_adi}</span>
                    <span>📅 Son Tarih: {task.son_tarih}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {task.durum === 'bekliyor' && (
                    <button 
                      onClick={() => changeTaskStatus(task.id, 'devam_ediyor')}
                      className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-sm font-medium rounded-xl transition-colors"
                    >
                      Başla
                    </button>
                  )}
                  {task.durum === 'devam_ediyor' && (
                    <button 
                      onClick={() => changeTaskStatus(task.id, 'tamamlandi')}
                      className="px-4 py-2 bg-emerald-500 text-white hover:bg-emerald-600 text-sm font-medium rounded-xl transition-colors shadow-sm"
                    >
                      Tamamla
                    </button>
                  )}
                  {task.durum === 'tamamlandi' && (
                    <span className="px-4 py-2 bg-slate-100 text-slate-500 text-sm font-medium rounded-xl flex items-center gap-1 cursor-default">
                      ✓ Tamamlandı
                    </span>
                  )}
                </div>

              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};