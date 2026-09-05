"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useInView,
  AnimatePresence,
  animate,
  type Variants,
} from "framer-motion";
import {
  Code2,
  Database,
  Download,
  Mail,
  Globe,
  Sparkles,
  Zap,
  ChevronRight,
  Layers,
  Cpu,
  ArrowUpRight,
  Terminal,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import {
  useRef,
  useEffect,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

// Brand Icons (Custom SVG)
const Github = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ---------------------------------------------------------
// TYPES
// ---------------------------------------------------------
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

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ---------------------------------------------------------
// FALLBACK DATA (khi API chưa chạy, trang vẫn đẹp)
// ---------------------------------------------------------
const FALLBACK_SKILLS: SkillDto[] = [
  { id: "1", name: ".NET 10", category: "Backend", iconUrl: "" },
  { id: "2", name: "Next.js 15", category: "Frontend", iconUrl: "" },
  { id: "3", name: "React 19", category: "Frontend", iconUrl: "" },
  { id: "4", name: "PostgreSQL", category: "Database", iconUrl: "" },
  { id: "5", name: "Redis", category: "Caching", iconUrl: "" },
  { id: "6", name: "Docker", category: "DevOps", iconUrl: "" },
  { id: "7", name: "TypeScript", category: "Language", iconUrl: "" },
  { id: "8", name: "Tailwind CSS", category: "Styling", iconUrl: "" },
];

const FALLBACK_PROJECTS: ProjectDto[] = [
  {
    id: "p1",
    title: "VBace Solopreneur CRM",
    slug: "vbace-crm",
    shortDescription:
      "Hệ sinh thái quản trị độc lập thiết kế chuyên biệt. Tích hợp bộ đệm Redis siêu tốc và cấu trúc Clean Architecture nguyên khối, mang lại hiệu năng vô tiền khoáng hậu.",
    thumbnailUrl: "",
    projectUrl: "#",
    technologies: [".NET 10", "Next.js 15", "PostgreSQL", "Redis"],
  },
  {
    id: "p2",
    title: "Realtime Analytics Engine",
    slug: "analytics-engine",
    shortDescription:
      "Pipeline xử lý dữ liệu thời gian thực với hàng triệu sự kiện mỗi ngày, dashboard trực quan hóa độ trễ dưới 100ms.",
    thumbnailUrl: "",
    projectUrl: "#",
    technologies: ["SignalR", "Next.js", "Docker"],
  },
];

// ---------------------------------------------------------
// 1. CUSTOM CURSOR SPOTLIGHT
// ---------------------------------------------------------
const CursorSpotlight = () => {
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${cursorX}px ${cursorY}px, rgba(56, 189, 248, 0.07), transparent 80%)`;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30"
      style={{ background: spotlight }}
    />
  );
};

// ---------------------------------------------------------
// 2. SCROLL PROGRESS BAR
// ---------------------------------------------------------
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500"
      style={{ scaleX }}
    />
  );
};

// ---------------------------------------------------------
// 3. MAGNETIC WRAPPER (nút hút theo chuột)
// ---------------------------------------------------------
const Magnetic = ({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

// ---------------------------------------------------------
// 4. 3D TILT + SPOTLIGHT CARD
// ---------------------------------------------------------
const TiltCard = ({
  children,
  className,
  tiltAmount = 8,
}: {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * tiltAmount);
    rotateX.set(-py * tiltAmount);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const glow = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(56, 189, 248, 0.14), transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-colors duration-500 hover:border-cyan-400/30 ${className ?? ""}`}
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: glow }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
};

// ---------------------------------------------------------
// 5. ROTATING ROLE TEXT
// ---------------------------------------------------------
const ROTATING_ROLES = ["Full-Stack Developer", "Solution Architect", "UI/UX Engineer", "Solopreneur"];

const RotatingText = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING_ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-110%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 whitespace-nowrap"
        >
          {ROTATING_ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

// ---------------------------------------------------------
// 6. ANIMATED COUNTER
// ---------------------------------------------------------
const Counter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};

// ---------------------------------------------------------
// 7. INFINITE MARQUEE
// ---------------------------------------------------------
const MARQUEE_ITEMS = [
  ".NET 10", "Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Redis",
  "Docker", "Tailwind CSS", "Clean Architecture", "SignalR", "Turborepo", "Framer Motion",
];

