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

  // قائمة القلوب الكثيفة
  const hearts = Array.from({ length: 45 }).map((_, index) => {
    const sizes = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl"];
    return {
      id: index,
      left: `${(index * 2.2) % 100}%`,
      size: sizes[index % sizes.length],
      duration: 6 + (index % 7),
      delay: (index * 0.25) % 6,
      sway: (index % 2 === 0 ? 1 : -1) * (15 + (index % 20)),
    };
  });

  // إدارة السكرول وميزة التمرير التلقائي السلس عند فتح الدعوة
  useEffect(() => {
    let scrollInterval;
    let timeout;

    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";

      // بدء السكرول التلقائي البطيء بعد فتح الدعوة بـ 1.2 ثانية
      timeout = setTimeout(() => {
        scrollInterval = setInterval(() => {
          window.scrollBy({ top: 1, behavior: "smooth" });

          // التوقف عند الوصول لآخر الصفحة
          if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 10
          ) {
            clearInterval(scrollInterval);
          }
        }, 35); // تحكم في السرعة (رقم أكبر = حركة أبطأ)
      }, 1200);
    }

    // إيقاف التمرير التلقائي لو المستخدم لمس الشاشة أو حرك السكرول بنفسه
    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
      clearTimeout(timeout);
    };

    window.addEventListener("touchstart", stopAutoScroll, { passive: true });
    window.addEventListener("touchmove", stopAutoScroll, { passive: true });
    window.addEventListener("wheel", stopAutoScroll, { passive: true });

    return () => {
      document.body.style.overflow = "auto";
      clearInterval(scrollInterval);
      clearTimeout(timeout);
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

      {/* خلفية القلوب الكثيفة (z-50 و pointer-events-none لضمان ظهورها فوق الخلفيات على الموبايل والكمبيوتر) */}
      {isOpen && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-80">
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ y: "105vh", x: 0, opacity: 0, scale: 0.4 }}
              animate={{
                y: "-10vh",
                x: [0, heart.sway, -heart.sway, 0],
                opacity: [0, 1, 0.9, 0],
                scale: [0.4, 1.2, 0.9, 0.6],
                rotate: [0, 20, -20, 0],
              }}
              transition={{
                duration: heart.duration,
                repeat: Infinity,
                delay: heart.delay,
                ease: "easeInOut",
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

      {/* القائمة العائمة فوق القلوب */}
      {isOpen && (
        <div className="relative z-50">
          <FloatingMenu isPlaying={isPlaying} onToggleMusic={toggleMusic} />
        </div>
      )}
    </main>
  );
}