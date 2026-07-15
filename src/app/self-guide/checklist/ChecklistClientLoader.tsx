"use client";

import dynamic from "next/dynamic";

export const ChecklistApp = dynamic(
  () => import("./ChecklistApp").then((mod) => mod.ChecklistApp),
  { ssr: false },
);
