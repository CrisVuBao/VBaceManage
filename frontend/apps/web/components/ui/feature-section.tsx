"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Code2, Smartphone, CloudLightning, LineChart, Cpu, ShieldCheck, Zap, Layers, Rocket } from "lucide-react";
import { MouseEvent as ReactMouseEvent } from "react";

// Colorful Floating Tech Badges
const ColorBadge = ({ text, icon: Icon, delay, x, y, colorFrom, colorTo, shadow }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 1, type: "spring", bounce: 0.5 }}
    className={`absolute ${x} ${y} z-30 hidden lg:flex pointer-events-none`}
  >
    <motion.div
      animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      className={`bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 flex items-center gap-3 ${shadow}`}
    >
      <div className={`p-2 rounded-xl bg-gradient-to-br ${colorFrom} ${colorTo} text-white`}>
        <Icon size={20} />
      </div>
      <span className="font-bold text-sm text-zinc-800 dark:text-zinc-100">{text}</span>
    </motion.div>
  </motion.div>
);

// High-impact VIP Card
const VIPCard = ({ children, className, glowColor }: { children: React.ReactNode, className?: string, glowColor: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const backgroundTemplate = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 80%)`;

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(21,112,239,0.15)] transition-shadow duration-500 z-10 ${className}`}
    >
      {/* Vibrant Spotlight Inner Glow on Hover */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[inherit]"
        style={{ background: backgroundTemplate }}
      />

      <div className="absolute inset-[2px] z-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-3xl rounded-[inherit] pointer-events-none transition-colors duration-500 group-hover:bg-white/80"></div>

      <div className="absolute inset-0 z-10 opacity-[0.03] group-hover:opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] transition-opacity duration-500 pointer-events-none"></div>

      {/* Actual Content */}
      <div className="relative z-20 h-full w-full p-8 md:p-12 flex flex-col justify-start">
        {children}
      </div>
    </motion.div>
  );
};

const services = [
  {
    title: "Chuyển Đổi Số Toàn Diện",
    description: "Kiến tạo hệ sinh thái số chuyên biệt cho doanh nghiệp. Vận hành ERP, CRM tự động hóa hoàn toàn, cắt giảm 80% thao tác thủ công, nhân 3 doanh thu với độ chính xác tuyệt đối.",
    icon: LineChart,
    className: "md:col-span-2 md:row-span-2 min-h-[360px]",
    highlight: true,
    glowColor: "rgba(21, 112, 239, 0.25)", // Strong Blue
    iconColor: "text-[#1570EF]",
    iconBg: "bg-[#1570EF]/10"
  },
  {
    title: "Web App Hạng Thương Gia",
    description: "Trải nghiệm mượt mà không độ trễ. Kiến trúc Next.js & .NET mang lại điểm SEO 100/100, chuẩn mực giao diện Apple.",
    icon: Code2,
    className: "md:col-span-1 md:row-span-1 min-h-[360px]",
    highlight: false,
    glowColor: "rgba(14, 165, 233, 0.25)", // Sky Blue
    iconColor: "text-[#0ea5e9]",
    iconBg: "bg-[#0ea5e9]/10"
  },
  {
    title: "Ứng Dụng Mobile Đột Phá",
    description: "Đưa thương hiệu của bạn vào túi người dùng với các siêu ứng dụng iOS/Android siêu mượt, thiết kế gây nghiện.",
    icon: Smartphone,
    className: "md:col-span-1 md:row-span-1 min-h-[360px]",
    highlight: false,
    glowColor: "rgba(168, 85, 247, 0.25)", // Purple
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10"
  },
  {
    title: "Kiến Trúc Cloud & Microservices",
    description: "Sẵn sàng đón bão Traffic. Thiết kế hạ tầng phân tán cực kỳ mạnh mẽ, chịu tải hàng triệu User mà không sập nguồn.",
    icon: CloudLightning,
    className: "md:col-span-2 md:row-span-1 min-h-[360px]",
    highlight: false,
    glowColor: "rgba(245, 158, 11, 0.25)", // Amber/Orange
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10"
  }
];

