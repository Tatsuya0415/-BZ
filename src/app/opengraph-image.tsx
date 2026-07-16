import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const badges = [
  { label: "セルフ登記", bg: "#f0fdf4", color: "#16a34a" },
  { label: "相続税シミュレーター", bg: "#eff6ff", color: "#2563eb" },
  { label: "専門家紹介", bg: "#fff7ed", color: "#ea580c" },
];

export default async function OpengraphImage() {
  const fontData = await readFile(
    path.join(process.cwd(), "public", "fonts", "NotoSansJP-Bold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafafa",
          fontFamily: "Noto Sans JP",
        }}
      >
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          {badges.map((badge) => (
            <div
              key={badge.label}
              style={{
                display: "flex",
                padding: "8px 20px",
                borderRadius: 999,
                background: badge.bg,
                color: badge.color,
                fontSize: 24,
              }}
            >
              {badge.label}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, color: "#18181b" }}>
          {SITE_NAME}
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#52525b" }}>
          30秒の診断で、セルフ対応か専門家相談かがわかる
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Noto Sans JP", data: fontData, style: "normal", weight: 700 }] },
  );
}
