import React, { useState } from "react";
import initialMenuList from "../data/menu.js";
import DashboardSidebar from "../components/DashboardSidebar.jsx";
import Toast from "../components/Toast.jsx";
import {
  Utensils,
  LayoutDashboard,
  FilePlus,
  Flame,
  Bell,
  CheckSquare,
  FileText,
  Settings,
  Trash2,
  Camera,
  X,
} from "lucide-react";

export default function WaiterDashboard({
  onLogout,
  username = "Waiter",
  orders = [],
  menuList = initialMenuList,
  setOrders,
}) {
  const [activeMenu, setActiveMenu] = useState("ringkasan");
  const [lang, setLang] = useState("id");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // State Avatar Profil Waiter
  const [avatar, setAvatar] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&style=circle",
  );
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // State Toast Notifikasi
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Pilihan Avatar
  const avatarList = [
    {
      id: 1,
      url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&style=circle",
      label: "Alex 3D",
    },
    {
      id: 2,
      url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aria&style=circle",
      label: "Sarah 3D",
    },
    {
      id: 3,
      url: "https://api.dicebear.com/7.x/avataaars/svg?seed=HijabWaiter&style=circle",
      label: "Aisha 3D",
    },
    {
      id: 4,
      url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack&style=circle",
      label: "Daniel 3D",
    },
    {
      id: 5,
      url: "https://api.dicebear.com/7.x/avataaars/svg?seed=CoolBoy&style=circle",
      label: "Cool Guy",
    },
    {
      id: 6,
      url: "https://api.dicebear.com/7.x/avataaars/svg?seed=FriendlyGirl&style=circle",
      label: "Friendly Girl",
    },
  ];

  // Kamus Terjemahan
  const t = {
    id: {
      roleTitle: "Dashboard Waiter",
      loginAs: "Login sebagai Waiter",
      navRingkasan: "Ringkasan",
      navPesananBaru: "Pesanan Baru",
      logout: "Keluar",
      ringkasanHeader: "Ringkasan",
      pesananAktif: "Pesanan aktif",
      siapDisajikan: "Siap disajikan",
      sudahTersaji: "Sudah tersaji",
      totalPesanan: "Total pesanan",
      denahMeja: "Denah Meja",
      denahDesc:
        "Klik meja kosong untuk membuat pesanan, atau meja hijau untuk menyajikan.",
      perluDisajikan: "Perlu Disajikan",
      noPerluDisajikan: "Tidak ada pesanan yang menunggu disajikan.",
      pesanan: "Pesanan",
      belumAdaData: "Belum ada data",
      pilihMenu: "Pilih Menu",
      semua: "Semua",
      makanan: "Makanan",
      minuman: "Minuman",
      ringkasanPesanan: "Ringkasan Pesanan",
      nomorMeja: "Nomor meja",
      namaPelanggan: "Nama pelanggan",
      menuKosong: "Belum ada menu. Klik menu di sebelah kiri untuk menambah.",
      total: "Total",
      kirimKeDapur: "Kirim ke Dapur",
      statusKosong: "Kosong",
      statusSiap: "Siap diambil",
      statusDiprosesDapur: "Diproses Dapur",
      statusSudahTersaji: "Sudah tersaji",
      btnSajikan: "Sajikan",
      msgSajikanSuccess: "Pesanan berhasil disajikan ke meja!",
      searchMenuPlaceholder: "Cari menu...",
      searchModalPlaceholder: "Cari dalam daftar menu...",
      customerPlaceholder: "Nama pelanggan...",
      notesLabel: "Catatan untuk Dapur",
      notesPlaceholder: "Contoh: Sambal sedikit, Tanpa es, Pedas...",
      viewAllMenus: "📂 Lihat Semua Menu Lainnya (40 Menu)",
      modalTitle: "Daftar Lengkap Menu Restoran",
      modalSubtitle: "Pilih dari 20 Makanan dan 20 Minuman",
      modalCloseBtn: "Selesai / Tutup",
      selectAvatar: "Pilih Avatar Waiter",
    },
    en: {
      roleTitle: "Waiter Dashboard",
      loginAs: "Logged in as Waiter",
      navRingkasan: "Overview",
      navPesananBaru: "New Order",
      logout: "Logout",
      ringkasanHeader: "Overview",
      pesananAktif: "Active orders",
      siapDisajikan: "Ready to serve",
      sudahTersaji: "Served",
      totalPesanan: "Total orders",
      denahMeja: "Table Map",
      denahDesc:
        "Click an empty table to create an order, or a green table to serve.",
      perluDisajikan: "Needs Serving",
      noPerluDisajikan: "No orders waiting to be served.",
      pesanan: "Orders",
      belumAdaData: "No data available",
      pilihMenu: "Select Menu",
      semua: "All",
      makanan: "Food",
      minuman: "Drinks",
      ringkasanPesanan: "Order Summary",
      nomorMeja: "Table number",
      namaPelanggan: "Customer name",
      menuKosong: "No items yet. Click menu on the left to add.",
      total: "Total",
      kirimKeDapur: "Send to Kitchen",
      statusKosong: "Empty",
      statusSiap: "Ready to serve",
      statusDiprosesDapur: "Processing Kitchen",
      statusSudahTersaji: "Served",
      btnSajikan: "Serve",
      msgSajikanSuccess: "Order served successfully to table!",
      searchMenuPlaceholder: "Search menu...",
      searchModalPlaceholder: "Search in menu list...",
      customerPlaceholder: "Customer name...",
      notesLabel: "Notes for Kitchen",
      notesPlaceholder: "Example: Less spicy, No ice...",
      viewAllMenus: "📂 View All Other Menus (40 Menus)",
      modalTitle: "Complete Restaurant Menu List",
      modalSubtitle: "Choose from 20 Foods and 20 Drinks",
      modalCloseBtn: "Done / Close",
      selectAvatar: "Select Waiter Avatar",
    },
  };

  const dict = t[lang];

  // Form Pesanan Baru State
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedTable, setSelectedTable] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [orderNotes, setOrderNotes] = useState("");

  // State Pencarian & Modal Pop-up
  const [searchQuery, setSearchQuery] = useState("");
  const [isAllMenuModalOpen, setIsAllMenuModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState("Semua");

  const filteredMenu = menuList.filter((item) => {
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedMainMenus = filteredMenu.slice(0, 6);

  const handleAddToCart = (menuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === menuItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === menuItem.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...menuItem, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const handleSendToKitchen = () => {
    if (!selectedTable) {
      setToastMessage(
        lang === "id"
          ? "Silakan pilih nomor meja!"
          : "Please select a table number!",
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    if (cartItems.length === 0) {
      setToastMessage(
        lang === "id"
          ? "Keranjang pesanan masih kosong!"
          : "Order cart is still empty!",
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const newOrder = {
      id: Date.now(),
      table: selectedTable,
      customer: customerName || (lang === "id" ? "Pelanggan" : "Customer"),
      items: [...cartItems],
      notes: orderNotes || "-",
      total: calculateTotal(),
      status: dict.statusDiprosesDapur,
      elapsedMinutes: 0,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setToastMessage(
      lang === "id"
        ? "Pesanan berhasil terkirim ke dapur"
        : "Order sent to kitchen successfully",
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    setCartItems([]);
    setSelectedTable(null);
    setCustomerName("");
    setOrderNotes("");
    setActiveMenu("ringkasan");
  };

  const handleServeOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: dict.statusSudahTersaji } : o,
      ),
    );
    setToastMessage(dict.msgSajikanSuccess);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Statistik
  const activeOrdersCount = orders.filter(
    (o) => o.status === "Diproses Dapur" || o.status === "Processing Kitchen",
  ).length;
  const readyToServeCount = orders.filter(
    (o) => o.status === "Siap diambil" || o.status === "Ready to serve",
  ).length;
  const servedCount = orders.filter(
    (o) => o.status === "Sudah tersaji" || o.status === "Served",
  ).length;
  const totalOrdersCount = orders.length;

  const readyOrdersList = orders.filter(
    (o) => o.status === "Siap diambil" || o.status === "Ready to serve",
  );

  return (
    <div className="h-screen w-full flex bg-[#f1f5f9] font-sans text-slate-800 select-none overflow-hidden relative">
      {/* NOTIFIKASI TOAST */}
      <Toast message={toastMessage} visible={showToast} />

      <DashboardSidebar
        username={username}
        roleTitle={dict.roleTitle}
        logoutLabel={dict.logout}
        onLogout={onLogout}
        activeItem={activeMenu}
        onItemSelect={setActiveMenu}
        className="h-screen sticky top-0 z-40"
        items={[
          {
            id: "ringkasan",
            label: dict.navRingkasan,
            icon: LayoutDashboard,
          },
          {
            id: "pesanan-baru",
            label: dict.navPesananBaru,
            icon: FilePlus,
          },
        ]}
      />

      {/* KONTEN KANAN */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs shrink-0">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {activeMenu === "ringkasan"
              ? dict.ringkasanHeader
              : dict.navPesananBaru}
          </h1>

          <div className="flex items-center gap-4">
            <div
              onClick={() => setIsAvatarModalOpen(true)}
              className="flex items-center gap-3 bg-slate-50 hover:bg-amber-50/60 border border-slate-200/80 hover:border-amber-300 px-3.5 py-1.5 rounded-2xl shadow-xs cursor-pointer transition-all group"
            >
              <div className="relative w-10 h-10 rounded-full bg-amber-100 p-0.5 border-2 border-amber-400 shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
                <img
                  src={avatar}
                  alt="Profile Waiter"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute -bottom-0.5 -right-0.5 bg-slate-900 text-amber-400 p-0.5 rounded-full border border-white shadow-xs">
                  <Camera className="w-2.5 h-2.5" />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight group-hover:text-amber-700 transition-colors">
                  {username}
                </p>
                <p className="text-[10px] font-medium text-slate-500">
                  {dict.loginAs}
                </p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-700 cursor-pointer transition-all"
              >
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  {lang === "id" ? "Bahasa: Indonesia" : "Language: English"}
                </span>
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50">
                  <button
                    onClick={() => {
                      setLang("id");
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${
                      lang === "id"
                        ? "bg-amber-50 text-amber-700 font-black"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    🇮🇩 Bahasa Indonesia
                  </button>
                  <button
                    onClick={() => {
                      setLang("en");
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${
                      lang === "en"
                        ? "bg-amber-50 text-amber-700 font-black"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    🇬🇧 English
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* MENU RINGKASAN */}
          {activeMenu === "ringkasan" && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-amber-600 text-xs font-bold">
                    <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>{dict.pesananAktif}</span>
                  </div>
                  <p className="text-3xl font-black text-slate-900">
                    {activeOrdersCount}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-amber-500 text-xs font-bold">
                    <Bell className="w-4 h-4 text-amber-500" />
                    <span>{dict.siapDisajikan}</span>
                  </div>
                  <p className="text-3xl font-black text-slate-900">
                    {readyToServeCount}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                    <span>{dict.sudahTersaji}</span>
                  </div>
                  <p className="text-3xl font-black text-slate-900">
                    {servedCount}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span>{dict.totalPesanan}</span>
                  </div>
                  <p className="text-3xl font-black text-slate-900">
                    {totalOrdersCount}
                  </p>
                </div>
              </div>

              {/* Denah Meja & Perlu Disajikan */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-100 pb-3">
                    <Utensils className="w-4 h-4 text-amber-700" />
                    <span>{dict.denahMeja}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tableNum) => {
                      const tableOrder = orders.find(
                        (o) =>
                          o.table === tableNum &&
                          o.status !== dict.statusSudahTersaji &&
                          o.status !== "Sudah tersaji" &&
                          o.status !== "Served",
                      );
                      const isReady =
                        tableOrder &&
                        (tableOrder.status === dict.statusSiap ||
                          tableOrder.status === "Siap diambil" ||
                          tableOrder.status === "Ready to serve");

                      return (
                        <div
                          key={tableNum}
                          onClick={() => {
                            if (!tableOrder) {
                              setSelectedTable(tableNum);
                              setActiveMenu("pesanan-baru");
                            }
                          }}
                          className={`border-2 p-4 rounded-xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1 group ${
                            isReady
                              ? "border-emerald-500 bg-emerald-50/60"
                              : tableOrder
                                ? "border-amber-400 bg-amber-50/50"
                                : "border-dashed border-slate-300 hover:border-amber-600 bg-slate-50/50 hover:bg-amber-50/30"
                          }`}
                        >
                          <span
                            className={`text-base font-black ${isReady ? "text-emerald-800" : "text-slate-800"}`}
                          >
                            {tableNum}
                          </span>
                          <span
                            className={`text-[11px] font-bold ${isReady ? "text-emerald-700" : "text-slate-400"}`}
                          >
                            {isReady
                              ? dict.statusSiap
                              : tableOrder
                                ? tableOrder.customer
                                : dict.statusKosong}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-[11px] text-slate-400 font-medium pt-2">
                    {dict.denahDesc}
                  </p>
                </div>

                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-100 pb-3 mb-4">
                      <Bell className="w-4 h-4 text-amber-500" />
                      <span>{dict.perluDisajikan}</span>
                    </div>

                    {readyOrdersList.length === 0 ? (
                      <div className="py-12 text-center">
                        <p className="text-xs text-slate-400 font-medium">
                          {dict.noPerluDisajikan}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {readyOrdersList.map((ord) => (
                          <div
                            key={ord.id}
                            className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60 flex items-center justify-between"
                          >
                            <div className="space-y-1">
                              <p className="text-xs font-extrabold text-slate-900">
                                {lang === "id"
                                  ? `Meja ${ord.table}`
                                  : `Table ${ord.table}`}{" "}
                                <span className="text-slate-400 font-normal">
                                  — {ord.customer}
                                </span>
                              </p>
                              <p className="text-xs text-slate-500 font-medium">
                                {ord.items
                                  .map((i) => `${i.name} ×${i.qty}`)
                                  .join(", ")}
                              </p>
                              {ord.notes && ord.notes !== "-" && (
                                <p className="text-[11px] font-bold text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-lg border border-amber-300/60 inline-block mt-1">
                                  📝 {lang === "id" ? "Catatan" : "Notes"}:{" "}
                                  {ord.notes}
                                </p>
                              )}
                            </div>

                            <button
                              onClick={() => handleServeOrder(ord.id)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                            >
                              {dict.btnSajikan}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Daftar Pesanan Bawah */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h2 className="text-sm font-bold text-slate-900">
                  {dict.pesanan}
                </h2>

                {orders.length === 0 ? (
                  <div className="py-12 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/40">
                    <p className="text-xs text-slate-400 font-medium">
                      {dict.belumAdaData}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((ord) => {
                      let badgeColor = "bg-amber-200/80 text-amber-900";
                      const isReadyStatus =
                        ord.status === "Siap diambil" ||
                        ord.status === "Ready to serve" ||
                        ord.status === dict.statusSiap;
                      const isServedStatus =
                        ord.status === "Sudah tersaji" ||
                        ord.status === "Served" ||
                        ord.status === dict.statusSudahTersaji;

                      if (isReadyStatus) {
                        badgeColor = "bg-amber-100 text-amber-800 font-black";
                      } else if (isServedStatus) {
                        badgeColor =
                          "bg-emerald-100 text-emerald-800 font-black";
                      }

                      // Konversi tampilan status pesanan di card agar mengikuti bahasa aktif
                      let displayStatus = ord.status;
                      if (
                        ord.status === "Diproses Dapur" ||
                        ord.status === "Processing Kitchen"
                      ) {
                        displayStatus = dict.statusDiprosesDapur;
                      } else if (
                        ord.status === "Siap diambil" ||
                        ord.status === "Ready to serve"
                      ) {
                        displayStatus = dict.statusSiap;
                      } else if (
                        ord.status === "Sudah tersaji" ||
                        ord.status === "Served"
                      ) {
                        displayStatus = dict.statusSudahTersaji;
                      }

                      return (
                        <div
                          key={ord.id}
                          className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900">
                                {lang === "id"
                                  ? `Meja ${ord.table}`
                                  : `Table ${ord.table}`}
                              </span>
                              <span className="text-slate-400 font-light">
                                —
                              </span>
                              <span className="text-slate-600 font-medium">
                                {ord.customer}
                              </span>
                              <span
                                className={`px-3 py-0.5 rounded-full text-[11px] ${badgeColor}`}
                              >
                                {displayStatus}
                              </span>
                            </div>

                            {isReadyStatus && (
                              <button
                                onClick={() => handleServeOrder(ord.id)}
                                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                              >
                                {dict.btnSajikan}
                              </button>
                            )}
                          </div>

                          <p className="text-xs text-slate-600 font-normal">
                            {ord.items
                              .map(
                                (i) =>
                                  `${i.name} ×${i.qty} (Rp ${i.price.toLocaleString("id-ID")})`,
                              )
                              .join(", ")}
                            {" · "}
                            <span className="font-extrabold text-slate-900">
                              Rp {ord.total.toLocaleString("id-ID")}
                            </span>
                          </p>

                          {ord.notes && ord.notes !== "-" && (
                            <div className="mt-1.5">
                              <span className="inline-flex items-center gap-1 bg-amber-100/80 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-amber-300/60">
                                📝 {lang === "id" ? "Catatan" : "Notes"}:{" "}
                                {ord.notes}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MENU PESANAN BARU */}
          {activeMenu === "pesanan-baru" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                    <Utensils className="w-4 h-4 text-amber-600" />
                    <span>{dict.pilihMenu}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {[
                        { key: "Semua", label: dict.semua },
                        { key: "Makanan", label: dict.makanan },
                        { key: "Minuman", label: dict.minuman },
                      ].map((cat) => (
                        <button
                          key={cat.key}
                          onClick={() => setSelectedCategory(cat.key)}
                          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            selectedCategory === cat.key
                              ? "bg-amber-500 text-white shadow-sm"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    <div className="w-full sm:w-56">
                      <input
                        type="text"
                        placeholder={dict.searchMenuPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayedMainMenus.map((item) => {
                    const inCart = cartItems.find((i) => i.id === item.id);
                    const qtyInCart = inCart ? inCart.qty : 0;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleAddToCart(item)}
                        className={`relative border rounded-2xl p-4 bg-white hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center justify-between gap-3 group overflow-hidden ${
                          qtyInCart > 0
                            ? "border-amber-400 bg-amber-50/20 ring-2 ring-amber-400/20"
                            : "border-slate-200"
                        }`}
                      >
                        {qtyInCart > 0 && (
                          <span className="absolute top-3 right-3 z-10 bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                            +{qtyInCart}
                          </span>
                        )}

                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shadow-xs border border-slate-200/60 group-hover:scale-105 transition-transform duration-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="text-center space-y-1 w-full">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            {item.category}
                          </span>
                          <h3 className="text-xs font-black text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-xs font-extrabold text-amber-600">
                            Rp {item.price.toLocaleString("id-ID")}
                          </p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                          className="w-full py-2 bg-slate-100 group-hover:bg-amber-500 text-slate-700 group-hover:text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                        >
                          <span>+ {lang === "id" ? "Tambah" : "Add"}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => setIsAllMenuModalOpen(true)}
                    className="w-full py-3 bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold rounded-2xl shadow-md transition-all cursor-pointer"
                  >
                    {dict.viewAllMenus}
                  </button>
                </div>
              </div>

              {/* PANEL RINGKASAN PESANAN KANAN */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-100 pb-3">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>{dict.ringkasanPesanan}</span>
                </div>

                {/* Pilih Nomor Meja */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    {dict.nomorMeja}
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tableNum) => (
                      <button
                        key={tableNum}
                        onClick={() => setSelectedTable(tableNum)}
                        className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          selectedTable === tableNum
                            ? "bg-amber-500 text-white shadow-xs"
                            : "bg-slate-50 border border-slate-200/80 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {tableNum}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Nama Pelanggan */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    {dict.namaPelanggan}
                  </label>
                  <input
                    type="text"
                    placeholder={dict.customerPlaceholder}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                {/* List Keranjang Menu */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    {lang === "id" ? "MENU" : "MENU"}
                  </label>
                  {cartItems.length === 0 ? (
                    <div className="py-8 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-xl p-4">
                      <p className="text-xs text-slate-400 font-medium">
                        {dict.menuKosong}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200/60"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <p className="text-xs font-extrabold text-slate-800">
                                {item.name}
                              </p>
                              <p className="text-[10px] text-slate-500 font-semibold">
                                Rp {item.price.toLocaleString("id-ID")} x{" "}
                                {item.qty}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-amber-700">
                              Rp{" "}
                              {(item.price * item.qty).toLocaleString("id-ID")}
                            </span>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* INPUT CATATAN UNTUK DAPUR */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    {dict.notesLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={dict.notesPlaceholder}
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-sm font-bold text-slate-700">
                    {dict.total}
                  </span>
                  <span className="text-lg font-black text-amber-700">
                    Rp {calculateTotal().toLocaleString("id-ID")}
                  </span>
                </div>

                {/* Tombol Kirim ke Dapur */}
                <button
                  onClick={handleSendToKitchen}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xs font-extrabold transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{dict.kirimKeDapur}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODAL AVATAR WAITER */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
              <span className="text-slate-800 font-bold text-sm">
                {dict.selectAvatar}
              </span>
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {avatarList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setAvatar(item.url);
                      setIsAvatarModalOpen(false);
                    }}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      avatar === item.url
                        ? "border-amber-500 bg-amber-50/80 ring-2 ring-amber-500/20"
                        : "border-slate-200 hover:border-amber-300 hover:bg-slate-50"
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.label}
                      className="w-12 h-12 rounded-full"
                    />
                    <span className="text-[10px] font-bold text-slate-700">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL POP-UP SEMUA MENU (40 MENU) */}
      {isAllMenuModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  {dict.modalTitle}
                </h2>
                <p className="text-xs text-slate-500">{dict.modalSubtitle}</p>
              </div>
              <button
                onClick={() => setIsAllMenuModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-200/50 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
              <div className="flex items-center gap-2">
                {[
                  { key: "Semua", label: dict.semua },
                  { key: "Makanan", label: dict.makanan },
                  { key: "Minuman", label: dict.minuman },
                ].map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setModalCategory(cat.key)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      modalCategory === cat
                        ? "bg-amber-500 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder={dict.searchModalPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-60 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              />
            </div>

            <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh]">
              {menuList
                .filter((item) => {
                  const matchCat =
                    modalCategory === "Semua" ||
                    item.category === modalCategory;
                  const matchSearch = item.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                  return matchCat && matchSearch;
                })
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleAddToCart(item)}
                    className="border border-slate-200 hover:border-amber-400 p-3 rounded-2xl bg-white hover:shadow-md transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-black text-slate-800 truncate group-hover:text-amber-600">
                        {item.name}
                      </h4>
                      <p className="text-xs font-extrabold text-amber-600">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <button className="px-3 py-1.5 bg-slate-100 group-hover:bg-amber-500 text-slate-700 group-hover:text-white rounded-xl text-xs font-bold transition-all">
                      +
                    </button>
                  </div>
                ))}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 text-right">
              <button
                onClick={() => setIsAllMenuModalOpen(false)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-slate-800"
              >
                {dict.modalCloseBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
