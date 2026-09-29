import { Badge } from './common/Badge';

export const TaskCard = ({ task, employee }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{task.gorev_adi}</h3>
        <div className="flex gap-2">
          <Badge text={task.oncelik} type="oncelik" />
          <Badge text={task.durum} type="durum" />
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-5 line-clamp-2">
        {task.gorev_detayi}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
            {employee?.ad_soyad.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">{employee?.ad_soyad}</p>
            <p className="text-xs text-gray-500">{employee?.unvan}</p>
          </div>
        </div>
        
        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          Detaylar →
        </button>
      </div>
    </div>
  );
};