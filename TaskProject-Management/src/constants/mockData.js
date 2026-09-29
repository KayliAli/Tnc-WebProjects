export const INITIAL_EMPLOYEES = [
  {
    id: 101,
    ad_soyad: "Hakan Yılmaz",
    email: "hakan@example.com",
    departman: "Backend",
    unvan: "Node.js Geliştirici"
  },
  {
    id: 102,
    ad_soyad: "Zeynep Kaya",
    email: "zeynep@example.com",
    departman: "Frontend",
    unvan: "React Geliştirici"
  },
  {
    id: 103,
    ad_soyad: "Caner Demir",
    email: "caner@example.com",
    departman: "Tasarım",
    unvan: "UI/UX Tasarımcı"
  }
];

export const INITIAL_TASKS = [
  {
    id: 1,
    gorev_adi: "Kullanıcı Giriş Modülü",
    gorev_detayi: "JWT tabanlı kimlik doğrulama ve refresh token yapısının kurulması.",
    durum: "tamamlandı",
    oncelik: "yüksek",
    calisan_id: 101
  },
  {
    id: 2,
    gorev_adi: "Dashboard Arayüzü",
    gorev_detayi: "Tailwind ile responsive yönetim paneli arayüzünün kodlanması.",
    durum: "devam_ediyor",
    oncelik: "orta",
    calisan_id: 102
  },
  {
    id: 3,
    gorev_adi: "Logo Revizyonu",
    gorev_detayi: "Müşteri geri bildirimlerine göre logoda renk değişikliği yapılacak.",
    durum: "beklemede",
    oncelik: "dusuk",
    calisan_id: 103
  }
];