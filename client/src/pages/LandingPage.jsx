import React, { useState, useRef, useEffect } from "react";
// KODE BARU:
import {
    Utensils,
    MapPin,
    Phone,
    Clock,
    Star,
    ShoppingBag,
    Globe,
    User,
    ChevronRight,
    QrCode,
    ChefHat,
    ShieldCheck,
    Sparkles,
    Zap,
    CheckCircle2,
    ChevronLeft,
    ExternalLink,
    Check,
    ChevronDown,
    SquarePen,
    Menu, // <-- Ditambahkan
    X,    // <-- Ditambahkan
} from "lucide-react";

export default function LandingPage({
  onNavigateToLogin,
  onNavigateToPesanMenu,
  menuList = [],
}) {
  const [activeTab, setActiveTab] = useState("all");
  const [lang, setLang] = useState("ID"); // 'ID' or 'EN'
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // <-- Tambahan State Baru
  const langDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    table: "",
    guests: "1 Orang",
  });

  const languages = [
    { code: "ID", name: "ID (Indonesia)", label: "Indonesia" },
    { code: "EN", name: "EN (English)", label: "English" },
  ];

  const t = {
    ID: {
      brandTitle: "Sistem Manajemen Dapur Restoran",
      nav: {
        home: "Home",
        about: "Tentang",
        menu: "Fitur Demo",
        system: "Alur Sistem",
        testi: "Manfaat",
        reserve: "Coba Sistem",
        login: "Login",
      },
      hero: {
        badge: "SOLUSI MANAJEMEN RESTORAN MODERN",
        title1: "Kelola Pesanan",
        title2: "Dapur & Laporan",
        title3: "dengan Lebih Mudah",
        desc: "SIMADAR membantu tim restoran memantau pesanan, mengatur proses dapur, dan mengelola transaksi secara real-time dalam satu platform yang terintegrasi.",
        btnMenu: "Lihat Fitur Utama",
        btnReserve: "Masuk ke Dashboard",
        hours: "WORKFLOW RESTORAN:",
        location: "TARGET PENGGUNA:",
        openMaps: "Lihat Demo",
      },
      about: {
        badge: "TENTANG SIMADAR",
        title: "Dari pesanan meja hingga laporan keuangan, semua berjalan terintegrasi.",
        desc: "Platform ini dirancang untuk membantu pemilik restoran, waiter, dan koki mengelola aktivitas harian secara cepat, akurat, dan terdokumentasi. Fokus utama kami adalah kelancaran operasional dan transparansi data restoran.",
        feat1Title: "Order Flow Real-Time",
        feat1Desc: "Pesanan dari waiter hingga dapur langsung terpantau tanpa saling terlewat.",
        feat2Title: "Monitoring & Laporan",
        feat2Desc: "Data penjualan dan status order dapat dipantau untuk evaluasi operasional.",
      },
      menuSection: {
        badge: "FITUR DEMO",
        title: "Demo menu digital yang terhubung ke sistem restoran",
        desc: "Menu di bawah menunjukkan bagaimana pelanggan melihat item yang tersedia, sementara tim restoran tetap mengelola pesanan secara terstruktur.",
        tabAll: "Semua Menu",
        tabMain: "Makanan",
        tabDrink: "Minuman",
        priceLabel: "HARGA",
      },
      systemSection: {
        badge: "ALUR KERJA SISTEM",
        title: "Bagaimana SIMADAR membantu operasional restoran?",
        desc: "Mulai dari pesanan masuk, pengolahan dapur, hingga eksekusi laporan dan monitoring status, seluruh proses dapat dikelola dalam satu ekosistem.",
        step1Tag: "LANGKAH 01",
        step1Title: "Pemesanan & Input Order",
        step1Desc:
          'Waiter mencatat pesanan pelanggan, menambahkan catatan khusus, dan mengirimkan permintaan ke dapur secara otomatis.',
        step1List: [
          "Input order dari meja atau perangkat waiter",
          "Catatan khusus untuk dapur dan pelanggan",
          "Status pesanan terpusat dan terstruktur",
        ],
        step2Badge: "OTAK OPERASIONAL",
        step2Tag: "LANGKAH 02",
        step2Title: "Proses Dapur & Antrean Pesanan",
        step2Desc:
          'Koki menerima daftar pesanan dalam antrean yang jelas, memprioritaskan pekerjaan, dan memperbarui status siap saji secara real-time.',
        step2List: [
          "Antrean order yang mudah dibaca",
          "Status memasak dan siap diambil terpantau",
          "Koordinasi lebih cepat antar waiter dan koki",
        ],
        step3Tag: "LANGKAH 03",
        step3Title: "Monitoring, Pembayaran & Laporan",
        step3Desc:
          "Sistem mendukung pengawasan transaksi dan laporan operasional untuk membantu keputusan bisnis yang lebih cepat dan akurat.",
        step3List: [
          "Data pesanan terorganisasi dengan baik",
          "Pemantauan aktivitas restoran secara real-time",
          "Laporan penjualan dan performa operasional",
        ],
        stat1Title: "1 Platform",
        stat1Desc: "Semua proses terintegrasi",
        stat2Title: "Real-Time",
        stat2Desc: "Status order terus diperbarui",
        stat3Title: "Data",
        stat3Desc: "Bisa dipakai untuk evaluasi dan laporan",
      },
      testiSection: {
        badge: "NILAI PRODUK",
        title: "Apa yang ditawarkan sistem ini untuk restoran?",
        ratingText: "Fokus pada efisiensi operasional",
        recommendText: "✅ Mengurangi kesalahan input & tunggakan order",
        subtitle:
          "Dirancang untuk membantu tim restoran memproses pemesanan, sinkronisasi dapur, dan evaluasi penjualan dengan lebih rapi.",
        writeReview: "Lihat demo",
      },
      reservationSection: {
        title: "Coba alur kerja sistem restoran",
        desc: "Jelajahi alur pemesanan dan pengelolaan dapur yang ada dalam project ini.",
        labelName: "NAMA PELANGGAN",
        placeholderName: "Masukkan nama pelanggan",
        labelPhone: "NOMOR TELEPON",
        labelGuests: "JUMLAH PESANAN",
        labelTable: "MEJA / AREA",
        placeholderTable: "Contoh: Meja 05",
        btnSubmit: "Masuk ke Dashboard",
        qrText: "Gunakan menu demo untuk melihat alur order",
        qrSubtext: "Tombol di bawah membawa Anda ke halaman menu digital dan sistem login.",
      },
      footer: {
        brandDesc:
          "SIMADAR adalah platform manajemen dapur restoran yang dirancang untuk mempermudah pengelolaan pesanan, dapur, dan laporan operasional.",
        col1Header: "NAVIGASI",
        col2Header: "FLOW SISTEM",
        col2Days: "Order → Dapur → Pelayanan",
        col2Hours: "Monitoring real-time",
        col2Status: "Laporan operasional terintegrasi",
        col3Header: "TIM PENGEMBANG",
        col3Owner: "Athallah S.Kom. (Owner)",
        copyright:
          "© 2026 SISTEM MANAJEMEN DAPUR RESTORAN / SIMADAR. All rights reserved.",
      },
    },
    EN: {
      nav: {
        brandTitle: "Restaurant Kitchen Management System",
        home: "Home",
        about: "About",
        menu: "Demo Features",
        system: "Workflow",
        testi: "Benefits",
        reserve: "Try System",
        login: "Login",
      },
      hero: {
        badge: "MODERN RESTAURANT MANAGEMENT SOLUTION",
        title1: "Manage Orders",
        title2: "Kitchen & Reports",
        title3: "with Ease",
        desc: "SIMADAR helps restaurant teams monitor orders, coordinate kitchen operations, and manage transactions in a single real-time system.",
        btnMenu: "See Core Features",
        btnReserve: "Open Dashboard",
        hours: "RESTAURANT WORKFLOW:",
        location: "TARGET USERS:",
        openMaps: "View Demo",
      },
      about: {
        badge: "ABOUT SIMADAR",
        title: "From table orders to financial reports, everything is connected.",
        desc: "This platform is designed for restaurant owners, waiters, and chefs to manage daily operations accurately and efficiently. Its main focus is operational smoothness and transparent data visibility.",
        feat1Title: "Real-Time Order Flow",
        feat1Desc: "Orders from waiters to the kitchen are visible and synchronized without gaps.",
        feat2Title: "Monitoring & Reporting",
        feat2Desc: "Sales and order activity can be tracked for better operational evaluation.",
      },
      menuSection: {
        badge: "DEMO FEATURES",
        title: "Digital menu demo connected to the restaurant system",
        desc: "The menu below shows how customers view available items while the restaurant team keeps order management structured and organized.",
        tabAll: "All Menu",
        tabMain: "Food",
        tabDrink: "Drinks",
        priceLabel: "PRICE",
      },
      systemSection: {
        badge: "WORKFLOW OVERVIEW",
        title: "How SIMADAR supports restaurant operations",
        desc: "From incoming orders to kitchen processing and operational reporting, each step is managed in one connected system.",
        step1Tag: "STEP 01",
        step1Title: "Order Entry & Request Handling",
        step1Desc:
          'Waiters record customer orders, add kitchen notes, and send requests to the kitchen automatically.',
        step1List: [
          "Order entry from tables or waiter devices",
          "Kitchen notes and customer-specific requests",
          "Centralized, structured order status",
        ],
        step2Badge: "OPERATIONAL BRAIN",
        step2Tag: "STEP 02",
        step2Title: "Kitchen Processing & Order Queue",
        step2Desc:
          'Chefs receive a clear queue, prioritize work, and update readiness status in real time.',
        step2List: [
          "Readable order queue",
          "Track cooking and ready-to-serve state",
          "Faster coordination between kitchen and waiters",
        ],
        step3Tag: "STEP 03",
        step3Title: "Monitoring, Payment & Reporting",
        step3Desc:
          "The system supports business oversight and operational reporting for faster, more accurate decisions.",
        step3List: [
          "Well-organized transaction data",
          "Real-time restaurant activity monitoring",
          "Sales and operational reporting support",
        ],
        stat1Title: "1 Platform",
        stat1Desc: "All workflows connected",
        stat2Title: "Real-Time",
        stat2Desc: "Order status is continuously updated",
        stat3Title: "Data",
        stat3Desc: "Useful for evaluation and reporting",
      },
      testiSection: {
        badge: "PRODUCT VALUE",
        title: "What this system offers restaurant teams",
        ratingText: "Focused on operational efficiency",
        recommendText: "✅ Reduces input errors and missed order flow",
        subtitle:
          "Designed to help restaurant teams process orders, synchronize the kitchen, and manage sales data more cleanly.",
        writeReview: "View demo",
      },
      reservationSection: {
        title: "Try the restaurant workflow demo",
        desc: "Explore the order and kitchen management flow included in this project.",
        labelName: "CUSTOMER NAME",
        placeholderName: "Enter customer name",
        labelPhone: "PHONE NUMBER",
        labelGuests: "ORDER COUNT",
        labelTable: "TABLE / AREA",
        placeholderTable: "Example: Table 05",
        btnSubmit: "Open Dashboard",
        qrText: "Use the demo menu to explore the ordering flow",
        qrSubtext: "The button below opens the digital menu and login screen for the system.",
      },
      footer: {
        brandDesc:
          "SIMADAR is a restaurant management platform designed to streamline order handling, kitchen coordination, and operational reporting.",
        col1Header: "NAVIGATION",
        col2Header: "SYSTEM FLOW",
        col2Days: "Order → Kitchen → Service",
        col2Hours: "Real-time monitoring",
        col2Status: "Integrated operational reporting",
        col3Header: "DEVELOPMENT TEAM",
        col3Owner: "Athallah S.Kom. (Owner)",
        copyright: "© 2026 RESTAURANT KITCHEN MANAGEMENT SYSTEM / SIMADAR. All rights reserved.",
      },
    },
  };

  const currentT = t[lang];

  const menuItems = [
    // --- 10 MAKANAN (category: "main") ---
    {
      id: 1,
      category: "main",
      name: "Nasi Goreng Special",
      desc:
        lang === "ID"
          ? "Nasi goreng spesial bumbu khas."
          : "Special fried rice.",
      price: "Rp 25.000",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      category: "main",
      name: "Ayam Bakar Madu",
      desc:
        lang === "ID"
          ? "Ayam bakar bumbu madu gurih."
          : "Honey grilled chicken.",
      price: "Rp 32.000",
      image:
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      category: "main",
      name: "Mie Goreng Jawa",
      desc:
        lang === "ID"
          ? "Mie goreng ala Jawa autentik."
          : "Javanese fried noodles.",
      price: "Rp 23.000",
      image:
        "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      category: "main",
      name: "Sate Ayam Madura",
      desc:
        lang === "ID"
          ? "Sate ayam bumbu kacang lezat."
          : "Madura chicken satay.",
      price: "Rp 28.000",
      image:
        "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      category: "main",
      name: "Bebek Goreng",
      desc:
        lang === "ID" ? "Bebek goreng renyah dan empuk." : "Crispy fried duck.",
      price: "Rp 38.000",
      image:
        "https://images.unsplash.com/photo-1514944298352-fff884140a3e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      category: "main",
      name: "Soto Ayam Lamongan",
      desc:
        lang === "ID"
          ? "Soto ayam berkuah kuning gurih."
          : "Lamongan chicken soto.",
      price: "Rp 22.000",
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      category: "main",
      name: "Bakso Sapi Urat",
      desc:
        lang === "ID"
          ? "Bakso sapi urat kenyal kuah segar."
          : "Beef meatballs soup.",
      price: "Rp 20.000",
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      category: "main",
      name: "Gado-Gado Jakarta",
      desc:
        lang === "ID"
          ? "Sayuran segar bumbu kacang."
          : "Indonesian vegetable salad.",
      price: "Rp 18.000",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      category: "main",
      name: "Nasi Uduk Komplit",
      desc:
        lang === "ID"
          ? "Nasi uduk gurih lauk lengkap."
          : "Complete fragrant coconut rice.",
      price: "Rp 24.000",
      image:
        "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 10,
      category: "main",
      name: "Capcay Kuah Seafood",
      desc:
        lang === "ID"
          ? "Tumis aneka sayur dan seafood."
          : "Seafood vegetable stir-fry.",
      price: "Rp 27.000",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    },

    // --- 10 MINUMAN (category: "drink") ---
    {
      id: 21,
      category: "drink",
      name: "Es Teh Manis",
      desc: lang === "ID" ? "Teh manis dingin menyegarkan." : "Iced sweet tea.",
      price: "Rp 6.000",
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 22,
      category: "drink",
      name: "Jus Jeruk Segar",
      desc: lang === "ID" ? "Jus buah jeruk asli." : "Fresh orange juice.",
      price: "Rp 14.000",
      image:
        "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 23,
      category: "drink",
      name: "Es Jeruk Nipis",
      desc: lang === "ID" ? "Perasan jeruk nipis segar." : "Lime ice.",
      price: "Rp 10.000",
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 24,
      category: "drink",
      name: "Es Campur Bandung",
      desc:
        lang === "ID"
          ? "Es campur buah dan agar."
          : "Bandung mixed ice dessert.",
      price: "Rp 18.000",
      image:
        "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 25,
      category: "drink",
      name: "Jus Alpukat",
      desc: lang === "ID" ? "Jus alpukat susu cokelat." : "Avocado juice.",
      price: "Rp 16.000",
      image:
        "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 26,
      category: "drink",
      name: "Es Teler Special",
      desc:
        lang === "ID"
          ? "Es teler buah nangka dan alpukat."
          : "Special teler ice.",
      price: "Rp 19.000",
      image:
        "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 27,
      category: "drink",
      name: "Kopi Susu Gula Aren",
      desc:
        lang === "ID"
          ? "Kopi susu gula aren legit."
          : "Palm sugar milk coffee.",
      price: "Rp 20.000",
      image:
        "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 28,
      category: "drink",
      name: "Teh Tawar Hangat",
      desc: lang === "ID" ? "Teh tawar hangat alami." : "Warm plain tea.",
      price: "Rp 4.000",
      image:
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 29,
      category: "drink",
      name: "Es Lemon Tea",
      desc: lang === "ID" ? "Teh lemon dingin segar." : "Iced lemon tea.",
      price: "Rp 12.000",
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 30,
      category: "drink",
      name: "Jus Mangga",
      desc: lang === "ID" ? "Jus buah mangga manis." : "Mango juice.",
      price: "Rp 17.000",
      image:
        "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80",
    },
  ];
  const testimonials = [
    {
      name: "Sarah Amalia",
      role:
        lang === "ID"
          ? "Pengunjung Setia • Meja 04"
          : "Loyal Visitor • Table 04",
      time: lang === "ID" ? "2 hari yang lalu" : "2 days ago",
      rating: "5.0",
      comment:
        lang === "ID"
          ? '"Pelayanannya sangat cepat! Makanan datang masih panas dan segar. Pesan lewat QR code di meja sangat praktis."'
          : '"Service was super fast! Food arrived hot and fresh. Ordering via QR code was so practical."',
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Rehan Pratama",
      role: "Food Vlogger • VIP Table",
      time: lang === "ID" ? "1 minggu yang lalu" : "1 week ago",
      rating: "5.0",
      comment:
        lang === "ID"
          ? '"Suasana restoran sangat nyaman, higienis, dan menunya enak banget terutama Pizza keju asapnya Juara!"'
          : '"Restaurant vibe is so comfortable, clean, and the menu is delicious especially the Smoked Cheese Pizza!"',
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Dian Sastrowardoyo",
      role: lang === "ID" ? "Pengguna Sistem • Meja 12" : "System User • Table 12",
      time: lang === "ID" ? "2 minggu yang lalu" : "2 weeks ago",
      rating: "4.8",
      comment:
        lang === "ID"
          ? '"Sistem pemesanannya transparan dan kasirnya ramah. Tidak ada lagi salah catat pesanan meja."'
          : '"Transparent ordering system and friendly staff. No more order recording mistakes."',
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
  ];

  const filteredItems =
    activeTab === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeTab);

  return (
    <div className="min-h-screen bg-[#F0E8C2] text-slate-800 font-sans selection:bg-blue-300">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#F0E8C2]/90 backdrop-blur-md border-b border-blue-200/60 px-4 md:px-12 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-800 text-white p-2.5 rounded-2xl shadow-md">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black text-slate-800 tracking-tight block leading-tight">
                Sistem Manajemen Dapur Restoran
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                <b>SIMADAR</b>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tombol Pilihan Bahasa dengan Bendera Country */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white/80 hover:bg-white px-3.5 py-2 rounded-full border border-slate-300 transition-all shadow-sm active:scale-95"
              >
                <span className="text-base leading-none">
                  {lang === "ID" ? "🇮🇩" : "🇺🇸"}
                </span>
                <span>{lang === "ID" ? "ID (Indonesia)" : "EN (English)"}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Pilih Bahasa / Language
                  </div>
                  {languages.map((item) => {
                    const isSelected = lang === item.code;
                    return (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLang(item.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left font-bold ${
                          isSelected
                            ? "bg-blue-50 text-blue-800"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">
                            {item.code === "ID" ? "🇮🇩" : "🇺🇸"}
                          </span>
                          <span>{item.name}</span>
                        </div>
                        {isSelected && (
                          <div className="bg-blue-600 text-white rounded-full p-0.5 shadow-sm">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Tombol Login */}
            <button
              onClick={onNavigateToLogin}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs px-4 py-2 rounded-full border border-slate-300 shadow-sm transition-all hover:shadow-md cursor-pointer whitespace-nowrap shrink-0"
            >
              <User className="w-3.5 h-3.5" />
              <span>{currentT.nav.login}</span>
            </button>

            {/* Tombol Garis Tiga (Hamburger Menu) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-white/80 hover:bg-white text-slate-800 rounded-full border border-slate-300 shadow-sm transition-all cursor-pointer flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Dropdown Menu Garis Tiga (Navigasi Lengkap dari Home sampai Reservasi) */}
        {isMobileMenuOpen && (
          <div className="max-w-7xl mx-auto mt-3 bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-2">
              <a
                href="#home"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all"
              >
                {currentT.nav.home}
              </a>
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all"
              >
                {currentT.nav.about}
              </a>
              <a
                href="#menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all"
              >
                {currentT.nav.menu}
              </a>
              <a
                href="#system"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all"
              >
                {currentT.nav.system}
              </a>
              <a
                href="#testimonials"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all"
              >
                {currentT.nav.testi}
              </a>
              <a
                href="#reservation"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all"
              >
                {currentT.nav.reserve}
              </a>
            </nav>
          </div>
        )}
      </nav>
      {/* HERO SECTION */}
      <section id="home" className="pt-8 pb-12 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-blue-200/80 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-slate-700 tracking-wide shadow-sm">
              <Utensils className="w-3.5 h-3.5 text-slate-600" />
              <span>{currentT.hero.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight">
              {currentT.hero.title1} <br />
              <span className="text-slate-600">{currentT.hero.title2}</span>
              <span className="block text-slate-500">{currentT.hero.title3}</span>
            </h1>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl font-medium">
              {currentT.hero.desc}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#system"
                className="flex items-center gap-2 bg-[#2c335a] hover:bg-[#1f2544] text-white px-6 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <span>{currentT.hero.btnMenu}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <button
                onClick={onNavigateToLogin}
                className="flex items-center gap-2 bg-[#7a95ba] hover:bg-[#6882a7] text-white px-6 py-3 rounded-full text-sm font-bold shadow-sm transition-all"
              >
                <span>{currentT.hero.btnReserve}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-2 bg-white/40 shadow-2xl backdrop-blur-sm border border-white/60">
              <img
                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80"
                    alt="Restaurant dashboard concept"
                className="w-full h-full object-cover rounded-full shadow-inner"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200 shadow-xl flex items-center gap-2 whitespace-nowrap">
                <span className="text-xs font-extrabold text-slate-800">
                      Live Order Panel
                </span>
                <span className="text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                      24 Orders
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* INFO BAR */}
        <div className="mt-12 bg-[#89b4f2] border border-blue-300/80 rounded-2xl p-4 sm:p-5 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-800">
          <div className="flex items-center gap-3.5 px-3">
            <div className="bg-white/80 p-3 rounded-full text-slate-700 shadow-sm shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
                SYSTEM ACCESS:
              </p>
              <p className="text-sm font-black text-slate-900">
                Login / Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-3 border-t md:border-t-0 md:border-l border-blue-300/80 pt-3 md:pt-0">
            <div className="bg-white/80 p-3 rounded-full text-slate-700 shadow-sm shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
                {currentT.hero.hours}
              </p>
              <p className="text-sm font-black text-slate-900">
                Order → Kitchen → Service
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-3 border-t md:border-t-0 md:border-l border-blue-300/80 pt-3 md:pt-0 justify-between">
            <div className="flex items-center gap-3.5">
              <div className="bg-white/80 p-3 rounded-full text-slate-700 shadow-sm shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
                  {currentT.hero.location}
                </p>
                <p className="text-xs font-black text-slate-900">
                  Restaurant Owner / Manager / Staff
                </p>
                <p className="text-[10px] font-semibold text-slate-700">
                  Monitoring & reporting system
                </p>
              </div>
            </div>
            <button
              onClick={onNavigateToLogin}
              className="hidden sm:flex items-center gap-1 bg-[#2c335a] hover:bg-[#1f2544] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
            >
              <span>{currentT.hero.openMaps}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-12 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-2xl shadow-md h-64 border border-white/40">
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80"
                alt="Restaurant operations dashboard"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-md h-64 border border-white/40 mt-6">
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80"
                alt="Kitchen coordination workflow"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="inline-block bg-white/80 border border-blue-200 px-3.5 py-1 rounded-full text-[10px] font-bold text-slate-700 tracking-wider uppercase">
              {currentT.about.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {currentT.about.title}
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              {currentT.about.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white/90 p-4 rounded-xl border border-blue-100 shadow-sm flex items-start gap-3">
                <div className="bg-blue-100 p-2.5 rounded-lg text-blue-700 shrink-0">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    {currentT.about.feat1Title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {currentT.about.feat1Desc}
                  </p>
                </div>
              </div>

              <div className="bg-white/90 p-4 rounded-xl border border-blue-100 shadow-sm flex items-start gap-3">
                <div className="bg-blue-100 p-2.5 rounded-lg text-blue-700 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    {currentT.about.feat2Title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {currentT.about.feat2Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SYSTEM SECTION */}
      <section id="system" className="py-12 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-block bg-white/80 border border-blue-200 px-3.5 py-1 rounded-full text-[10px] font-bold text-slate-700 tracking-wider uppercase">
            {currentT.systemSection.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {currentT.systemSection.title}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto">
            {currentT.systemSection.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm relative space-y-4">
            <div className="flex items-center justify-between">
              <div className="bg-blue-50 text-blue-700 p-3 rounded-xl">
                <QrCode className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold text-slate-600 bg-slate-100 px-3 py-1 rounded-full uppercase">
                {currentT.systemSection.step1Tag}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              {currentT.systemSection.step1Title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {currentT.systemSection.step1Desc}
            </p>
            <ul className="space-y-1.5 pt-2 text-[11px] font-semibold text-slate-600">
              {currentT.systemSection.step1List.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-slate-700 shadow-md relative space-y-4">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
              {currentT.systemSection.step2Badge}
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="bg-blue-50 text-blue-700 p-3 rounded-xl">
                <ChefHat className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold text-slate-600 bg-slate-100 px-3 py-1 rounded-full uppercase">
                {currentT.systemSection.step2Tag}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              {currentT.systemSection.step2Title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {currentT.systemSection.step2Desc}
            </p>
            <ul className="space-y-1.5 pt-2 text-[11px] font-semibold text-slate-600">
              {currentT.systemSection.step2List.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm relative space-y-4">
            <div className="flex items-center justify-between">
              <div className="bg-blue-50 text-blue-700 p-3 rounded-xl">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold text-slate-600 bg-slate-100 px-3 py-1 rounded-full uppercase">
                {currentT.systemSection.step3Tag}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              {currentT.systemSection.step3Title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {currentT.systemSection.step3Desc}
            </p>
            <ul className="space-y-1.5 pt-2 text-[11px] font-semibold text-slate-600">
              {currentT.systemSection.step3List.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-[#2c335a] text-white rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-4">
            <Zap className="w-8 h-8 text-amber-400" />
            <div className="text-left">
              <p className="text-2xl font-black">
                {currentT.systemSection.stat1Title}
              </p>
              <p className="text-[11px] text-slate-300 font-semibold uppercase">
                {currentT.systemSection.stat1Desc}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <div className="text-left">
              <p className="text-2xl font-black">
                {currentT.systemSection.stat2Title}
              </p>
              <p className="text-[11px] text-slate-300 font-semibold uppercase">
                {currentT.systemSection.stat2Desc}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0">
            <Clock className="w-8 h-8 text-blue-400" />
            <div className="text-left">
              <p className="text-2xl font-black">
                {currentT.systemSection.stat3Title}
              </p>
              <p className="text-[11px] text-slate-300 font-semibold uppercase">
                {currentT.systemSection.stat3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QR SECTION */}
      <section
        id="qr"
        className="py-12 px-4 md:px-12 max-w-7xl mx-auto space-y-6"
      >

        <div
          id="reservation"
          className="bg-[#2c335a] text-white rounded-3xl p-6 sm:p-10 shadow-2xl max-w-2xl mx-auto border border-slate-700 mt-12 text-center space-y-6"
        >
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              {currentT.reservationSection.title}
            </h3>
            <p className="text-slate-300 text-xs">
              {currentT.reservationSection.desc}
            </p>
          </div>

          <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 text-center space-y-4 flex flex-col items-center justify-center max-w-sm mx-auto shadow-inner">
            <div className="bg-white p-4 rounded-xl shadow-md inline-block">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SIMADARDemoSystem"
                alt="QR Menu"
                className="w-48 h-48 mx-auto object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                {currentT.reservationSection.qrText}
              </p>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                {currentT.reservationSection.qrSubtext}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onNavigateToLogin}
              className="w-full max-w-md mx-auto bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm py-3.5 px-6 rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{currentT.reservationSection.btnSubmit}</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-[#3b476b] text-slate-300 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-500/40">
            <div className="md:col-span-4 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="bg-[#89a1c2] text-[#2c335a] p-2 rounded-xl shadow-sm">
                  <Utensils className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  SIMADAR
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-normal">
                {currentT.footer.brandDesc}
              </p>
            </div>

            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {currentT.footer.col1Header}
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 font-normal">
                <li>
                  <a
                    href="#home"
                    className="hover:text-white transition-colors"
                  >
                    {currentT.nav.home}
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    {currentT.nav.about}
                  </a>
                </li>
                <li>
                  <a
                    href="#system"
                    className="hover:text-white transition-colors"
                  >
                    {currentT.nav.system}
                  </a>
                </li>
                <li>
                  <a
                    href="#reservation"
                    className="hover:text-white transition-colors"
                  >
                    {currentT.nav.reserve}
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {currentT.footer.col2Header}
              </h4>
              <div className="space-y-1.5 text-xs text-slate-300 font-normal">
                <p>{currentT.footer.col2Days}</p>
                <p>{currentT.footer.col2Hours}</p>
                <p>{currentT.footer.col2Status}</p>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {currentT.footer.col3Header}
              </h4>
              <div className="space-y-1.5 text-xs text-slate-300 font-normal">
                <p>{currentT.footer.col3Owner}</p>
                <p>Lambok Christian Sipayung</p>
                <p>M. Daffa Rifki Yanto</p>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center text-xs text-slate-400 font-normal">
            {currentT.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
