import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "そうぞくセルフナビ｜自分でできる相続手続き診断",
  description:
    "3分の診断で相続登記・相続手続きが自分でできるかをチェック。必要書類の一覧も自動生成します。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <nav className="border-b border-gray-100 bg-white print:hidden">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-base font-bold text-brand-700">
              そうぞくセルフナビ
            </Link>
            <Link
              href="/diagnosis"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              3分診断をはじめる
            </Link>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="mt-16 border-t border-gray-100 bg-white py-8 text-xs text-gray-400 print:hidden">
          <div className="mx-auto max-w-3xl px-4">
            <p>
              本サイトは一般的な情報提供を目的としたセルフチェックツールであり、法律・税務上の助言や代理業務を提供するものではありません。個別の法律相談は弁護士、登記手続きの代理は司法書士、税務相談・申告代理は税理士にご相談ください。
            </p>
            <p className="mt-3">
              &copy; {new Date().getFullYear()} そうぞくセルフナビ
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
