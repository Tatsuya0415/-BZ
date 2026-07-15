import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { EstateDocumentInput } from "@/lib/estateDocuments";
import { pdfStyles } from "./styles";

export function FamilyRelationChart({ decedent, heirs, documentDate }: EstateDocumentInput) {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <Text style={pdfStyles.title}>相続関係説明図</Text>

        <Text style={pdfStyles.sectionTitle}>被相続人</Text>
        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCellHeader}>氏名</Text>
            <Text style={pdfStyles.tableCell}>{decedent.name}</Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCellHeader}>死亡年月日</Text>
            <Text style={pdfStyles.tableCell}>{decedent.deathDate}</Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCellHeader}>最後の住所</Text>
            <Text style={pdfStyles.tableCell}>{decedent.lastAddress}</Text>
          </View>
          <View style={pdfStyles.tableRowLast}>
            <Text style={pdfStyles.tableCellHeader}>本籍</Text>
            <Text style={pdfStyles.tableCell}>{decedent.lastDomicile}</Text>
          </View>
        </View>

        <Text style={pdfStyles.sectionTitle}>相続人</Text>
        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableRow}>
            <Text style={[pdfStyles.tableCellHeader, { width: 60 }]}>続柄</Text>
            <Text style={[pdfStyles.tableCellHeader, { width: 100 }]}>氏名</Text>
            <Text style={[pdfStyles.tableCellHeader, { width: 80 }]}>生年月日</Text>
            <Text style={pdfStyles.tableCell}>住所</Text>
          </View>
          {heirs.map((heir, i) => {
            const isLast = i === heirs.length - 1;
            return (
              <View key={i} style={isLast ? pdfStyles.tableRowLast : pdfStyles.tableRow}>
                <Text style={[pdfStyles.tableCell, { width: 60 }]}>{heir.relationship}</Text>
                <Text style={[pdfStyles.tableCell, { width: 100 }]}>{heir.name}</Text>
                <Text style={[pdfStyles.tableCell, { width: 80 }]}>{heir.birthDate}</Text>
                <Text style={pdfStyles.tableCell}>{heir.address}</Text>
              </View>
            );
          })}
        </View>

        <Text style={pdfStyles.paragraph}>
          上記のとおり、被相続人{decedent.name}の相続人は{heirs.length}名であることに相違ない。
        </Text>

        <View style={pdfStyles.row}>
          <Text style={pdfStyles.label}>作成日</Text>
          <Text style={pdfStyles.value}>{documentDate || "[要記入]"}</Text>
        </View>

        <Text style={pdfStyles.footerNote}>
          本書式はセルフ作成用のひな形であり、入力内容の正確性は利用者本人が確認するものとします。
          法務局提出前に記載内容・必要な戸籍謄本等の裏付け資料を必ず確認してください。
        </Text>
      </Page>
    </Document>
  );
}
