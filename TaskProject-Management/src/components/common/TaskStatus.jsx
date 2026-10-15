import { getTaskStatus } from '../../utils/taskStatus';

/** @param {{ status: import('../../interfaces/Task').Task['durum'], className?: string }} props */
export const TaskStatus = ({ status, className = '' }) => {
  const taskStatus = getTaskStatus(status);

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${taskStatus.className} ${className}`}>
      {taskStatus.label}
    </span>
  );
};
