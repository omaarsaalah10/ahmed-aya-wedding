"use client";

import { motion } from "framer-motion";

export default function FloatingMenu({ isPlaying, onToggleMusic }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border border-[#EFE3D3] px-4 py-2 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.08)] flex items-center gap-4 text-[#7E5C43]"
    >
      {/* 1. الرئيسية */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex flex-col items-center hover:text-[#C88A4A] transition-colors"
      >
        <span className="text-base">🏠</span>
        <span className="text-[10px] font-cairo mt-0.5">الرئيسية</span>
      </button>

      {/* 2. الموعد */}
      <button
        onClick={() => scrollTo("countdown")}
        className="flex flex-col items-center hover:text-[#C88A4A] transition-colors"
      >
        <span className="text-base">⏰</span>
        <span className="text-[10px] font-cairo mt-0.5">الموعد</span>
      </button>

      {/* 3. الزر الأوسط: صورنا 📷 */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-gradient-to-r from-[#C88A4A] to-[#E2A362] text-white p-3 rounded-full -mt-6 shadow-md border-2 border-white flex flex-col items-center justify-center"
      >
        <span className="text-base leading-none">📷</span>
      </motion.button>

      {/* 4. المكان */}
      <button
        onClick={() => scrollTo("details")}
        className="flex flex-col items-center hover:text-[#C88A4A] transition-colors"
      >
        <span className="text-base">📍</span>
        <span className="text-[10px] font-cairo mt-0.5">المكان</span>
      </button>

      {/* 5. التهاني */}
      <button
        onClick={() => scrollTo("wishes")}
        className="flex flex-col items-center hover:text-[#C88A4A] transition-colors"
      >
        <span className="text-base">💌</span>
        <span className="text-[10px] font-cairo mt-0.5">التهاني</span>
      </button>

      {/* 6. زر كتم / تشغيل الصوت */}
      <button
        onClick={onToggleMusic}
        className="flex flex-col items-center hover:text-[#C88A4A] transition-colors pr-1 border-r border-[#EFE3D3]"
      >
        {isPlaying ? (
          <span className="text-base animate-pulse">🎵</span>
        ) : (
          <span className="text-base opacity-60">🔇</span>
        )}
        <span className="text-[10px] font-cairo mt-0.5">
          {isPlaying ? "كتم" : "تشغيل"}
        </span>
      </button>
    </motion.div>
  );
}