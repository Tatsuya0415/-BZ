import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { EstateDocumentInput } from "@/lib/estateDocuments";
import { pdfStyles } from "./styles";

function realEstateLabel(item: EstateDocumentInput["realEstate"][number]) {
  return item.type === "land" ? "土地" : "建物";
}

export function DivisionAgreement({
  decedent,
  heirs,
  realEstate,
  documentDate,
}: EstateDocumentInput) {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <Text style={pdfStyles.title}>遺産分割協議書</Text>

        <Text style={pdfStyles.paragraph}>
          被相続人 {decedent.name}(本籍:{decedent.lastDomicile}、最後の住所:{decedent.lastAddress}
          、死亡年月日:{decedent.deathDate})の共同相続人全員は、被相続人の遺産について分割協議を行った
          結果、次のとおり分割することに合意した。
        </Text>

        {realEstate.map((item, i) => (
          <View key={i} style={pdfStyles.paragraph}>
            <Text style={pdfStyles.sectionTitle}>
              {i + 1}. 相続人 {item.acquiringHeirName || "[要記入]"} は、次の{realEstateLabel(item)}
              を取得する。
            </Text>
            <View style={pdfStyles.table}>
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
          </View>
        ))}

        <Text style={pdfStyles.paragraph}>
          上記の協議の成立を証するため、本協議書を相続人の人数分作成し、各自1通を保有するものとする。
        </Text>

        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>作成日</Text>
          <Text style={pdfStyles.value}>{documentDate || "[要記入]"}</Text>
        </View>

        <Text style={pdfStyles.sectionTitle}>相続人署名押印</Text>
        {heirs.map((heir, i) => (
          <View key={i} style={pdfStyles.signatureBlock}>
            <Text>住所: {heir.address}</Text>
            <Text>氏名: {heir.name}　　　　　　　　　　　　印</Text>
          </View>
        ))}

        <Text style={pdfStyles.footerNote}>
          本書式はセルフ作成用のひな形です。実印での押印・印鑑証明書の添付など、実際の手続きに必要な
          要件は法務局・専門家の案内に従って確認してください。
        </Text>
      </Page>
    </Document>
  );
}
