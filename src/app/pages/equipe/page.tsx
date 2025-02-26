import Link from "next/link";

export default function EquipePage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(to bottom, #000000, #8A9A80)",
        fontFamily: "var(--font-jetbrains-mono)",
      }}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 py-12 text-white">
        <h1 className="text-2xl font-medium mb-6">L&apos;Équipe</h1>
        
        <p className="mb-8 text-center">Présentation de notre équipe</p>
        
        <Link
          href="/"
          className="border border-white rounded-full py-3 px-10 hover:bg-white/10 transition-colors"
        >
          RETOUR
        </Link>
      </div>
    </main>
  );
}