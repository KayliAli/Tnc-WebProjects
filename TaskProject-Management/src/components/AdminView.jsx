import { useNavigate } from 'react-router-dom';

export const AdminView = ({ projects, users }) => {
  const navigate = useNavigate();

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