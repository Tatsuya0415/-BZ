"use client";

import dynamic from "next/dynamic";

export const ProgressApp = dynamic(
  () => import("./ProgressApp").then((mod) => mod.ProgressApp),
  { ssr: false },
);
