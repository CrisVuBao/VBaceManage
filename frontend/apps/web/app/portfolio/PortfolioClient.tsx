"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Code2, Database, Download, Mail, MapPin, Globe, Sparkles, Zap, ChevronRight, Layers, Layout, Cpu, CheckCircle } from "lucide-react";
import { useRef, useEffect, MouseEvent as ReactMouseEvent } from "react";

type SkillDto = {
  id: string;
  name: string;
  category: string;
  iconUrl: string;
};

type ProjectDto = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnailUrl: string;
  projectUrl: string;
  technologies: string[];
};

// ---------------------------------------------------------
// 1. HIGH-TECH SPOTLIGHT CARD COMPONENT
// ---------------------------------------------------------
const TechCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const backgroundTemplate = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.15), transparent 80%)`;
  const borderTemplate = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(21, 112, 239, 0.5), transparent 80%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden bg-white border border-zinc-100 transition-shadow duration-700 hover:shadow-[0_30px_60px_rgba(14,165,233,0.12)] ${className}`}
    >
      {/* Animated Border Glow on Hover */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: borderTemplate }}
      />
      {/* 1px Inner Border Mask */}
      <div className="absolute inset-[1px] z-0 bg-white rounded-[inherit] pointer-events-none"></div>

      {/* Spotlight Inner Glow on Hover */}
      <motion.div
        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]"
        style={{ background: backgroundTemplate }}
      />

      {/* High-tech subtle grid noise revealed on hover */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay transition-opacity duration-500 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// 2. MODERN FLOATING STICKERS (Multi-axis movement)
// ---------------------------------------------------------
const ModernSticker = ({ delay, x, y, children, duration = 6, rotateRange = 10 }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 1.5, type: "spring", bounce: 0.4 }}
    className={`absolute ${x} ${y} z-0 pointer-events-none`}
  >
    <motion.div
      animate={{
        y: [0, -20, 0],
        x: [0, 10, -10, 0],
        rotate: [0, rotateRange, -rotateRange, 0]
      }}
      transition={{ duration: duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  </motion.div>
);

// Removed TextReveal to fix unused variable warning


export function PortfolioClient({ skills, projects }: { skills: SkillDto[], projects: ProjectDto[] }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Smooth parallax
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const yHeader = useTransform(smoothProgress, [0, 0.4], [0, -150]);
  const opacityHeader = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  // Cursor Spotlight effect
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);
  const backgroundSpotlight = useMotionTemplate`radial-gradient(600px circle at ${cursorX}px ${cursorY}px, rgba(14, 165, 233, 0.08), transparent 80%)`;

  const customEase = [0.16, 1, 0.3, 1];
  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 40, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: customEase } } };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#0ea5e9]/30 overflow-hidden relative">

      {/* Interactive Cursor Spotlight */}
      <motion.div className="pointer-events-none fixed inset-0 z-0" style={{ background: backgroundSpotlight }} />

      {/* Soft Background Mesh */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#e0f2fe] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#dbeafe] rounded-full blur-[100px] pointer-events-none"></div>

      {/* MODERN STICKERS */}
      <ModernSticker delay={0.2} x="left-[8%]" y="top-[15%]" duration={7} rotateRange={15}>
        <div className="bg-white/90 backdrop-blur-xl border border-white shadow-xl px-5 py-3 rounded-2xl flex items-center gap-3">
          <div className="bg-[#f0f9ff] p-2 rounded-xl text-[#0ea5e9]"><Layers size={18} /></div>
          <div>
            <p className="text-[10px] text-[#0ea5e9] font-bold uppercase tracking-wider">Design Pattern</p>
            <p className="text-sm font-bold text-[#0F172A]">Clean Architecture</p>
          </div>
        </div>
      </ModernSticker>

      <ModernSticker delay={0.4} x="right-[5%]" y="top-[25%]" duration={6} rotateRange={-10}>
        <div className="bg-white/90 backdrop-blur-xl border border-white shadow-xl px-4 py-3 rounded-2xl flex items-center gap-3">
          <div className="bg-[#f0f9ff] p-2 rounded-xl text-[#1570EF]"><Zap size={18} /></div>
          <div>
            <p className="text-[10px] text-[#1570EF] font-bold uppercase tracking-wider">Performance</p>
            <p className="text-sm font-bold text-[#0F172A]">Redis Caching</p>
          </div>
        </div>
      </ModernSticker>

      <ModernSticker delay={0.6} x="left-[15%]" y="top-[60%]" duration={8} rotateRange={20}>
        <div className="relative w-20 h-20 bg-gradient-to-tr from-[#38BDF8] to-[#1570EF] rounded-full blur-sm opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-white"><Code2 size={24} className="text-[#1570EF]" /></div>
        </div>
      </ModernSticker>

      <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">

        {/* HERO SECTION */}
        <motion.div style={{ y: yHeader, opacity: opacityHeader }} className="flex flex-col items-center text-center mb-40 relative pt-10">

          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: customEase }}
            className="mb-8 inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border border-[#e0f2fe] shadow-[0_10px_30px_rgba(14,165,233,0.15)]"
          >
            <CheckCircle size={16} className="text-[#1570EF]" />
            <span className="text-sm font-bold text-[#0F172A]">Available for Global Projects</span>
          </motion.div>

          <h1 className="text-6xl md:text-[5.5rem] font-black tracking-tighter mb-4 text-[#0F172A] leading-normal py-4 flex flex-wrap justify-center items-center">
            <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8, ease: customEase }} className="mr-4 pb-2 inline-block">
              Vũ
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: customEase }} className="mr-4 pb-2 inline-block">
              Thế
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: customEase }} className="text-transparent bg-clip-text bg-gradient-to-r from-[#1570EF] to-[#0ea5e9] pb-2 inline-block">
              Bảo
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: customEase }}
            className="text-lg md:text-2xl text-[#475569] font-medium tracking-wide max-w-3xl leading-relaxed mt-2"
          >
            Xây dựng nền tảng công nghệ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1570EF] to-[#0ea5e9] font-bold">đẳng cấp quốc tế</span>.
            Tinh tế trong giao diện, mãnh liệt trong hiệu năng.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8, ease: customEase }}
            className="flex flex-wrap items-center justify-center gap-4 mt-12"
          >
            <a href="mailto:admin@vbace.com" className="group relative overflow-hidden bg-white px-8 py-4 rounded-full border border-zinc-200 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(21,112,239,0.15)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1570EF]/5 to-[#0ea5e9]/5 group-hover:scale-150 transition-transform duration-500"></div>
              <Mail size={18} className="text-[#1570EF] relative z-10" />
              <span className="text-sm font-bold text-[#0F172A] relative z-10">Liên hệ qua Email</span>
            </a>
            <a href="#" className="group relative overflow-hidden bg-[#0F172A] px-8 py-4 rounded-full shadow-[0_10px_30px_rgba(15,23,42,0.2)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
              <Globe size={18} className="text-white relative z-10 group-hover:animate-spin-slow" />
              <span className="text-sm font-bold text-white relative z-10">Truy cập Website</span>
            </a>
          </motion.div>
        </motion.div>

        {/* SKILLS SECTION */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="mb-40 relative z-10">
          <div className="flex flex-col items-center mb-16 text-center">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }} className="inline-flex p-4 rounded-2xl bg-white shadow-xl shadow-[#0ea5e9]/10 mb-6 border border-[#f0f9ff]">
              <Sparkles className="w-8 h-8 text-[#0ea5e9]" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#0F172A] mb-4">Hệ Sinh Thái Cốt Lõi</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {skills.length > 0 ? skills.map((skill, index) => (
              <TechCard key={skill.id} className="h-full rounded-[2.5rem]">
                <motion.div variants={itemVariants} className="group h-full p-8 flex flex-col items-center text-center">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="w-20 h-20 rounded-[1.5rem] bg-[#f8fafc] border border-zinc-100 flex items-center justify-center p-4 mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 ease-[0.16,1,0.3,1] shadow-inner">
                    {skill.iconUrl && <img src={skill.iconUrl} alt={skill.name} className="w-full h-full object-contain filter drop-shadow-sm" />}
                  </div>

                  <h3 className="font-extrabold text-xl text-[#0F172A] mb-2">{skill.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1570EF] bg-[#1570EF]/5 px-3 py-1.5 rounded-full">
                    {skill.category}
                  </span>
                </motion.div>
              </TechCard>
            )) : (
              <p className="text-zinc-500 col-span-full text-center">Đang nạp dữ liệu...</p>
            )}
          </div>
        </motion.div>

        {/* PROJECTS SECTION */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          <div className="flex flex-col items-center mb-16 text-center">
            <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ duration: 0.5 }} className="inline-flex p-4 rounded-2xl bg-white shadow-xl shadow-[#1570EF]/10 mb-6 border border-[#f0f9ff]">
              <Code2 className="w-8 h-8 text-[#1570EF]" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#0F172A] mb-4">Tuyệt Tác Kiến Trúc</h2>
          </div>

          <div className="space-y-12">
            <TechCard className="rounded-[2rem]">
              <motion.div variants={itemVariants} className="group flex flex-col md:flex-row h-full">
                <div className="md:w-5/12 h-64 md:h-auto bg-[#F8FAFC] relative overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-100 p-6">
                  {/* Abstract UI representation */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.1)_0%,transparent_60%)] group-hover:scale-110 transition-transform duration-[2s]"></div>

                  <motion.div
                    animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full max-w-[16rem] h-full bg-white rounded-2xl shadow-xl p-5 flex flex-col gap-4 border border-zinc-100"
                  >
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div><div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    </div>
                    <div className="w-3/4 h-2.5 rounded bg-[#e0f2fe]"></div>
                    <div className="w-1/2 h-2.5 rounded bg-[#f1f5f9]"></div>
                    <div className="flex-1 rounded-xl bg-gradient-to-br from-[#f0f9ff] to-white border border-[#e0f2fe] mt-3 flex items-center justify-center">
                      <Database className="w-8 h-8 text-[#0ea5e9]/20" />
                    </div>
                  </motion.div>
                </div>

                <div className="p-8 md:p-12 md:w-7/12 flex flex-col justify-center relative z-10 bg-white">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f0f9ff] text-[#0ea5e9]">
                      <Sparkles size={14} />
                    </span>
                    <span className="text-[#0ea5e9] font-black text-xs tracking-widest uppercase">Enterprise SaaS</span>
                  </div>

                  <h3 className="text-2xl font-black mb-4 text-[#0F172A] group-hover:text-[#1570EF] transition-colors">VBace Solopreneur CRM</h3>
                  <p className="text-[#475569] leading-relaxed mb-6 text-sm md:text-base font-medium">
                    Hệ sinh thái quản trị độc lập thiết kế chuyên biệt. Tích hợp bộ đệm Redis siêu tốc và cấu trúc Clean Architecture nguyên khối, mang lại hiệu năng vô tiền khoáng hậu.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-4 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-[11px] font-bold text-[#0ea5e9] shadow-sm uppercase tracking-wide">.NET 10</span>
                    <span className="px-4 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-[11px] font-bold text-[#0F172A] shadow-sm uppercase tracking-wide">Next.js 15</span>
                    <span className="px-4 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-[11px] font-bold text-[#475569] shadow-sm uppercase tracking-wide">PostgreSQL</span>
                  </div>

                  <a href="#" className="flex items-center gap-2 text-[#1570EF] font-bold text-sm cursor-pointer group/link w-max">
                    <span className="relative overflow-hidden">
                      Khám phá kiến trúc
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1570EF] -translate-x-[101%] group-hover/link:translate-x-0 transition-transform duration-300"></span>
                    </span>
                    <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </TechCard>
          </div>
        </motion.div>

      </div>

      {/* Exquisite Floating Action Button with pulse ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-10 right-10 z-50"
      >
        <button
          onClick={() => alert("Tính năng tải/tạo CV PDF sẽ ra mắt ở Phase 3!")}
          className="relative overflow-visible bg-white text-[#0F172A] px-8 py-4 rounded-full font-extrabold shadow-[0_20px_50px_rgba(21,112,239,0.2)] hover:shadow-[0_25px_60px_rgba(21,112,239,0.3)] transition-all flex items-center gap-4 group border border-zinc-200 hover:-translate-y-2"
        >
          {/* Animated radar rings behind button */}
          <div className="absolute inset-0 rounded-full border-2 border-[#1570EF] opacity-0 group-hover:animate-ping duration-[3s]"></div>

          <div className="relative z-10 w-12 h-12 rounded-full bg-[#f0f9ff] flex items-center justify-center text-[#1570EF] group-hover:bg-[#1570EF] group-hover:text-white transition-colors duration-500 shadow-inner">
            <Download size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
          <span className="relative z-10 text-[16px] tracking-wide">Tải CV Bản Mềm</span>
        </button>
      </motion.div>

    </div>
  );
}
