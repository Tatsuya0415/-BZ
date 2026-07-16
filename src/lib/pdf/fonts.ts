import path from "node:path";
import { Font } from "@react-pdf/renderer";

export const NOTO_SANS_JP = "NotoSansJP";

let registered = false;

export function registerPdfFonts() {
  if (registered) return;

  const fontsDir = path.join(process.cwd(), "public", "fonts");
  Font.register({
    family: NOTO_SANS_JP,
    fonts: [
      { src: path.join(fontsDir, "NotoSansJP-Regular.ttf"), fontWeight: "normal" },
      { src: path.join(fontsDir, "NotoSansJP-Bold.ttf"), fontWeight: "bold" },
    ],
  });

  // 日本語は単語間にスペースがないため、文字単位で改行できるようにする
  Font.registerHyphenationCallback((word) => Array.from(word));

  registered = true;
}
