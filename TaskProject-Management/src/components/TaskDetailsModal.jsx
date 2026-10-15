import { TaskStatus } from './common/TaskStatus';

/** @typedef {import('../interfaces/Task').Task} Task */
/** @typedef {import('../interfaces/Project').Project} Project */
/** @typedef {import('../interfaces/User').User} User */

/** @param {{ task: Task | null, project?: Project, assignee?: User | null, onClose: () => void }} props */
export const TaskDetailsModal = ({ task, project, assignee, onClose }) => {
  if (!task) return null;

  const title = task.gorev_adi || task.baslik || 'Başlıksız görev';
  const description = task.gorev_detayi || task.aciklama || 'Görev açıklaması eklenmemiş.';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section role="dialog" aria-modal="true" aria-labelledby="task-details-title" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">{project?.proje_adi || 'Proje belirtilmedi'}</p>
            <h2 id="task-details-title" className="text-xl font-bold text-slate-800">{title}</h2>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700" aria-label="Kapat">✕</button>
        </div>

        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{description}</p>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 text-sm">
          <div>
            <dt className="mb-1 text-xs font-medium text-slate-400">Durum</dt>
            <dd><TaskStatus status={task.durum} /></dd>
          </div>
          <div>
            <dt className="mb-1 text-xs font-medium text-slate-400">Öncelik</dt>
            <dd className="font-semibold capitalize text-slate-700">{task.oncelik || 'Belirtilmedi'}</dd>
          </div>
          <div>
            <dt className="mb-1 text-xs font-medium text-slate-400">Atanan kişi</dt>
            <dd className="font-medium text-slate-700">{assignee?.ad_soyad || 'Atanmadı'}</dd>
          </div>
          <div>
            <dt className="mb-1 text-xs font-medium text-slate-400">Son tarih</dt>
            <dd className="font-medium text-slate-700">{task.son_tarih || 'Belirtilmedi'}</dd>
          </div>
        </dl>

        <div className="mt-6 flex justify-end border-t border-slate-100 pt-4">
          <button type="button" onClick={onClose} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">Kapat</button>
        </div>
      </section>
    </div>
  );
};
