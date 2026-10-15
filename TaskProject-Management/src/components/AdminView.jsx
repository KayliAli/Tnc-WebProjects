import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** @typedef {import('../interfaces/Project').Project} Project */
/** @typedef {import('../interfaces/Project').ProjectInput} ProjectInput */
/** @typedef {import('../interfaces/User').User} User */

/** @param {{ project?: Project | null, users: User[], currentUser?: User | null, onSave: (project: ProjectInput) => void, onClose: () => void }} props */
const ProjectForm = ({ project, users, currentUser, onSave, onClose }) => {
  const [name, setName] = useState(project?.proje_adi || '');
  const [description, setDescription] = useState(project?.aciklama || '');
  const [status, setStatus] = useState(project?.durum || 'devam_ediyor');
  const [memberIds, setMemberIds] = useState(project?.ekip_uyeleri || []);

  const toggleMember = (userId) => {
    setMemberIds((current) => current.includes(userId)
      ? current.filter((id) => id !== userId)
      : [...current, userId]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      proje_adi: name,
      aciklama: description,
      durum: status,
      ekip_uyeleri: memberIds,
      olusturan_id: project?.olusturan_id || currentUser?.id,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <form onSubmit={handleSubmit} className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">{project ? 'Projeyi Düzenle' : 'Yeni Proje'}</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700" aria-label="Kapat">✕</button>
        </div>

        <div>
          <label htmlFor="project-name" className="mb-1 block text-sm font-medium text-slate-700">Proje adı</label>
          <input id="project-name" required maxLength={80} value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label htmlFor="project-description" className="mb-1 block text-sm font-medium text-slate-700">Açıklama</label>
          <textarea id="project-description" rows="3" value={description} onChange={(event) => setDescription(event.target.value)} className="w-full resize-y rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label htmlFor="project-status" className="mb-1 block text-sm font-medium text-slate-700">Durum</label>
          <select id="project-status" value={status} onChange={(event) => setStatus(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none">
            <option value="devam_ediyor">Aktif</option>
            <option value="beklemede">Beklemede</option>
          </select>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-slate-700">Ekip üyeleri</legend>
          <div className="max-h-36 space-y-2 overflow-y-auto rounded-xl border border-slate-200 p-3">
            {users.filter((user) => user.rol !== 'yonetici').map((user) => (
              <label key={user.id} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={memberIds.includes(user.id)} onChange={() => toggleMember(user.id)} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                {user.ad_soyad}
              </label>
            ))}
            {users.filter((user) => user.rol !== 'yonetici').length === 0 && <p className="text-sm text-slate-400">Henüz ekip üyesi bulunmuyor.</p>}
          </div>
        </fieldset>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button type="button" onClick={onClose} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-200">İptal</button>
          <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">{project ? 'Değişiklikleri Kaydet' : 'Projeyi Oluştur'}</button>
        </div>
      </form>
    </div>
  );
};

/**
 * @param {{
 *   projects?: Project[],
 *   users?: User[],
 *   onCreateProject: (project: ProjectInput) => void,
 *   onUpdateProject: (projectId: number, project: ProjectInput) => void,
 *   onDeleteProject: (projectId: number) => void,
 *   currentUser?: User | null,
 * }} props
 */
export const AdminView = ({ projects = [], users = [], onCreateProject, onUpdateProject, onDeleteProject, currentUser }) => {
  const navigate = useNavigate();
  const [editingProject, setEditingProject] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const closeForm = () => {
    setEditingProject(null);
    setIsCreating(false);
  };

  const saveProject = (projectData) => {
    if (editingProject) onUpdateProject(editingProject.id, projectData);
    else onCreateProject(projectData);
    closeForm();
  };

  const removeProject = (event, project) => {
    event.stopPropagation();
    if (window.confirm(`“${project.proje_adi}” projesini ve projeye bağlı görevleri silmek istiyor musunuz?`)) {
      onDeleteProject(project.id);
    }
  };

  const activeProjects = projects.filter((project) => project.durum === 'devam_ediyor').length;
  const teamMembers = new Set(projects.flatMap((project) => project.ekip_uyeleri || [])).size;

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8">
      <section className="relative mb-7 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-950/10 md:p-8">
        <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full border-[36px] border-white/[0.07]" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">Genel bakış</p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Projeleriniz hazır</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-indigo-100">Ekibinizin çalışmalarını düzenleyin ve proje ilerlemesini tek ekrandan takip edin.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 md:min-w-80 md:gap-3">
            {[
              ['Toplam proje', projects.length],
              ['Aktif proje', activeProjects],
              ['Ekip üyesi', teamMembers],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm md:p-4">
                <p className="text-xl font-bold md:text-2xl">{value}</p>
                <p className="mt-1 text-[10px] font-medium text-indigo-100 md:text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mb-5 flex flex-wrap items-end justify-between gap-4 md:mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800 md:text-2xl">Tüm Projeler</h2>
          <p className="mt-1 text-sm text-slate-500">Projeleri oluşturun, ekipleri yönetin ve bilgileri güncelleyin.</p>
        </div>
        <button onClick={() => setIsCreating(true)} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 md:px-5 md:py-2.5">
          + Yeni Proje
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">Henüz proje yok. Yeni Proje düğmesiyle başlayın.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} onClick={() => navigate(`/proje/${project.id}`)} className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.025] transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/[0.06] md:p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-indigo-600">{project.proje_adi}</h3>
                <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider md:text-xs ${project.durum === 'devam_ediyor' ? 'border-blue-200 bg-blue-50 text-blue-600' : 'border-yellow-200 bg-yellow-50 text-yellow-600'}`}>
                  {project.durum === 'devam_ediyor' ? 'Aktif' : 'Beklemede'}
                </span>
              </div>
              <p className="mb-6 line-clamp-2 min-h-10 text-sm text-slate-500">{project.aciklama || 'Açıklama eklenmemiş.'}</p>

              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <div className="flex -space-x-2">
                  {(project.ekip_uyeleri || []).map((memberId) => {
                    const member = users.find((user) => user.id === memberId);
                    return <div key={memberId} title={member?.ad_soyad} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-xs font-bold text-slate-600">{member?.ad_soyad?.charAt(0) || '?'}</div>;
                  })}
                  {(project.ekip_uyeleri || []).length === 0 && <span className="text-xs text-slate-400">Ekip atanmadı</span>}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(event) => { event.stopPropagation(); setEditingProject(project); }} className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50">Düzenle</button>
                  <button onClick={(event) => removeProject(event, project)} className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">Sil</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(isCreating || editingProject) && (
        <ProjectForm
          key={editingProject?.id || 'new-project'}
          project={editingProject}
          users={users}
          currentUser={currentUser}
          onSave={saveProject}
          onClose={closeForm}
        />
      )}
    </div>
  );
};