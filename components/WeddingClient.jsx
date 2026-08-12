"use client";

import { useEffect, useState } from "react";

export default function WeddingClient({ wedding, slug }) {
  // 1. التمرير التلقائي البطيء عند فتح الصفحة
  useEffect(() => {
    let scrollInterval;

    const timeout = setTimeout(() => {
      scrollInterval = setInterval(() => {
        window.scrollBy({ top: 1, behavior: "smooth" });

        // إيقاف السكرول عند الوصول لآخر الصفحة
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 5
        ) {
          clearInterval(scrollInterval);
        }
      }, 35); // تحكم في السرعة من هنا (كلما زاد الرقم قلّت السرعة)
    }, 1500); // بدء السكرول بعد ثانية ونصف من الفتح

    // إيقاف السكرول التلقائي فوراً إذا لمس المستخدم الشاشة
    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
      clearTimeout(timeout);
    };

    window.addEventListener("touchstart", stopAutoScroll, { passive: true });
    window.addEventListener("touchmove", stopAutoScroll, { passive: true });
    window.addEventListener("wheel", stopAutoScroll, { passive: true });

    return () => {
      clearInterval(scrollInterval);
      clearTimeout(timeout);
      window.removeEventListener("touchstart", stopAutoScroll);
      window.removeEventListener("touchmove", stopAutoScroll);
      window.removeEventListener("wheel", stopAutoScroll);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#5C4033] overflow-x-hidden selection:bg-[#E8D3C4]">
      
      {/* 2. حاوي القلوب المتحركة (مظبوط للموبايل والتابلت والكمبيوتر) */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        {[...Array(15)].map((_, index) => (
          <span
            key={index}
            className="absolute text-red-400 opacity-70 animate-float"
            style={{
              left: `${(index * 7) % 100}%`,
              animationDuration: `${6 + (index % 5)}s`,
              animationDelay: `${index * 0.5}s`,
              fontSize: `${16 + (index % 4) * 6}px`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* محتوى الدعوة */}
      <section className="relative z-10 max-w-lg mx-auto min-h-screen flex flex-col items-center justify-center p-6 text-center">
        
        {/* صورة العروسين */}
        {wedding.heroImage && (
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-xl mb-6 transform hover:scale-105 transition duration-500">
            <img
              src={`/${wedding.heroImage}`}
              alt={`${wedding.groom} & ${wedding.bride}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* الأسماء */}
        <h1 className="text-4xl md:text-5xl font-amiri font-bold text-[#4A3228] mb-2">
          {wedding.groom} & {wedding.bride}
        </h1>

        <p className="text-lg font-serif text-[#8C6D58] mb-6">
          يتشرفان بدعوتكم لحضور حفل الزفاف
        </p>

        {/* التاريخ والقاعة */}
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#E8D3C4] shadow-sm w-full mb-6">
          <p className="text-xl font-bold text-[#5C4033] mb-1">
            {wedding.displayDate || wedding.date}
          </p>
          <p className="text-md text-[#7A5C4A]">{wedding.venue}</p>
        </div>

        {/* زر الخريطة */}
        {wedding.mapUrl && (
          <a
            href={wedding.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#5C4033] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#4A3228] transition duration-300 mb-8"
          >
            📍 موقع القاعة على الخريطة
          </a>
        )}
      </section>

      {/* CSS الأنيميشن الخاص بحركة القلوب */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(105vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-10vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </main>
  );
}