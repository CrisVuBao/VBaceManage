import { Metadata } from "next";
import ConsultationWizard from "./ConsultationWizard";

export const metadata: Metadata = {
  title: "Tư vấn & Khởi tạo dự án | VBace",
  description: "Bắt đầu dự án số hóa của bạn với VBace. Điền thông tin cơ bản để chúng tôi tư vấn giải pháp phù hợp nhất.",
};

export default function TuVanPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <ConsultationWizard />
      </div>
    </main>
  );
}
