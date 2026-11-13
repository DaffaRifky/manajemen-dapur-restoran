import React, { useState } from "react";
import {
  LayoutDashboard,
  Coins,
  Calculator,
  CalendarCheck,
  LogOut,
  Settings,
  CheckCircle2,
  Camera,
  X,
} from "lucide-react";

export default function CashierDashboard({
  onLogout,
  username = "kasir",
  orders = [],
  setOrders,
}) {
  const [activeMenu, setActiveMenu] = useState("ringkasan");
  const [lang, setLang] = useState("id");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // State Avatar Profil Kasir
  const [avatar, setAvatar] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=CashierFelix&style=circle",
  );
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // Pilihan Avatar
  const avatarList = [
    {
      id: 1,
      url: "https://api.dicebear.com/7.x/avataaars/svg?seed=CashierFelix&style=circle",
      label: "Alex 3D",
    },
    {
      id: 2,
      url: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahCashier&style=circle",
      label: "Sarah 3D",
    },
    {
      id: 3,
      url: "https://api.dicebear.com/7.x/avataaars/svg?seed=HijabCashier&style=circle",
      label: "Aisha 3D",
    },
    {
      id: 4,
      url: "https://api.dicebear.com/7.x/avataaars/svg?seed=JackCashier&style=circle",
      label: "Daniel 3D",
    },
  ];

  // State Toast Notifikasi
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // State Uang Modal Kasir (Receh)
  const [modalDenominations, setModalDenominations] = useState([
    { nominal: 10000, qty: 3 },
    { nominal: 100000, qty: 2 },
  ]);
  const [inputNominal, setInputNominal] = useState("");
  const [inputQty, setInputQty] = useState("");

  // State Hitung Kas Akhir & Posting
  const [cashInDrawer, setCashInDrawer] = useState("");
  const [postedData, setPostedData] = useState([]);

  // Kamus Terjemahan
  const t = {
    id: {
      roleTitle: "Dashboard Kasir",
      loginAs: "Login sebagai Kasir",
      navRingkasan: "Ringkasan",
      navUangModal: "Uang modal kasir (receh)",
      navHitungKas: "Hitung kas akhir",
      navPosting: "Posting Harian",
      logout: "Keluar",
      ringkasanHeader: "Ringkasan",
      notaMenunggu: "Nota yang menunggu",
      penjualanHariIni: "Penjualan hari ini",
      tabelTransaksi: "Tabel Transaksi",
      meja: "Meja",
      menu: "Menu",
      total: "Total",
      waktuBayar: "Waktu Bayar",
      belumAdaData: "Belum ada data",
      btnBayar: "Proses Bayar",
      msgBayarSuccess: "Pembayaran pesanan berhasil diproses!",
      uangModalTitle: "Uang modal kasir (receh)",
      tambah: "Tambah",
      nominalPlaceholder: "Nominal uang modal...",
      hitungKasHeader: "Hitung kas akhir",
      seharusnyaModal: "Seharusnya (modal + tunai):",
      uangTunaiPlaceholder: "Uang tunai di laci",
      simpan: "Simpan",
      postingHeader: "Posting Harian",
      postingHarianBtn: "Posting Harian",
      dataPenjualan: "Data Penjualan",
      selectAvatar: "Pilih Avatar Kasir",
    },
    en: {
      roleTitle: "Cashier Dashboard",
      loginAs: "Logged in as Cashier",
      navRingkasan: "Overview",
      navUangModal: "Cash Drawer Float (Change)",
      navHitungKas: "Calculate Final Cash",
      navPosting: "Daily Posting",
      logout: "Logout",
      ringkasanHeader: "Overview",
      notaMenunggu: "Pending bills",
      penjualanHariIni: "Today's sales",
      tabelTransaksi: "Transaction Table",
      meja: "Table",
      menu: "Menu",
      total: "Total",
      waktuBayar: "Payment Time",
      belumAdaData: "No data available",
      btnBayar: "Process Payment",
      msgBayarSuccess: "Order payment processed successfully!",
      uangModalTitle: "Cash Drawer Float (Change)",
      tambah: "Add",
      nominalPlaceholder: "Float amount...",
      hitungKasHeader: "Calculate Final Cash",
      seharusnyaModal: "Expected (float + cash):",
      uangTunaiPlaceholder: "Cash in drawer",
      simpan: "Save",
      postingHeader: "Daily Posting",
      postingHarianBtn: "Daily Posting",
      dataPenjualan: "Sales Data",
      selectAvatar: "Select Cashier Avatar",
    },
  };

  const dict = t[lang];

  // Hitung Total Uang Modal
  const totalModalAmount = modalDenominations.reduce(
    (acc, item) => acc + item.nominal * item.qty,
    0,
  );

  const handleAddModalDenomination = () => {
    const nom = parseInt(inputNominal);
    const q = parseInt(inputQty) || 1;
    if (!nom) return;

    setModalDenominations((prev) => {
      const existing = prev.find((item) => item.nominal === nom);
      if (existing) {
        return prev.map((item) =>
          item.nominal === nom ? { ...item, qty: item.qty + q } : item,
        );
      }
      return [...prev, { nominal: nom, qty: q }];
    });
    setInputNominal("");
    setInputQty("");
  };

  const pendingOrders = orders.filter(
    (o) => o.status !== "Sudah Dibayar" && o.status !== "Paid",
  );

  const handleProcessPayment = (orderId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "Sudah Dibayar",
              paidAt: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : o,
      ),
    );
    setToastMessage(dict.msgBayarSuccess);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const paidOrders = orders.filter((o) => o.status === "Sudah Dibayar");
  const totalSalesToday = paidOrders.reduce(
    (sum, o) => sum + (o.total || 0),
    0,
  );

  const handleSaveFinalCash = () => {
    setToastMessage(
      lang === "id"
        ? "Kas akhir berhasil disimpan!"
        : "Final cash saved successfully!",
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePostingHarian = () => {
    if (paidOrders.length === 0) {
      setToastMessage(
        lang === "id"
          ? "Tidak ada data transaksi untuk diposting!"
          : "No transaction data to post!",
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    setPostedData([...paidOrders]);
    setToastMessage(
      lang === "id"
        ? "Posting harian berhasil dilakukan!"
        : "Daily posting completed successfully!",
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="h-screen w-full flex bg-[#f1f5f9] font-sans text-slate-800 select-none overflow-hidden relative">
      {/* MODAL PILIH AVATAR */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                {dict.selectAvatar}
              </h3>
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 py-2">
              {avatarList.map((av) => (
                <div
                  key={av.id}
                  onClick={() => {
                    setAvatar(av.url);
                    setIsAvatarModalOpen(false);
                  }}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 cursor-pointer transition-all hover:border-amber-500 ${
                    avatar === av.url
                      ? "border-amber-500 bg-amber-50/50"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <img
                    src={av.url}
                    alt={av.label}
                    className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-xs"
                  />
                  <span className="text-xs font-bold text-slate-700">
                    {av.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* NOTIFIKASI TOAST */}
      {showToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-lg border border-emerald-500 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span className="text-xs font-bold tracking-wide">
            {toastMessage}
          </span>
        </div>
      )}

      {/* SIDEBAR KIRI */}
      <aside className="w-64 bg-[#141b2d] text-slate-300 flex flex-col justify-between p-4 shrink-0 h-screen sticky top-0 z-40">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 pt-2">
            <div className="bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-900 p-2.5 rounded-xl shadow-md">
              <span className="font-black text-sm">Ψq</span>
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
              onClick={() => setActiveMenu("uang-modal")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeMenu === "uang-modal"
                  ? "bg-[#252f48] text-white shadow-sm border-l-4 border-amber-500"
                  : "hover:bg-slate-800/60 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>{dict.navUangModal}</span>
            </button>

            <button
              onClick={() => setActiveMenu("hitung-kas")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeMenu === "hitung-kas"
                  ? "bg-[#252f48] text-white shadow-sm border-l-4 border-amber-500"
                  : "hover:bg-slate-800/60 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>{dict.navHitungKas}</span>
            </button>

            <button
              onClick={() => setActiveMenu("posting-harian")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeMenu === "posting-harian"
                  ? "bg-[#252f48] text-white shadow-sm border-l-4 border-amber-500"
                  : "hover:bg-slate-800/60 text-slate-400 hover:text-slate-200"
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{dict.navPosting}</span>
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

      {/* KONTEN KANAN */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs shrink-0">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {activeMenu === "ringkasan" && dict.ringkasanHeader}
            {activeMenu === "uang-modal" && dict.uangModalTitle}
            {activeMenu === "hitung-kas" && dict.hitungKasHeader}
            {activeMenu === "posting-harian" && dict.postingHeader}
          </h1>

          <div className="flex items-center gap-4">
            {/* AVATAR PROFIL KASIR (SAMA SEPERTI WAITER) */}
            <div
              onClick={() => setIsAvatarModalOpen(true)}
              className="flex items-center gap-3 bg-slate-50 hover:bg-amber-50/60 border border-slate-200/80 hover:border-amber-300 px-3.5 py-1.5 rounded-2xl shadow-xs cursor-pointer transition-all group"
            >
              <div className="relative w-10 h-10 rounded-full bg-amber-100 p-0.5 border-2 border-amber-400 shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
                <img
                  src={avatar}
                  alt="Profile Cashier"
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
          {/* MENU 1: RINGKASAN */}
          {activeMenu === "ringkasan" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <span className="text-xs font-bold text-slate-500">
                    {dict.notaMenunggu}
                  </span>
                  <p className="text-3xl font-black text-slate-900">
                    {pendingOrders.length}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <span className="text-xs font-bold text-slate-500">
                    {dict.penjualanHariIni}
                  </span>
                  <p className="text-3xl font-black text-slate-900">
                    Rp {totalSalesToday.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900">
                  {dict.tabelTransaksi}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="pb-3">{dict.meja}</th>
                        <th className="pb-3">{dict.menu}</th>
                        <th className="pb-3">{dict.total}</th>
                        <th className="pb-3">{dict.waktuBayar}</th>
                        <th className="pb-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                      {orders.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="py-8 text-center text-slate-400"
                          >
                            {dict.belumAdaData}
                          </td>
                        </tr>
                      ) : (
                        orders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-slate-50/50">
                            <td className="py-3 font-bold text-slate-900">
                              Meja {ord.table} — {ord.customer}
                            </td>
                            <td className="py-3 text-slate-500">
                              {ord.items
                                ?.map((i) => `${i.name} ×${i.qty}`)
                                .join(", ")}
                            </td>
                            <td className="py-3 font-bold text-slate-900">
                              Rp {ord.total?.toLocaleString("id-ID")}
                            </td>
                            <td className="py-3">
                              {ord.status === "Sudah Dibayar" ? (
                                <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-200">
                                  Lunas ({ord.paidAt || "Selesai"})
                                </span>
                              ) : (
                                <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-[10px] font-bold border border-amber-200">
                                  Menunggu Pembayaran
                                </span>
                              )}
                            </td>
                            <td className="py-3 text-right">
                              {ord.status !== "Sudah Dibayar" && (
                                <button
                                  onClick={() => handleProcessPayment(ord.id)}
                                  className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
                                >
                                  {dict.btnBayar}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* MENU 2: UANG MODAL KASIR (RECEH) */}
          {activeMenu === "uang-modal" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
              <h3 className="text-sm font-extrabold text-slate-900">
                {dict.uangModalTitle}
              </h3>

              <div className="space-y-3">
                {modalDenominations.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200/60 max-w-md"
                  >
                    <span className="text-xs font-bold text-slate-700">
                      Rp {item.nominal.toLocaleString("id-ID")} × {item.qty}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">
                      Rp {(item.nominal * item.qty).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <input
                  type="number"
                  placeholder={dict.nominalPlaceholder}
                  value={inputNominal}
                  onChange={(e) => setInputNominal(e.target.value)}
                  className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-amber-500"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={inputQty}
                  onChange={(e) => setInputQty(e.target.value)}
                  className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-amber-500 w-24"
                />
                <button
                  onClick={handleAddModalDenomination}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
                >
                  {dict.tambah}
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100 max-w-md">
                <p className="text-sm font-black text-slate-900">
                  Total: Rp {totalModalAmount.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          )}

          {/* MENU 3: HITUNG KAS AKHIR */}
          {activeMenu === "hitung-kas" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6 max-w-xl">
              <h3 className="text-sm font-extrabold text-slate-900">
                {dict.hitungKasHeader}
              </h3>
              <p className="text-xs font-bold text-slate-600">
                {dict.seharusnyaModal}{" "}
                <span className="text-slate-900 font-black">
                  Rp{" "}
                  {(totalModalAmount + totalSalesToday).toLocaleString("id-ID")}
                </span>
              </p>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder={dict.uangTunaiPlaceholder}
                  value={cashInDrawer}
                  onChange={(e) => setCashInDrawer(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-amber-500"
                />
                <button
                  onClick={handleSaveFinalCash}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
                >
                  {dict.simpan}
                </button>
              </div>
            </div>
          )}

          {/* MENU 4: POSTING HARIAN */}
          {activeMenu === "posting-harian" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">
                    Tabel Transaksi:{" "}
                    <strong className="text-slate-900">
                      {paidOrders.length} · Rp{" "}
                      {totalSalesToday.toLocaleString("id-ID")}
                    </strong>
                  </span>
                  <button
                    onClick={handlePostingHarian}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
                  >
                    {dict.postingHarianBtn}
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900">
                  {dict.dataPenjualan}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="pb-3">{dict.meja}</th>
                        <th className="pb-3">{dict.menu}</th>
                        <th className="pb-3">{dict.total}</th>
                        <th className="pb-3">{dict.waktuBayar}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                      {postedData.length === 0 ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="py-8 text-center text-slate-400"
                          >
                            {dict.belumAdaData}
                          </td>
                        </tr>
                      ) : (
                        postedData.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/50">
                            <td className="py-3 font-bold text-slate-900">
                              Meja {item.table} — {item.customer}
                            </td>
                            <td className="py-3 text-slate-500">
                              {item.items
                                ?.map((i) => `${i.name} ×${i.qty}`)
                                .join(", ")}
                            </td>
                            <td className="py-3 font-bold text-slate-900">
                              Rp {item.total?.toLocaleString("id-ID")}
                            </td>
                            <td className="py-3 text-slate-500">
                              {item.paidAt || "Selesai"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
