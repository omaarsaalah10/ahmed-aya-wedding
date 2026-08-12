"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "./Hero";
import FarahnaHero from "./FarahnaHero";
import Details from "./Details";
import Countdown from "./Countdown";
import Wishes from "./Wishes";
import FloatingMenu from "./FloatingMenu";

export default function WeddingClient({ wedding, slug }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const musicPath = wedding?.music || "/music/07.El_Leila.mp3";

  // قائمة 12 قلب هادئة
  const hearts = Array.from({ length: 12 }).map((_, index) => {
    const sizes = ["text-xs", "text-sm", "text-base", "text-lg"];
    return {
      id: index,
      left: `${(index * 8) % 90 + 5}%`,
      size: sizes[index % sizes.length],
      duration: 8 + (index % 5),
      delay: index * 0.8,
      sway: (index % 2 === 0 ? 1 : -1) * 15,
    };
  });

  // التحكم في حالة الـ overflow والتمرير التلقائي
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      return;
    }

    // السماح بالسكورل
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";

    let scrollInterval;
    let isCancelled = false;

    // بدء التمرير بعد الفتح بـ 1 ثانية
    const timeoutId = setTimeout(() => {
      if (isCancelled) return;

      scrollInterval = setInterval(() => {
        // تحريك بمقدار 1 بكسل ببطء وسلاسة (متوافق مع الموبايل واللابتوب)
        window.scrollBy(0, 1);

        // التوقف عند الوصول لآخر الصفحة
        const isAtBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 20;

        if (isAtBottom) {
          clearInterval(scrollInterval);
        }
      }, 30); // 30ms يعطي سرعة متوسطة وهادئة مناسبة للجميع
    }, 1000);

    // إيقاف التمرير التلقائي فور لمس الشاشة أو السكرول اليدوي
    const stopAutoScroll = () => {
      isCancelled = true;
      clearTimeout(timeoutId);
      if (scrollInterval) clearInterval(scrollInterval);
    };

    window.addEventListener("touchstart", stopAutoScroll, { passive: true });
    window.addEventListener("touchmove", stopAutoScroll, { passive: true });
    window.addEventListener("wheel", stopAutoScroll, { passive: true });

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
      if (scrollInterval) clearInterval(scrollInterval);
      window.removeEventListener("touchstart", stopAutoScroll);
      window.removeEventListener("touchmove", stopAutoScroll);
      window.removeEventListener("wheel", stopAutoScroll);
    };
  }, [isOpen]);

  const handleOpenInvite = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play blocked:", err));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  return (
    <main className="relative min-h-screen bg-[#FAF5EE] p-0 m-0 flex flex-col items-center overflow-x-hidden">
      <audio ref={audioRef} src={musicPath} loop preload="auto" />

      {/* خلفية القلوب */}
      {isOpen && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden opacity-60">
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ y: "105vh", x: 0, opacity: 0 }}
              animate={{
                y: "-10vh",
                x: [0, heart.sway, -heart.sway, 0],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: heart.duration,
                repeat: Infinity,
                delay: heart.delay,
                ease: "linear",
              }}
              style={{ left: heart.left }}
              className={`absolute text-[#C88A4A] ${heart.size}`}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      )}

      {!isOpen && (
        <div onClick={handleOpenInvite} className="w-full cursor-pointer">
          <Hero wedding={wedding} onOpen={handleOpenInvite} />
        </div>
      )}

      {/* الفريم الأوسط */}
      {isOpen && (
        <div className="w-full max-w-4xl bg-[#FFFDF9] min-h-screen shadow-[0_4px_35px_rgba(0,0,0,0.04)] border-x border-[#EFE3D3] relative z-10 transition-all duration-500">
          <section id="invite-content" className="pt-0">
            <FarahnaHero wedding={wedding} />
            <Details wedding={wedding} />
            <Countdown date={wedding?.date} />
            <Wishes weddingId={wedding?.id || slug} />
          </section>
        </div>
      )}

      {/* القائمة العائمة */}
      {isOpen && (
        <div className="relative z-50">
          <FloatingMenu isPlaying={isPlaying} onToggleMusic={toggleMusic} />
        </div>
      )}
    </main>
  );
}