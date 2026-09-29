export const Badge = ({ children, type }) => {
  const colors = {
    yüksek: 'bg-red-100 text-red-700 border-red-200',
    orta: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    düşük: 'bg-green-100 text-green-700 border-green-200',
    yapılacak: 'bg-gray-100 text-gray-700 border-gray-200',
    devam_ediyor: 'bg-blue-100 text-blue-700 border-blue-200',
    tamamlandı: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  const colorClass = colors[type.toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-200';

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      {children}
    </span>
  );
};