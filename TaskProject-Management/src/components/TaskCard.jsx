import { TaskStatus } from './common/TaskStatus';
import { normalizeTaskStatus } from '../utils/taskStatus';

/** @typedef {import('../interfaces/Task').Task} Task */
/** @typedef {import('../interfaces/User').User} User */

/**
 * @param {{
 *   task: Task,
 *   employee?: User | null,
 *   onDetailsClick?: (task: Task) => void,
 *   onEdit?: (task: Task) => void,
 *   onStatusChange?: (taskId: number, status: Task['durum']) => void,
 * }} props
 */
export const TaskCard = ({ task, employee, onDetailsClick, onEdit, onStatusChange }) => {
  const title = task.gorev_adi || task.baslik || 'Başlıksız görev';
  const description = task.gorev_detayi || task.aciklama;
  const status = normalizeTaskStatus(task.durum);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className={`text-lg font-semibold ${status === 'tamamlandi' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{title}</h3>
        <TaskStatus status={task.durum} />
      </div>

      {description && <p className="mb-5 line-clamp-2 text-sm text-slate-600">{description}</p>}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
            {employee?.ad_soyad?.charAt(0) || '?'}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-700">{employee?.ad_soyad || 'Atanmadı'}</p>
            {task.oncelik && <p className="text-xs capitalize text-slate-500">Öncelik: {task.oncelik}</p>}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onStatusChange && status === 'bekliyor' && (
            <button type="button" onClick={() => onStatusChange(task.id, 'devam_ediyor')} className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100">Başla</button>
          )}
          {onStatusChange && status === 'devam_ediyor' && (
            <button type="button" onClick={() => onStatusChange(task.id, 'tamamlandi')} className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-600">Tamamla</button>
          )}
          {onDetailsClick && (
            <button type="button" onClick={() => onDetailsClick(task)} className="rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
              Görev detayları
            </button>
          )}
          {onEdit && (
            <button type="button" onClick={() => onEdit(task)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
              Düzenle
            </button>
          )}
          {onStatusChange && status === 'tamamlandi' && (
            <span className="px-2 py-2 text-sm font-medium text-emerald-700">Tamamlandı</span>
          )}
        </div>
      </div>
    </article>
  );
};