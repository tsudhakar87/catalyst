import * as cheerio from "cheerio"; // entire cheerio library for parsing
import { getTakenCourses, removeExtraSpaces } from "../parse/route";
import { NUPath, Requirement, Subreq } from "../types";

export function getNUPathCourse($: cheerio.CheerioAPI, nupath: NUPath, nupathFullName: string): Requirement | null {
  // get all the requirements
  // filter through and look for ones that h3 tag equals name of NUpath requirement

  const requirements = $("#auditRequirements .requirement");
  if (!requirements) return null;

  for (const requirement of requirements) {
    const requirementName = removeExtraSpaces($(requirement).find("h3").text()).trim();
    const reqName = `Requirement: ${nupathFullName}`;

    if (requirementName == reqName) {
      const reqBody = $(requirement).find(".reqBody").first().html();
      if (!reqBody) return null; // html might return null, so return early to avoid issues
      const courses = getTakenCourses($, reqBody);
      if (courses && courses.length > 0) {
        return {
          type: "satisfied_nupath_requirement",
          nupath,
          courseId: courses[0],
        }
      }
      return {
        type: "nupath_requirement",
        nupath,
      }
    }
  }
  return null;
}

export function getAllNUPathRequirements($: cheerio.CheerioAPI) {
  const requirements: Requirement[] = [];
  console.log("Finding NUPath requirements");

  for (const [nupath, fullName] of Object.entries(NUPathFullNames)) {
    const courses = getNUPathCourse($, nupath as NUPath, fullName as string);
    if (!courses) continue;
    requirements.push(courses);
  }
  return requirements;
}

export const NUPathFullNames: Record<NUPath, string> = {
  "ND": "NATURAL and DESIGNED World (ND)",
  "EI": "CREATIVE EXPRESSION/INNOVATION (EI)",
  "IC": "INTERPRETING CULTURE (IC)",
  "FQ": "FORMAL and QUANTITATIVE REASONING (FQ)",
  "SI": "SOCIETIES and INSTITUTIONS (SI)",
  "AD": "ANALYZING/USING DATA (AD)",
  "DD": "DIFFERENCE and DIVERSITY (DD)",
  "ER": "ETHICAL REASONING (ER)",
  "WF": "FIRST YEAR WRITING (WF)",
  "WI": "WRITING INTENSIVE (WI)",
  "WD": "ADVANCED WRITING IN THE DISCIPLINES (WD)",
  "EX": "INTEGRATION EXPERIENCE (EX)",
  "CE": "CAPSTONE EXPERIENCE (CE)"
}