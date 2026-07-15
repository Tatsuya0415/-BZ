"use client";

import dynamic from "next/dynamic";

export const DocumentForm = dynamic(
  () => import("./DocumentForm").then((mod) => mod.DocumentForm),
  { ssr: false },
);
