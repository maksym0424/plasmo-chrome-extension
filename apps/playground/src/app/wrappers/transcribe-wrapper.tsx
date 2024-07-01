"use client";

import dynamic from "next/dynamic";

const Transcribe = dynamic(() => import("shared/layouts/transcribe"), { ssr: false });

export default function TranscribeWrapper() {

  return (
    <>
      <Transcribe />
    </>
  );
}