export function FeatureSection() {
  return (
    <section className="relative w-full z-10 bg-white dark:bg-zinc-950 transition-colors duration-700 overflow-hidden" id="services">

      {/* Immersive Colorful Background Elements */}
      <div className="absolute top-1/4 left-0 w-[40vw] h-[40vw] bg-[#e0f2fe] rounded-full blur-[150px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[50vw] h-[50vw] bg-[#dbeafe] rounded-full blur-[150px] opacity-60 pointer-events-none"></div>

      <div className="py-32 px-6 max-w-7xl mx-auto relative z-10">

        {/* Colorful Stickers */}
        <ColorBadge text="AI Integration" icon={Cpu} delay={0.1} x="left-[-5%]" y="top-[10%]" colorFrom="from-purple-500" colorTo="to-indigo-500" shadow="shadow-[0_10px_30px_rgba(168,85,247,0.2)]" />
        <ColorBadge text="High Security" icon={ShieldCheck} delay={0.3} x="right-[-2%]" y="top-[25%]" colorFrom="from-emerald-400" colorTo="to-teal-500" shadow="shadow-[0_10px_30px_rgba(16,185,129,0.2)]" />
        <ColorBadge text="Global" icon={Zap} delay={0.5} x="left-[-5%]" y="bottom-[35%]" colorFrom="from-amber-400" colorTo="to-orange-500" shadow="shadow-[0_10px_30px_rgba(245,158,11,0.2)]" />
        <ColorBadge text="Cloud Native" icon={Rocket} delay={0.7} x="right-[-5%]" y="bottom-[20%]" colorFrom="from-blue-500" colorTo="to-sky-500" shadow="shadow-[0_10px_30px_rgba(14,165,233,0.2)]" />

        <div className="text-center mb-24 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white shadow-xl bg-white mb-6 hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <div className="w-2 h-2 rounded-full bg-[#1570EF] animate-ping mr-1"></div>
            <span className="text-sm font-extrabold text-[#1570EF] uppercase tracking-widest bg-clip-text">Bứt phá giới hạn</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-[#0F172A] leading-tight"
          >
            Giải pháp <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1570EF] via-[#0ea5e9] to-[#8b5cf6]">Đột Phá</span>. <br className="hidden md:block" />
            Dành riêng cho bạn.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-[#475569] font-medium max-w-3xl mx-auto leading-relaxed"
          >
            Từ những dòng mã nguồn đầu tiên đến khi triển khai hệ thống toàn cầu. Chúng tôi kiến tạo những kiệt tác số giúp doanh nghiệp của bạn dẫn đầu thị trường.
          </motion.p>
        </div>

        {/* BENTO GRID - VIP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
          {services.map((service, i) => (
            <VIPCard key={i} className={service.className} glowColor={service.glowColor}>
              {service.highlight && (
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-gradient-to-br from-[#0ea5e9]/30 to-[#1570EF]/30 rounded-full blur-[80px] pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
              )}

              <div className="relative z-10">
                <div className={`h-16 w-16 rounded-[1.25rem] ${service.iconBg} border border-white flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-6 transition-all duration-500 ease-out`}>
                  <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                </div>
                <h3 className={`font-black tracking-tight mb-5 text-[#0F172A] group-hover:${service.iconColor} transition-colors duration-300 ${service.highlight ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                  {service.title}
                </h3>
              </div>

              <p className={`text-[#475569] font-medium leading-relaxed relative z-10 ${service.highlight ? 'text-lg md:text-xl max-w-lg mb-10' : 'text-base md:text-lg'}`}>
                {service.description}
              </p>

              {/* High-tech Abstract UI Mockup for Highlighted Card */}
              {service.highlight && (
                <div className="relative z-10 mt-auto w-full h-48 bg-[#F8FAFC] dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-inner p-4 flex gap-4 group-hover:shadow-[0_20px_40px_rgba(21,112,239,0.1)] transition-all duration-500">
                  {/* Left Sidebar Mockup */}
                  <div className="w-1/4 h-full flex flex-col gap-3 border-r border-zinc-200 dark:border-zinc-700 pr-4">
                    <div className="w-full h-3 rounded-full bg-zinc-200 dark:bg-zinc-600"></div>
                    <div className="w-2/3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-600"></div>
                    <div className="mt-auto w-full h-8 rounded-lg bg-[#1570EF]/10 border border-[#1570EF]/20"></div>
                  </div>
                  {/* Main Content Mockup */}
                  <div className="w-3/4 h-full flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <div className="w-1/2 h-4 rounded-full bg-zinc-200 dark:bg-zinc-600"></div>
                      <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-600"></div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 h-16 rounded-xl bg-gradient-to-br from-[#0ea5e9]/10 to-[#1570EF]/10 border border-[#1570EF]/20"></div>
                      <div className="flex-1 h-16 rounded-xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic bottom glowing line */}
              <div className={`absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-transparent via-current to-transparent group-hover:w-full transition-all duration-[800ms] ease-out opacity-70 ${service.iconColor}`}></div>
            </VIPCard>
          ))}
        </div>

        {/* Colorful High-Converting CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 w-full rounded-[3rem] bg-[#0F172A] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group shadow-[0_30px_60px_rgba(15,23,42,0.4)]"
        >
          {/* Animated colorful waves inside CTA */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1570EF]/20 via-purple-500/20 to-[#0ea5e9]/20 opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_3s_infinite] transition-opacity duration-1000"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#1570EF] rounded-full blur-[100px] opacity-40 group-hover:scale-150 transition-transform duration-[2s]"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#0ea5e9] rounded-full blur-[100px] opacity-40 group-hover:scale-150 transition-transform duration-[2s]"></div>

          <div className="relative z-10 max-w-2xl text-center md:text-left mb-10 md:mb-0">
            <div className="inline-flex items-center gap-2 text-white font-bold text-sm mb-6 bg-white/10 px-4 py-2 rounded-full border border-white/20 shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span>Đội ngũ chuyên gia luôn sẵn sàng</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Biến ý tưởng tỷ đô của bạn thành hiện thực ngay hôm nay.</h3>
            <p className="text-[#94a3b8] text-xl font-medium max-w-xl">Bắt đầu hành trình chuyển đổi số với một bản tư vấn lộ trình kiến trúc hoàn toàn miễn phí từ VBace.</p>
          </div>

          <div className="relative z-10 w-full md:w-auto">
            <a href="mailto:admin@vbace.com" className="flex items-center justify-center gap-4 bg-gradient-to-r from-[#1570EF] to-[#0ea5e9] text-white hover:shadow-[0_0_40px_rgba(21,112,239,0.8)] px-10 py-5 rounded-full font-black text-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 w-full md:w-auto group/btn border border-white/20">
              <span className="relative">
                Liên hệ ngay
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left"></span>
              </span>
              <Layers size={24} className="group-hover/btn:rotate-12 transition-transform" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
