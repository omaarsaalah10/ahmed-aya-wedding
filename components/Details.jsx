"use client";

import { motion } from "framer-motion";

export default function Details({ wedding }) {
  const venue = "قاعة دايموند نادي الجلاء بجوار صن مول الجلاء";
  const rawDate = wedding?.date ? wedding.date.split("T")[0] : "2026-08-28";

  return (
    <section id="details" className="py-8 px-4 text-center max-w-lg mx-auto space-y-4">
      {/* عنوان المكان: وزن 500 وتباعد حروف خفيف */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-tajawal text-xl sm:text-2xl text-[#7E5C43] font-medium tracking-wide leading-relaxed px-2"
      >
        {venue}
      </motion.h2>

      {/* التاريخ والوقت: وزن 300 لراحة العين */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-cairo text-xs sm:text-sm text-[#8C725F] font-light dir-ltr inline-block tracking-wider"
      >
        {rawDate} — 7:00 مساءً
      </motion.p>

      {/* زر الموقع على الخريطة */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="pt-2"
      >
        <motion.a
          href={wedding?.mapUrl || "#"}
          target="_blank"
          rel="noreferrer"
          whileHover={{
            scale: 1.03,
            boxShadow: "0px 6px 18px rgba(200, 138, 74, 0.25)",
          }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#C88A4A] via-[#D89956] to-[#E2A362] hover:brightness-105 text-white font-cairo font-semibold text-sm py-3 px-8 rounded-2xl shadow-sm transition-all"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>الموقع على الخريطة</span>
        </motion.a>
      </motion.div>

      <div className="flex justify-center items-center gap-3 pt-2 text-[#D8B382]">
        <span className="h-[1px] w-12 bg-[#EFE3D3]" />
        <span className="text-[10px]">◈</span>
        <span className="h-[1px] w-12 bg-[#EFE3D3]" />
      </div>
    </section>
  );
}