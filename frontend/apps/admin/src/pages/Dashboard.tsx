import { motion } from "framer-motion";
import { AdminLayout } from "../components/AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-1">Tổng quan</h2>
          <p className="text-zinc-500">Chào mừng trở lại, đây là tình hình kinh doanh của bạn.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Doanh thu tháng" value="$12,500" trend="+15%" positive />
          <StatCard title="Khách hàng mới" value="48" trend="+5%" positive />
          <StatCard title="Dự án đang chạy" value="12" trend="-2%" positive={false} />
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, trend, positive }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm"
    >
      <h3 className="text-sm font-medium text-zinc-500 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold">{value}</span>
        <span className={`text-sm font-semibold px-2 py-1 rounded-md ${positive ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'}`}>
          {trend}
        </span>
      </div>
    </motion.div>
  );
}
