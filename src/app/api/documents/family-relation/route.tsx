import type { NextRequest } from "next/server";
import { FamilyRelationChart } from "@/components/pdf/FamilyRelationChart";
import { handlePdfRequest } from "@/lib/pdf/requestHandler";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  return handlePdfRequest(request, "family-relation-chart.pdf", (input) => (
    <FamilyRelationChart {...input} />
  ));
}
