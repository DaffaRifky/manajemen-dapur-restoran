import { LogOut, Utensils } from "lucide-react";

export default function DashboardSidebar({
  username,
  roleTitle,
  logoutLabel,
  onLogout,
  items,
  activeItem,
  onItemSelect,
  className = "",
}) {
  return (
    <aside
      className={`w-64 bg-[#141b2d] text-slate-300 flex flex-col justify-between p-4 shrink-0 ${className}`}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2 pt-2">
          <div className="bg-linear-to-tr from-amber-500 to-amber-300 text-slate-900 p-2.5 rounded-xl shadow-md">
            <Utensils className="w-5 h-5 font-black" />
          </div>
          <div>
            <h2 className="text-white text-sm font-bold tracking-tight">
              {username}
            </h2>
            <p className="text-[11px] font-medium text-amber-400">
              {roleTitle}
            </p>
          </div>
        </div>

        <nav className="space-y-1.5 pt-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onItemSelect?.(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#252f48] text-white shadow-sm border-l-4 border-amber-500"
                    : "hover:bg-slate-800/60 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className={item.iconClassName || "w-4 h-4"} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>{logoutLabel}</span>
        </button>
      </div>
    </aside>
  );
}
