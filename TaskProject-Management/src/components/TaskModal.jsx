import { useState } from 'react';

// 1. İÇ BİLEŞEN: Sadece Modal açıkken var olur. Bu yüzden useEffect'e gerek kalmaz!
const ModalContent = ({ onClose, onSave, projectTeam = [], editingTask = null }) => {
  // State'ler doğrudan gelen proplardan (editingTask) varsayılan değerini alır
  const [gorevAdi, setGorevAdi] = useState(editingTask?.gorev_adi || '');
  const [gorevDetayi, setGorevDetayi] = useState(editingTask?.gorev_detayi || '');
  const [oncelik, setOncelik] = useState(editingTask?.oncelik || 'orta');
  const [calisanId, setCalisanId] = useState(editingTask?.calisan_id ? String(editingTask.calisan_id) : '');
  const [durum, setDurum] = useState(editingTask?.durum || 'beklemede');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const taskData = {
      ...(editingTask || {}), 
      gorev_adi: gorevAdi,
      gorev_detayi: gorevDetayi,
      oncelik: oncelik,
      calisan_id: calisanId ? Number(calisanId) : null,
      durum: durum
    };

    onSave(taskData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-lg font-bold text-slate-800">
            {editingTask ? 'Görevi Düzenle' : 'Yeni Görev Oluştur'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Görev Adı</label>
            <input 
              type="text" 
              required 
              value={gorevAdi} 
              onChange={(e) => setGorevAdi(e.target.value)} 
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
              placeholder="Örn: Veritabanı Optimizasyonu" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Görev Detayı</label>
            <textarea 
              required 
              rows="3" 
              value={gorevDetayi} 
              onChange={(e) => setGorevDetayi(e.target.value)} 
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none" 
              placeholder="Görevin neleri kapsadığını açıklayın..."
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Öncelik</label>
              <select value={oncelik} onChange={(e) => setOncelik(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none bg-white">
                <option value="dusuk">Düşük</option>
                <option value="orta">Orta</option>
                <option value="yüksek">Yüksek</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Atanacak Kişi (Opsiyonel)</label>
              <select value={calisanId} onChange={(e) => setCalisanId(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none bg-white">
                <option value="">Atanmadı</option>
                {projectTeam.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.ad_soyad}</option>
                ))}
              </select>
            </div>
          </div>

          {editingTask && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Görev Durumu</label>
              <select value={durum} onChange={(e) => setDurum(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none bg-white">
                <option value="beklemede">Beklemede</option>
                <option value="devam_ediyor">Devam Ediyor</option>
                <option value="tamamlandi">Tamamlandı</option>
              </select>
            </div>
          )}

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl">İptal</button>
            <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl">
              {editingTask ? 'Değişiklikleri Kaydet' : 'Görevi Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. DIŞ BİLEŞEN: Sistemin diğer sayfaları (Dashboard, ProjectDetail) burayı çağırır.
export const TaskModal = (props) => {
  // Eğer isOpen false ise (modal kapalıysa) hiçbir şey çizme. 
  // Bu sayede modal her açıldığında ModalContent sıfırdan yüklenir.
  if (!props.isOpen) return null;

  return <ModalContent {...props} />;
};