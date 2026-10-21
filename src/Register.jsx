import React, { useState } from "react";
import {
  ChefHat,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  FileText,
  Utensils,
  CreditCard,
  ArrowLeft,
  Mail,
  Building2,
  CheckCircle2,
} from "lucide-react";

export default function Register({ onNavigateToHome, onNavigateToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State untuk menyimpan pesan sukses atau error
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    restaurantName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validasi kesesuaian password & verifikasi password
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage(
        "Password dan Verifikasi Password tidak cocok! Silakan periksa kembali.",
      );
      return;
    }

    // Tampilkan pesan sukses registrasi
    setSuccessMessage(
      `Registrasi berhasil! Akun restoran "${formData.restaurantName}" telah resmi terdaftar.`,
    );

    // Reset isi form
    setFormData({
      restaurantName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });

    // Otomatis alihkan ke halaman Login setelah 2.5 detik (opsional)
    setTimeout(() => {
      if (onNavigateToLogin) {
        onNavigateToLogin();
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f7f4ef] font-sans text-slate-800 relative overflow-hidden select-none">
      {/* BAGIAN KIRI: HERO GAMBAR DENGAN DIVIDER LENGKUNG */}
      <div className="hidden lg:flex lg:w-7/12 relative overflow-hidden flex-col justify-between p-12 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw3LqhrQVvYclrQ_Vkr1GcbUUSFy8ahiorxgr02vi7dA&s=10')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />

        <div className="absolute top-0 bottom-0 right-0 w-28 z-20 pointer-events-none">
          <svg
            className="h-full w-full fill-[#f7f4ef]"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M100,0 C30,30 30,70 100,100 L100,0 Z" />
          </svg>
        </div>

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

        <div className="relative z-30 space-y-6 max-w-lg my-auto py-10">
          <div className="space-y-2">
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Daftarkan Restoran <br />
              <span className="italic font-serif font-normal text-amber-200">
                dengan Mudah & Cepat
              </span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal pt-2 pr-6">
              Mulai otomatisasi dapur restoran Anda sekarang. Kelola pesanan,
              ketersediaan stok menu, dan komunikasi koki-waiter dalam satu
              platform.
            </p>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-14 h-14 rounded-full border-2 border-amber-300/80 bg-black/40 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-lg">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-200 leading-tight">
                Pesanan <br /> Terlacak
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-14 h-14 rounded-full border-2 border-amber-300/80 bg-black/40 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-lg">
                <ChefHat className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-200 leading-tight">
                Proses <br /> Dapur
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-14 h-14 rounded-full border-2 border-amber-300/80 bg-black/40 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-lg">
                <CreditCard className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-200 leading-tight">
                Pembayaran <br /> Cepat
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-30 flex items-center justify-between pr-8">
          <p className="italic font-serif text-slate-200 text-base">
            Dari Meja Hingga Hidangan Terbaik
          </p>
          <button
            onClick={onNavigateToHome}
            className="flex items-center gap-2 text-xs font-bold text-amber-200 hover:text-white transition-colors cursor-pointer bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </button>
        </div>
      </div>

      {/* BAGIAN KANAN: FORM REGISTRASI */}
      <div className="w-full lg:w-5/12 flex items-center justify-center p-6 sm:p-12 z-30 relative">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-200/80 relative">
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
              Buat Akun Baru
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              DAFTARKAN RESTORAN ANDA KE SISTEM
            </p>
            <div className="w-10 h-1 bg-[#9e6d3b] mx-auto rounded-full !mt-3" />
          </div>

          {/* BANNER PESAN SUKSES / ERROR */}
          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold animate-fade-in">
              {errorMessage}
            </div>
          )}

          {/* Form Input */}
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            {/* 1. Input Nama Restoran */}
            <div className="space-y-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Nama Restoran"
                  value={formData.restaurantName}
                  onChange={(e) =>
                    setFormData({ ...formData, restaurantName: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9e6d3b]/40 focus:border-[#9e6d3b] transition-all"
                />
              </div>
            </div>

            {/* 2. Input Email Restoran / Admin */}
            <div className="space-y-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Email Restoran / Admin"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9e6d3b]/40 focus:border-[#9e6d3b] transition-all"
                />
              </div>
            </div>

            {/* 3. Input Username */}
            <div className="space-y-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Username / Email / Nama Restoran"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9e6d3b]/40 focus:border-[#9e6d3b] transition-all"
                />
              </div>
            </div>

            {/* 4. Input Verifikasi Password Ulang */}
            <div className="space-y-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Verifikasi Password Ulang"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-12 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9e6d3b]/40 focus:border-[#9e6d3b] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* 5. Input Password Utama */}
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
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-12 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9e6d3b]/40 focus:border-[#9e6d3b] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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

            {/* Tombol Submit */}
            <button
              type="submit"
              className="w-full !mt-5 py-3.5 px-6 bg-[#9e6d3b] hover:bg-[#855a2f] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Daftar Akun Sekarang</span>
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
                Efisien <span className="text-[#9e6d3b] font-bold">•</span>{" "}
                Terintegrasi <span className="text-[#9e6d3b] font-bold">•</span>{" "}
                Profesional
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
