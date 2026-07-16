import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PDF生成APIはpublic/fonts配下のフォントをfs経由で実行時に読み込むため、
  // サーバーレス関数のトレース対象に明示的に含める(参照: node_modules/next/dist/docs/.../output.md)
  outputFileTracingIncludes: {
    "/api/documents/*": ["./public/fonts/**/*"],
  },
};

export default nextConfig;
