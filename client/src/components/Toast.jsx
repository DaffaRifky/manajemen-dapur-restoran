import { CheckCircle2 } from "lucide-react";

export default function Toast({ message, visible }) {
  if (!visible) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-lg border border-emerald-500 animate-in fade-in slide-in-from-top-4 duration-300">
      <CheckCircle2 className="w-5 h-5 text-white" />
      <span className="text-xs font-bold tracking-wide">{message}</span>
    </div>
  );
}
