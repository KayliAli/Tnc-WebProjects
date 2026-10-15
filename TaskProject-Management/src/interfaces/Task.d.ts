export type TaskStatusValue =
  | 'bekliyor'
  | 'beklemede'
  | 'devam_ediyor'
  | 'devam ediyor'
  | 'tamamlandi'
  | 'tamamlandı';

export type TaskPriority = 'dusuk' | 'düşük' | 'orta' | 'yuksek' | 'yüksek';

export interface Task {
  id: number;
  proje_id: number;
  proje_adi?: string;
  gorev_adi?: string;
  baslik?: string;
  gorev_detayi?: string;
  aciklama?: string;
  durum: TaskStatusValue;
  oncelik?: TaskPriority;
  calisan_id?: number | null;
  atanan_kullanici_id?: number | null;
  son_tarih?: string;
}

export type TaskInput = Omit<Task, 'id' | 'proje_id'> & {
  proje_id?: number;
};