const Marquee = () => (
  <div className="relative w-full overflow-hidden py-6 border-y border-white/[0.06] bg-white/[0.02]">
    <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#050810] to-transparent pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#050810] to-transparent pointer-events-none" />
    <motion.div
      className="flex w-max gap-12 items-center"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
    >
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-slate-500 whitespace-nowrap"
        >
          <Sparkles size={13} className="text-cyan-400/60" />
          {item}
        </span>
      ))}
    </motion.div>
  </div>
);

// ---------------------------------------------------------
// 8. FLOATING STICKER
// ---------------------------------------------------------
const FloatingSticker = ({
  delay,
  className,
  duration = 6,
  rotateRange = 8,
  children,
}: {
  delay: number;
  className: string;
  duration?: number;
  rotateRange?: number;
  children: ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 1.2, type: "spring", bounce: 0.45 }}
    className={`absolute z-0 pointer-events-none hidden lg:block ${className}`}
  >
    <motion.div
      animate={{ y: [0, -18, 0], rotate: [0, rotateRange, -rotateRange, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  </motion.div>
);

// ---------------------------------------------------------
// 9. SECTION HEADING
// ---------------------------------------------------------
const SectionHeading = ({
  eyebrow,
  icon: Icon,
  title,
  highlight,
}: {
  eyebrow: string;
  icon: React.ElementType;
  title: string;
  highlight: string;
}) => (
  <div className="flex flex-col items-center mb-16 md:mb-20 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 mb-6"
    >
      <Icon size={14} className="text-cyan-400" />
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
      className="text-4xl md:text-6xl font-black tracking-tight text-white"
    >
      {title}{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
        {highlight}
      </span>
    </motion.h2>
  </div>
);

// ---------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------
export function PortfolioClient({ skills, projects }: { skills: SkillDto[]; projects: ProjectDto[] }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120 });

  // Hero parallax
  const yHero = useTransform(smoothProgress, [0, 0.25], [0, -120]);
  const opacityHero = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const yOrb1 = useTransform(smoothProgress, [0, 1], [0, 300]);
  const yOrb2 = useTransform(smoothProgress, [0, 1], [0, -200]);

  const displaySkills = skills.length > 0 ? skills : FALLBACK_SKILLS;
  const displayProjects = projects.length > 0 ? projects : FALLBACK_PROJECTS;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
  };

  const name = "Vũ Thế Bảo";

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050810] text-slate-200 font-sans selection:bg-cyan-400/30 overflow-x-clip relative"
    >
      <ScrollProgress />
      <CursorSpotlight />

      {/* ===== BACKGROUND LAYERS ===== */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
        {/* Noise */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
      </div>

      {/* Aurora Orbs (parallax) */}
      <motion.div style={{ y: yOrb1 }} className="fixed top-[-15%] left-[-10%] w-[55vw] h-[55vw] z-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full bg-cyan-500/30 rounded-full blur-[140px]"
        />
      </motion.div>
      <motion.div style={{ y: yOrb2 }} className="fixed bottom-[-20%] right-[-15%] w-[50vw] h-[50vw] z-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="w-full h-full bg-violet-600/25 rounded-full blur-[140px]"
        />
      </motion.div>

      {/* ===== HERO ===== */}
      <motion.section
        style={{ y: yHero, opacity: opacityHero }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16"
      >
        {/* Floating stickers */}
        <FloatingSticker delay={0.8} className="left-[7%] top-[22%]" duration={7} rotateRange={10}>
          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-2xl shadow-cyan-500/10 px-5 py-3 rounded-2xl flex items-center gap-3">
            <div className="bg-cyan-400/10 p-2 rounded-xl text-cyan-400"><Layers size={18} /></div>
            <div>
              <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Design Pattern</p>
              <p className="text-sm font-bold text-white">Clean Architecture</p>
            </div>
          </div>
        </FloatingSticker>

        <FloatingSticker delay={1} className="right-[6%] top-[30%]" duration={6} rotateRange={-8}>
          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-2xl shadow-violet-500/10 px-4 py-3 rounded-2xl flex items-center gap-3">
            <div className="bg-violet-400/10 p-2 rounded-xl text-violet-400"><Zap size={18} /></div>
            <div>
              <p className="text-[10px] text-violet-400 font-bold uppercase tracking-wider">Performance</p>
              <p className="text-sm font-bold text-white">Redis Caching</p>
            </div>
          </div>
        </FloatingSticker>

        <FloatingSticker delay={1.2} className="left-[12%] bottom-[18%]" duration={8} rotateRange={14}>
          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-2xl px-4 py-3 rounded-2xl flex items-center gap-3">
            <div className="bg-emerald-400/10 p-2 rounded-xl text-emerald-400"><ShieldCheck size={18} /></div>
            <div>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Reliability</p>
              <p className="text-sm font-bold text-white">99.9% Uptime</p>
            </div>
          </div>
        </FloatingSticker>

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-8 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span className="text-sm font-semibold text-slate-300">Available for Global Projects</span>
        </motion.div>

        {/* Name — letter stagger */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white text-center leading-[1.05] mb-6">
          {name.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.9, ease: EASE }}
              className={`inline-block ${char === " " ? "w-[0.3em]" : ""} ${i >= 7
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400"
                  : ""
                }`}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Rotating role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: EASE }}
          className="text-xl md:text-3xl font-bold text-slate-400 mb-6 flex items-center gap-3 flex-wrap justify-center"
        >
          <Terminal size={22} className="text-cyan-400" />
          <RotatingText />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.9, ease: EASE }}
          className="text-base md:text-lg text-slate-400 font-medium max-w-2xl text-center leading-relaxed mb-12"
        >
          Xây dựng nền tảng công nghệ{" "}
          <span className="text-white font-bold">đẳng cấp quốc tế</span>. Tinh tế trong giao
          diện, mãnh liệt trong hiệu năng.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <Magnetic>
            <a
              href="mailto:admin@vbace.com"
              className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold text-sm shadow-[0_10px_40px_rgba(56,189,248,0.35)] hover:shadow-[0_15px_50px_rgba(139,92,246,0.45)] transition-shadow duration-500"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Mail size={18} className="relative z-10" />
              <span className="relative z-10">Liên hệ qua Email</span>
              <ArrowUpRight size={16} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#projects"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md text-white font-bold text-sm hover:bg-white/[0.1] hover:border-cyan-400/40 transition-all duration-300"
            >
              <Rocket size={18} className="text-cyan-400" />
              <span>Khám phá dự án</span>
            </a>
          </Magnetic>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-10 bg-gradient-to-b from-cyan-400 to-transparent"
          />
        </motion.div>
      </motion.section>

      {/* ===== MARQUEE ===== */}
      <Marquee />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* ===== STATS ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 py-24"
        >
          {[
            { icon: Rocket, value: 5, suffix: "+", label: "Năm kinh nghiệm" },
            { icon: Code2, value: 20, suffix: "+", label: "Dự án hoàn thành" },
            { icon: Cpu, value: 15, suffix: "+", label: "Công nghệ thành thạo" },
            { icon: ShieldCheck, value: 100, suffix: "%", label: "Cam kết chất lượng" },
          ].map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <TiltCard className="p-6 md:p-8 text-center h-full" tiltAmount={12}>
                <stat.icon size={22} className="mx-auto mb-4 text-cyan-400" />
                <p className="text-4xl md:text-5xl font-black text-white mb-2 tabular-nums">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs md:text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.section>

        {/* ===== SKILLS ===== */}
        <section className="py-24">
          <SectionHeading eyebrow="Tech Stack" icon={Sparkles} title="Hệ Sinh Thái" highlight="Cốt Lõi" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
          >
            {displaySkills.map((skill, index) => (
              <motion.div key={skill.id} variants={itemVariants}>
                <TiltCard className="h-full p-7 flex flex-col items-center text-center" tiltAmount={14}>
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center p-3 mb-5 group-hover:scale-110 group-hover:-translate-y-1 group-hover:border-cyan-400/40 transition-all duration-500">
                    {skill.iconUrl ? (
                      <img src={skill.iconUrl} alt={skill.name} className="w-full h-full object-contain" />
                    ) : (
                      <Code2 className="w-7 h-7 text-cyan-400" />
                    )}
                  </div>
                  <h3 className="font-extrabold text-lg text-white mb-2">{skill.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full">
                    {skill.category}
                  </span>
                  <span className="mt-3 text-[10px] font-mono text-slate-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section id="projects" className="py-24">
          <SectionHeading eyebrow="Featured Work" icon={Code2} title="Tuyệt Tác" highlight="Kiến Trúc" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-10"
          >
            {displayProjects.map((project, idx) => (
              <motion.div key={project.id} variants={itemVariants}>
                <TiltCard tiltAmount={4} className="overflow-hidden">
                  <div className={`flex flex-col ${idx % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"}`}>
                    {/* Thumbnail */}
                    <div className="md:w-5/12 h-64 md:h-auto min-h-[16rem] relative overflow-hidden bg-gradient-to-br from-cyan-950/40 via-[#0a0f1e] to-violet-950/40 flex items-center justify-center p-8 border-b md:border-b-0 border-white/[0.06]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15)_0%,transparent_60%)] group-hover:scale-110 transition-transform duration-[1.5s]" />
                      {project.thumbnailUrl ? (
                        <img
                          src={project.thumbnailUrl}
                          alt={project.title}
                          className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl group-hover:scale-[1.03] transition-transform duration-700"
                        />
                      ) : (
                        <motion.div
                          animate={{ y: [-8, 8, -8] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                          className="relative z-10 w-full max-w-[15rem] bg-[#0b1120]/90 rounded-2xl shadow-2xl shadow-cyan-500/10 p-5 flex flex-col gap-3 border border-white/10"
                        >
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                          </div>
                          <div className="w-3/4 h-2 rounded bg-cyan-400/30" />
                          <div className="w-1/2 h-2 rounded bg-white/10" />
                          <div className="flex-1 min-h-[5rem] rounded-xl bg-gradient-to-br from-cyan-400/10 to-violet-400/10 border border-white/[0.06] mt-2 flex items-center justify-center">
                            <Database className="w-8 h-8 text-cyan-400/30" />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 md:w-7/12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                          <Sparkles size={14} />
                        </span>
                        <span className="text-cyan-400 font-black text-xs tracking-[0.25em] uppercase">
                          Project {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-black mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed mb-6 text-sm md:text-base font-medium">
                        {project.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-bold text-slate-300 uppercase tracking-wide hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <a
                        href={project.projectUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-cyan-400 font-bold text-sm group/link w-max"
                      >
                        <span className="relative">
                          Khám phá kiến trúc
                          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-violet-400 -translate-x-[101%] group-hover/link:translate-x-0 transition-transform duration-300" />
                        </span>
                        <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ===== CTA / CONTACT ===== */}
        <section className="py-24 pb-32">
          <TiltCard tiltAmount={3} className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 pointer-events-none" />
            <div className="relative z-10 px-8 py-16 md:py-24 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mb-8 shadow-[0_10px_40px_rgba(56,189,248,0.4)]"
              >
                <Rocket size={28} className="text-white" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight"
              >
                Sẵn sàng kiến tạo{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                  điều phi thường?
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                className="text-slate-400 max-w-xl mb-10 font-medium"
              >
                Mỗi dòng code là một nét chạm khắc. Hãy cùng biến ý tưởng của bạn thành
                sản phẩm công nghệ đẳng cấp.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="flex flex-wrap items-center justify-center gap-5"
              >
                <Magnetic>
                  <a
                    href="mailto:admin@vbace.com"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#050810] font-extrabold text-sm hover:shadow-[0_15px_50px_rgba(255,255,255,0.25)] transition-shadow duration-500"
                  >
                    <Mail size={18} />
                    Bắt đầu dự án
                  </a>
                </Magnetic>
                <div className="flex items-center gap-3">
                  {[Github, Linkedin, Globe].map((Icon, i) => (
                    <Magnetic key={i} strength={0.5}>
                      <a
                        href="#"
                        className="w-12 h-12 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
                      >
                        <Icon size={18} />
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </motion.div>
            </div>
          </TiltCard>

          <p className="text-center text-slate-600 text-xs font-medium mt-16 tracking-wide">
            © 2026 Vũ Thế Bảo — Crafted with precision & passion.
          </p>
        </section>
      </div>

      {/* ===== FLOATING CV BUTTON ===== */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.8, type: "spring", stiffness: 200, damping: 18 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Magnetic strength={0.25}>
          <button
            onClick={() => alert("Tính năng tải/tạo CV PDF sẽ ra mắt ở Phase 3!")}
            className="group relative flex items-center gap-3 pl-2 pr-6 py-2 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/15 text-white font-bold text-sm shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:border-cyan-400/50 transition-colors duration-300"
          >
            <span className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping [animation-duration:2.5s] pointer-events-none" />
            <span className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white shadow-lg">
              <Download size={16} className="group-hover:translate-y-0.5 transition-transform duration-300" />
            </span>
            <span className="relative z-10">Tải CV</span>
          </button>
        </Magnetic>
      </motion.div>
    </div>
  );
}
