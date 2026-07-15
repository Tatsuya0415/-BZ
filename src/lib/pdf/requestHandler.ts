import type { ReactElement } from "react";
import { NextResponse, type NextRequest } from "next/server";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import {
  isEstateDocumentInput,
  validateEstateDocumentInput,
  type EstateDocumentInput,
} from "@/lib/estateDocuments";
import { registerPdfFonts } from "@/lib/pdf/fonts";

export async function handlePdfRequest(
  request: NextRequest,
  filename: string,
  buildDocument: (input: EstateDocumentInput) => ReactElement<DocumentProps>,
) {
  const body = await request.json().catch(() => null);
  if (!isEstateDocumentInput(body)) {
    return NextResponse.json({ errors: ["リクエストの形式が不正です。"] }, { status: 400 });
  }

  const errors = validateEstateDocumentInput(body);
  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  registerPdfFonts();
  const buffer = await renderToBuffer(buildDocument(body));

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
