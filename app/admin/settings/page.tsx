import { getImpactStats, getSectionImages } from "@/lib/content";
import SettingsManager from "./SettingsManager";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [impact, images] = await Promise.all([getImpactStats(), getSectionImages()]);
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-1">Images &amp; chiffres</h1>
      <p className="text-zinc-500 mb-6">Modifiez le logo, les images des sections et les chiffres d&apos;impact affichés sur le site.</p>
      <SettingsManager impact={impact} images={images} />
    </div>
  );
}
