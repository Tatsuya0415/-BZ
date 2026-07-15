import Link from "next/link";

const navItems = [
  { href: "/diagnosis", label: "診断" },
  { href: "/self-guide", label: "セルフ登記ガイド" },
  { href: "/progress", label: "進捗管理" },
];

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-3">
      <Link href="/" className="text-sm font-bold text-zinc-900">
        かんたん相続BZ
      </Link>
      <nav className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
