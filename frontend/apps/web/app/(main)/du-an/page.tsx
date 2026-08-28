import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dự án nổi bật - VBace",
  description: "Khám phá các dự án nổi bật và kỹ năng chuyên môn của VBace.",
};

type SkillDto = {
  id: string;
  name: string;
  category: string;
  iconUrl: string;
};

export default async function PortfolioPage() {
  // SSR Fetch from .NET API
  let skills: SkillDto[] = [];
  try {
    const skillsRes = await fetch("http://localhost:5023/api/portfolio/skills", { cache: "no-store" });
    if (skillsRes.ok) {
      skills = await skillsRes.json();
    }
  } catch (e) {
    console.error("Failed to fetch skills", e);
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
          Sản phẩm & Dự án nổi bật
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Những giải pháp công nghệ hiện đại, tối ưu hiệu suất và mang lại giá trị thực tế cho khách hàng.
        </p>
      </section>

      {/* Projects Grid Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Dummy Project Card */}
          <div className="group cursor-pointer rounded-3xl overflow-hidden border border-border bg-card hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col">
            <div className="h-64 bg-zinc-100 dark:bg-zinc-800/50 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 mix-blend-overlay"></div>
              {/* Dummy Image Placeholder */}
              <span className="text-5xl">💻</span>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">.NET 10</span>
                <span className="px-3 py-1 rounded-full bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider">Next.js</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">VBace Solopreneur CRM</h3>
              <p className="text-muted-foreground mb-6 flex-1">
                Nền tảng quản trị doanh nghiệp toàn diện dành cho Solopreneur. Tích hợp CRM, quản lý tài chính và blog cá nhân với chuẩn Clean Architecture.
              </p>
              <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                Xem chi tiết 
                <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
              </div>
            </div>
          </div>

          {/* Another Dummy Project Card */}
          <div className="group cursor-pointer rounded-3xl overflow-hidden border border-border bg-card hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col">
            <div className="h-64 bg-zinc-100 dark:bg-zinc-800/50 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 mix-blend-overlay"></div>
              <span className="text-5xl">📱</span>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">React Native</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-500 transition-colors">E-Commerce Mobile App</h3>
              <p className="text-muted-foreground mb-6 flex-1">
                Ứng dụng mua sắm trực tuyến đa nền tảng với trải nghiệm UI/UX mượt mà, tích hợp thanh toán tự động và tracking đơn hàng thời gian thực.
              </p>
              <div className="flex items-center text-emerald-500 font-medium group-hover:gap-2 transition-all">
                Xem chi tiết 
                <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
              </div>
            </div>
          </div>

        </div>
        <p className="text-center text-sm text-muted-foreground mt-8 italic">* Dữ liệu danh sách dự án sẽ được lấy từ API trong tương lai.</p>
      </section>

      {/* Skills / Tech Stack Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 md:p-12 border border-border">
          <h2 className="text-3xl font-bold text-center mb-10">Công nghệ & Chuyên môn</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {skills.length > 0 ? skills.map(skill => (
              <div key={skill.id} className="flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow">
                {skill.iconUrl && <img src={skill.iconUrl} alt={skill.name} className="w-5 h-5 object-contain" />}
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{skill.name}</span>
              </div>
            )) : (
              <p className="text-muted-foreground">Đang tải dữ liệu kỹ năng từ hệ thống...</p>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 mt-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Bạn có ý tưởng dự án?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Hãy để VBace giúp bạn biến ý tưởng thành sản phẩm phần mềm thực tế với chất lượng quốc tế.
        </p>
        <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95">
          Bắt đầu dự án ngay
        </button>
      </section>
      
    </div>
  );
}
