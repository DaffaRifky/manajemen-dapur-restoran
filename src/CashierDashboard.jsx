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
  CreditCard,
  Banknote,
  History,
} from "lucide-react";

export default function CashierDashboard({
  onLogout,
  username = "Kasir Resto",
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
  ];

  // State Toast Notifikasi
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // State Modal Pembayaran & Barcode QRIS
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cashGiven, setCashGiven] = useState("");

  // State Uang Modal Kasir (Receh)
  const [modalDenominations, setModalDenominations] = useState([
    { nominal: 100000, qty: 2 },
    { nominal: 10000, qty: 3 },
  ]);
  const [inputNominal, setInputNominal] = useState("");
  const [inputQty, setInputQty] = useState("");

  // State Hitung Kas Akhir & Posting Harian
  const [cashInDrawer, setCashInDrawer] = useState("");
  const [postedData, setPostedData] = useState([]);

  // Kamus 2 Bahasa
  const t = {
    id: {
      roleTitle: "Dashboard Kasir",
      loginAs: "Login sebagai Kasir",
      navRingkasan: "Ringkasan Transaksi",
      navUangModal: "Uang Modal Kasir (Receh)",
      navHitungKas: "Hitung Kas Akhir",
      navPosting: "Posting Harian",
      logout: "Keluar",
      ringkasanHeader: "Ringkasan Pembayaran & Kasir",
      notaMenunggu: "Nota Menunggu Pembayaran",
      penjualanHariIni: "Total Penjualan Hari Ini",
      tabelTransaksi: "Tabel Transaksi Aktif",
      riwayatTransaksi: "Riwayat Transaksi (Lunas)",
      meja: "Meja & Pelanggan",
      menu: "Detail Pesanan",
      total: "Total Harga",
      status: "Status Meja/Pesanan",
      belumAdaData: "Belum ada data transaksi",
      btnBayar: "Proses Bayar",
      msgBayarSuccess: "Pembayaran berhasil diproses oleh Kasir!",
      uangModalTitle: "Kelola Uang Modal / Receh untuk Kembalian",
      tambah: "Tambah Pecahan",
      nominalPlaceholder: "Nominal uang (mis: 50000)",
      hitungKasHeader: "Hitung Kas Akhir (Tutup Toko)",
      seharusnyaModal: "Total Seharusnya (Modal Awal + Tunai Masuk):",
      uangTunaiPlaceholder: "Masukkan total uang fisik di laci kasir",
      simpan: "Simpan Kas Akhir",
      postingHeader: "Posting Harian (Arsipkan ke Data Penjualan Bulanan)",
      postingHarianBtn: "Lakukan Posting Harian",
      dataPenjualan: "Arsip Data Penjualan Terposting",
      selectAvatar: "Pilih Avatar Kasir",
      modalBayarTitle: "Proses Pembayaran Pesanan",
      metodeBayar: "Metode Pembayaran",
      cash: "Tunai (Cash)",
      nonCash: "Non-Tunai (QRIS/Transfer)",
      uangDiterima: "Uang Tunai Dari Pelanggan",
      kembalian: "Uang Kembalian",
      konfirmasiBayar: "Konfirmasi & Selesaikan Pembayaran",
      batal: "Batal",
    },
    en: {
      roleTitle: "Cashier Dashboard",
      loginAs: "Logged in as Cashier",
      navRingkasan: "Transaction Overview",
      navUangModal: "Cash Drawer Float (Change)",
      navHitungKas: "Calculate Final Cash",
      navPosting: "Daily Posting",
      logout: "Logout",
      ringkasanHeader: "Payment & Cashier Overview",
      notaMenunggu: "Pending Bills",
      penjualanHariIni: "Today's Total Sales",
      tabelTransaksi: "Active Transaction Table",
      riwayatTransaksi: "Transaction History (Paid)",
      meja: "Table & Customer",
      menu: "Order Details",
      total: "Total Price",
      status: "Table/Order Status",
      belumAdaData: "No transaction data available",
      btnBayar: "Process Payment",
      msgBayarSuccess: "Payment processed successfully by cashier!",
      uangModalTitle: "Manage Cash Float / Change",
      tambah: "Add Denomination",
      nominalPlaceholder: "Nominal amount",
      hitungKasHeader: "Calculate Final Cash (Closing)",
      seharusnyaModal: "Expected Total (Float + Cash):",
      uangTunaiPlaceholder: "Enter total physical cash in drawer",
      simpan: "Save Final Cash",
      postingHeader: "Daily Posting (Archive to Monthly Sales)",
      postingHarianBtn: "Execute Daily Posting",
      dataPenjualan: "Archived Sales Data",
      selectAvatar: "Select Cashier Avatar",
      modalBayarTitle: "Process Order Payment",
      metodeBayar: "Payment Method",
      cash: "Cash",
      nonCash: "Non-Cash (QRIS/Transfer)",
      uangDiterima: "Cash Received",
      kembalian: "Change",
      konfirmasiBayar: "Confirm & Complete Payment",
      batal: "Cancel",
    },
  };

  const dict = t[lang];

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

  const paidOrders = orders.filter((o) => o.status === "Sudah Dibayar");
  // State Modal Struk Pembayaran
