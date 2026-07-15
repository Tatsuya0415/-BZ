import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { EstateDocumentInput } from "@/lib/estateDocuments";
import { pdfStyles } from "./styles";

export function RegistrationApplication({
  decedent,
  heirs,
  realEstate,
  documentDate,
}: EstateDocumentInput) {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <Text style={pdfStyles.title}>登記申請書</Text>

        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>登記の目的</Text>
          <Text style={pdfStyles.value}>所有権移転</Text>
        </View>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>原　　因</Text>
          <Text style={pdfStyles.value}>{decedent.deathDate || "[要記入]"} 相続</Text>
        </View>

        <Text style={pdfStyles.sectionTitle}>相続人</Text>
        {heirs.map((heir, i) => (
          <View key={i} style={pdfStyles.paragraph}>
            <Text>住所: {heir.address}</Text>
            <Text>氏名: {heir.name}(被相続人との続柄: {heir.relationship})　　　　　印</Text>
          </View>
        ))}
        <Text style={pdfStyles.paragraph}>連絡先の電話番号: [要記入]</Text>

        <Text style={pdfStyles.sectionTitle}>添付情報</Text>
        <Text>登記原因証明情報(戸籍謄本一式・相続関係説明図)</Text>
        <Text>住所証明情報(住民票等)</Text>
        <Text>(注)登記識別情報の通知を希望する場合はその旨を記載</Text>

        <View style={[pdfStyles.row, { marginTop: 14 }]}>
          <Text style={pdfStyles.label}>申請日</Text>
          <Text style={pdfStyles.value}>{documentDate || "[要記入]"}　　法務局　御中</Text>
        </View>

        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>課税価格</Text>
          <Text style={pdfStyles.value}>金 [要記入] 円</Text>
        </View>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>登録免許税</Text>
          <Text style={pdfStyles.value}>金 [要記入] 円(課税価格の1,000分の4)</Text>
        </View>

        <Text style={pdfStyles.sectionTitle}>不動産の表示</Text>
        {realEstate.map((item, i) => (
          <View key={i} style={pdfStyles.table}>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableCellHeader}>所在</Text>
              <Text style={pdfStyles.tableCell}>{item.address}</Text>
            </View>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableCellHeader}>
                {item.type === "land" ? "地番" : "家屋番号"}
              </Text>
              <Text style={pdfStyles.tableCell}>{item.lotNumber}</Text>
            </View>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableCellHeader}>
                {item.type === "land" ? "地目" : "種類"}
              </Text>
              <Text style={pdfStyles.tableCell}>{item.category || "[要記入]"}</Text>
            </View>
            <View style={pdfStyles.tableRowLast}>
              <Text style={pdfStyles.tableCellHeader}>
                {item.type === "land" ? "地積" : "床面積"}
              </Text>
              <Text style={pdfStyles.tableCell}>{item.area} 平方メートル</Text>
            </View>
          </View>
        ))}

        <Text style={pdfStyles.footerNote}>
          本書式はセルフ申請用のひな形です。課税価格・登録免許税額の算定や添付書類の要否は、
          物件所在地の法務局に必ず事前確認してください。本書式の内容は法的助言に該当しません。
        </Text>
      </Page>
    </Document>
  );
}
