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
    Globe,
    ChevronDown,
    Plus,
    Trash2,
    Send,
} from "lucide-react";

export default function WaiterDashboard({ onLogout, username = "fdfd" }) {
    const [activeMenu, setActiveMenu] = useState("ringkasan"); // 'ringkasan' atau 'pesanan-baru'
    const [lang, setLang] = useState("Bahasa: Indonesia");

    // State Denah Meja (1-10) untuk tab Ringkasan
    const [tables] = useState([
        { id: 1, status: "Kosong" },
        { id: 2, status: "Kosong" },
        { id: 3, status: "Kosong" },
        { id: 4, status: "Kosong" },
        { id: 5, status: "Kosong" },
        { id: 6, status: "Kosong" },
        { id: 7, status: "Kosong" },
        { id: 8, status: "Kosong" },
        { id: 9, status: "Kosong" },
        { id: 10, status: "Kosong" },
    ]);

    // State untuk Tab Pesanan Baru
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [selectedTable, setSelectedTable] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [cartItems, setCartItems] = useState([]);

    // Daftar Menu Makanan & Minuman
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

    // Filter Menu Berdasarkan Kategori
    const filteredMenu =
        selectedCategory === "Semua"
            ? menuList
            : menuList.filter((item) => item.category === selectedCategory);

    // Tambah Menu ke Keranjang
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

    // Hapus Item dari Keranjang
    const handleRemoveFromCart = (id) => {
        setCartItems((prev) => prev.filter((i) => i.id !== id));
    };

    // Hitung Total Harga
    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    };

    // Kirim Pesanan ke Dapur
    const handleSendToKitchen = () => {
        if (!selectedTable) {
            alert("Silakan pilih nomor meja terlebih dahulu!");
            return;
        }
        if (cartItems.length === 0) {
            alert(
                "Keranjang pesanan masih kosong! Pilih menu di sebelah kiri.",
            );
            return;
        }

        alert(
            `Pesanan untuk Meja ${selectedTable} (${customerName || "Tanpa Nama"}) berhasil dikirim ke Dapur!`,
        );

        // Reset Form Pesanan
        setCartItems([]);
        setSelectedTable(null);
        setCustomerName("");
        setActiveMenu("ringkasan");
    };

    return (
        <div className="min-h-screen w-full flex bg-[#f1f5f9] font-sans text-slate-800 select-none">
            {/* 1. SIDEBAR KIRI */}
            <aside className="w-64 bg-[#141b2d] text-slate-300 flex flex-col justify-between p-4 shrink-0">
                <div className="space-y-6">
                    {/* Logo & Info User */}
                    <div className="flex items-center gap-3 px-2 pt-2">
                        <div className="bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-900 p-2.5 rounded-xl shadow-md">
                            <Utensils className="w-5 h-5 font-black" />
                        </div>
                        <div>
                            <h2 className="text-white text-sm font-bold tracking-tight">
                                {username}
                            </h2>
                            <p className="text-[11px] font-medium text-amber-400">
                                Dashboard Waiter
                            </p>
                        </div>
                    </div>

                    {/* Navigasi Sidebar */}
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
                            <span>Ringkasan</span>
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
                            <span>Pesanan Baru</span>
                        </button>
                    </nav>
                </div>

                {/* Tombol Keluar */}
                <div className="pt-4 border-t border-slate-800">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Keluar</span>
                    </button>
                </div>
            </aside>

            {/* 2. KONTEN UTAMA */}
            <main className="flex-1 flex flex-col overflow-y-auto">
                {/* Header Navbar */}
                <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        {activeMenu === "ringkasan"
                            ? "Ringkasan"
                            : "Pesanan Baru"}
                    </h1>

                    <div className="flex items-center gap-4">
                        {/* User Badge */}
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-2xl shadow-xs">
                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-sm">
                                <Bell className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-900 leading-tight">
                                    {username}
                                </p>
                                <p className="text-[10px] font-medium text-slate-500">
                                    Login sebagai Waiter
                                </p>
                            </div>
                        </div>

                        {/* Language Selector */}
                        <div className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-700 cursor-pointer transition-all">
                            <Globe className="w-3.5 h-3.5 text-slate-500" />
                            <span>{lang}</span>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                    </div>
                </header>

                {/* AREA TAMPILAN SESUAI TAB */}
                <div className="p-8 max-w-7xl w-full mx-auto">
                    {/* ==================== TAB 1: RINGKASAN ==================== */}
                    {activeMenu === "ringkasan" && (
                        <div className="space-y-6">
                            {/* Stat Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                                    <div className="flex items-center gap-2 text-amber-600 text-xs font-bold">
                                        <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                                        <span>Pesanan aktif</span>
                                    </div>
                                    <p className="text-3xl font-black text-slate-900">
                                        0
                                    </p>
                                </div>

                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                                    <div className="flex items-center gap-2 text-amber-500 text-xs font-bold">
                                        <Bell className="w-4 h-4 text-amber-500" />
                                        <span>Siap disajikan</span>
                                    </div>
                                    <p className="text-3xl font-black text-slate-900">
                                        0
                                    </p>
                                </div>

                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                                    <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
                                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                                        <span>Sudah tersaji</span>
                                    </div>
                                    <p className="text-3xl font-black text-slate-900">
                                        0
                                    </p>
                                </div>

                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                                        <FileText className="w-4 h-4 text-slate-400" />
                                        <span>Total pesanan</span>
                                    </div>
                                    <p className="text-3xl font-black text-slate-900">
                                        0
                                    </p>
                                </div>
                            </div>

                            {/* Denah Meja & Perlu Disajikan */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                {/* Denah Meja */}
                                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                                    <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-100 pb-3">
                                        <Utensils className="w-4 h-4 text-amber-700" />
                                        <span>Denah Meja</span>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                                        {tables.map((table) => (
                                            <div
                                                key={table.id}
                                                onClick={() => {
                                                    setSelectedTable(table.id);
                                                    setActiveMenu(
                                                        "pesanan-baru",
                                                    );
                                                }}
                                                className="border-2 border-dashed border-slate-300 hover:border-amber-600 bg-slate-50/50 hover:bg-amber-50/30 p-4 rounded-xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1 group"
                                            >
                                                <span className="text-base font-black text-slate-800 group-hover:text-amber-700">
                                                    {table.id}
                                                </span>
                                                <span className="text-[11px] font-semibold text-slate-400 group-hover:text-amber-600">
                                                    {table.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-[11px] text-slate-400 font-medium pt-2">
                                        Klik meja kosong untuk membuat pesanan,
                                        atau meja hijau untuk menyajikan.
                                    </p>
                                </div>

                                {/* Perlu Disajikan */}
                                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-100 pb-3 mb-4">
                                            <Bell className="w-4 h-4 text-amber-500" />
                                            <span>Perlu Disajikan</span>
                                        </div>

                                        <div className="py-12 text-center">
                                            <p className="text-xs text-slate-400 font-medium">
                                                Tidak ada pesanan yang menunggu
                                                disajikan.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tabel Pesanan */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                                <h2 className="text-sm font-bold text-slate-800">
                                    Pesanan
                                </h2>
                                <div className="py-16 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/40">
                                    <p className="text-xs text-slate-400 font-medium">
                                        Belum ada data
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================== TAB 2: PESANAN BARU ==================== */}
                    {activeMenu === "pesanan-baru" && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            {/* Kiri (7 Kolom): Pilih Menu */}
                            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
                                {/* Header Section & Filter Category */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                                        <Utensils className="w-4 h-4 text-amber-600" />
                                        <span>Pilih Menu</span>
                                    </div>

                                    {/* Pills Filter Kategori */}
                                    <div className="flex items-center gap-2">
                                        {["Semua", "Makanan", "Minuman"].map(
                                            (cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() =>
                                                        setSelectedCategory(cat)
                                                    }
                                                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                                        selectedCategory === cat
                                                            ? "bg-amber-500 text-white shadow-sm"
                                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                    }`}
                                                >
                                                    {cat}
                                                </button>
                                            ),
                                        )}
                                    </div>
                                </div>

                                {/* Grid Item Menu */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {filteredMenu.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() =>
                                                handleAddToCart(item)
                                            }
                                            className="border border-slate-200 rounded-2xl p-5 text-center bg-white hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-between gap-3 group"
                                        >
                                            {/* Lingkaran Ilustrasi Menu */}
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

                            {/* Kanan (5 Kolom): Ringkasan Pesanan */}
                            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
                                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-100 pb-3">
                                    <FileText className="w-4 h-4 text-amber-600" />
                                    <span>Ringkasan Pesanan</span>
                                </div>

                                {/* 1. Pilih Nomor Meja */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                                        Nomor meja
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

                                {/* 2. Input Nama Pelanggan */}
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                                        Nama pelanggan
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nama pelanggan"
                                        value={customerName}
                                        onChange={(e) =>
                                            setCustomerName(e.target.value)
                                        }
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all placeholder:text-slate-400"
                                    />
                                </div>

                                {/* 3. Daftar Item yang Dipilih (Keranjang) */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                                        Menu
                                    </label>

                                    {cartItems.length === 0 ? (
                                        <div className="py-6 px-4 bg-slate-50/60 rounded-xl border border-slate-100 text-center">
                                            <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                                Belum ada menu. Klik menu di
                                                sebelah kiri untuk menambah.
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

                                {/* 4. Total Harga */}
                                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                    <span className="text-sm font-bold text-slate-700">
                                        Total
                                    </span>
                                    <span className="text-lg font-black text-slate-900">
                                        Rp{" "}
                                        {calculateTotal().toLocaleString(
                                            "id-ID",
                                        )}
                                    </span>
                                </div>

                                {/* 5. Tombol Kirim ke Dapur */}
                                <button
                                    onClick={handleSendToKitchen}
                                    className="w-full py-3.5 px-6 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                                >
                                    <span>Kirim ke Dapur</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
