import Link from "next/link";

export default function MenuPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(to bottom, #333333, #ec8cff)",
        fontFamily: "var(--font-jetbrains-mono)",
      }}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto gap-4 px-4 py-12">
        {[
          { name: "PRENDRE RDV", href: "/rendez-vous" },
          { name: "PRESTATIONS", href: "/prestations" },
          { name: "L'ÉQUIPE", href: "/equipe" },
          { name: "LES AVIS", href: "/avis" },
          { name: "ACCÈS", href: "/acces" },
        ].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="border border-white rounded-lg py-3 px-10 w-full max-w-xs text-center text-white hover:bg-white/10 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </main>
  );
}