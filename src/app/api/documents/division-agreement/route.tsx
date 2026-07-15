import type { NextRequest } from "next/server";
import { DivisionAgreement } from "@/components/pdf/DivisionAgreement";
import { handlePdfRequest } from "@/lib/pdf/requestHandler";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  return handlePdfRequest(request, "division-agreement.pdf", (input) => (
    <DivisionAgreement {...input} />
  ));
}
