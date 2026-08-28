"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, Code2, Rocket, Globe } from "lucide-react";
import { useRef, useEffect } from "react";

const AnimatedGrid = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.2] dark:opacity-[0.05]">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1570EF_1px,transparent_1px),linear-gradient(to_bottom,#1570EF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_70%,transparent_100%)]"></div>
  </div>
);

const FloatingBadge = ({ text, delay, x, y, icon: Icon, color }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 30 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute ${x} ${y} z-10 select-none hidden lg:block`}
  >
    <motion.div
      animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-[0_15px_40px_rgba(0,0,0,0.08)] px-5 py-3 rounded-2xl flex items-center gap-4"
    >
      <div className={`p-2.5 rounded-xl ${color}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Value Add</p>
        <p className="text-sm font-bold text-zinc-900 dark:text-white">{text}</p>
      </div>
    </motion.div>
  </motion.div>
);

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120 });
  const y = useTransform(smoothProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(smoothProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.95]);

  // Spotlight effect
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
  const backgroundSpotlight = useMotionTemplate`radial-gradient(800px circle at ${cursorX}px ${cursorY}px, rgba(21, 112, 239, 0.05), transparent 80%)`;

  const customEase = [0.16, 1, 0.3, 1];

  return (
    <section ref={ref} className="relative min-h-[100vh] flex flex-col items-center justify-between overflow-hidden bg-[#F8FAFC] dark:bg-[#030712] transition-colors duration-700 pt-32 pb-10">

      {/* Interactive Spotlight */}
      <motion.div className="pointer-events-none fixed inset-0 z-0" style={{ background: backgroundSpotlight }} />

      {/* Glowing Orbs */}
      <div className="absolute top-[-10%] left-[10%] w-[40vw] h-[40vw] bg-[#e0f2fe] dark:bg-[#1570EF]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#dbeafe] dark:bg-[#38BDF8]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <AnimatedGrid />

      {/* Floating Elements */}
      <FloatingBadge text="Clean Architecture" delay={0.2} x="left-[8%]" y="top-[25%]" icon={Code2} color="bg-[#eff6ff] text-[#1570EF] dark:bg-[#1570EF]/20" />
      <FloatingBadge text="High Availability" delay={0.4} x="right-[5%]" y="top-[35%]" icon={Globe} color="bg-[#f0fdfa] text-[#0d9488] dark:bg-[#0d9488]/20" />
      <FloatingBadge text="Scale to Millions" delay={0.6} x="left-[12%]" y="bottom-[25%]" icon={Rocket} color="bg-[#fff1f2] text-[#e11d48] dark:bg-[#e11d48]/20" />

      {/* Main Centered Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 flex flex-1 flex-col justify-center items-center text-center px-4 max-w-5xl w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: customEase }}
          className="group inline-flex items-center gap-3 px-5 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-black/50 backdrop-blur-xl mb-10 text-sm font-bold shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-none overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1570EF]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1570EF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1570EF]"></span>
          </span>
          <span className="text-zinc-800 dark:text-zinc-200">Kỷ nguyên mới của phần mềm quản trị</span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-zinc-900 dark:text-white leading-[1.1]">
          <motion.span
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 1, ease: customEase }}
            className="block mb-2"
          >
            Định Hình Ý Tưởng.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1, ease: customEase }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1570EF] to-[#0ea5e9] pb-4"
          >
            Kiến Tạo Tương Lai.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: customEase, delay: 0.5 }}
          className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl font-medium leading-relaxed"
        >
          <strong className="text-zinc-900 dark:text-zinc-200">VBace Solopreneur Ecosystem</strong> cung cấp nền tảng toàn diện để tự động hóa, mở rộng và quản trị doanh nghiệp số của bạn với tiêu chuẩn chất lượng cao nhất.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: customEase, delay: 0.7 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-xl mx-auto"
        >
          <a href="/services" className="group relative overflow-hidden flex h-14 w-full sm:flex-1 items-center justify-center rounded-full bg-[#1570EF] px-8 font-bold text-white shadow-[0_15px_40px_rgba(21,112,239,0.35)] transition-all hover:shadow-[0_20px_50px_rgba(21,112,239,0.5)] hover:-translate-y-1">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="mr-2 text-[15px]">Khám phá giải pháp</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="/du-an" className="group flex h-14 w-full sm:flex-1 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm px-8 font-bold text-zinc-900 dark:text-white transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:-translate-y-1 hover:shadow-md">
            <Sparkles className="mr-2 h-5 w-5 text-[#1570EF] group-hover:rotate-12 transition-transform" />
            <span className="text-[15px]">Dự án nổi bật</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Indicator in flow */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: customEase }}
        className="relative z-30 flex flex-col items-center justify-center gap-3 cursor-pointer group mt-10 pb-4"
      >
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-[#1570EF] transition-colors">Cuộn xuống</span>
        <div className="w-8 h-12 rounded-full border-2 border-zinc-300 dark:border-zinc-700 flex justify-center p-1 group-hover:border-[#1570EF] transition-colors">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-zinc-400 group-hover:bg-[#1570EF] rounded-full transition-colors"
          />
        </div>
      </motion.div>

      {/* Seamless Fade-to-White Overlay (Short & Sharp at the very bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 pointer-events-none z-20"></div>
    </section>
  );
}
