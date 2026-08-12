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

  // 12 قلب هادئين
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

  // إدارة التمرير التلقائي السريع والمدعوم على الموبايل واللابتوب
  useEffect(() => {
    let animationFrameId;
    let timeoutId;
    let isAutoScrolling = true;

    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";

      const performScroll = () => {
        if (!isAutoScrolling) return;

        // التمرير بمقدار 2.5 بكسل للوصول لسرعة أسرع وأوضح
        const currentScroll = window.scrollY || window.pageYOffset;
        window.scrollTo(0, currentScroll + 2.5);

        // التوقف عند الوصول لنهاية الصفحة
        const isAtBottom =
          window.innerHeight + currentScroll >=
          document.documentElement.scrollHeight - 10;

        if (!isAtBottom && isAutoScrolling) {
          animationFrameId = requestAnimationFrame(performScroll);
        }
      };

      // بدء السكرول بعد الفتح بـ 800 ملي ثانية
      timeoutId = setTimeout(() => {
        animationFrameId = requestAnimationFrame(performScroll);
      }, 800);
    }

    // إيقاف السكرول التلقائي فور لمس الشاشة أو التفاعل من المستخدم
    const stopAutoScroll = () => {
      isAutoScrolling = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (timeoutId) clearTimeout(timeoutId);
    };

    window.addEventListener("touchstart", stopAutoScroll, { passive: true });
    window.addEventListener("touchmove", stopAutoScroll, { passive: true });
    window.addEventListener("wheel", stopAutoScroll, { passive: true });

    return () => {
      document.body.style.overflow = "auto";
      isAutoScrolling = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (timeoutId) clearTimeout(timeoutId);
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

      {/* خلفية القلوب الهادئة */}
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