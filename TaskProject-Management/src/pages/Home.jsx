import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 scroll-smooth">
      
      {/* 1. ÜST NAVİGASYON (HEADER) */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* Logo Kısmı */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">GörevRotası</span>
          </div>
          
          {/* Menü Linkleri (Sadece PC'de görünür, mobilde kalabalık yapmaması için) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#ozellikler" className="hover:text-indigo-600 transition-colors">Özellikler</a>
            <a href="#hakkimizda" className="hover:text-indigo-600 transition-colors">Hakkımızda</a>
            <a href="#iletisim" className="hover:text-indigo-600 transition-colors">İletişim</a>
          </div>

          {/* Aksiyon Butonları (Mobilde yan yana sığması için boyutlar optimize edildi) */}
          <div className="flex items-center gap-1 sm:gap-3">
            <Link to="/login" className="px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors">
              Giriş Yap
            </Link>
            <Link to="/login" className="px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium bg-slate-900 text-white rounded-lg sm:rounded-xl hover:bg-indigo-600 transition-all shadow-sm hover:shadow-md whitespace-nowrap">
              Hemen Başla
            </Link>
          </div>

        </div>
      </nav>

      {/* 2. HERO (ANA KARŞILAMA) BÖLÜMÜ */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold mb-8 hover:bg-indigo-100 transition-colors cursor-default">
          <span className="flex w-2 h-2 rounded-full bg-indigo-600 mr-2.5 animate-pulse"></span>
          GörevRotası v1.0 Yayında!
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight max-w-4xl leading-tight">
          İşlerinizi <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Tek Noktadan</span> Yönetin
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Ekibinizin görevlerini takip edin, iş süreçlerinizi hızlandırın ve verimliliğinizi artırın. 
          Karmaşık tablolara veda edin, modern arayüzle tanışın.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">
          <Link to="/login" className="flex-1 px-8 py-4 text-sm sm:text-base font-semibold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 flex items-center justify-center gap-2">
            Çalışma Alanına Git
          </Link>
        </div>
      </main>

      {/* 3. TEKNOLOJİ STACK */}
      <div className="bg-slate-50 py-8 border-t border-b border-gray-200">
        <p className="text-center text-xs sm:text-sm font-semibold text-slate-500 mb-6 uppercase tracking-wider px-4">
          Modern ve Hızlı Teknolojilerle Geliştirildi
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-16 text-slate-400 font-bold text-base sm:text-lg md:text-xl px-4">
          <span className="flex items-center gap-2 hover:text-cyan-500 transition-colors cursor-default">⚛️ React.js</span>
          <span className="flex items-center gap-2 hover:text-purple-500 transition-colors cursor-default">⚡ Vite</span>
          <span className="flex items-center gap-2 hover:text-sky-400 transition-colors cursor-default">🌊 Tailwind CSS</span>
          <span className="flex items-center gap-2 hover:text-yellow-500 transition-colors cursor-default">💾 LocalStorage</span>
        </div>
      </div>

      {/* 4. ÖZELLİKLER BÖLÜMÜ */}
      <section id="ozellikler" className="bg-white py-16 sm:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Her Şey Kontrolünüz Altında</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">İhtiyacınız olan tüm araçlar, öğrenme eğrisi olmadan tek bir platformda birleşti.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Kolay Görev Takibi</h3>
              <p className="text-slate-500 leading-relaxed text-sm sm:text-base">Görevleri oluşturun, önceliklendirin ve ekip üyelerine atayın. Her şey tek bir ekranda.</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Ekip Yönetimi</h3>
              <p className="text-slate-500 leading-relaxed text-sm sm:text-base">Departmanlara göre çalışanları görün. Kimin hangi projede çalıştığını anında takip edin.</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Yüzde Yüz Gizlilik</h3>
              <p className="text-slate-500 leading-relaxed text-sm sm:text-base">Verileriniz hiçbir sunucuya gitmez, sadece sizin tarayıcınızda (LocalStorage) güvende kalır.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HAKKIMIZDA BÖLÜMÜ */}
      <section id="hakkimizda" className="bg-slate-50 py-16 sm:py-24 border-t border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Hakkımızda</h2>
          <div className="w-16 sm:w-20 h-1 bg-indigo-600 mx-auto rounded-full mb-8"></div>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
            <strong>GörevRotası</strong>, modern ekiplerin iş akışlarını dijitalleştirmek ve üretkenliği artırmak amacıyla geliştirilmiş yeni nesil bir görev yönetim platformudur. 
            Karmaşık Excel tablolarından ve dağınık not defterlerinden kurtulup, herkesin aynı sayfada olduğu şeffaf bir çalışma ortamı sunmayı hedefliyoruz.
          </p>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Tamamen yerel cihaz tabanlı (LocalStorage) çalışan altyapımız sayesinde, internete veya uzak sunuculara bağımlı kalmadan projelerinizi ışık hızında ve güvenle yönetebilirsiniz.
          </p>
        </div>
      </section>

      {/* 6. İLETİŞİM BÖLÜMÜ */}
      <section id="iletisim" className="bg-white py-16 sm:py-24 border-t border-slate-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Bizimle İletişime Geçin</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">Soru, görüş veya destek talepleriniz için bize ulaşmaktan çekinmeyin.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
            {/* İletişim Bilgileri */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 flex flex-col justify-center">
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">E-posta</h4>
                    <p className="text-slate-500 text-sm sm:text-base">merhaba@gorevrotasi.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">Ofis</h4>
                    <p className="text-slate-500 text-sm sm:text-base">Teknopark, İstanbul, Türkiye</p>
                  </div>
                </div>
              </div>
            </div>

            {/* İletişim Formu */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Adınız</label>
                  <input type="text" className="w-full px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm sm:text-base" placeholder="Adınız Soyadınız" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mesajınız</label>
                  <textarea rows="4" className="w-full px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none text-sm sm:text-base" placeholder="Nasıl yardımcı olabiliriz?"></textarea>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2.5 sm:py-3 rounded-xl hover:bg-indigo-700 transition-colors mt-2 text-sm sm:text-base">
                  Mesaj Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-8 border-t border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 block">GörevRotası</span>
          <p className="text-xs sm:text-sm text-slate-500">© {new Date().getFullYear()} - Tüm Hakları Saklıdır.</p>
        </div>
      </footer>

    </div>
  );
};