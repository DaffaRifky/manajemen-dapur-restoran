import React, { useState } from "react";
import {
    Utensils,
    ChefHat,
    LogOut,
    Flame,
    Bell,
    CheckSquare,
    ClipboardList,
    Settings,
    UserCheck,
    X,
    Camera,
    CheckCircle2,
    Clock,
} from "lucide-react";

export default function ChefDashboard({
    onLogout,
    username = "csdc",
    orders = [],
    setOrders,
}) {
    const [lang, setLang] = useState("id");
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

    // State Avatar Profil Koki
    const [avatar, setAvatar] = useState("👨‍🍳");
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

    // State Notifikasi Toast
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const avatarList = [
        { id: 1, icon: "👨‍🍳", label: "Koki Pria" },
        { id: 2, icon: "👩‍🍳", label: "Koki Wanita" },
        { id: 3, icon: "🧑‍🍳", label: "Head Chef" },
        { id: 4, icon: "🔥", label: "Grill Master" },
        { id: 5, icon: "🍕", label: "Pizza Chef" },
        { id: 6, icon: "⭐", label: "Master Chef" },
    ];

    const t = {
        id: {
            roleTitle: "Dashboard Koki",
            loginAs: "Login sebagai Koki",
            navAntrian: "Antrian dapur",
            logout: "Keluar",
            headerTitle: "Antrian dapur",
            statAntrian: "Antrian dapur",
            statPorsi: "Porsi dalam antrean",
            statSiap: "Siap diambil",
            statSelesai: "Selesai dimasak",
            sectionAntrian: "Antrian dapur",
            sectionTotal: "Total yang harus dimasak",
            sectionBaruSelesai: "Baru selesai",
            belumAdaData: "Belum ada data",
            btnSelesai: "Selesai",
            msgSelesai: "Masakan berhasil diselesaikan dan terkirim ke Waiter!",
        },
        en: {
            roleTitle: "Chef Dashboard",
            loginAs: "Logged in as Chef",
            navAntrian: "Kitchen queue",
            logout: "Logout",
            headerTitle: "Kitchen queue",
            statAntrian: "Kitchen queue",
            statPorsi: "Portions in queue",
            statSiap: "Ready to pick up",
            statSelesai: "Cooking finished",
            sectionAntrian: "Kitchen queue",
            sectionTotal: "Total to cook",
            sectionBaruSelesai: "Recently finished",
            belumAdaData: "No data available",
            btnSelesai: "Finish",
            msgSelesai: "Food completed and sent to Waiter!",
        },
    };

    const dict = t[lang];

    // Filter Antrean Dapur
    const antreanOrders = orders.filter((o) => o.status === "Diproses Dapur");
    const readyOrders = orders.filter((o) => o.status === "Siap diambil");
    const servedOrders = orders.filter((o) => o.status === "Sudah tersaji");

    // Hitung Porsi
    const totalPorsiInQueue = antreanOrders.reduce(
        (sum, ord) =>
            sum + ord.items.reduce((itemSum, item) => itemSum + item.qty, 0),
        0,
    );

    // Rekap Porsi Berdasarkan Nama Menu
    const summaryToCook = {};
    antreanOrders.forEach((ord) => {
        ord.items.forEach((i) => {
            summaryToCook[i.name] = (summaryToCook[i.name] || 0) + i.qty;
        });
    });

    // Ketika Koki Menekan "Selesai"
    const handleMarkReady = (orderId) => {
        setOrders((prev) =>
            prev.map((o) =>
                o.id === orderId ? { ...o, status: "Siap diambil" } : o,
            ),
        );

        setToastMessage(dict.msgSelesai);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="min-h-screen w-full flex bg-[#f1f5f9] font-sans text-slate-800 select-none relative">
            {/* TOAST CENTANG HIJAU */}
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
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold bg-[#252f48] text-white shadow-sm border-l-4 border-amber-500 transition-all cursor-pointer">
                            <ChefHat className="w-4 h-4 text-amber-400" />
                            <span>{dict.navAntrian}</span>
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
                        {dict.headerTitle}
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

                <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                            <div className="flex items-center gap-2 text-amber-600 text-xs font-bold">
                                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                                <span>{dict.statAntrian}</span>
                            </div>
                            <p className="text-3xl font-black text-slate-900">
                                {antreanOrders.length}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                <Utensils className="w-4 h-4 text-slate-400" />
                                <span>{dict.statPorsi}</span>
                            </div>
                            <p className="text-3xl font-black text-slate-900">
                                {totalPorsiInQueue}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                            <div className="flex items-center gap-2 text-amber-500 text-xs font-bold">
                                <Bell className="w-4 h-4 text-amber-500" />
                                <span>{dict.statSiap}</span>
                            </div>
                            <p className="text-3xl font-black text-slate-900">
                                {readyOrders.length}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
                                <CheckSquare className="w-4 h-4 text-emerald-600" />
                                <span>{dict.statSelesai}</span>
                            </div>
                            <p className="text-3xl font-black text-slate-900">
                                {servedOrders.length}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Kolom Kiri: Antrian Dapur */}
                        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 min-h-[360px]">
                            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
                                <span>🧑‍🍳</span>
                                <span>{dict.sectionAntrian}</span>
                            </div>

                            {antreanOrders.length === 0 ? (
                                <div className="py-24 text-center">
                                    <p className="text-xs text-slate-400 font-medium">
                                        {dict.belumAdaData}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4 pt-1">
                                    {antreanOrders.map((ord, idx) => (
                                        <div
                                            key={ord.id}
                                            className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/70 space-y-4"
                                        >
                                            <div className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-1.5 font-extrabold text-slate-900 text-sm">
                                                    <span>
                                                        #{idx + 1} · Meja{" "}
                                                        {ord.table}
                                                    </span>
                                                    <span className="text-slate-400 font-medium text-xs ml-1">
                                                        {ord.customer}
                                                    </span>
                                                </div>
                                                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-[11px] font-bold flex items-center gap-1">
                                                    <Clock className="w-3 h-3 text-amber-600" />
                                                    {ord.elapsedMinutes || 0}{" "}
                                                    menit
                                                </span>
                                            </div>

                                            <div className="space-y-1">
                                                {ord.items.map(
                                                    (item, itemIdx) => (
                                                        <p
                                                            key={itemIdx}
                                                            className="text-xs font-bold text-slate-800"
                                                        >
                                                            {item.name}{" "}
                                                            <span className="font-extrabold text-slate-900">
                                                                ×{item.qty}
                                                            </span>
                                                        </p>
                                                    ),
                                                )}
                                            </div>

                                            <div>
                                                <button
                                                    onClick={() =>
                                                        handleMarkReady(ord.id)
                                                    }
                                                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                                                >
                                                    {dict.btnSelesai}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Kolom Kanan: Total Harus Dimasak & Baru Selesai */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 min-h-[170px]">
                                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
                                    <ClipboardList className="w-4 h-4 text-amber-500" />
                                    <span>{dict.sectionTotal}</span>
                                </div>

                                {Object.keys(summaryToCook).length === 0 ? (
                                    <div className="py-8 text-center">
                                        <p className="text-xs text-slate-400 font-medium">
                                            {dict.belumAdaData}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 pt-1">
                                        {Object.entries(summaryToCook).map(
                                            ([menuName, totalQty]) => (
                                                <div
                                                    key={menuName}
                                                    className="flex items-center justify-between text-xs font-bold"
                                                >
                                                    <span className="text-slate-900 w-28 truncate">
                                                        {menuName}
                                                    </span>
                                                    <div className="flex-1 mx-3 h-3 bg-amber-500 rounded-full shadow-inner"></div>
                                                    <span className="text-slate-900 font-extrabold">
                                                        ×{totalQty}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 min-h-[170px]">
                                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
                                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                                    <span>{dict.sectionBaruSelesai}</span>
                                </div>

                                {readyOrders.length === 0 ? (
                                    <div className="py-12 text-center">
                                        <p className="text-xs text-slate-400 font-medium">
                                            {dict.belumAdaData}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {readyOrders.map((ord) => (
                                            <div
                                                key={ord.id}
                                                className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs"
                                            >
                                                <div>
                                                    <p className="font-bold text-slate-900">
                                                        Meja {ord.table} -{" "}
                                                        {ord.customer}
                                                    </p>
                                                    <p className="text-[10px] text-emerald-700 font-medium">
                                                        {ord.items
                                                            .map(
                                                                (i) =>
                                                                    `${i.name} (x${i.qty})`,
                                                            )
                                                            .join(", ")}
                                                    </p>
                                                </div>
                                                <span className="px-2.5 py-1 bg-emerald-600 text-white font-bold text-[10px] rounded-lg">
                                                    Siap Diambil
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* MODAL AVATAR */}
            {isAvatarModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                                <UserCheck className="w-4 h-4 text-amber-500" />
                                <span>Pilih Avatar Koki</span>
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
