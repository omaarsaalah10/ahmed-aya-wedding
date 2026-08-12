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

  // قائمة 8 قلوب فقط ليكون شكلها هادئ ورقيق جداً
  const hearts = Array.from({ length: 8 }).map((_, index) => {
    const sizes = ["text-xs", "text-sm", "text-base", "text-lg"];
    return {
      id: index,
      left: `${(index * 12) % 85 + 8}%`,
      size: sizes[index % sizes.length],
      duration: 8 + (index % 4),
      delay: index * 1.1,
      sway: (index % 2 === 0 ? 1 : -1) * 15,
    };
  });

  // التحكم في السكرول التلقائي السريع والأنيق المتوافق مع أجهزة الآيفون وباقي الشاشات
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    let scrollInterval;
    let isCancelled = false;

    // مهلة ثانية واحدة لبدء التمرير
    const timeoutId = setTimeout(() => {
      if (isCancelled) return;

      scrollInterval = setInterval(() => {
        const currentPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        
        // زيادة المقدار إلى 1.8 بكسل لسرعة أسرع سيكة
        window.scrollTo(0, currentPos + 1.8);

        const isAtBottom =
          window.innerHeight + currentPos >=
          document.documentElement.scrollHeight - 25;

        if (isAtBottom) {
          clearInterval(scrollInterval);
        }
      }, 20); // 20ms لحركة أسرع وأنعم
    }, 1000);

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

      {/* خلفية القلوب (8 قلوب هادئة) */}
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