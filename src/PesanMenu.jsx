import React, { useState } from "react";
import {
  Utensils,
  Grid,
  Clock,
  LogOut,
  X,
  ChevronDown,
  Plus,
  Minus,
  CheckCircle2, // <-- Tambahkan ikon ini di sini
} from "lucide-react";

export default function PesanMenu({
  onNavigateToHome,
  orders = [],
  setOrders,
}) {
  // Tab Navigasi Dashboard Pelanggan ('ringkasan', 'pesan-menu', 'pesananku')
  const [activeNav, setActiveNav] = useState("ringkasan");

  // Mode Pemesanan: 'dinein' (Scan QR) atau 'takeaway' (Pesan dari rumah)
  const [orderType, setOrderType] = useState("dinein");
  const [selectedTable, setSelectedTable] = useState("Meja 1");

  // Bahasa (ID / EN) & Dropdown
  const [lang, setLang] = useState("ID");
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Form Pelanggan
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [orderNote, setOrderNote] = useState("");

  // Popup Modal "Lihat Menu"
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  // ==================== DAFTAR 40 MENU LENGKAP ====================
  // (20 Makanan & 20 Minuman Persis Sesuai Gambar Referensi Anda)
  const menu40Items = [
    // 20 Makanan
    {
      id: 1,
      name: "Nasi Goreng Special",
      category: "Makanan",
      price: 25000,
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Ayam Bakar Madu",
      category: "Makanan",
      price: 32000,
      image:
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Mie Goreng Jawa",
      category: "Makanan",
      price: 23000,
      image:
        "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Sate Ayam Madura",
      category: "Makanan",
      price: 28000,
      image:
        "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      name: "Bebek Goreng",
      category: "Makanan",
      price: 38000,
      image:
        "https://images.unsplash.com/photo-1514944298352-fff884140a3e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      name: "Soto Ayam Lamongan",
      category: "Makanan",
      price: 22000,
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      name: "Bakso Sapi Urat",
      category: "Makanan",
      price: 20000,
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      name: "Gado-Gado Jakarta",
      category: "Makanan",
      price: 18000,
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      name: "Nasi Uduk Komplit",
      category: "Makanan",
      price: 24000,
      image:
        "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 10,
      name: "Capcay Kuah Seafood",
      category: "Makanan",
      price: 27000,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 11,
      name: "Nasi Padang Rendang",
      category: "Makanan",
      price: 30000,
      image:
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 12,
      name: "Kwetiau Goreng",
      category: "Makanan",
      price: 23000,
      image:
        "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 13,
      name: "Ikan Gurame Bakar",
      category: "Makanan",
      price: 65000,
      image:
        "https://images.unsplash.com/photo-1514944298352-fff884140a3e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 14,
      name: "Nasi Campur Bali",
      category: "Makanan",
      price: 32000,
      image:
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 15,
      name: "Ayam Penyet Sambal Ijo",
      category: "Makanan",
      price: 26000,
      image:
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 16,
      name: "Soup Buntut Sapi",
      category: "Makanan",
      price: 45000,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 17,
      name: "Mie Ayam Jamur",
      category: "Makanan",
      price: 19000,
      image:
        "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 18,
      name: "Nasi Goreng Seafood",
      category: "Makanan",
      price: 29000,
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 19,
      name: "Tahu Telor Asin",
      category: "Makanan",
      price: 21000,
      image:
        "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 20,
      name: "Bubur Ayam Special",
      category: "Makanan",
      price: 17000,
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    },

    // 20 Minuman
    {
      id: 21,
      name: "Es Teh Manis",
      category: "Minuman",
      price: 6000,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 22,
      name: "Jus Jeruk Segar",
      category: "Minuman",
      price: 14000,
      image:
        "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 23,
      name: "Es Jeruk Nipis",
      category: "Minuman",
      price: 10000,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 24,
      name: "Es Campur Bandung",
      category: "Minuman",
      price: 18000,
      image:
        "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 25,
      name: "Jus Alpukat",
      category: "Minuman",
      price: 16000,
      image:
        "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 26,
      name: "Es Teler Special",
      category: "Minuman",
      price: 19000,
      image:
        "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 27,
      name: "Kopi Susu Gula Aren",
      category: "Minuman",
      price: 20000,
      image:
        "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 28,
      name: "Teh Tawar Hangat",
      category: "Minuman",
      price: 4000,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 29,
      name: "Es Lemon Tea",
      category: "Minuman",
      price: 12000,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 30,
      name: "Jus Mangga",
      category: "Minuman",
      price: 17000,
      image:
        "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 31,
      name: "Es Kelapa Muda",
      category: "Minuman",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 32,
      name: "Soda Gembira",
      category: "Minuman",
      price: 16000,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 33,
      name: "Milkshake Chocolate",
      category: "Minuman",
      price: 22000,
      image:
        "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 34,
      name: "Milkshake Strawberry",
      category: "Minuman",
      price: 22000,
      image:
        "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 35,
      name: "Wedang Jahe",
      category: "Minuman",
      price: 12000,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 36,
      name: "Bajigur Hangat",
      category: "Minuman",
      price: 13000,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 37,
      name: "Es Lychee Tea",
      category: "Minuman",
      price: 18000,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 38,
      name: "Jus Jambu Merah",
      category: "Minuman",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 39,
      name: "Mineral Water 600ml",
      category: "Minuman",
      price: 5000,
      image:
        "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 40,
      name: "Es Timun Suri",
      category: "Minuman",
      price: 14000,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
    },
  ];

  // KERANJANG AWAL KOSONG (Hanya terisi jika pengguna memilih dari pop-up Lihat Menu)
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert(
        lang === "ID"
          ? "Keranjang masih kosong! Silakan pilih menu terlebih dahulu."
          : "Cart is empty!",
      );
      return;
    }

    // Format Objek Pesanan yang 100% cocok dengan ChefDashboard.jsx
    const newOrder = {
      id: Date.now(),
      table:
        orderType === "dinein"
          ? selectedTable.replace("Meja ", "")
          : "Takeaway",
      customer: customerName || "Pelanggan",
      phone: customerPhone || "-",
      type: orderType === "dinein" ? "Dine In" : "Takeaway",
      items: cart.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        note: orderNote || "-",
      })),
      total: grandTotal,
      payment: paymentMethod,
      notes: orderNote || "-", // Sesuai dengan pembacaan 'ord.notes' di ChefDashboard
      status: "Diproses Dapur", // STATUS INI WAJIB SAMA AGAR MASUK KE ANTRIAN DAPUR KOKI
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      elapsedMinutes: 0,
    };

    // Mengirim pesanan ke state global App.jsx
    setOrders((prevOrders) => [newOrder, ...prevOrders]);

    alert(
      lang === "ID"
        ? "Pesanan berhasil dikirim ke Dapur Koki!"
        : "Order sent to Kitchen!",
    );

    // Mengosongkan keranjang & beralih ke tab Pesanan Saya
    setCart([]);
    setActiveNav("pesananku");
  };

  const filteredMenu = menu40Items.filter((item) => {
    const matchesCat =
      activeCategory === "Semua" || item.category === activeCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f3f6fa] text-slate-800 flex font-sans selection:bg-blue-200">
      {/* 1. SIDEBAR KIRI */}
      <aside className="w-60 bg-[#121929] text-slate-300 flex flex-col justify-between hidden md:flex shrink-0 shadow-xl">
        <div>
          <div className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-black text-slate-950 text-base shadow-md">
              🍽️
            </div>
            <div>
              <h2 className="text-white font-black text-sm tracking-tight">
                Tamu
              </h2>
              <p className="text-[10px] text-amber-400 font-bold">
                Dashboard Pelanggan
              </p>
            </div>
          </div>

          <nav className="px-3 py-2 space-y-1">
            <button
              onClick={() => setActiveNav("ringkasan")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeNav === "ringkasan"
                  ? "bg-[#1e293b] text-white font-extrabold border-l-4 border-amber-500 shadow-sm"
                  : "hover:bg-slate-800/50 text-slate-400"
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>{lang === "ID" ? "Ringkasan" : "Summary"}</span>
            </button>

            <button
              onClick={() => setActiveNav("pesan-menu")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeNav === "pesan-menu"
                  ? "bg-[#1e293b] text-white font-extrabold border-l-4 border-amber-500 shadow-sm"
                  : "hover:bg-slate-800/50 text-slate-400"
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>{lang === "ID" ? "Pesan Menu" : "Order Menu"}</span>
            </button>

            <button
              onClick={() => setActiveNav("pesananku")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeNav === "pesananku"
                  ? "bg-[#1e293b] text-white font-extrabold border-l-4 border-amber-500 shadow-sm"
                  : "hover:bg-slate-800/50 text-slate-400"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{lang === "ID" ? "Pesanan Saya" : "My Orders"}</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800/80">
          <button
            onClick={onNavigateToHome}
            className="w-full flex items-center gap-2.5 text-red-400 hover:text-red-300 px-3 py-2 text-xs font-extrabold transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{lang === "ID" ? "Keluar" : "Logout"}</span>
          </button>
        </div>
      </aside>

      {/* 2. KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* NAVBAR ATAS */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-30">
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            {activeNav === "ringkasan" &&
              (lang === "ID" ? "Ringkasan" : "Summary")}
            {activeNav === "pesan-menu" &&
              (lang === "ID" ? "Pesan Menu" : "Order Menu")}
            {activeNav === "pesananku" &&
              (lang === "ID" ? "Pesanan Saya" : "My Orders")}
          </h1>

          {/* Dropdown Bahasa */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all cursor-pointer"
            >
              <span className="text-sm">🌐</span>
              <span>{lang === "ID" ? "Indonesia" : "English"}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 text-xs font-bold">
                <button
                  onClick={() => {
                    setLang("ID");
                    setIsLangOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 text-slate-800"
                >
                  🇮🇩 Indonesia
                </button>
                <button
                  onClick={() => {
                    setLang("EN");
                    setIsLangOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 text-slate-800"
                >
                  🇺🇸 English
                </button>
              </div>
            )}
          </div>
        </header>

        {/* ISI HALAMAN */}
        <main className="p-6 md:p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* ==================== TAB 1: RINGKASAN ==================== */}
          {activeNav === "ringkasan" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center gap-2 text-amber-500 font-extrabold text-xs">
                    <span>🔥</span>
                    <span>
                      {lang === "ID" ? "Pesanan aktif" : "Active orders"}
                    </span>
                  </div>
                  <p className="text-4xl font-black text-slate-900 mt-3">
                    {orders.filter((o) => o.status === "Pesanan aktif").length}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center gap-2 text-amber-500 font-extrabold text-xs">
                    <span>🔔</span>
                    <span>
                      {lang === "ID" ? "Siap disajikan" : "Ready to serve"}
                    </span>
                  </div>
                  <p className="text-4xl font-black text-slate-900 mt-3">0</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-xs">
                    <span>✅</span>
                    <span>
                      {lang === "ID" ? "Sudah tersaji" : "Already served"}
                    </span>
                  </div>
                  <p className="text-4xl font-black text-slate-900 mt-3">0</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center gap-2 text-slate-400 font-extrabold text-xs">
                    <span>📄</span>
                    <span>
                      {lang === "ID" ? "Total pesanan" : "Total orders"}
                    </span>
                  </div>
                  <p className="text-4xl font-black text-slate-900 mt-3">
                    {orders.length}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-black text-sm">
                    <Utensils className="w-4 h-4 text-amber-500" />
                    <span>{lang === "ID" ? "Denah Meja" : "Table Layout"}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setSelectedTable(`Meja ${num}`);
                          setOrderType("dinein");
                          setActiveNav("pesan-menu");
                        }}
                        className={`border border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          selectedTable === `Meja ${num}`
                            ? "border-blue-500 bg-blue-50/20 shadow-sm"
                            : "border-slate-300 hover:border-slate-400 bg-white"
                        }`}
                      >
                        <span className="text-base font-black text-slate-800">
                          {num}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-black text-sm">
                    <span>🔔</span>
                    <span>
                      {lang === "ID" ? "Mulai memesan" : "Start ordering"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setOrderType("dinein");
                        setActiveNav("pesan-menu");
                      }}
                      className="w-full flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200/80 hover:bg-slate-50 transition-all text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-lg font-bold shrink-0">
                        📷
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-800">
                          {lang === "ID" ? "Scan QR di meja" : "Scan table QR"}
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setOrderType("takeaway");
                        setActiveNav("pesan-menu");
                      }}
                      className="w-full flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200/80 hover:bg-slate-50 transition-all text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#121929] text-rose-400 flex items-center justify-center text-lg font-bold shrink-0">
                        🛵
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-800">
                          {lang === "ID"
                            ? "Pesan dari rumah"
                            : "Order from home"}
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 2: PESAN MENU ==================== */}
          {activeNav === "pesan-menu" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setOrderType("dinein")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold transition-all ${
                      orderType === "dinein"
                        ? "bg-amber-500 text-slate-950 shadow-sm"
                        : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    <span>📷</span>
                    <span>Scan QR</span>
                  </button>

                  <button
                    onClick={() => setOrderType("takeaway")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold transition-all ${
                      orderType === "takeaway"
                        ? "bg-amber-500 text-slate-950 shadow-sm"
                        : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    <span>🛵</span>
                    <span>Pesan dari rumah</span>
                  </button>

                  {orderType === "dinein" && (
                    <div className="relative">
                      <select
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                        className="bg-white border border-slate-200 rounded-full px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none shadow-sm appearance-none pr-8 cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={`Meja ${num}`}>
                            Meja {num}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  )}
                </div>

                {/* Tombol Lihat Menu (Memicu Modal 40 Menu) */}
                <button
                  onClick={() => setIsMenuPopupOpen(true)}
                  className="flex items-center gap-2 bg-[#121929] hover:bg-slate-800 text-white font-extrabold text-xs px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
                >
                  <span>📄</span>
                  <span>
                    {lang === "ID"
                      ? `Lihat menu (${cart.reduce((a, b) => a + b.qty, 0)})`
                      : `View menu (${cart.reduce((a, b) => a + b.qty, 0)})`}
                  </span>
                </button>
              </div>

              {/* CARD FORMULIR & TABEL PESANAN */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-2 font-black text-sm text-slate-900 border-b border-slate-100 pb-4">
                  <span>📄</span>
                  <span>{lang === "ID" ? "Pesanan Anda" : "Your Order"}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400">
                        <th className="py-2.5 font-bold">Menu</th>
                        <th className="py-2.5 text-right font-bold">Harga</th>
                        <th className="py-2.5 text-center font-bold">Jumlah</th>
                        <th className="py-2.5 text-right font-bold">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {cart.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="py-8 text-center text-slate-400 italic"
                          >
                            {lang === "ID"
                              ? "Belum ada menu yang dipilih. Klik 'Lihat menu' di atas untuk menambah."
                              : "No items selected. Click 'View menu' above to add."}
                          </td>
                        </tr>
                      ) : (
                        cart.map((item) => (
                          <tr
                            key={item.id}
                            className="font-bold text-slate-800"
                          >
                            <td className="py-4">{item.name}</td>
                            <td className="py-4 text-right text-slate-600">
                              Rp {item.price.toLocaleString("id-ID")}
                            </td>
                            <td className="py-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => updateQty(item.id, -1)}
                                  className="w-6 h-6 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-black w-4 text-center">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => updateQty(item.id, 1)}
                                  className="w-6 h-6 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </td>
                            <td className="py-4 text-right font-extrabold">
                              Rp{" "}
                              {(item.price * item.qty).toLocaleString("id-ID")}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="font-black text-sm text-slate-900">
                    Total
                  </span>
                  <span className="font-black text-base text-slate-900">
                    Rp {grandTotal.toLocaleString("id-ID")}
                  </span>
                </div>

                <form onSubmit={handleCheckout} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {orderType === "dinein"
                          ? "Nomor meja"
                          : "Alamat pengiriman"}
                      </label>
                      <input
                        type="text"
                        readOnly={orderType === "dinein"}
                        value={
                          orderType === "dinein" ? selectedTable : customerPhone
                        }
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Nama pelanggan
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nama Anda"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Nomor telepon (opsional)
                      </label>
                      <input
                        type="text"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Metode bayar
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full bg-slate-50 border border-amber-400 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                      >
                        <option value="QRIS">QRIS</option>
                        <option value="Tunai">Tunai</option>
                        <option value="Transfer bank">Transfer bank</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Catatan untuk dapur
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Contoh: tidak pakai pedas"
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#121929] hover:bg-slate-800 text-white font-extrabold text-xs py-4 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Kirim pesanan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: PESANAN SAYA (LENGKAP, BILINGUAL & CENTANG HIJAU) ==================== */}
          {activeNav === "pesananku" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                {/* Header Bagian */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900">
                        {lang === "ID"
                          ? "Riwayat & Status Pesanan Anda"
                          : "Your Order History & Status"}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">
                        {lang === "ID"
                          ? "Pantau status masakan Anda secara real-time"
                          : "Track your meal status in real-time"}
                      </p>
                    </div>
                  </div>
                  <span className="bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-black">
                    {(orders || []).length}{" "}
                    {lang === "ID" ? "Pesanan" : "Orders"}
                  </span>
                </div>

                {!orders || orders.length === 0 ? (
                  <div className="py-16 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-2">
                    <p className="text-3xl">🍽️</p>
                    <p className="text-xs font-bold text-slate-500">
                      {lang === "ID"
                        ? "Belum ada pesanan yang dibuat."
                        : "No orders created yet."}
                    </p>
                    <button
                      onClick={() => setActiveNav("pesan-menu")}
                      className="mt-2 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs"
                    >
                      {lang === "ID" ? "Pesan Sekarang" : "Order Now"}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {orders.map((ord) => {
                      if (!ord) return null;

                      const isDineIn =
                        ord.type === "Dine In" ||
                        (ord.type && String(ord.type).includes("Scan QR"));
                      const currentStatus = String(
                        ord.status || "",
                      ).toLowerCase();

                      // Deteksi status tanpa pengaruh huruf besar/kecil
                      const isReady =
                        currentStatus.includes("siap") ||
                        currentStatus.includes("ready");
                      const isDone =
                        currentStatus.includes("tersaji") ||
                        currentStatus.includes("selesai") ||
                        currentStatus.includes("served");

                      // Teks Label Bahasa Dinamis
                      let statusLabel =
                        lang === "ID" ? "Diproses Dapur" : "Cooking";
                      if (isReady) {
                        statusLabel =
                          lang === "ID" ? "Siap Diambil" : "Ready to Pick Up";
                      } else if (isDone) {
                        statusLabel =
                          lang === "ID" ? "Sudah Tersaji" : "Served";
                      }

                      return (
                        <div
                          key={ord.id || Math.random()}
                          className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-5 md:p-6 space-y-5 shadow-xs hover:border-slate-300 transition-all text-left"
                        >
                          {/* 1. Baris Atas: Metode Pemesanan, ID, & Badge Hijau Centang */}
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60 pb-4">
                            <div className="flex items-center gap-2.5">
                              <span className="px-3 py-1 rounded-xl bg-[#121929] text-white font-extrabold text-[11px] shadow-xs flex items-center gap-1.5">
                                {isDineIn
                                  ? "📷 Scan QR (Dine In)"
                                  : lang === "ID"
                                    ? "🛵 Pesan dari Rumah"
                                    : "🛵 Order from Home"}
                              </span>
                              <span className="text-xs font-bold text-slate-400">
                                #{ord.id}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold text-slate-400">
                                ⏰{" "}
                                {ord.time ||
                                  (lang === "ID" ? "Baru saja" : "Just now")}
                              </span>

                              {/* BADGE HIJAU CENTANG JIKA SIAP DIAMBIL */}
                              <span
                                className={`px-3.5 py-1 rounded-full text-xs font-black border flex items-center gap-1.5 transition-all ${
                                  isReady
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs animate-pulse"
                                    : isDone
                                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                      : "bg-amber-100 text-amber-800 border-amber-200"
                                }`}
                              >
                                {(isReady || isDone) && (
                                  <CheckCircle2 className="w-4 h-4 text-white stroke-[3]" />
                                )}
                                <span>{statusLabel}</span>
                              </span>
                            </div>
                          </div>

                          {/* 2. Detail Pelanggan & Meja (Fully Translated) */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-slate-200/60 text-xs">
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                {lang === "ID"
                                  ? "Nama Pelanggan"
                                  : "Customer Name"}
                              </p>
                              <p className="font-extrabold text-slate-900 mt-0.5 truncate">
                                👤{" "}
                                {ord.customer ||
                                  ord.namaPelanggan ||
                                  ord.name ||
                                  "-"}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                {lang === "ID"
                                  ? "Nomor Meja / Lokasi"
                                  : "Table / Location"}
                              </p>
                              <p className="font-extrabold text-amber-600 mt-0.5">
                                🪑{" "}
                                {ord.table ||
                                  ord.nomorMeja ||
                                  (isDineIn
                                    ? lang === "ID"
                                      ? "Meja"
                                      : "Table"
                                    : "Takeaway")}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                {lang === "ID"
                                  ? "Nomor Telepon"
                                  : "Phone Number"}
                              </p>
                              <p className="font-extrabold text-slate-800 mt-0.5">
                                📞 {ord.phone || "-"}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                {lang === "ID"
                                  ? "Metode Bayar"
                                  : "Payment Method"}
                              </p>
                              <p className="font-extrabold text-slate-800 mt-0.5">
                                💳 {ord.payment || "QRIS"}
                              </p>
                            </div>
                          </div>

                          {/* 3. Daftar Rincian Menu */}
                          <div className="space-y-2">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                              {lang === "ID"
                                ? "Detail Rincian Menu"
                                : "Ordered Menu Details"}
                            </p>
                            <div className="bg-white rounded-xl border border-slate-200/60 divide-y divide-slate-100 text-xs">
                              {(ord.items || []).map((it, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 flex items-center justify-between font-bold text-slate-800"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-900 flex items-center justify-center font-black text-[11px]">
                                      {it.qty || 1}x
                                    </span>
                                    <span>
                                      {it.name || it.namaMenu || "Menu"}
                                    </span>
                                  </div>
                                  <span className="font-extrabold text-slate-900">
                                    Rp{" "}
                                    {(
                                      (it.price || 0) * (it.qty || 1)
                                    ).toLocaleString("id-ID")}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 4. Catatan Dapur */}
                          {((ord.notes && ord.notes !== "-") ||
                            (ord.note && ord.note !== "-")) && (
                            <div className="bg-amber-50/80 border border-amber-200/80 p-3 rounded-xl text-xs font-bold text-amber-900 flex items-start gap-2">
                              <span className="text-base leading-none">📌</span>
                              <div>
                                <span className="font-black">
                                  {lang === "ID"
                                    ? "Catatan Dapur: "
                                    : "Kitchen Note: "}
                                </span>
                                <span className="font-medium text-amber-800">
                                  {ord.notes || ord.note}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* 5. Total Pembayaran */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 font-black">
                            <span className="text-xs text-slate-600">
                              {lang === "ID"
                                ? "Total Pembayaran"
                                : "Total Payment"}
                            </span>
                            <span className="text-base text-emerald-600">
                              Rp {(ord.total || 0).toLocaleString("id-ID")}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==================== POPUP: DAFTAR LENGKAP MENU RESTORAN (40 MENU) ==================== */}
      {isMenuPopupOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <div>
                <h3 className="font-black text-base text-slate-900">
                  Daftar Lengkap Menu Restoran
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pilih dari 20 Makanan dan 20 Minuman
                </p>
              </div>
              <button
                onClick={() => setIsMenuPopupOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-4 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {["Semua", "Makanan", "Minuman"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-slate-100 text-slate-900 shadow-xs border border-slate-200"
                        : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[260px]">
                <input
                  type="text"
                  placeholder="Cari dalam daftar menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Grid 40 Menu Kartu Sesuai Gambar */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#f8fafc]">
              {filteredMenu.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-400 text-xs font-bold">
                  Menu tidak ditemukan.
                </div>
              ) : (
                filteredMenu.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100"
                      />
                      <div className="min-w-0">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {item.category}
                        </p>
                        <h5 className="font-extrabold text-xs text-slate-900 truncate mt-0.5">
                          {item.name}
                        </h5>
                        <p className="text-xs font-black text-amber-600 mt-1">
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      className="w-9 h-9 rounded-full bg-slate-100 hover:bg-amber-500 hover:text-white text-slate-700 flex items-center justify-center font-black text-sm transition-all shrink-0 cursor-pointer shadow-xs active:scale-95"
                    >
                      +
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-5 border-t border-slate-100 bg-white flex justify-end">
              <button
                onClick={() => setIsMenuPopupOpen(false)}
                className="bg-[#121929] hover:bg-slate-800 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Selesai / Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
