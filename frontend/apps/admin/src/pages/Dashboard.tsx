import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, LayoutDashboard, Users, Settings, Bell, Search } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col md:flex-row">
      {/* Sidebar - macOS style glassmorphism */}
      <aside className="w-full md:w-64 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-r border-zinc-200/50 dark:border-zinc-800/50 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200/50 dark:border-zinc-800/50">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">VBace</h1>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-1">
          <NavItem icon={<LayoutDashboard size={20} />} label="Tổng quan" active />
          <NavItem icon={<Users size={20} />} label="Khách hàng (CRM)" />
          <NavItem icon={<Settings size={20} />} label="Cài đặt" />
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 bg-zinc-100/50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50 w-96">
            <Search className="w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{userName}</p>
                <p className="text-xs text-zinc-500">Chủ doanh nghiệp</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white font-semibold shadow-inner">
                {userName.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight"
              >
                Xin chào, {userName}! 👋
              </motion.h2>
              <p className="text-zinc-500 mt-1">Dưới đây là tổng quan tình hình kinh doanh của bạn hôm nay.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Doanh thu tháng" value="0 ₫" trend="+0%" />
              <StatCard title="Khách hàng mới" value="0" trend="0" />
              <StatCard title="Lịch hẹn sắp tới" value="0" trend="0" />
            </div>

            <div className="h-96 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LayoutDashboard className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Khu vực Biểu đồ</h3>
                <p className="text-zinc-500 text-sm mt-1">Sẽ được tích hợp trong bản cập nhật sau</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`
      flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200
      ${active 
        ? "bg-primary text-white shadow-md shadow-primary/20" 
        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100"}
    `}>
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

function StatCard({ title, value, trend }: { title: string, value: string, trend: string }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"
    >
      <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{title}</h3>
      <div className="mt-4 flex items-end justify-between">
        <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{value}</p>
        <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
          {trend}
        </span>
      </div>
    </motion.div>
  );
}
