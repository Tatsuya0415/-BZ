import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | かんたん相続BZ",
};

export default function TermsPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16">
      <article className="flex w-full max-w-2xl flex-col gap-5 text-sm leading-7 text-zinc-800">
        <h1 className="text-xl font-bold text-zinc-900">利用規約</h1>
        <p>
          本利用規約(以下「本規約」という)は、[事業者名/屋号](要記入、以下「当方」という)が提供する
          「かんたん相続BZ」(以下「本サービス」という)の利用条件を定めるものです。利用者は本規約に
          同意の上、本サービスをご利用いただくものとします。
        </p>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-zinc-900">第1条(本サービスの内容)</h2>
          <p>
            1. 本サービスは、相続手続き(相続登記・相続税申告等)を利用者自身が進めるための情報提供・
            診断・書式ひな形作成支援・進捗管理を目的とするセルフヘルプツールです。
          </p>
          <p>
            2. 本サービスは、司法書士法・税理士法・弁護士法等に定める有資格者の独占業務(登記申請書類の
            作成代理、税務書類の作成代理、個別の法律相談・交渉代理等)を行うものではありません。
          </p>
          <p>
            3. 利用者が代行対応を希望する場合、当方は提携する有資格の司法書士・税理士等を紹介することが
            ありますが、当方自身が代理人として手続きを行うことはありません。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-zinc-900">第2条(免責事項)</h2>
          <p>
            1. 本サービスが提供する診断結果、シミュレーション結果、書式ひな形は、一般的な情報提供を
            目的とするものであり、その正確性・完全性・特定のケースへの適合性を保証するものではありません。
          </p>
          <p>
            2. 利用者は、本サービスの利用結果について自己の責任において最終確認・判断を行うものとし、
            個別の法的・税務的判断が必要な場合は有資格の専門家に相談するものとします。
          </p>
          <p>
            3. 当方は、本サービスの利用により利用者に生じた損害について、当方の故意または重過失による
            場合を除き、責任を負いません。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-zinc-900">第3条(専門家紹介について)</h2>
          <p>
            1. 当方は、利用者の希望に応じて提携する司法書士・税理士等を紹介する場合がありますが、
            紹介先との契約は利用者と当該専門家との間で直接締結されるものであり、当方は当該契約の当事者と
            なりません。
          </p>
          <p>2. 紹介先専門家の業務内容・品質について、当方は保証しません。</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-zinc-900">第4条(禁止事項)</h2>
          <p>利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>虚偽の情報を入力する行為</li>
            <li>
              本サービスで取得した書式ひな形等を、本人以外の第三者の相続手続きのために無断で反復利用・
              転売する行為
            </li>
            <li>法令に違反する行為、公序良俗に反する行為</li>
            <li>本サービスの運営を妨害する行為</li>
          </ol>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-zinc-900">第5条(知的財産権)</h2>
          <p>
            本サービス上のコンテンツ(診断ロジック、記事、デザイン等)に関する知的財産権は当方または
            正当な権利者に帰属します。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-zinc-900">第6条(規約の変更)</h2>
          <p>当方は、必要と判断した場合、利用者への事前告知の上で本規約を変更できるものとします。</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-zinc-900">第7条(準拠法・管轄)</h2>
          <p>
            本規約は日本法に準拠し、本サービスに関して紛争が生じた場合は、[要記入: 管轄裁判所]を
            第一審の専属的合意管轄裁判所とします。
          </p>
        </section>

        <p className="text-xs text-zinc-400">制定日: [要記入]</p>
      </article>
    </div>
  );
}
