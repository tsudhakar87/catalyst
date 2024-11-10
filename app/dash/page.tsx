"use client";

import { useState } from "react";
import { NUPath, ParseResult, SubreqCourse } from "../types";
import UploadAudit from "../dash/upload-audit";
import Link from "next/link";
import Dash from "./dash";
import Schedule from "./schedule";

export default function Dashboard() {
  const [parseResults, setParseResults] = useState<ParseResult | null>(null);
  const [page, setPage] = useState<"requirements" | "schedule">("requirements");

  if (parseResults === null) {
    return (
      <>
        <UploadAudit
          parseResults={parseResults}
          setParseResults={setParseResults}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex gap-4 border-b-4 px-8 py-4 items-center">
        <Link
          className="text-2xl font-semibold mr-8 italic text-violet-400"
          href="/dash"
        >
          Catalyst
        </Link>
        <button
          className="rounded-full px-4 py-1 bg-zinc-800 border border-zinc-700 text-white hover:border-zinc-600 transition-colors"
          onClick={() => setParseResults(null)}
        >
          Upload New Audit
        </button>
        <button
          className="rounded-full px-4 py-1 bg-zinc-800 border border-zinc-700 text-white hover:border-zinc-600 transition-colors"
          onClick={() => setPage("requirements")}
        >
          View Requirements
        </button>
        <button
          className="rounded-full px-4 py-1 bg-zinc-800 border border-zinc-700 text-white hover:border-zinc-600 transition-colors"
          onClick={() => setPage("schedule")}
        >
          Semester Schedule
        </button>
      </div>
      {page === "requirements" && <Dash parseResults={parseResults} />}
      {page === "schedule" && <Schedule parseResults={parseResults} />}
    </>
  );
}
