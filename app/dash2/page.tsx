"use client";

import { useState } from "react";
import { NUPath, ParseResult } from "../types";
import UploadAudit from "../dash/upload-audit";
import Link from "next/link";

export const NUPathFullNames: Record<NUPath, string> = {
  "ND": "Natural and Designed World (ND)",
  "EI": "Creative Expression/Innovation (EI)",
  "IC": "Interpreting Culture (IC)",
  "FQ": "Formal and Quantitative Reasoning (FQ)",
  "SI": "Societies and Institutions (SI)",
  "AD": "Analyzing/Using Data (AD)",
  "DD": "Difference and Diversity (DD)",
  "ER": "Ethical Reasoning (ER)",
  "WF": "First Year Writing (WF)",
  "WI": "Writing Intensive (WI)",
  "WD": "Advanced Writing in the Disciplines (WD)",
  "EX": "Integration Experience (EX)",
  "CE": "Capstone Experience (CE)"
};

export default function Dashboard() {
  const [parseResults, setParseResults] = useState<ParseResult | null>(
    {
      "programCode": "CS-B-CSCI-BSCS",
      "title": "COMPUTER SCIENCE MAJOR REQUIREMENTS (CS-MAJ)",
      "name": "Kanishq C. Kancharla",
      "requirements": [
        {
          "type": "major_requirement",
          "title": "COMPUTER SCIENCE MAJOR REQUIREMENTS",
          "subreqs": [
            {
              "title": "Computer Science Overview",
              "coursesToTake": [],
              "coursesTaken": [
                "CS 1200",
                "CS 1210"
              ],
              "numRequired": 0
            },
            {
              "title": "Computer Science Fundamental Requirements",
              "coursesToTake": [],
              "coursesTaken": [
                "CS 1800",
                "CS 2500",
                "CS 2510"
              ],
              "numRequired": 0
            },
            {
              "title": "Computer Science Required Courses",
              "coursesToTake": [
                {
                  "type": "course",
                  "courseId": "CS 4500",
                  "or": [
                    "CS 4530"
                  ],
                  "and": []
                }
              ],
              "coursesTaken": [
                "CS 3000",
                "CS 3500",
                "CS 3650",
                "CS 3800",
                "CS 2810"
              ],
              "numRequired": 1
            },
            {
              "title": "Security Required Course",
              "coursesToTake": [],
              "coursesTaken": [
                "CY 2550"
              ],
              "numRequired": 0
            },
            {
              "title": "Presentation Requirement",
              "coursesToTake": [],
              "coursesTaken": [
                "THTR 1125"
              ],
              "numRequired": 0
            },
            {
              "title": "Khoury Elective Courses",
              "coursesToTake": [
                {
                  "type": "courseRange",
                  "aboveCourseId": "CS 2500"
                },
                {
                  "type": "courseRange",
                  "aboveCourseId": "CY 2000"
                },
                {
                  "type": "courseRange",
                  "aboveCourseId": "DS 2500"
                },
                {
                  "type": "courseRange",
                  "aboveCourseId": "IS 2000"
                }
              ],
              "coursesTaken": [
                "CS 2990"
              ],
              "numRequired": 1
            }
          ]
        },
        {
          "type": "major_requirement",
          "title": "HUCC REQUIREMENTS",
          "subreqs": [
            {
              "title": "Required",
              "coursesToTake": [
                {
                  "type": "course",
                  "courseId": "IS 4300",
                  "or": [],
                  "and": []
                }
              ],
              "coursesTaken": [
                "IS 4800"
              ],
              "numRequired": 1
            },
            {
              "title": "Optional",
              "coursesToTake": [
                {
                  "type": "course",
                  "courseId": "CS 4120",
                  "or": [],
                  "and": []
                },
                {
                  "type": "course",
                  "courseId": "CS 4520",
                  "or": [],
                  "and": []
                },
                {
                  "type": "course",
                  "courseId": "CS 4550",
                  "or": [],
                  "and": []
                },
                {
                  "type": "course",
                  "courseId": "DS 4200",
                  "or": [],
                  "and": []
                },
                {
                  "type": "course",
                  "courseId": "IS 2000",
                  "or": [],
                  "and": []
                }
              ],
              "coursesTaken": [],
              "numRequired": 2
            }
          ]
        },
        {
          "type": "satisfied_nupath_requirement",
          "nupath": "EI",
          "courseId": "THTR 1125"
        },
        {
          "type": "nupath_requirement",
          "nupath": "IC"
        },
        {
          "type": "satisfied_nupath_requirement",
          "nupath": "FQ",
          "courseId": "MATH 1341"
        },
        {
          "type": "satisfied_nupath_requirement",
          "nupath": "SI",
          "courseId": "PSYC 1101"
        },
        {
          "type": "satisfied_nupath_requirement",
          "nupath": "AD",
          "courseId": "CS 2510"
        },
        {
          "type": "nupath_requirement",
          "nupath": "DD"
        },
        {
          "type": "satisfied_nupath_requirement",
          "nupath": "ER",
          "courseId": "INAM 2000"
        },
        {
          "type": "satisfied_nupath_requirement",
          "nupath": "WF",
          "courseId": "ENGW 1111"
        },
        {
          "type": "nupath_requirement",
          "nupath": "WI"
        },
        {
          "type": "nupath_requirement",
          "nupath": "WD"
        },
        {
          "type": "nupath_requirement",
          "nupath": "EX"
        },
        {
          "type": "nupath_requirement",
          "nupath": "CE"
        }
      ]
    }
  );

  if (parseResults === null) {
    return null;
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
      <div className="flex gap-6 mt-16 w-fit mx-auto min-w-[90%] justify-center px-6">
        <div className="border-4 w-2/5 text-center">
          <h2 className="text-2xl font-semibold">Courses you've taken so far: </h2>
          <div className="">
            {requirements.filter(
              (requirement) => requirement.type == "major_requirement"
            ).flatMap(
              (requirement) => requirement.subreqs
            ).map((subreq, i) => (
              <div key={i}>
                <h4 className="text-lg font-semibold">{subreq.title}</h4>
                <p>{subreq.coursesTaken.join(" ")}</p>
              </div>
            ))}
          </div>
          <div className="">
            {requirements.filter(
              (requirement) => requirement.type == "satisfied_nupath_requirement"
            ).map((requirement, i) => (
              <div key={i}>
                <h4 className="text-lg font-semibold">{NUPathFullNames[requirement.nupath]}</h4>
                <p>{requirement.courseId}</p>
              </div>
            ))}
            </div>
        </div>
        <div className="border-4 w-2/5 text-center">
          <h2 className="text-2xl font-semibold">Requirements not yet fulfilled: </h2>
          <div className="">
            {requirements.filter(
              (requirement) => requirement.type == "major_requirement"
            ).flatMap(
              (requirement) => requirement.subreqs
            ).filter(
              (subreq) => subreq.numRequired > 0
            ).map((subreq, i) => (
              <div key={i}>
                <h4 className="text-lg font-semibold">{subreq.title}</h4>
                <p>{subreq.coursesToTake.filter(
                  (course) => course.type == "course"
                ).map((course => course.courseId)).join(" ")}</p>
              </div>
            ))}
          </div>
          <div className="">
            {requirements.filter(
              (requirement) => requirement.type == "nupath_requirement"
            ).map((requirement, i) => (
              <div key={i}>
                <h4 className="text-lg font-semibold">{NUPathFullNames[requirement.nupath]}</h4>
              </div>
            ))}
            </div>
        </div>
      </div>
    </>
  );
}
