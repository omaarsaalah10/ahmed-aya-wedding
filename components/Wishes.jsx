"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addWish, getWishes } from "../firebase/services";

export default function Wishes({ weddingId }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadWishes() {
    try {
      const data = await getWishes(weddingId);
      setWishes(data || []);
    } catch (error) {
      console.error("Error loading wishes:", error);
    }
  }

  useEffect(() => {
    if (weddingId) {
      loadWishes();
    }
  }, [weddingId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    try {
      setLoading(true);
      await addWish({
        weddingId,
        name: name.trim(),
        message: message.trim(),
      });

      setName("");
      setMessage("");
      await loadWishes();
    } catch (error) {
      console.error("Error submitting wish:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="wishes" className="py-8 pb-32 px-4 max-w-lg mx-auto space-y-6">
      {/* عنوان تفاعلي ودود */}
      <div className="text-center space-y-1">
        <h3 className="font-amiri text-2xl sm:text-3xl text-[#7E5C43] font-bold">
          شاركنا تهنئتك 💌
        </h3>
        <p className="font-cairo text-xs text-[#8C725F] font-light">
          اترك لنا رسالة من قلبك تظل ذكرى جميلة
        </p>
      </div>

      {/* نموذج التهنئة */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-[#EFE3D3] p-4 sm:p-5 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.015)] space-y-3"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="الاسم (مطلوب)"
          className="w-full rounded-2xl border border-[#F2E8DC] bg-[#FFFDF9] px-4 py-2.5 outline-none focus:border-[#C88A4A] text-right font-cairo text-sm text-[#5C4535]"
          required
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="اكتب رسالتك وتهنئتك للعروسين..."
          rows="3"
          className="w-full rounded-2xl border border-[#F2E8DC] bg-[#FFFDF9] px-4 py-2.5 outline-none focus:border-[#C88A4A] resize-none text-right font-cairo text-sm text-[#5C4535]"
          required
        />

        <motion.button
          disabled={loading}
          whileHover={{
            scale: 1.01,
            boxShadow: "0px 6px 18px rgba(200, 138, 74, 0.25)",
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-2xl bg-gradient-to-r from-[#C88A4A] via-[#D89956] to-[#E2A362] hover:brightness-105 text-white py-3.5 font-cairo font-semibold text-sm transition-all shadow-sm disabled:opacity-60"
        >
          {loading ? "جاري الإرسال..." : "إرسال التهنئة ✨"}
        </motion.button>
      </form>

      {/* قائمة التهاني */}
      <div className="space-y-3">
        <AnimatePresence>
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id || index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border border-[#EFE3D3] rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.015)] text-right space-y-2"
            >
              <p className="text-[#5C4535] font-cairo text-sm leading-relaxed">
                {wish.message}
              </p>
              <div className="flex justify-end pt-1">
                <span className="font-cairo text-xs font-semibold text-[#C88A4A]">
                  — {wish.name}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* توقيع الحقوق والتصميم */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-10 text-center"
      >
        <div
          dir="ltr"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#FFFDF9] border border-[#EFE3D3] shadow-[0_2px_10px_rgba(0,0,0,0.02)] backdrop-blur-sm"
        >
          <span className="font-sans text-xs text-[#8C725F] tracking-wide font-light">
            Designed & Developed with
          </span>
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="inline-block text-xs"
          >
            ❤️
          </motion.span>
          <span className="font-sans text-xs text-[#8C725F] tracking-wide font-light">
            by
          </span>
          <span className="font-sans text-xs font-semibold text-[#7E5C43] tracking-wider uppercase border-b border-[#C88A4A]/40 pb-0.5 ml-0.5">
            Omar Salah
          </span>
        </div>
      </motion.div>
    </section>
  );
}