"use client";

import { motion } from "framer-motion";
import { Code2, PenTool, Zap, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "World-class Engineering",
    description: "Built on .NET 10 & Next.js for blazing fast performance and enterprise-grade scalability.",
    icon: Code2,
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-950",
  },
  {
    title: "Premium Design",
    description: "Pixel-perfect interfaces crafted with precision, mimicking native OS fluidity.",
    icon: PenTool,
    className: "md:col-span-1 bg-primary/5 border-primary/10",
  },
  {
    title: "Blazing Fast",
    description: "Optimized for speed. SSR & Edge caching ensures sub-second load times.",
    icon: Zap,
    className: "md:col-span-1 bg-orange-500/5 border-orange-500/10",
  },
  {
    title: "Bank-grade Security",
    description: "Protected by modern authentication and strict RBAC permission systems.",
    icon: ShieldCheck,
    className: "md:col-span-2 bg-emerald-500/5 border-emerald-500/10",
  }
];

export function FeatureSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="services">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Designed for excellence.</h2>
        <p className="text-xl text-muted-foreground">Every detail meticulously crafted.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`glass-panel p-8 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 ${feature.className}`}
          >
            <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground font-medium">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
