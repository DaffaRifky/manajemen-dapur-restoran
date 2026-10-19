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
        about: "About Us",
        menu: "Menu Favorit",
        system: "Layanan Sistem",
        testi: "Testimoni",
        reserve: "Reservasi Meja",
        login: "Login",
      },
      hero: {
        badge: "NIKMATI PENGALAMAN KULINER TERBAIK & HIGIENIS",
        title1: "Nikmati Makanan Lezat", // ✅ SUDAH BAHASA INDONESIA
        title2: "Dalam", // ✅ SUDAH BAHASA INDONESIA
        title3: "Hidup Sehat Anda", // ✅ SUDAH BAHASA INDONESIA
        desc: "Rasakan kecepatan penyajian makanan langsung dari koki profesional ke meja Anda berkat sistem otomatisasi dapur modern berteknologi mutakhir.",
        btnMenu: "Lihat Menu Kami",
        btnReserve: "Pesan Meja Sekarang",
        hours: "BUKA SETIAP HARI:",
        location: "LOKASI RESTO:",
        openMaps: "Buka di Maps",
      },
      about: {
        badge: "TENTANG SIMADAR",
        title: "Kenyamanan & Kelezatan Berpadu dengan Teknologi Modern",
        desc: "Kami berkomitmen menyajikan hidangan berkualitas tinggi dengan bahan-bahan segar pilihan. Didukung sistem dapur otomatis terpadu, setiap pesanan diproses secara cepat, akurat, dan higienis langsung dari meja Anda.",
        feat1Title: "Dapur Higienis & Cepat",
        feat1Desc: "Antrean otomatis FIFO terintegrasi.",
        feat2Title: "Koki Profesional",
        feat2Desc: "Sajikan cita rasa bintang lima.",
      },
      menuSection: {
        badge: "HIDANGAN POPULER",
        title: "Menu Favorit Pilihan Tamu",
        desc: "Pilih kategori di bawah untuk menampilkan 10 makanan lezat dan 10 minuman segar.",
        tabAll: "Semua Menu (20)",
        tabMain: "Makanan (10)",
        tabDrink: "Minuman (10)",
        priceLabel: "HARGA",
      },
      systemSection: {
        badge: "TEKNOLOGI RESTOMODERN",
        title: "Bagaimana Sistem Kami Bekerja untuk Anda?",
        desc: "Transparansi dan kecepatan dari pemesanan hingga makanan disajikan hangat ke meja tamu secara real-time.",
        step1Tag: "LANGKAH 01",
        step1Title: "Pesan Mandiri via QR / Tablet Waiter",
        step1Desc:
          'Tamu memindai "QR Code" di meja atau dibantu waiter untuk memilih menu secara digital. Pesanan terverifikasi langsung terhubung ke dapur.',
        step1List: [
          "Tanpa antre lama di meja kasir",
          "Pencatatan nomor meja otomatis",
          "Kustomisasi catatan pesanan/alergi",
        ],
        step2Badge: "OTAK PENGOLAHAN",
        step2Tag: "LANGKAH 02",
        step2Title: "Dapur Otomatis KDS & Antrean FIFO",
        step2Desc:
          'Layar dapur ("Kitchen Display System") menerima pesanan seketika dengan urutan FIFO ("First-In, First-Out") untuk menjaga kecepatan masak koki.',
        step2List: [
          "Bebas risiko kertas nota hilang/basah",
          "Timer estimasi waktu penyajian koki",
          'Status pesanan ("Cooking / Ready")',
        ],
        step3Tag: "LANGKAH 03",
        step3Title: "Penyajian Cepat & Pembayaran Mudah",
        step3Desc:
          "Sistem memberi notifikasi ke waiter saat masakan matang untuk disajikan hangat, dilanjutkan pembayaran tunai, QRIS, atau kartu di kasir.",
        step3List: [
          "Makanan disajikan saat kondisi terbaik",
          "Dukungan pembayaran QRIS / Cash / Card",
          "Cetak struk fisik atau e-receipt digital",
        ],
        stat1Title: "10-15 Mnt",
        stat1Desc: "Rata-rata Penyajian Dapur",
        stat2Title: "100% Akurat",
        stat2Desc: "Bebas Salah Catat Pesanan",
        stat3Title: "Real-Time",
        stat3Desc: "Sinkronisasi Dapur & Kasir",
      },
      testiSection: {
        badge: "TESTIMONI TAMU",
        title: "Apa Kata Mereka yang Pernah Berkunjung?",
        ratingText: "Berdasarkan 1,280+ Ulasan",
        recommendText: "👍 98% Tamu Merekomendasikan SIMADAR",
        subtitle:
          "Menampilkan 3 ulasan pilihan terbaru dari total 1,280+ ulasan tamu.",
        writeReview: "Tulis Ulasan1",
      },
      reservationSection: {
        title: "Pemesanan Menu QR",
        desc: "Amankan meja terbaik Anda dan nikmati pemesanan cepat melalui QR code.",
        labelName: "NAMA LENGKAP TAMU",
        placeholderName: "Masukkan nama lengkap",
        labelPhone: "NOMOR TELEPON / WHATSAPP",
        labelGuests: "JUMLAH TAMU",
        labelTable: "NOMOR MEJA",
        placeholderTable: "Contoh: Meja 05",
        btnSubmit: "Konfirmasi Reservasi Sekarang",
        qrText: "Scan barcode untuk memesan makanan",
        qrSubtext: "",
      },
      footer: {
        brandDesc:
          "Sistem Manajemen Dapur Restoran modern berstandar tinggi. Mendukung dwibahasa (ID/EN).",
        col1Header: "NAVIGASI TAMU",
        col2Header: "JAM OPERASIONAL",
        col2Days: "Senin - Minggu",
        col2Hours: "10.00 AM - 22.00 PM WIB",
        col2Status: "Layanan Dapur Real-Time aktif",
        col3Header: "TIM PENGEMBANG PBL",
        col3Owner: "Athallah S.Kom. (Owner)",
        copyright:
          "© 2026 SISTEM MANAJEMEN DAPUR RESTORAN / SIMADAR. All rights reserved.",
      },
    },
    EN: {
      nav: {
        brandTitle: "Restaurant Kitchen Management System", // <-- Ditambahkan
        home: "Home",
        about: "About Us",
        menu: "Favorite Menu",
        system: "System Services",
        testi: "Testimonials",
        reserve: "Table Reservation",
        login: "Login",
      },
      hero: {
        badge: "ENJOY THE BEST & HYGIENIC CULINARY EXPERIENCE",
        title1: "Enjoy Delicious Food",
        title2: "In Your",
        title3: "Healthy Life",
        desc: "Experience fast serving speeds directly from professional chefs to your table, powered by cutting-edge kitchen automation systems.",
        btnMenu: "View Our Menu",
        btnReserve: "Book Table Now",
        hours: "OPEN EVERY DAY:",
        location: "RESTAURANT LOCATION:",
        openMaps: "Open in Maps",
      },
      about: {
        badge: "ABOUT SIMADAR",
        title: "Comfort & Taste Combined with Modern Technology",
        desc: "We are committed to serving high-quality dishes using selected fresh ingredients. Backed by an integrated kitchen automation system, every order is processed quickly, accurately, and hygienically right from your table.",
        feat1Title: "Hygienic & Fast Kitchen",
        feat1Desc: "Integrated FIFO automatic queue.",
        feat2Title: "Professional Chef",
        feat2Desc: "Five-star flavor presentation.",
      },
      menuSection: {
        badge: "POPULAR DISHES",
        title: "Guest Favorite Menu",
        desc: "Select a category below to view our delicious meals or refreshing signature beverages.",
        tabAll: "All Menu",
        tabMain: "Main Course (6)",
        tabDrink: "Fresh Drinks (6)",

        priceLabel: "PRICE",
        viewAll: "Explore Complete Restaurant Menu",
      },
      systemSection: {
        badge: "RESTOMODERN TECHNOLOGY",
        title: "How Our System Works For You?",
        desc: "Transparency and speed from order placement to hot food served at your table in real-time.",
        step1Tag: "STEP 01",
        step1Title: "Self-Order via QR / Waiter Tablet",
        step1Desc:
          "Guests scan the QR code on the table or get assisted by waiters to pick items digitally. Verified orders connect instantly to the kitchen.",
        step1List: [
          "No long queues at the cashier counter",
          "Automated table number logging",
          "Customizable order notes & allergy alerts",
        ],
        step2Badge: "PROCESSING BRAIN",
        step2Tag: "STEP 02",
        step2Title: "Automated KDS & FIFO Queue",
        step2Desc:
          "The Kitchen Display System receives orders instantly using FIFO (First-In, First-Out) sequence to maintain cooking pace.",
        step2List: [
          "Zero risk of lost or wet paper tickets",
          "Chef preparation timer estimates",
          "Real-time order status (Cooking / Ready)",
        ],
        step3Tag: "STEP 03",
        step3Title: "Fast Serving & Easy Payment",
        step3Desc:
          "System notifies waiters when food is ready so it is served warm, followed by easy payment via cash, QRIS, or card.",
        step3List: [
          "Food served in peak fresh condition",
          "Seamless QRIS / Cash / Card support",
          "Physical paper receipt or digital e-receipt",
        ],
        stat1Title: "10-15 Mins",
        stat1Desc: "Average Kitchen Prep Time",
        stat2Title: "100% Accurate",
        stat2Desc: "Zero Order Recording Errors",
        stat3Title: "Real-Time",
        stat3Desc: "Kitchen & Cashier Sync",
      },
      testiSection: {
        badge: "GUEST TESTIMONIALS",
        title: "What Do Our Visitors Say?",
        ratingText: "Based on 1,280+ Reviews",
        recommendText: "👍 98% of Guests Recommend SIMADAR",
        subtitle:
          "Showing 3 featured recent reviews from a total of 1,280+ guest reviews.",
        writeReview: "Write Review",
      },
      reservationSection: {
        title: "Table Reservation & QR Ordering",
        desc: "Reserve your best table and enjoy instant digital ordering via QR code.",
        labelName: "GUEST FULL NAME",
        placeholderName: "Enter full name",
        labelPhone: "PHONE NUMBER / WHATSAPP",
        labelGuests: "NUMBER OF GUESTS",
        labelTable: "TABLE NUMBER",
        placeholderTable: "Example: Table 05",
        btnSubmit: "Confirm Reservation Now",
        qrText: "Scan barcode to order food",
        qrSubtext:
          "Type or scan the QR code above to navigate directly to the digital menu.",
      },
      footer: {
        brandDesc:
          "High-standard modern Restaurant Kitchen Management System. Supports dual-language (ID/EN).",
        col1Header: "GUEST NAVIGATION",
        col2Header: "OPERATING HOURS",
        col2Days: "Monday - Sunday",
        col2Hours: "10.00 AM - 22.00 PM WIB",
        col2Status: "Real-Time Kitchen Service Active",
        col3Header: "PBL DEVELOPMENT TEAM",
        col3Owner: "Athallah S.Kom. (Owner)",
        copyright: "© 2026 SIMADAR / Si Pekas Polibatam. All rights reserved.",
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
      role: lang === "ID" ? "Akademisi • Meja 12" : "Academician • Table 12",
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
    <div className="min-h-screen bg-[#b9d7fc] text-slate-800 font-sans selection:bg-blue-300">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#b9d7fc]/90 backdrop-blur-md border-b border-blue-200/60 px-4 md:px-12 py-3 transition-all">
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

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
              {currentT.hero.title1} <br />
              {currentT.hero.title2}{" "}
              <span className="text-slate-500">{currentT.hero.title3}</span>
            </h1>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl font-medium">
              {currentT.hero.desc}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#menu"
                className="flex items-center gap-2 bg-[#2c335a] hover:bg-[#1f2544] text-white px-6 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <span>{currentT.hero.btnMenu}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#reservation"
                className="flex items-center gap-2 bg-[#7a95ba] hover:bg-[#6882a7] text-white px-6 py-3 rounded-full text-sm font-bold shadow-sm transition-all"
              >
                <span>{currentT.hero.btnReserve}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-2 bg-white/40 shadow-2xl backdrop-blur-sm border border-white/60">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
                alt="Chef Special Pizza"
                className="w-full h-full object-cover rounded-full shadow-inner"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200 shadow-xl flex items-center gap-2 whitespace-nowrap">
                <span className="text-xs font-extrabold text-slate-800">
                  Chef Special Pizza
                </span>
                <span className="text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  Rp 68.000
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
                RESERVASI / WHATSAPP:
              </p>
              <p className="text-sm font-black text-slate-900">
                +62 812-3456-7890
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
                10.00 - 22.00 WIB
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
                  Grand Delight Culinary District
                </p>
                <p className="text-[10px] font-semibold text-slate-700">
                  Kawasan Kuliner Premium Blok A No. 12-15, Batam Center
                </p>
              </div>
            </div>
            <button className="hidden sm:flex items-center gap-1 bg-[#2c335a] hover:bg-[#1f2544] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0">
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
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                alt="Resto Interior 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-md h-64 border border-white/40 mt-6">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                alt="Resto Interior 2"
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

      {/* MENU FAVORIT SECTION */}
      <section id="menu" className="py-12 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-block bg-white/80 border border-blue-200 px-3.5 py-1 rounded-full text-[10px] font-bold text-slate-700 tracking-wider uppercase">
            {currentT.menuSection.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {currentT.menuSection.title}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            {currentT.menuSection.desc}
          </p>

          <div className="flex justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                activeTab === "all"
                  ? "bg-[#2c335a] text-white shadow-md"
                  : "bg-white/80 text-slate-700 hover:bg-white"
              }`}
            >
              {currentT.menuSection.tabAll}
            </button>
            <button
              onClick={() => setActiveTab("main")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                activeTab === "main"
                  ? "bg-[#2c335a] text-white shadow-md"
                  : "bg-white/80 text-slate-700 hover:bg-white"
              }`}
            >
              {currentT.menuSection.tabMain}
            </button>
            <button
              onClick={() => setActiveTab("drink")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                activeTab === "drink"
                  ? "bg-[#2c335a] text-white shadow-md"
                  : "bg-white/80 text-slate-700 hover:bg-white"
              }`}
            >
              {currentT.menuSection.tabDrink}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-blue-100/60 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-3 left-3 text-[10px] font-black text-white px-2.5 py-1 rounded-md shadow-sm ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
                {item.calories && (
                  <span className="absolute bottom-3 right-3 text-[10px] font-extrabold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md">
                    {item.calories}
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs mb-3">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                    </div>
                    <span className="font-extrabold text-slate-800 text-xs">
                      {item.rating}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      ({item.reviews} ulasan)
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {currentT.menuSection.priceLabel}
                      </span>
                      <span className="text-base font-black text-slate-900">
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

      {/* TESTIMONIALS SECTION */}
      <section
        id="testimonials"
        className="py-12 px-4 md:px-12 max-w-7xl mx-auto space-y-6"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#384959] tracking-tight">
            {currentT.testiSection.title}
          </h2>

          {/* BADGES */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2">
              <span className="text-lg font-black text-[#384959]">4.9</span>
              <div className="flex text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <span className="text-[10px] text-slate-400 font-extrabold">
                {currentT.testiSection.ratingText}
              </span>
            </div>

            <div className="bg-[#6A89A7] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5">
              <span>{currentT.testiSection.recommendText}</span>
            </div>
          </div>

          <p className="text-slate-500 text-xs font-semibold">
            {currentT.testiSection.subtitle}
          </p>
        </div>

        {/* TESTIMONIAL CARDS CONTAINER */}
        <div className="relative max-w-6xl mx-auto pt-4">
          {/* CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testi, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-xs border border-[#88BDF2]/50 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="text-xs font-bold text-[#384959] ml-1">
                        {testi.rating}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      {testi.time}
                    </span>
                  </div>

                  <p className="text-slate-600 text-xs italic leading-relaxed font-medium">
                    {testi.comment}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={testi.avatar}
                    alt={testi.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-extrabold text-[#384959]">
                      — {testi.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-semibold">
                      {testi.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
   <br></br>


        {/* FORM RESERVASI MEJA DIUBAH MENJADI HANYA QR CODE & TOMBOL LANGSUNG */}
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

          {/* KOTAK BARCODE DI TENGAH */}
          <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 text-center space-y-4 flex flex-col items-center justify-center max-w-sm mx-auto shadow-inner">
            <div className="bg-white p-4 rounded-xl shadow-md inline-block">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SIMADARMenu"
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

          {/* TOMBOL TAUTAN LANGSUNG KE PESAN MENU */}
          <div className="pt-2">
            <button
              onClick={onNavigateToPesanMenu}
              className="w-full max-w-md mx-auto bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm py-3.5 px-6 rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Klik Langsung Menuju Pesan menu</span>
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
                    href="#menu"
                    className="hover:text-white transition-colors"
                  >
                    {currentT.nav.menu}
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
