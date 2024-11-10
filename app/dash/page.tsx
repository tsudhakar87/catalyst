"use client";

import { useState } from "react";
import { NUPath, ParseResult, SubreqCourse } from "../types";
import UploadAudit from "../dash/upload-audit";
import Link from "next/link";
import Dash from "./dash";

export default function Dashboard() {
  const [parseResults, setParseResults] = useState<ParseResult | null>(null);

  if (parseResults === null) {
    return <>
      <UploadAudit parseResults={parseResults} setParseResults={setParseResults} />
    </>;
  }

  const requirements = parseResults.requirements;

  return (
    <>
      <div className="flex gap-6 border-b-4">
        <Link className="text-2xl font-semibold mr-16" href="/dash">Catalyst</Link>
        <Link className="" href="/dash">Upload Audit</Link>
        <Link className="" href="/dash">View Requirements</Link>
        <Link className="" href="/dash">Semester Schedule</Link>
      </div>
      <Dash parseResults={parseResults} />
    </>
  );
}
