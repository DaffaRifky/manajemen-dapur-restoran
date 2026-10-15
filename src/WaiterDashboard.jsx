import React, { useState } from "react";
import {
    Utensils,
    LayoutDashboard,
    FilePlus,
    LogOut,
    Flame,
    Bell,
    CheckSquare,
    FileText,
    Settings,
    ChevronDown,
    Trash2,
    Send,
    UserCheck,
    X,
    Camera,
    CheckCircle2,
} from "lucide-react";

export default function WaiterDashboard({
    onLogout,
    username = "csdc",
    orders = [],
    setOrders,
}) {
    const [activeMenu, setActiveMenu] = useState("ringkasan");
    const [lang, setLang] = useState("id");
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

    // State Avatar Profil Waiter
    const [avatar, setAvatar] = useState("👨‍🍳");
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

    // State Toast Notifikasi
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    // Pilihan Avatar
    const avatarList = [
        { id: 1, icon: "👨‍🍳", label: "Pelayan Pria" },
        { id: 2, icon: "👩‍🍳", label: "Pelayan Wanita" },
        { id: 3, icon: "👤", label: "User Standar" },
        { id: 4, icon: "🎩", label: "Formal" },
        { id: 5, icon: "⚡", label: "Super Waiter" },
        { id: 6, icon: "😊", label: "Friendly" },
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
            menuKosong:
                "Belum ada menu. Klik menu di sebelah kiri untuk menambah.",
            total: "Total",
            kirimKeDapur: "Kirim ke Dapur",
            statusKosong: "Kosong",
            statusSiap: "Siap diambil",
            btnSajikan: "Sajikan",
            msgSajikanSuccess: "Pesanan berhasil disajikan ke meja!",
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
            btnSajikan: "Serve",
            msgSajikanSuccess: "Order served successfully to table!",
        },
    };

    const dict = t[lang];

    // Form Pesanan Baru
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [selectedTable, setSelectedTable] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [cartItems, setCartItems] = useState([]);

    const menuList = [
        {
            id: 1,
            name: "Nasi Goreng",
            price: 25000,
            category: "Makanan",
            icon: "🍛",
        },
        {
            id: 2,
            name: "Ayam Bakar",
            price: 32000,
            category: "Makanan",
            icon: "🍗",
        },
        {
            id: 3,
            name: "Mie Goreng",
            price: 23000,
            category: "Makanan",
            icon: "🍜",
        },
        { id: 4, name: "Es Teh", price: 6000, category: "Minuman", icon: "🍵" },
        {
            id: 5,
            name: "Jus Jeruk",
            price: 14000,
            category: "Minuman",
            icon: "🍊",
        },
    ];

    const filteredMenu =
        selectedCategory === "Semua"
            ? menuList
            : menuList.filter((item) => item.category === selectedCategory);

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
            setToastMessage("Silakan pilih nomor meja!");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        }
        if (cartItems.length === 0) {
            setToastMessage("Keranjang pesanan masih kosong!");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        }

        const newOrder = {
            id: Date.now(),
            table: selectedTable,
            customer: customerName || "Guest",
            items: [...cartItems],
            total: calculateTotal(),
            status: "Diproses Dapur",
            elapsedMinutes: 0,
        };

        setOrders((prev) => [newOrder, ...prev]);
        setToastMessage("Pesanan berhasil terkirim ke dapur");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);

        setCartItems([]);
        setSelectedTable(null);
        setCustomerName("");
        setActiveMenu("ringkasan");
    };

    // Fungsi Ketika Tombol "Sajikan" Diklik oleh Waiter
    const handleServeOrder = (orderId) => {
        setOrders((prev) =>
            prev.map((o) =>
                o.id === orderId ? { ...o, status: "Sudah tersaji" } : o,
            ),
        );
        setToastMessage(dict.msgSajikanSuccess);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Perhitungan Statistik Otomatis Sesuai Gambar
    const activeOrdersCount = orders.filter(
        (o) => o.status === "Diproses Dapur",
    ).length;
    const readyToServeCount = orders.filter(
        (o) => o.status === "Siap diambil",
    ).length;
    const servedCount = orders.filter(
        (o) => o.status === "Sudah tersaji",
    ).length;
    const totalOrdersCount = orders.length;

    // Filter Pesanan Yang Perlu Disajikan
    const readyOrdersList = orders.filter((o) => o.status === "Siap diambil");

    return (
        <div className="min-h-screen w-full flex bg-[#f1f5f9] font-sans text-slate-800 select-none relative">
            {/* NOTIFIKASI TOAST BERCENTANG HIJAU */}
            {showToast && (
                <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-lg border border-emerald-500 animate-in fade-in slide-in-from-top-4 duration-300">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span className="text-xs font-bold tracking-wide">
                        {toastMessage}
                    </span>
                </div>
            )}

            {/* 1. SIDEBAR KIRI */}
            <aside className="w-64 bg-[#141b2d] text-slate-300 flex flex-col justify-between p-4 shrink-0">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 px-2 pt-2">
                        <div className="bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-900 p-2.5 rounded-xl shadow-md">
                            <Utensils className="w-5 h-5 font-black" />
                        </div>
                        <div>
                            <h2 className="text-white text-sm font-bold tracking-tight">
                                {username}
                            </h2>
                            <p className="text-[11px] font-medium text-amber-400">
                                {dict.roleTitle}
                            </p>
                        </div>
                    </div>

                    <nav className="space-y-1.5 pt-2">
                        <button
                            onClick={() => setActiveMenu("ringkasan")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                activeMenu === "ringkasan"
                                    ? "bg-[#252f48] text-white shadow-sm border-l-4 border-amber-500"
                                    : "hover:bg-slate-800/60 text-slate-400 hover:text-slate-200"
                            }`}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>{dict.navRingkasan}</span>
                        </button>

                        <button
                            onClick={() => setActiveMenu("pesanan-baru")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                activeMenu === "pesanan-baru"
                                    ? "bg-[#252f48] text-white shadow-sm border-l-4 border-amber-500"
                                    : "hover:bg-slate-800/60 text-slate-400 hover:text-slate-200"
                            }`}
                        >
                            <FilePlus className="w-4 h-4" />
                            <span>{dict.navPesananBaru}</span>
                        </button>
                    </nav>
                </div>

                <div className="pt-4 border-t border-slate-800">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>{dict.logout}</span>
                    </button>
                </div>
            </aside>

            {/* 2. KONTEN UTAMA */}
            <main className="flex-1 flex flex-col overflow-y-auto">
                <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
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
                            <div className="relative w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-base shadow-sm group-hover:scale-105 transition-transform">
                                {avatar}
                                <div className="absolute -bottom-0.5 -right-0.5 bg-slate-900 text-amber-400 p-0.5 rounded-full border border-amber-300">
                                    <Camera className="w-2 h-2" />
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
                                onClick={() =>
                                    setIsLangDropdownOpen(!isLangDropdownOpen)
                                }
                                className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-700 cursor-pointer transition-all"
                            >
                                <Settings className="w-3.5 h-3.5 text-slate-500" />
                                <span>
                                    {lang === "id"
                                        ? "Bahasa: Indonesia"
                                        : "Language: English"}
                                </span>
                            </button>

                            {isLangDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50">
                                    <button
                                        onClick={() => {
                                            setLang("id");
                                            setIsLangDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${lang === "id" ? "bg-amber-50 text-amber-700 font-black" : "text-slate-700 hover:bg-slate-50"}`}
                                    >
                                        🇮🇩 Bahasa Indonesia
                                    </button>
                                    <button
                                        onClick={() => {
                                            setLang("en");
                                            setIsLangDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${lang === "en" ? "bg-amber-50 text-amber-700 font-black" : "text-slate-700 hover:bg-slate-50"}`}
                                    >
                                        🇬🇧 English
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl w-full mx-auto">
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
                                {/* Denah Meja */}
                                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                                    <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-100 pb-3">
                                        <Utensils className="w-4 h-4 text-amber-700" />
                                        <span>{dict.denahMeja}</span>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                            (tableNum) => {
                                                const tableOrder = orders.find(
                                                    (o) =>
                                                        o.table === tableNum &&
                                                        o.status !==
                                                            "Sudah tersaji",
                                                );
                                                const isReady =
                                                    tableOrder &&
                                                    tableOrder.status ===
                                                        "Siap diambil";

                                                return (
                                                    <div
                                                        key={tableNum}
                                                        onClick={() => {
                                                            if (!tableOrder) {
                                                                setSelectedTable(
                                                                    tableNum,
                                                                );
                                                                setActiveMenu(
                                                                    "pesanan-baru",
                                                                );
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
                                                                ? "Siap diambil"
                                                                : tableOrder
                                                                  ? tableOrder.customer
                                                                  : dict.statusKosong}
                                                        </span>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>

                                    <p className="text-[11px] text-slate-400 font-medium pt-2">
                                        {dict.denahDesc}
                                    </p>
                                </div>

                                {/* Perlu Disajikan (Box Kanan) */}
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
                                                                Meja {ord.table}{" "}
                                                                <span className="text-slate-400 font-normal">
                                                                    —{" "}
                                                                    {
                                                                        ord.customer
                                                                    }
                                                                </span>
                                                            </p>
                                                            <p className="text-xs text-slate-500 font-medium">
                                                                {ord.items
                                                                    .map(
                                                                        (i) =>
                                                                            `${i.name} ×${i.qty}`,
                                                                    )
                                                                    .join(", ")}
                                                            </p>
                                                        </div>

                                                        {/* Tombol Sajikan Hijau */}
                                                        <button
                                                            onClick={() =>
                                                                handleServeOrder(
                                                                    ord.id,
                                                                )
                                                            }
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

                            {/* Card Pesanan (Bawah) */}
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
                                        {orders.map((ord) => (
                                            <div
                                                key={ord.id}
                                                className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 space-y-2"
                                            >
                                                <div className="flex items-center justify-between text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-extrabold text-slate-900">
                                                            Meja {ord.table}
                                                        </span>
                                                        <span className="text-slate-400 font-light">
                                                            —
                                                        </span>
                                                        <span className="text-slate-600 font-medium">
                                                            {ord.customer}
                                                        </span>

                                                        <span
                                                            className={`px-3 py-0.5 rounded-full text-[11px] font-bold ${
                                                                ord.status ===
                                                                "Siap diambil"
                                                                    ? "bg-emerald-100 text-emerald-800"
                                                                    : "bg-amber-200/80 text-amber-900"
                                                            }`}
                                                        >
                                                            {ord.status}
                                                        </span>
                                                    </div>

                                                    {/* Tombol Sajikan Hijau di Card Pesanan jika Siap Diambil */}
                                                    {ord.status ===
                                                        "Siap diambil" && (
                                                        <button
                                                            onClick={() =>
                                                                handleServeOrder(
                                                                    ord.id,
                                                                )
                                                            }
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
                                                        Rp{" "}
                                                        {ord.total.toLocaleString(
                                                            "id-ID",
                                                        )}
                                                    </span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeMenu === "pesanan-baru" && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                                        <Utensils className="w-4 h-4 text-amber-600" />
                                        <span>{dict.pilihMenu}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {[
                                            { key: "Semua", label: dict.semua },
                                            {
                                                key: "Makanan",
                                                label: dict.makanan,
                                            },
                                            {
                                                key: "Minuman",
                                                label: dict.minuman,
                                            },
                                        ].map((cat) => (
                                            <button
                                                key={cat.key}
                                                onClick={() =>
                                                    setSelectedCategory(cat.key)
                                                }
                                                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                                    selectedCategory === cat.key
                                                        ? "bg-amber-500 text-white shadow-sm"
                                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                }`}
                                            >
                                                {cat.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {filteredMenu.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() =>
                                                handleAddToCart(item)
                                            }
                                            className="border border-slate-200 rounded-2xl p-5 text-center bg-white hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-between gap-3 group"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-amber-100/70 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform shadow-inner">
                                                {item.icon}
                                            </div>

                                            <div className="space-y-1">
                                                <h3 className="text-xs font-bold text-slate-800 group-hover:text-amber-700">
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs font-extrabold text-amber-600">
                                                    Rp{" "}
                                                    {item.price.toLocaleString(
                                                        "id-ID",
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
                                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-100 pb-3">
                                    <FileText className="w-4 h-4 text-amber-600" />
                                    <span>{dict.ringkasanPesanan}</span>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                                        {dict.nomorMeja}
                                    </label>
                                    <div className="grid grid-cols-7 gap-1.5">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                            (num) => (
                                                <button
                                                    key={num}
                                                    onClick={() =>
                                                        setSelectedTable(num)
                                                    }
                                                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                                        selectedTable === num
                                                            ? "bg-amber-500 border-amber-500 text-white shadow-xs"
                                                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                                                    }`}
                                                >
                                                    {num}
                                                </button>
                                            ),
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                                        {dict.namaPelanggan}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={dict.namaPelanggan}
                                        value={customerName}
                                        onChange={(e) =>
                                            setCustomerName(e.target.value)
                                        }
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all placeholder:text-slate-400"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                                        Menu
                                    </label>

                                    {cartItems.length === 0 ? (
                                        <div className="py-6 px-4 bg-slate-50/60 rounded-xl border border-slate-100 text-center">
                                            <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                                {dict.menuKosong}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                            {cartItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span>{item.icon}</span>
                                                        <div>
                                                            <p className="font-bold text-slate-800">
                                                                {item.name}
                                                            </p>
                                                            <p className="text-[10px] text-slate-500">
                                                                Rp{" "}
                                                                {item.price.toLocaleString(
                                                                    "id-ID",
                                                                )}{" "}
                                                                x {item.qty}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-bold text-amber-700">
                                                            Rp{" "}
                                                            {(
                                                                item.price *
                                                                item.qty
                                                            ).toLocaleString(
                                                                "id-ID",
                                                            )}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                handleRemoveFromCart(
                                                                    item.id,
                                                                )
                                                            }
                                                            className="text-red-400 hover:text-red-600 cursor-pointer p-1"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                    <span className="text-sm font-bold text-slate-700">
                                        {dict.total}
                                    </span>
                                    <span className="text-lg font-black text-slate-900">
                                        Rp{" "}
                                        {calculateTotal().toLocaleString(
                                            "id-ID",
                                        )}
                                    </span>
                                </div>

                                <button
                                    onClick={handleSendToKitchen}
                                    className="w-full py-3.5 px-6 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                                >
                                    <span>{dict.kirimKeDapur}</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* MODAL AVATAR */}
            {isAvatarModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                                <UserCheck className="w-4 h-4 text-amber-500" />
                                <span>Pilih Avatar Profil</span>
                            </div>
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
                                            setAvatar(item.icon);
                                            setIsAvatarModalOpen(false);
                                        }}
                                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                                            avatar === item.icon
                                                ? "border-amber-500 bg-amber-50/80 ring-2 ring-amber-500/20 shadow-xs"
                                                : "border-slate-200 hover:border-amber-300 hover:bg-slate-50"
                                        }`}
                                    >
                                        <span className="text-3xl">
                                            {item.icon}
                                        </span>
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
        </div>
    );
}
