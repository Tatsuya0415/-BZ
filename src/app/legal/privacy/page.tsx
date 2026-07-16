import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | かんたん相続BZ",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16">
      <article className="flex w-full max-w-2xl flex-col gap-5 text-sm leading-7 text-zinc-800">
        <h1 className="text-xl font-bold text-zinc-900">プライバシーポリシー</h1>
        <p>
          [事業者名/屋号](要記入、以下「当方」という)は、本サービスにおける利用者の個人情報の取扱いに
          ついて、以下のとおりプライバシーポリシー(以下「本ポリシー」という)を定めます。
        </p>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-zinc-900">1. 取得する情報</h2>
          <p>
            本サービスでは、診断・シミュレーション・書式作成機能の提供にあたり、以下の情報を取得する
            場合があります。
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>氏名、住所、生年月日等の相続人・被相続人に関する情報</li>
            <li>財産構成に関する情報(不動産の有無、財産のおおよその金額帯等)</li>
            <li>メールアドレス等の連絡先情報(専門家送客を希望した場合)</li>
            <li>アクセスログ、Cookie等の技術情報</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-zinc-900">2. 利用目的</h2>
          <p>取得した情報は以下の目的で利用します。</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>診断結果・シミュレーション結果の提供</li>
            <li>書式ひな形(相続関係説明図、遺産分割協議書等)の作成支援</li>
            <li>利用者が希望した場合の、提携先(司法書士・税理士等)への紹介</li>
            <li>サービス改善のための統計的分析(氏名等の特定個人情報を除き、匿名化した形で利用)</li>
            <li>お問い合わせへの対応</li>
          </ol>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-zinc-900">3. 第三者提供</h2>
          <p>以下の場合を除き、取得した個人情報を本人の同意なく第三者に提供することはありません。</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              利用者が専門家紹介を希望し、提携先の司法書士・税理士等へ連絡先情報を提供する場合(事前に
              利用者の同意を得た上で行う)
            </li>
            <li>法令に基づく場合</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-zinc-900">4. 安全管理措置</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>通信の暗号化(TLS)を実施します</li>
            <li>
              診断・シミュレーションで入力された情報のうち、進捗保存機能を利用しない場合はセッション
              終了後に破棄します(本サービスの進捗保存機能は、お使いの端末のブラウザ内にのみ保存され、
              当方のサーバーには送信されません)
            </li>
            <li>アクセス権限の管理等、個人情報への不正アクセス防止のための措置を講じます</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-zinc-900">5. Cookie・アクセス解析</h2>
          <p>
            本サービスでは、利用状況分析のためCookieおよびアクセス解析ツール(Google Analytics等)を
            使用する場合があります。[要記入: オプトアウト方法の案内]
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-zinc-900">6. 開示・訂正・削除等の請求</h2>
          <p>
            利用者は、当方が保有する自己の個人情報について、開示・訂正・削除等を請求できます。
            請求先: [要記入: 連絡先]
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-zinc-900">7. 免責</h2>
          <p>
            本サービスで提供する診断結果・シミュレーション結果は、一般的な情報提供を目的とするもので
            あり、法的助言・税務助言に該当しません。個別具体的な判断が必要な場合は、司法書士・税理士等の
            専門家にご相談ください。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-zinc-900">8. 改定</h2>
          <p>本ポリシーは、法令改正やサービス内容の変更に応じて改定することがあります。</p>
        </section>

        <p className="text-xs text-zinc-400">制定日: [要記入]</p>
      </article>
    </div>
  );
}
