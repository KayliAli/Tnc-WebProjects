/** @typedef {import('../interfaces/Task').TaskStatusValue} TaskStatusValue */

const TASK_STATUSES = {
  bekliyor: {
    label: 'Beklemede',
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  devam_ediyor: {
    label: 'Devam Ediyor',
    className: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  },
  tamamlandi: {
    label: 'Tamamlandı',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
};

/** @param {TaskStatusValue | string | undefined} status */
export const normalizeTaskStatus = (status) => {
  const normalizedStatus = String(status || '').trim().toLocaleLowerCase('tr-TR');

  if (normalizedStatus === 'beklemede' || normalizedStatus === 'bekliyor') return 'bekliyor';
  if (normalizedStatus === 'tamamlandı' || normalizedStatus === 'tamamlandi') return 'tamamlandi';
  if (normalizedStatus === 'devam ediyor' || normalizedStatus === 'devam_ediyor') return 'devam_ediyor';

  return normalizedStatus;
};

/** @param {TaskStatusValue | string | undefined} status */
export const getTaskStatus = (status) => {
  const normalizedStatus = normalizeTaskStatus(status);
  return TASK_STATUSES[normalizedStatus] || {
    label: status || 'Durum belirtilmedi',
    className: 'border-slate-200 bg-slate-100 text-slate-600',
  };
};
