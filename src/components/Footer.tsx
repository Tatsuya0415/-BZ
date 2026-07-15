import Link from "next/link";

const legalLinks = [
  { href: "/legal/tokushoho", label: "特定商取引法に基づく表記" },
  { href: "/legal/terms", label: "利用規約" },
  { href: "/legal/privacy", label: "プライバシーポリシー" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white px-6 py-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 text-xs text-zinc-500">
        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
        <p>
          本サービスが提供する診断結果・シミュレーション結果・書式ひな形は一般的な情報提供を目的とした
          ものであり、法的助言・税務助言には該当しません。個別具体的な判断が必要な場合は、司法書士・
          税理士等の専門家にご相談ください。
        </p>
        <p>&copy; かんたん相続BZ</p>
      </div>
    </footer>
  );
}
