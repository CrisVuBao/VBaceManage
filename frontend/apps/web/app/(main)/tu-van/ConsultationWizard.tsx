"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, ShoppingCart, GraduationCap, Briefcase, 
  Code2, Smartphone, Globe, Cloud, Palette,
  ArrowRight, ArrowLeft, CheckCircle2, Loader2 
} from "lucide-react";
import { useRouter } from "next/navigation";

const industries = [
  { id: "Bán lẻ / E-commerce", icon: ShoppingCart },
  { id: "Tài chính / Fintech", icon: Building2 },
  { id: "Giáo dục / Edtech", icon: GraduationCap },
  { id: "Doanh nghiệp / B2B", icon: Briefcase },
  { id: "Khác", icon: Globe },
];

const servicesList = [
  { id: "Web App Hạng Thương Gia", icon: Code2 },
  { id: "App Mobile Đột Phá", icon: Smartphone },
  { id: "Thiết kế UI/UX", icon: Palette },
  { id: "Backend & Cloud", icon: Cloud },
];

const budgets = [
  "Dưới 100 triệu VNĐ",
  "100 - 300 triệu VNĐ",
  "300 - 500 triệu VNĐ",
  "Trên 500 triệu VNĐ"
];

export default function ConsultationWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  
  // Form State
  const [industry, setIndustry] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => {
    if (step === 1 && !industry) return;
    if (step === 2 && services.length === 0) return;
    if (step === 3 && !budget) return;
    
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const toggleService = (id: string) => {
    setServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!clientName || !email) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/portfolio/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName,
          email,
          industry,
          services: services.join(", "),
          budget,
          message
        }),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col relative border border-zinc-200 dark:border-zinc-800">
      
      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 absolute top-0 left-0 z-10">
        <motion.div 
          className="h-full bg-[#1570EF]"
          initial={{ width: "25%" }}
          animate={{ width: `${(step / 4) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <div className="flex-1 p-8 md:p-12 flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          
          {/* STEP 1: Lĩnh vực */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-1 flex flex-col"
            >
              <h2 className="text-3xl md:text-4xl font-black mb-2 text-zinc-900 dark:text-white tracking-tight">Dự án của bạn thuộc lĩnh vực gì?</h2>
              <p className="text-zinc-500 mb-10 text-lg">Giúp chúng tôi hiểu rõ hơn về bối cảnh kinh doanh của bạn.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industries.map((ind) => {
                  const Icon = ind.icon;
                  const isSelected = industry === ind.id;
                  return (
                    <div 
                      key={ind.id}
                      onClick={() => setIndustry(ind.id)}
                      className={`cursor-pointer border-2 rounded-2xl p-6 flex items-center gap-4 transition-all duration-300 ${isSelected ? 'border-[#1570EF] bg-[#1570EF]/5 shadow-md scale-[1.02]' : 'border-zinc-200 dark:border-zinc-800 hover:border-[#1570EF]/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
                    >
                      <div className={`p-3 rounded-xl ${isSelected ? 'bg-[#1570EF] text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
                        <Icon size={24} />
                      </div>
                      <span className={`font-bold text-lg ${isSelected ? 'text-[#1570EF]' : 'text-zinc-700 dark:text-zinc-300'}`}>{ind.id}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Dịch vụ */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-1 flex flex-col"
            >
              <h2 className="text-3xl md:text-4xl font-black mb-2 text-zinc-900 dark:text-white tracking-tight">Bạn đang tìm kiếm dịch vụ gì?</h2>
              <p className="text-zinc-500 mb-10 text-lg">Có thể chọn nhiều dịch vụ cùng lúc.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {servicesList.map((srv) => {
                  const Icon = srv.icon;
                  const isSelected = services.includes(srv.id);
                  return (
                    <div 
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`cursor-pointer border-2 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ${isSelected ? 'border-[#0ea5e9] bg-[#0ea5e9]/5 shadow-md scale-[1.02]' : 'border-zinc-200 dark:border-zinc-800 hover:border-[#0ea5e9]/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
                    >
                      <div className={`p-3 w-fit rounded-xl ${isSelected ? 'bg-[#0ea5e9] text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
                        <Icon size={24} />
                      </div>
                      <span className={`font-bold text-lg ${isSelected ? 'text-[#0ea5e9]' : 'text-zinc-700 dark:text-zinc-300'}`}>{srv.id}</span>
                      {isSelected && (
                        <div className="absolute top-4 right-4 text-[#0ea5e9]">
                          <CheckCircle2 size={24} className="animate-in zoom-in duration-300" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Ngân sách */}
          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-1 flex flex-col"
            >
              <h2 className="text-3xl md:text-4xl font-black mb-2 text-zinc-900 dark:text-white tracking-tight">Ngân sách dự kiến của bạn?</h2>
              <p className="text-zinc-500 mb-10 text-lg">Giúp chúng tôi tối ưu giải pháp tốt nhất trong tầm giá.</p>
              
              <div className="flex flex-col gap-4">
                {budgets.map((bg) => {
                  const isSelected = budget === bg;
                  return (
                    <div 
                      key={bg}
                      onClick={() => setBudget(bg)}
                      className={`cursor-pointer border-2 rounded-xl p-5 flex items-center justify-between transition-all duration-300 ${isSelected ? 'border-purple-500 bg-purple-500/5 shadow-md scale-[1.02]' : 'border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
                    >
                      <span className={`font-bold text-xl ${isSelected ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-700 dark:text-zinc-300'}`}>{bg}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-purple-500 bg-purple-500' : 'border-zinc-300 dark:border-zinc-700'}`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Thông tin */}
          {step === 4 && (
            <motion.div
              key="step4"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-1 flex flex-col"
            >
              {isSuccess ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.4)]"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                  <h2 className="text-3xl font-black mb-4 text-zinc-900 dark:text-white">Gửi yêu cầu thành công!</h2>
                  <p className="text-zinc-500 text-lg max-w-md">Chúng tôi đã nhận được thông tin và sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-black mb-2 text-zinc-900 dark:text-white tracking-tight">Bước cuối cùng!</h2>
                  <p className="text-zinc-500 mb-10 text-lg">Để lại thông tin để chuyên gia của VBace liên hệ với bạn.</p>
                  
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Họ và tên *</label>
                      <input 
                        type="text" 
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#1570EF] transition-colors"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Email *</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#1570EF] transition-colors"
                        placeholder="email@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Ghi chú thêm (Tùy chọn)</label>
                      <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#1570EF] transition-colors min-h-[120px] resize-none"
                        placeholder="Mô tả ngắn gọn ý tưởng của bạn..."
                      ></textarea>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      {!isSuccess && (
        <div className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 p-6 flex justify-between items-center mt-auto">
          {step > 1 ? (
            <button 
              onClick={prevStep}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <ArrowLeft size={18} />
              Quay lại
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button 
              onClick={nextStep}
              disabled={
                (step === 1 && !industry) || 
                (step === 2 && services.length === 0) || 
                (step === 3 && !budget)
              }
              className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white bg-[#1570EF] hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
            >
              Tiếp tục
              <ArrowRight size={18} />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={!clientName || !email || isSubmitting}
              className="relative overflow-hidden group flex items-center gap-2 px-10 py-3 rounded-full font-bold text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  Gửi yêu cầu
                  <CheckCircle2 size={18} />
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
