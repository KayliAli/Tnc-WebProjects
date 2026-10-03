# GörevRotası

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
</p>

GörevRotası, ekipler için tasarlanmış modern bir görev ve proje yönetimi uygulamasıdır. Yönetici ve çalışan rollerini destekler; görev dağılımı, proje takibi ve ekip koordinasyonunu tek bir arayüzde sağlar.

## Proje Hakkında

Bu uygulama, iş akışlarını sade ve verimli hale getirmek için geliştirilmiştir. Kullanıcılar:

- projeler oluşturup yönetebilir,
- ekiplere görev atayabilir,
- görev durumlarını takip edebilir,
- önceliklendirme yapabilir,
- davet bağlantıları paylaşabilir,
- tüm verilerini tarayıcıda güvenli şekilde saklayabilir.

## Özellikler

- Yönetici ve çalışan rolleri için ayrı görünümler
- Proje listesi ve detay ekranları
- Görev oluşturma, düzenleme ve silme işlemleri
- Durum takibi: tamamlandı / devam ediyor / beklemede
- Öncelik takibi: yüksek / orta / düşük
- Ekip üyeleri ile proje ilişkilendirme
- Davet bağlantısı kopyalama özelliği
- Responsive modern kullanıcı arayüzü
- LocalStorage tabanlı veri kalıcılığı

## Teknoloji Yığını

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- JavaScript
- LocalStorage

## Uygulama Akışı

1. Kullanıcı giriş yapar.
2. Yönetici panelinde tüm projeler görüntülenir.
3. Proje detay sayfasından görevler yönetilir.
4. Çalışanlar atanmış görevleri inceleyebilir.
5. Proje için davet linki paylaşılabilir.
6. Veriler tarayıcıda saklandığı için sayfa yenilense bile korunur.

## Kurulum

Projeyi yerelde çalıştırmak için aşağıdaki adımları izleyin:

```bash
npm install
npm run dev
```

Ardından tarayıcıda aşağıdaki adresi açın:

```bash
http://localhost:5173
```

## Production Build

Uygulamayı production için derlemek için:

```bash
npm run build
```

## Demo Hesapları

Uygulama örnek verilerle gelir. Aşağıdaki hesaplarla giriş yapılabilir:

- Yönetici: `hakan` / `123456`
- Kullanıcı: `test` / `123456`

## Proje Yapısı

```bash
src/
├── components/
├── constants/
├── context/
├── hooks/
├── pages/
├── services/
├── utils/
├── App.jsx
├── main.jsx
├── index.css
└── assets/
```

## Geliştirici Notları

Bu proje, tek sayfalık modern bir görev yönetimi deneyimi sunmak amacıyla geliştirilmiştir. Şu an demo/öğrenme odaklı çalışırken, ileride backend, veritabanı, kullanıcı doğrulama ve gerçek üretim senaryoları için genişletilebilir.

## Katkı

Katkı sağlamak isterseniz, lütfen bir fork oluşturup pull request açın.

## Lisans

Bu proje için özel lisans uygulanmayıp, kullanım ve geliştirme için açık yapıdadır.
