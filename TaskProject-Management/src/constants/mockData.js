export const INITIAL_USERS = [
  { id: 101, ad_soyad: "Hakan Yılmaz", kullanici_adi: "hakan", sifre: "123456", rol: "yonetici" },
  { id: 102, ad_soyad: "Test Kullanıcı", kullanici_adi: "test", sifre: "123456", rol: "kullanici" }
];

export const INITIAL_PROJECTS = [
  {
    id: 1,
    proje_adi: "Mobil Uygulama Yenileme",
    aciklama: "Müşterinin e-ticaret mobil uygulamasının modernizasyonu ve hızlandırılması.",
    durum: "devam_ediyor",
    ekip_uyeleri: [102, 103], // Zeynep ve Caner bu projede
    olusturan_id: 101
  },
  {
    id: 2,
    proje_adi: "Kurumsal Web Sitesi",
    aciklama: "Şirketin yeni vizyonuna uygun web sitesi tasarımı ve kodlaması.",
    durum: "beklemede",
    ekip_uyeleri: [103], // Sadece Caner bu projede
    olusturan_id: 101
  }
];

export const INITIAL_TASKS = [
  {
    id: 1001,
    proje_id: 1, // Mobil Uygulama projesine ait
    gorev_adi: "Ana Sayfa Tasarımı",
    gorev_detayi: "Figma üzerinden yeni ana sayfa tasarımı yapılacak.",
    durum: "tamamlandı",
    oncelik: "yüksek",
    calisan_id: 103 // Caner'e atanmış
  }
];