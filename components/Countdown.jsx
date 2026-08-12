"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Countdown({ date, venue = "قاعة دايموند نادي الجلاء بجوار صن مول الجلاء" }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!date) return;
    const target = new Date(date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  const createGoogleCalendarUrl = () => {
    const title = encodeURIComponent("حفل زفاف أحمد وآية 🎉");
    const details = encodeURIComponent("تنورونا وتشاركونا فرحتنا! 💍");
    const location = encodeURIComponent(venue);
    const startTime = "20260828T170000Z";
    const endTime = "20260828T210000Z";

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
  };

  const units = [
    { label: "ثانية", value: timeLeft.seconds },
    { label: "دقيقة", value: timeLeft.minutes },
    { label: "ساعة", value: timeLeft.hours },
    { label: "يوم", value: timeLeft.days },
  ];

  return (
    <section id="countdown" className="py-6 px-4 text-center max-w-md mx-auto space-y-4">
      {/* العبارة الترحيبية الدافئة */}
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="font-amiri text-base sm:text-lg text-[#7E5C43] font-bold"
      >
        باقي علي فرحتنا ❤️
      </motion.p>

      {/* كروت العداد بالأرقام الأكبر والكلمات الأصغر */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 dir-rtl">
        {units.map((unit, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="bg-white border border-[#EFE3D3] rounded-2xl py-3 px-1 shadow-[0_2px_8px_rgba(0,0,0,0.015)] flex flex-col items-center justify-center min-h-[80px]"
          >
            {/* تكبير الرقم */}
            <span className="font-serif text-3xl sm:text-4xl text-[#C88A4A] font-bold leading-none">
              {String(unit.value).padStart(2, "0")}
            </span>
            {/* تصغير الكلمة */}
            <span className="font-cairo text-[10px] text-[#8C725F] mt-1 font-light">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="pt-2">
        <motion.a
          href={createGoogleCalendarUrl()}
          target="_blank"
          rel="noreferrer"
          whileHover={{
            scale: 1.03,
            boxShadow: "0px 10px 25px rgba(200, 138, 74, 0.35)",
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#C88A4A] via-[#D89956] to-[#E2A362] hover:brightness-105 text-white font-cairo font-semibold text-sm py-3.5 px-8 rounded-2xl shadow-[0_4px_15px_rgba(200,138,74,0.2)] transition-all"
        >
          <span>ضيف الفرح لتقويمك</span>
          <svg className="w-5 h-5 text-white/95" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8a5 5 0 100 10 5 5 0 000-10z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2 2.5h-4L12 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 5.5h4" />
          </svg>
        </motion.a>
      </div>
    </section>
  );
}