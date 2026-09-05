import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LogOut, LayoutDashboard, Users, Settings, Bell, Search, MessageSquare } from "lucide-react";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("vbace_token");
    if (!token) {
      navigate("/login");
      return;
    }
    setUserName(localStorage.getItem("vbace_user") || "Admin");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("vbace_token");
    localStorage.removeItem("vbace_user");
    navigate("/login");
  };

  const NavItem = ({ icon, label, path }: any) => {
    const active = location.pathname === path;
    return (
      <Link 
        to={path}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
          active 
            ? 'bg-primary/10 text-primary font-semibold shadow-sm' 
            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }`}
      >
        {icon}
        <span className="text-sm">{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col md:flex-row text-zinc-900 dark:text-white font-sans">
      <aside className="w-full md:w-64 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-r border-zinc-200/50 dark:border-zinc-800/50 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200/50 dark:border-zinc-800/50">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">VBace Admin</h1>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-1">
          <NavItem path="/" icon={<LayoutDashboard size={20} />} label="Tổng quan" />
          <NavItem path="/leads" icon={<MessageSquare size={20} />} label="Khách tư vấn" />
          <NavItem path="/crm" icon={<Users size={20} />} label="Khách hàng (CRM)" />
          <NavItem path="/settings" icon={<Settings size={20} />} label="Cài đặt" />
        </nav>

        <div className="p-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Đăng xuất</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 bg-zinc-100/50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50 w-96">
            <Search className="w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-zinc-900"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