const [selectedReceipt, setSelectedReceipt] = useState(null);
const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const handleConfirmPayment = () => {
    if (!selectedOrderForPayment) return;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrderForPayment.id
          ? {
              ...o,
              status: "Sudah Dibayar",
              paymentMethod:
                paymentMethod === "cash" ? "Tunai" : "Non-Tunai (QRIS)",
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

    setSelectedOrderForPayment(null);
    setCashGiven("");
  };

  const totalSalesToday = paidOrders.reduce(
    (sum, o) => sum + (o.total || 0),
    0,
  );

  const handleSaveFinalCash = () => {
    setToastMessage(
      lang === "id"
        ? "Kas akhir berhasil disimpan dan dicocokkan!"
        : "Final cash saved and reconciled successfully!",
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
    setPostedData([...postedData, ...paidOrders]);
    setToastMessage(
      lang === "id"
        ? "Posting harian berhasil! Data transaksi dipindahkan ke rekap penjualan."
        : "Daily posting successful! Transaction data moved to sales report.",
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="h-screen w-full flex bg-[#f1f5f9] font-sans text-slate-800 select-none overflow-hidden relative">
      {/* MODAL PEMBAYARAN & BARCODE QRIS BESAR */}
      {selectedOrderForPayment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                {dict.modalBayarTitle} (Meja {selectedOrderForPayment.table})
              </h3>
              <button
                onClick={() => setSelectedOrderForPayment(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between bg-slate-50 p-3 rounded-xl">
                <span className="font-bold text-slate-600">Pelanggan:</span>
                <span className="font-extrabold text-slate-900">
                  {selectedOrderForPayment.customer}
                </span>
              </div>
              <div className="flex justify-between bg-slate-50 p-3 rounded-xl">
                <span className="font-bold text-slate-600">Total Tagihan:</span>
                <span className="font-black text-amber-600 text-sm">
                  Rp {selectedOrderForPayment.total?.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="space-y-1 pt-1">
                <label className="font-bold text-slate-700">
                  {dict.metodeBayar}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`py-2 px-3 rounded-xl border font-bold flex items-center justify-center gap-2 cursor-pointer ${
                      paymentMethod === "cash"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    <Banknote className="w-4 h-4" /> {dict.cash}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("non-cash")}
                    className={`py-2 px-3 rounded-xl border font-bold flex items-center justify-center gap-2 cursor-pointer ${
                      paymentMethod === "non-cash"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> {dict.nonCash}
                  </button>
                </div>
              </div>

              {/* BARCODE QRIS DIPERBESAR (w-40 h-40) */}
              {paymentMethod === "non-cash" && (
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-center animate-in fade-in duration-200">
                  <p className="font-extrabold text-slate-800 text-xs">
                    Scan QRIS untuk Pembayaran Non-Tunai
                  </p>
                  <div className="bg-white p-3 rounded-xl shadow-xs border border-slate-200">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=RESTO-POS-PAYMENT"
                      alt="QRIS Barcode"
                      className="w-40 h-40 object-contain mx-auto"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Silakan scan menggunakan aplikasi Mobile Banking atau
                    E-Wallet
                  </p>
                </div>
              )}

              {paymentMethod === "cash" && (
                <div className="space-y-1 animate-in fade-in duration-200">
                  <label className="font-bold text-slate-700">
                    {dict.uangDiterima}
                  </label>
                  <input
                    type="number"
                    placeholder="Contoh: 50000"
                    value={cashGiven}
                    onChange={(e) => setCashGiven(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl font-bold text-slate-800 outline-none focus:border-amber-500"
                  />
                  {cashGiven >= selectedOrderForPayment.total && (
                    <div className="flex justify-between pt-2 text-emerald-700 font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                      <span>{dict.kembalian}:</span>
                      <span>
                        Rp{" "}
                        {(
                          cashGiven - selectedOrderForPayment.total
                        ).toLocaleString("id-ID")}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setSelectedOrderForPayment(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                {dict.batal}
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                {dict.konfirmasiBayar}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PILIH AVATAR */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
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
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                    avatar === av.url
                      ? "border-amber-500 bg-amber-50/50"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <img
                    src={av.url}
                    alt={av.label}
                    className="w-14 h-14 rounded-full object-cover border border-slate-200"
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
          {/* MENU 1: RINGKASAN & RIWAYAT TRANSAKSI */}
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

              {/* TABEL TRANSAKSI AKTIF */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900">
                  {dict.tabelTransaksi}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="pb-3">{dict.meja}</th>
                        <th className="pb-3">{dict.menu} (Harga & Qty)</th>
                        <th className="pb-3">{dict.total}</th>
                        <th className="pb-3">{dict.status}</th>
                        <th className="pb-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                      {pendingOrders.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="py-6 text-center text-slate-400"
                          >
                            {dict.belumAdaData}
                          </td>
                        </tr>
                      ) : (
                        pendingOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-slate-50/50">
                            <td className="py-3 font-bold text-slate-900">
                              Meja {ord.table} — {ord.customer}
                            </td>
                            <td className="py-3 text-slate-500">
                              {ord.items
                                ?.map(
                                  (i) =>
                                    `${i.name} (Rp ${i.price.toLocaleString("id-ID")} × ${i.qty})`,
                                )
                                .join(", ")}
                            </td>
                            <td className="py-3 font-bold text-slate-900">
                              Rp {ord.total?.toLocaleString("id-ID")}
                            </td>
                            <td className="py-3">
                              <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-[10px] font-bold border border-amber-200">
                                {ord.status || "Siap Diambil"}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => setSelectedOrderForPayment(ord)}
                                className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
                              >
                                {dict.btnBayar}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABEL BARU: RIWAYAT TRANSAKSI (YANG SUDAH LUNAS) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-amber-600" />
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {dict.riwayatTransaksi}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="pb-3">{dict.meja}</th>
                        <th className="pb-3">{dict.menu}</th>
                        <th className="pb-3">{dict.total}</th>
                        <th className="pb-3">Metode Bayar</th>
                        <th className="pb-3">Waktu Lunas</th>
                        <th className="pb-3 text-right">Struk</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                      {paidOrders.length === 0 ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="py-6 text-center text-slate-400"
                          >
                            {dict.belumAdaData}
                          </td>
                        </tr>
                      ) : (
                        paidOrders.map((ord) => (
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
                              <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-200">
                                {ord.paymentMethod || "Tunai"}
                              </span>
                            </td>
                            <td className="py-3 text-slate-500 font-medium">
                              {ord.paidAt || "Hari ini"}
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => {
                                  setSelectedReceipt(ord);
                                  setIsReceiptModalOpen(true);
                                }}
                                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-[11px] px-3 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
                              >
                                <span>🧾 Cetak Struk</span>
                              </button>
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
          {/* MODAL CETAK STRUK PEMBAYARAN */}
          {/* MODAL CETAK STRUK PEMBAYARAN (VERSI LEBIH BAGUS & LENGKAP) */}
          {isReceiptModalOpen && selectedReceipt && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 space-y-4 overflow-hidden relative">
                {/* Tombol Tutup */}
                <button
                  onClick={() => setIsReceiptModalOpen(false)}
                  className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-600 p-2 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header Struk */}
                <div className="text-center space-y-1 pt-2">
                  <div className="bg-amber-500 text-slate-950 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto font-black text-xl shadow-sm">
                    🍽️
                  </div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight uppercase">
                    RESTO POS SYSTEM
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Jl. Politeknik Negeri Batam
                  </p>
                  <div className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 mt-1">
                    ✓ LUNAS (PAID)
                  </div>
                </div>

                {/* Informasi Transaksi */}
                <div className="border-t border-dashed border-slate-200 pt-3 space-y-1.5 text-xs text-slate-600 font-medium bg-slate-50/50 p-3 rounded-2xl">
                  <div className="flex justify-between">
                    <span className="text-slate-400">No. Transaksi:</span>
                    <span className="font-bold text-slate-900">
                      #TRX-{selectedReceipt.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nomor Meja:</span>
                    <span className="font-bold text-slate-900">
                      Meja {selectedReceipt.table}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nama Pelanggan:</span>
                    <span className="font-bold text-slate-900">
                      {selectedReceipt.customer}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Waktu Bayar:</span>
                    <span className="font-bold text-slate-900">
                      {selectedReceipt.paidAt || "Baru Saja"}
                    </span>
                  </div>
                </div>

                {/* Daftar Item Pesanan (Detail dengan Harga Satuan) */}
                <div className="border-t border-dashed border-slate-200 pt-3 space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Detail Pesanan:
                  </p>
                  {selectedReceipt.items &&
                    selectedReceipt.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-start text-xs"
                      >
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-800">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Rp {item.price?.toLocaleString("id-ID")} ×{" "}
                            {item.qty}
                          </p>
                        </div>
                        <span className="font-extrabold text-slate-900">
                          Rp {(item.price * item.qty).toLocaleString("id-ID")}
                        </span>
                      </div>
                    ))}
                </div>

                {/* Rincian Total Pembayaran */}
                <div className="border-t border-dashed border-slate-200 pt-3 space-y-2">
                  <div className="flex justify-between items-center text-sm font-black text-slate-900 bg-amber-50/80 p-3 rounded-2xl border border-amber-100">
                    <span className="text-amber-900">TOTAL AKHIR:</span>
                    <span className="text-amber-700 text-base">
                      Rp{" "}
                      {selectedReceipt.total
                        ? selectedReceipt.total.toLocaleString("id-ID")
                        : "0"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 px-1 pt-1">
                    <span className="font-medium">Metode Pembayaran:</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      {selectedReceipt.paymentMethod || "Tunai"}
                    </span>
                  </div>
                </div>

                {/* Tombol Cetak Fisik & Footer */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => window.print()}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>🖨️ Cetak / Print Struk Fisik</span>
                  </button>
                  <p className="text-center text-[10px] text-slate-400 pt-1 font-medium">
                    Terima kasih atas kunjungan Anda di Resto POS! 🙏
                  </p>
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
                  Total Modal Awal: Rp{" "}
                  {totalModalAmount.toLocaleString("id-ID")}
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
                    Transaksi Belum Diposting:{" "}
                    <strong className="text-slate-900">
                      {paidOrders.length} Transaksi · Rp{" "}
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
                  {dict.dataPenjualan} (Arsip Harian)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="pb-3">{dict.meja}</th>
                        <th className="pb-3">{dict.menu}</th>
                        <th className="pb-3">{dict.total}</th>
                        <th className="pb-3">Waktu Bayar</th>
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
                              {item.paidAt || "Selesai"} ({item.paymentMethod})
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
