export type ProjectStatus = 'devam_ediyor' | 'beklemede';

export interface Project {
  id: number;
  proje_adi: string;
  aciklama: string;
  durum: ProjectStatus;
  ekip_uyeleri: number[];
  olusturan_id: number;
  davet_kodu?: string;
}

export type ProjectInput = Omit<Project, 'id'>;
