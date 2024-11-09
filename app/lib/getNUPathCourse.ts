import * as cheerio from "cheerio"; // entire cheerio library for parsing
import { getTakenCourses, removeExtraSpaces } from "../parse/route";

export function getNUPathCourse($: cheerio.CheerioAPI, course: string) {
  // get all the requirements
  // filter through and look for ones that h3 tag equals name of NUpath requirement

  const requirements = $("#auditRequirements .requirement");
  if (!requirements) return null;

  for (const requirement of requirements) {
    const requirementName = removeExtraSpaces($(requirement).find("h3").text()).trim();
    const reqName = `Requirement: ${course}`;

    if (requirementName == reqName) {
      const reqBody = $(requirement).find(".reqBody").first().html();
      if (!reqBody) return null; // html might return null, so return early to avoid issues
      return getTakenCourses($, reqBody);
    }
  }
}