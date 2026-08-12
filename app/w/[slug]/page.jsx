import { getWedding } from "../../../firebase/services";
import WeddingClient from "../../../components/WeddingClient";

export default async function WeddingPage({ params }) {
  const { slug } = await params;
  const wedding = await getWedding(slug);

  if (!wedding) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <h1 className="text-2xl font-amiri text-[#5C4033]">
          الدعوة غير موجودة
        </h1>
      </main>
    );
  }

  return <WeddingClient wedding={wedding} slug={slug} />;
}