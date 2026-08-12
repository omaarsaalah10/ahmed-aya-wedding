import { Cairo, Amiri, Tajawal, Aref_Ruqaa } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cairo",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-ruqaa",
});

export const metadata = {
  title: "دعوة زفاف أحمد وآية",
  description: "دعوة زفاف رقمية",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} ${amiri.variable} ${tajawal.variable} ${arefRuqaa.variable} font-cairo bg-[#FAF5EE] text-[#5C4535] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}