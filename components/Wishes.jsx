"use client";

import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";

export default function Wishes({ weddingId }) {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // التهنئة المثبتة دائماً في البداية
  const pinnedWish = {
    id: "pinned-omar-salah",
    name: "Omar Salah",
    message: "ألف مبروك يا أبو صلاح و يتمم عليك يا خير و أنجز بقي عايز اخد السرير😂😂❤❤",
    isPinned: true,
  };

  useEffect(() => {
    if (!weddingId) return;

    const q = query(
      collection(db, "weddings", weddingId, "wishes"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveWishes = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        // فلترة أي تهنئة مطابقة في الداتابيز عشان متتكررش
        .filter(
          (w) =>
            w.name?.trim().toLowerCase() !== "omar salah" &&
            !w.message?.includes("عايز اخد السرير")
        );

      // وضع التهنئة المثبتة في الأول دائماً
      setWishes([pinnedWish, ...liveWishes]);
    });

    return () => unsubscribe();
  }, [weddingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "weddings", weddingId, "wishes"), {
        name: name.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
      });
      setName("");
      setMessage("");
    } catch (err) {
      console.error("Error adding wish:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="wishes-section" className="py-16 px-4 max-w-2xl mx-auto text-center font-sans">
      <h2 className="text-2xl font-bold text-[#8C6D3F] mb-2">شاركنا تهنئتك 💌</h2>
      <p className="text-[#A48252] text-sm mb-6">اترك لنا رسالة من قلبك تظل ذكرى جميلة</p>

      {/* نموذج إضافة تهنئة */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-10 text-right">
        <input
          type="text"
          placeholder="الاسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl border border-[#EFE3D3] bg-[#FFFDF9] focus:outline-none focus:border-[#C88A4A] text-right"
          required
        />
        <textarea
          rows={3}
          placeholder="رسالتك للعروسين..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded-xl border border-[#EFE3D3] bg-[#FFFDF9] focus:outline-none focus:border-[#C88A4A] text-right"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl bg-[#C88A4A] text-white font-bold hover:bg-[#b0753b] transition duration-200 shadow-md"
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال التهنئة ✨"}
        </button>
      </form>

      {/* قائمة التهاني مع تمييز التهنئة المثبتة */}
      <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
        {wishes.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl border text-right transition ${
              item.isPinned
                ? "bg-[#FFF9EE] border-[#C88A4A] shadow-sm relative"
                : "bg-[#FFFDF9] border-[#EFE3D3]"
            }`}
          >
            {item.isPinned && (
              <span className="text-xs bg-[#C88A4A] text-white px-2 py-0.5 rounded-full absolute top-3 left-3">
                📌 مثبتة
              </span>
            )}
            <p className="text-[#5A452B] text-base leading-relaxed mb-2 font-medium">
              {item.message}
            </p>
            <span className="text-xs text-[#A48252] font-semibold block">
              — {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}