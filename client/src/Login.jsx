import React, { useState } from "react";
import {
    ChefHat,
    User,
    Lock,
    Eye,
    EyeOff,
    Users,
    ArrowRight,
    FileText,
    Utensils,
    CreditCard,
    ArrowLeft,
} from "lucide-react";

export default function Login({ onNavigateToHome, onLoginSuccess }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
        rememberMe: false,
    });

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        if (!formData.role) {
            alert("Silakan pilih peran (role) terlebih dahulu!");
            return;
        }

        // Mengirim data role dan username ke App.jsx
        if (onLoginSuccess) {
            onLoginSuccess(formData.role, formData.username || "fdfd");
        } else {
            alert(`Berhasil masuk sebagai [${formData.role}]!`);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-[#f7f4ef] font-sans text-slate-800 relative overflow-hidden select-none">
            {/* BAGIAN KIRI: HERO GAMBAR DENGAN DIVIDER LENGKUNG */}
            <div className="hidden lg:flex lg:w-7/12 relative overflow-hidden flex-col justify-between p-12 text-white">
                {/* Background Image Dapur */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw3LqhrQVvYclrQ_Vkr1GcbUUSFy8ahiorxgr02vi7dA&s=10')`,
                    }}
                />

                {/* Overlay Cokelat Gelap / Shadow Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />

                {/* EFEK LENGKUNGAN (CURVED SVG SEPARATOR) */}
                <div className="absolute top-0 bottom-0 right-0 w-28 z-20 pointer-events-none">
                    <svg
                        className="h-full w-full fill-[#f7f4ef]"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        <path d="M100,0 C30,30 30,70 100,100 L100,0 Z" />
                    </svg>
                </div>

                {/* Header Kiri (Logo & Brand) */}
                <div className="relative z-30 flex items-center gap-3">
                    <div className="text-amber-400">
                        <ChefHat className="w-10 h-10 stroke-[1.8]" />
                    </div>
                    <div>
                        <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-300 block">
                            SISTEM MANAJEMEN
                        </span>
                        <span className="text-xl font-black tracking-wide text-white block leading-none">
                            DAPUR RESTORAN
                        </span>
                    </div>
                </div>

                {/* Konten Utama Kiri */}
                <div className="relative z-30 space-y-6 max-w-lg my-auto py-10">
                    <div className="space-y-2">
                        <h1 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-tight">
                            Kelola Dapur <br />
                            <span className="italic font-serif font-normal text-amber-200">
                                dengan Lebih Mudah
                            </span>
                        </h1>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal pt-2 pr-6">
                            Sistem manajemen dapur restoran yang membantu
                            mengelola pesanan, proses memasak, hingga pembayaran
                            secara terintegrasi dalam satu sistem.
                        </p>
                    </div>

                    {/* 3 Fitur Berbentuk Lingkaran */}
                    <div className="flex items-center gap-8 pt-4">
                        {/* Fitur 1 */}
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-14 h-14 rounded-full border-2 border-amber-300/80 bg-black/40 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-lg">
                                <FileText className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-slate-200 leading-tight">
                                Pesanan
                                <br />
                                Terlacak
                            </span>
                        </div>

                        {/* Fitur 2 */}
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-14 h-14 rounded-full border-2 border-amber-300/80 bg-black/40 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-lg">
                                <ChefHat className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-slate-200 leading-tight">
                                Proses
                                <br />
                                Dapur
                            </span>
                        </div>

                        {/* Fitur 3 */}
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-14 h-14 rounded-full border-2 border-amber-300/80 bg-black/40 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-lg">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-slate-200 leading-tight">
                                Pembayaran
                                <br />
                                Cepat
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Kiri */}
                <div className="relative z-30 flex items-center justify-between pr-8">
                    <p className="italic font-serif text-slate-200 text-base">
                        Dari Meja Hingga Hidangan Terbaik
                    </p>
                    <button
                        onClick={onNavigateToHome}
                        className="flex items-center gap-2 text-xs font-bold text-amber-200 hover:text-white transition-colors cursor-pointer bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Kembali</span>
                    </button>
                </div>
            </div>

            {/* BAGIAN KANAN: FORM LOGIN */}
            <div className="w-full lg:w-5/12 flex items-center justify-center p-6 sm:p-12 z-30 relative">
                <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-200/80 relative">
                    {/* Tombol Kembali versi Mobile */}
                    <button
                        onClick={onNavigateToHome}
                        className="lg:hidden absolute top-6 left-6 text-slate-400 hover:text-slate-700 flex items-center gap-1 text-xs font-bold"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Beranda
                    </button>

                    {/* Logo & Judul Form */}
                    <div className="text-center space-y-1 mb-6">
                        <div className="inline-flex text-[#9e6d3b] mb-1">
                            <ChefHat className="w-12 h-12 stroke-[1.6]" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 tracking-tight">
                            Selamat Datang
                        </h2>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            MASUK KE SISTEM MANAJEMEN DAPUR RESTORAN
                        </p>
                        <div className="w-10 h-1 bg-[#9e6d3b] mx-auto rounded-full !mt-3" />
                    </div>

                    {/* Form Input */}
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        {/* Input Username / Email */}
                        <div className="space-y-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <User className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    placeholder="Username / Email"
                                    value={formData.username}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            username: e.target.value,
                                        })
                                    }
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9e6d3b]/40 focus:border-[#9e6d3b] transition-all"
                                />
                            </div>
                        </div>

                        {/* Input Password */}
                        <div className="space-y-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                    className="w-full pl-10 pr-12 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9e6d3b]/40 focus:border-[#9e6d3b] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Dropdown Role (Waiter, Koki, Kasir, Owner) */}
                        <div className="space-y-1 pt-1">
                            <label className="text-[11px] font-bold text-slate-700 block">
                                Pilih Role
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Users className="w-4 h-4" />
                                </div>
                                <select
                                    required
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            role: e.target.value,
                                        })
                                    }
                                    className="w-full pl-10 pr-8 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#9e6d3b]/40 focus:border-[#9e6d3b] transition-all cursor-pointer appearance-none"
                                >
                                    <option value="" disabled>
                                        Pilih peran Anda
                                    </option>
                                    <option value="waiter">
                                        Waiter (Pelayan Meja)
                                    </option>
                                    <option value="koki">
                                        Koki (Kitchen Staff)
                                    </option>
                                    <option value="kasir">
                                        Kasir (Cashier)
                                    </option>
                                    <option value="owner">
                                        Owner (Pemilik Restoran)
                                    </option>
                                </select>
                            </div>
                        </div>

                        {/* Remember Me & Lupa Password */}
                        <div className="flex items-center justify-between text-xs pt-2">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            rememberMe: e.target.checked,
                                        })
                                    }
                                    className="w-4 h-4 rounded border-slate-300 text-[#9e6d3b] focus:ring-[#9e6d3b] accent-[#9e6d3b] cursor-pointer"
                                />
                                <span className="font-semibold text-slate-700">
                                    Ingat saya
                                </span>
                            </label>
                            <a
                                href="#forgot"
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert(
                                        "Silakan hubungi administrator sistem untuk reset password.",
                                    );
                                }}
                                className="font-bold text-[#9e6d3b] hover:underline"
                            >
                                Lupa password?
                            </a>
                        </div>

                        {/* Tombol Submit Cokelat */}
                        <button
                            type="submit"
                            className="w-full mt-3 py-3.5 px-6 bg-[#9e6d3b] hover:bg-[#855a2f] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                        >
                            <ArrowRight className="w-4 h-4" />
                            <span>Masuk ke Sistem</span>
                        </button>
                    </form>

                    {/* Footer Card Logo Sendok & Garpu */}
                    <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-center gap-3 text-center">
                        <div className="text-[#9e6d3b]">
                            <Utensils className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="text-[11px] font-bold text-slate-800">
                                Sistem Manajemen Dapur Restoran
                            </p>
                            <p className="text-[9px] font-medium text-slate-500">
                                Efisien{" "}
                                <span className="text-[#9e6d3b] font-bold">
                                    •
                                </span>{" "}
                                Terintegrasi{" "}
                                <span className="text-[#9e6d3b] font-bold">
                                    •
                                </span>{" "}
                                Profesional
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
