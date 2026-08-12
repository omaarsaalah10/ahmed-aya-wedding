"use client";

import { motion } from "framer-motion";

export default function FarahnaHero({ wedding }) {
  const getEnglishName = (name, defaultEn) => {
    if (!name) return defaultEn;
    if (name.includes("أحمد") || name.toLowerCase().includes("ahmed")) return "Ahmed";
    if (name.includes("آيه") || name.includes("آية") || name.toLowerCase().includes("aya")) return "Aya";
    return name;
  };

  const groomEn = wedding?.groomEn || getEnglishName(wedding?.groom, "Ahmed");
  const brideEn = wedding?.brideEn || getEnglishName(wedding?.bride, "Aya");
  const date = wedding?.date ? wedding.date.split("T")[0] : "2026-08-28";

  return (
    <section className="w-full max-w-4xl mx-auto pt-0 pb-8 px-4 sm:px-8 text-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[420px] sm:h-[520px] md:h-[580px] rounded-b-2xl sm:rounded-2xl overflow-hidden shadow-sm"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${wedding?.heroImage || "/images/couple.jpg"})`,
          }}
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 space-y-3">
          <p className="font-cairo text-xs sm:text-sm font-light tracking-widest text-white/90">
            دعوة زفاف
          </p>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-wide font-normal drop-shadow-md my-1">
            {groomEn} & {brideEn}
          </h1>

          <p className="font-sans text-xs sm:text-sm tracking-widest text-white/90 font-medium">
            {date}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-8 space-y-2 max-w-2xl mx-auto px-2"
      >
        <p className="font-serif text-base sm:text-lg text-[#7E5C43] leading-relaxed">
          Together with their families, {groomEn} & {brideEn}
        </p>
        <p className="font-serif text-xs sm:text-base text-[#8C725F] leading-relaxed">
         .invite you to celebrate their marriage and share their happiness
        </p>

        <div className="flex justify-center items-center gap-3 pt-4 text-[#D8B382]">
          <span className="h-[1px] w-16 bg-[#EFE3D3]" />
          <span className="text-[10px]">◈</span>
          <span className="h-[1px] w-16 bg-[#EFE3D3]" />
        </div>
      </motion.div>
    </section>
  );
}