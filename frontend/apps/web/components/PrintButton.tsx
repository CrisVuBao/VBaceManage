"use client";

export function PrintButton() {
  return (
    <div className="fixed bottom-8 right-8">
      <button 
        onClick={() => window.print()} 
        className="bg-primary hover:bg-blue-600 text-white rounded-full p-4 shadow-xl shadow-primary/30 transition-transform hover:scale-105 flex items-center gap-2"
      >
        🖨️ <span className="font-medium pr-2 hidden md:inline">In PDF</span>
      </button>
    </div>
  );
}
