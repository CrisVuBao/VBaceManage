import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ShieldAlert, Loader2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/identity/login", {
        email,
        password,
      });
      
      const { accessToken, fullName } = response.data;
      localStorage.setItem("vbace_token", accessToken);
      localStorage.setItem("vbace_user", fullName);
      
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Đăng nhập thất bại. Kiểm tra lại email hoặc mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/5 dark:shadow-black/40 border border-zinc-200/50 dark:border-zinc-800/50 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
              VBace Admin
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Đăng nhập để quản lý doanh nghiệp của bạn
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex gap-3 items-start"
            >
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400 leading-relaxed">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                placeholder="admin@vbace.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Mật khẩu
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden bg-primary hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span>Đăng nhập</span>
                )}
              </div>
            </button>
          </form>
        </div>
        
        <p className="text-center text-sm text-zinc-500 mt-6">
          Phase 3 • Enterprise Solopreneur System
        </p>
      </motion.div>
    </div>
  );
}
