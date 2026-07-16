import { StyleSheet } from "@react-pdf/renderer";
import { NOTO_SANS_JP } from "@/lib/pdf/fonts";

export const pdfStyles = StyleSheet.create({
  page: {
    fontFamily: NOTO_SANS_JP,
    fontSize: 10.5,
    padding: 40,
    lineHeight: 1.6,
  },
  title: {
    fontFamily: NOTO_SANS_JP,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: NOTO_SANS_JP,
    fontWeight: "bold",
    fontSize: 11,
    marginTop: 14,
    marginBottom: 6,
  },
  paragraph: {
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
  },
  label: {
    width: 110,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
  },
  table: {
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000000",
  },
  tableRowLast: {
    flexDirection: "row",
  },
  tableCellHeader: {
    width: 90,
    padding: 6,
    backgroundColor: "#f4f4f5",
    fontWeight: "bold",
    borderRightWidth: 1,
    borderColor: "#000000",
  },
  tableCell: {
    flex: 1,
    padding: 6,
  },
  signatureBlock: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: "#000000",
  },
  footerNote: {
    marginTop: 20,
    fontSize: 8.5,
    color: "#52525b",
  },
});
