"use client";

import { motion } from "framer-motion";

export default function Hero({ wedding, onOpen }) {
  const displayDate = wedding?.displayDate || "28 أغسطس 2026";
  const groom = wedding?.groom || "أحمد";
  const bride = wedding?.bride || "آية";

  return (
    <section
      onClick={onOpen}
      className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-center cursor-pointer select-none"
    >
      {/* 1. خلفية الصورة مع الضباب والتأطير */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{
          backgroundImage: `url(${wedding?.heroImage || "/images/couple.jpg"})`,
        }}
      />

      {/* 2. Overlay داكن ناعم لوضوح النصوص والدائرة */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />

      {/* 3. الدائرة المركزية الفاخرة مع أنيميشن التوسع عند الفتح */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="relative z-10 w-[310px] h-[310px] sm:w-[340px] sm:h-[340px] rounded-full bg-[#FAF5EE] border-2 border-[#C88A4A] flex flex-col items-center justify-center p-6 text-center shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
      >
        {/* إطار زخرفي ذهبي داخلي مع حواف ناعمة */}
        <div className="absolute inset-[8px] rounded-full border border-dashed border-[#C88A4A]/50 pointer-events-none" />
        <div className="absolute inset-[14px] rounded-full border border-[#D89956]/30 pointer-events-none" />

        {/* وردة زخرفية علوية صغيرة */}
        <div className="text-[#C88A4A] text-xs mb-1 opacity-90">
          🌸
        </div>

        {/* عنوان الدعوة بخط بسيط */}
        <p className="font-cairo text-[#A66E32] text-[11px] font-medium tracking-[0.2em] uppercase">
          دعوة زفاف
        </p>

        {/* أسماء العروسين بخط الرقعة المزخرف وحجم محدد لـ & */}
        <h1 className="font-ruqaa text-4xl sm:text-5xl text-[#5C4535] leading-tight my-2">
          {groom}
          <div className="my-0.5">
            <span className="font-serif text-lg sm:text-xl text-[#C88A4A] italic font-normal inline-block opacity-90">
              &
            </span>
          </div>
          {bride}
        </h1>

        {/* التاريخ بخط بسيط خفيف */}
        <p className="font-cairo text-[#8C725F] font-light text-xs sm:text-sm tracking-wide mt-1">
          {displayDate}
        </p>

        {/* لمسة زخرفية سفلية بسيطة */}
        <div className="text-[#C88A4A] text-[10px] mt-1 opacity-80">
          ✨
        </div>
      </motion.div>

      {/* 4. نص الفتح قريب من الدائرة (مسافة 40px) مع أنيميشن النبض */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: [0.6, 1, 0.6], y: 0 }}
        transition={{
          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 0.6 },
        }}
        className="relative z-10 mt-10 text-white/95 font-cairo text-sm font-light tracking-wider bg-black/30 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-md flex items-center gap-2"
      >
        <span>اضغط لفتح الدعوة</span>
        <span className="text-base">💌</span>
      </motion.div>
    </section>
  );
}