export type UserRole = 'yonetici' | 'kullanici';

export interface User {
  id: number;
  ad_soyad: string;
  kullanici_adi: string;
  sifre: string;
  rol: UserRole;
  unvan?: string;
}
