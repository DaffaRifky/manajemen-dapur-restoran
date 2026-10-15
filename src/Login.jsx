<<<<<<< HEAD
import { useState } from "react";
import {
    ChefHat,
    User,
    Lock,
    Eye,
    EyeOff,
    Users,
    ArrowRight,
    FileText,
    CreditCard,
    UtensilsCrossed,
    Utensils,
    ChevronDown,
} from "lucide-react";

export default function Login({ onNavigateToHome }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
        rememberMe: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Submitted:", formData);
        // Tambahkan logika autentikasi / routing Anda di sini
    };

    return (
        <div className="min-h-screen w-full flex bg-[#F8F5F0] font-sans selection:bg-amber-200 overflow-x-hidden">
            {/* SISI KIRI: HERO & BRANDING SECTION */}
            <div className="hidden lg:flex lg:w-[58%] relative bg-slate-900 flex-col justify-between p-10 xl:p-14 text-white overflow-hidden">
                {/* Background Image Resto Kitchen with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80"
                        alt="Kitchen Background"
                        className="w-full h-full object-cover object-center scale-105"
                    />
                    {/* Gradient Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-transparent"></div>
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
                </div>

                {/* Content Layer */}
                <div className="relative z-10 space-y-12 my-auto max-w-xl">
                    {/* Brand Header / Logo */}
                    <div className="flex items-center gap-3.5">
                        <div className="bg-[#D9A362] p-2.5 rounded-2xl text-slate-950 shadow-lg">
                            <ChefHat className="w-8 h-8 stroke-[2.2]" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em] leading-none mb-1">
                                SISTEM MANAJEMEN
                            </p>
                            <h1 className="text-xl xl:text-2xl font-black text-white tracking-wide leading-tight">
                                DAPUR RESTORAN
                            </h1>
                        </div>
                    </div>

                    {/* Main Title & Description */}
                    <div className="space-y-4 pt-4">
                        <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
                            Kelola Dapur <br />
                            <span className="font-serif italic font-normal text-[#E5B880]">
                                dengan Lebih Mudah
                            </span>
                        </h2>
                        <p className="text-slate-300 text-sm xl:text-base leading-relaxed font-normal max-w-md">
                            Sistem manajemen dapur restoran yang membantu
                            mengelola pesanan, proses memasak, hingga pembayaran
                            secara terintegrasi dalam satu sistem.
                        </p>
                    </div>

                    {/* 3 Main Feature Badges */}
                    <div className="grid grid-cols-3 gap-4 pt-2 max-w-md">
                        <div className="flex flex-col items-center text-center space-y-2">
                            <div className="w-14 h-14 rounded-full border border-amber-400/50 bg-black/40 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-inner">
                                <FileText className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-semibold text-slate-200 leading-snug">
                                Pesanan
                                <br />
                                Terlacak
                            </span>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-2">
                            <div className="w-14 h-14 rounded-full border border-amber-400/50 bg-black/40 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-inner">
                                <ChefHat className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-semibold text-slate-200 leading-snug">
                                Proses
                                <br />
                                Dapur
                            </span>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-2">
                            <div className="w-14 h-14 rounded-full border border-amber-400/50 bg-black/40 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-inner">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-semibold text-slate-200 leading-snug">
                                Pembayaran
                                <br />
                                Cepat
                            </span>
                        </div>
                    </div>

                    {/* Handwritten Callout Footer */}
                    <div className="pt-8">
                        <div className="relative inline-block">
                            <p className="font-serif italic text-2xl xl:text-3xl text-amber-200/90 tracking-wide font-light">
                                Dari Meja <br />
                                Hingga Hidangan <br />
                                Terbaik
                            </p>
                            <div className="w-32 h-[2px] bg-gradient-to-r from-amber-400/80 to-transparent mt-2 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Back to Home Button (Optional Helper) */}
                {onNavigateToHome && (
                    <button
                        onClick={onNavigateToHome}
                        className="relative z-10 self-start text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-medium"
                    >
                        ← Kembali ke Landing Page
                    </button>
                )}
            </div>

            {/* SISI KANAN: FORM LOGIN SECTION */}
            <div className="w-full lg:w-[42%] bg-[#F5EFE6] flex items-center justify-center p-6 sm:p-10 relative">
                {/* Curved Divider Line Decor (Matching the curve in design) */}
                <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-12 bg-[#F5EFE6] -translate-x-full rounded-l-[100px] z-10"></div>

                {/* Floating Card Container */}
                <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(142,108,68,0.12)] border border-amber-900/5 relative z-20">
                    {/* Card Top Logo */}
                    <div className="text-center space-y-3 mb-8">
                        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-50 text-[#8E5A2A]">
                            <ChefHat className="w-9 h-9 stroke-[2]" />
                        </div>

                        <div>
                            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                                Selamat Datang
                            </h3>
                            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mt-1">
                                MASUK KE SISTEM MANAJEMEN DAPUR RESTORAN
                            </p>
                        </div>

                        {/* Accent Gold Line */}
                        <div className="w-12 h-[3px] bg-[#B07B43] mx-auto rounded-full mt-3"></div>
                    </div>

                    {/* LOGIN FORM */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Input Username / Email */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <User className="w-5 h-5 stroke-[1.8]" />
                            </div>
                            <input
                                type="text"
                                placeholder="Username / Email"
                                required
                                className="w-full pl-11 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#B07B43] focus:bg-white focus:ring-1 focus:ring-[#B07B43] transition-all"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        username: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Input Password */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Lock className="w-5 h-5 stroke-[1.8]" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                                className="w-full pl-11 pr-11 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#B07B43] focus:bg-white focus:ring-1 focus:ring-[#B07B43] transition-all"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5 stroke-[1.8]" />
                                ) : (
                                    <Eye className="w-5 h-5 stroke-[1.8]" />
                                )}
                            </button>
                        </div>

                        {/* Select Role */}
                        <div className="space-y-1.5 pt-1">
                            <label className="block text-xs font-bold text-slate-700">
                                Pilih Role
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Users className="w-5 h-5 stroke-[1.8]" />
                                </div>
                                <select
                                    required
                                    className="w-full pl-11 pr-10 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#B07B43] focus:bg-white focus:ring-1 focus:ring-[#B07B43] transition-all appearance-none cursor-pointer"
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            role: e.target.value,
                                        })
                                    }
                                >
                                    <option value="" disabled>
                                        Pilih peran Anda
                                    </option>
                                    <option value="waiter">
                                        Pelayan (Waiter)
                                    </option>
                                    <option value="chef">
                                        Koki / Dapur (Chef)
                                    </option>
                                    <option value="cashier">
                                        Kasir (Cashier)
                                    </option>
                                    <option value="admin">
                                        Administrator / Manager
                                    </option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                                    <ChevronDown className="w-4 h-4 stroke-[2.2]" />
                                </div>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-xs pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-slate-300 text-[#8E5A2A] focus:ring-[#8E5A2A] accent-[#8E5A2A] cursor-pointer"
                                    checked={formData.rememberMe}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            rememberMe: e.target.checked,
                                        })
                                    }
                                />
                                <span>Ingat saya</span>
                            </label>
                            <a
                                href="#forgot"
                                className="text-[#A4713A] hover:text-[#7A5025] font-semibold transition-colors"
                            >
                                Lupa password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full mt-4 bg-[#8E5A2A] hover:bg-[#784A20] text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 group active:scale-[0.99]"
                        >
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
                            <span>Masuk ke Sistem</span>
                        </button>
                    </form>

                    {/* Card Footer Micro-branding */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-3">
                        <Utensils className="w-5 h-5 text-[#8E5A2A]" />
                        <div className="text-left">
                            <p className="text-[11px] font-extrabold text-slate-700 leading-tight">
                                Sistem Manajemen Dapur Restoran
                            </p>
                            <p className="text-[10px] font-medium text-slate-400">
                                Efisien • Terintegrasi • Profesional
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
=======
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
>>>>>>> temp
