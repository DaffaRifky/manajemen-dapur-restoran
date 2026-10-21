import React, { useState } from "react";
import {
  KeyRound,
  User,
  Lock,
  Users,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function LupaPassword({ onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    newPassword: "",
    role: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  // Database Akun Terdaftar (Sebagai Simulasi Pengecekan Kredensial)
  const defaultAccounts = {
    waiter: { username: "waiter" },
    koki: { username: "koki" },
    kasir: { username: "kasir" },
    owner: { username: "owner" },
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const inputUsername = formData.username.trim().toLowerCase();
    const selectedRole = formData.role;

    // 1. Validasi Kelengkapan Field
    if (!inputUsername || !formData.newPassword || !selectedRole) {
      setMessage({
        type: "error",
        text: "Semua data (Username, Password Baru, dan Role) wajib diisi!",
      });
      return;
    }

    // 2. Validasi Pengecekan Username & Role
    const validAccount = defaultAccounts[selectedRole];

    if (
      validAccount &&
      (inputUsername === validAccount.username ||
        inputUsername.includes(selectedRole))
    ) {
      // Pilihan Benar
      setMessage({
        type: "success",
        text: `Password untuk akun "${formData.username}" (${selectedRole.toUpperCase()}) berhasil diperbarui! Silakan masuk dengan password baru.`,
      });

      // Otomatis tutup popup setelah 3 detik
      setTimeout(() => {
        onClose();
      }, 3000);
    } else {
      // Pilihan Salah
      setMessage({
        type: "error",
        text: `Username "${formData.username}" tidak ditemukan atau tidak sesuai dengan role ${selectedRole.toUpperCase()}! Silakan periksa kembali.`,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-slate-100 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Modal */}
        <div className="text-center space-y-2 mb-5">
          <div className="w-12 h-12 bg-amber-50 text-[#9e6d3b] rounded-2xl flex items-center justify-center mx-auto border border-amber-200">
            <KeyRound className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-extrabold text-slate-900">
            Reset Password Akun
          </h3>
          <p className="text-xs text-slate-500 px-2">
            Masukkan Username, Role, dan Password Baru Anda untuk memperbarui
            kata sandi.
          </p>
        </div>

        {/* BANNER PESAN SUKSES (HIJAU) */}
        {message.type === "success" && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{message.text}</span>
          </div>
        )}

        {/* BANNER PESAN ERROR (MERAH) */}
        {message.type === "error" && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-xs font-semibold">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span>{message.text}</span>
          </div>
        )}

        {/* Form Reset Password */}
        <form onSubmit={handleForgotSubmit} className="space-y-3.5">
          {/* 1. Input Username */}
          <div className="space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                placeholder="Username Anda"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9e6d3b]/40 focus:border-[#9e6d3b] transition-all"
              />
            </div>
          </div>

          {/* 2. Input Password Baru */}
          <div className="space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                placeholder="Password Baru"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9e6d3b]/40 focus:border-[#9e6d3b] transition-all"
              />
            </div>
          </div>

          {/* 3. Dropdown Pilih Role */}
          <div className="space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Users className="w-4 h-4" />
              </div>
              <select
                required
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full pl-10 pr-8 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#9e6d3b]/40 focus:border-[#9e6d3b] transition-all cursor-pointer appearance-none"
              >
                <option value="" disabled>
                  Pilih Role Anda
                </option>
                <option value="waiter">Waiter (Pelayan Meja)</option>
                <option value="koki">Koki (Kitchen Staff)</option>
                <option value="kasir">Kasir (Cashier)</option>
                <option value="owner">Owner (Pemilik Restoran)</option>
              </select>
            </div>
          </div>

          {/* Tombol Simpan */}
          <button
            type="submit"
            className="w-full mt-2 py-3 px-6 bg-[#9e6d3b] hover:bg-[#855a2f] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span>Reset Password Sekarang</span>
          </button>
        </form>
      </div>
    </div>
  );
}
