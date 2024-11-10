"use client";

import { useState } from "react";
import { ParseResult } from "../types";
import UploadAudit from "./upload-audit";

export default function Dashboard() {
  const [parseResults, setParseResults] = useState<ParseResult | null>(null);

  return (
    <>
      <UploadAudit
        parseResults={parseResults}
        setParseResults={setParseResults}
      />
    </>
  );
}
