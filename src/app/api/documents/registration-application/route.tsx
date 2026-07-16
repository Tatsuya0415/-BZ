import type { NextRequest } from "next/server";
import { RegistrationApplication } from "@/components/pdf/RegistrationApplication";
import { handlePdfRequest } from "@/lib/pdf/requestHandler";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  return handlePdfRequest(request, "registration-application.pdf", (input) => (
    <RegistrationApplication {...input} />
  ));
}
