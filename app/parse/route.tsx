import { readFileSync } from "fs"; // file system library that comes with node.js
import * as cheerio from "cheerio"; // entire cheerio library for parsing
import diffCourses from "../lib/diffCourses";
import { CSRequirements, HUCCRequiremenets } from "../lib/cs-requirements";
import {
  getAllNUPathRequirements,
  getNUPathCourse,
} from "../lib/getNUPathCourse";
import { ParseResult, Requirement } from "../types";

// need to make a list for completed courses and courses in progress
// then, use the full list of courses for cs (or other major), and
// subtract the completed/in progress courses to get the remaining courses
// they still need to take

// use their number of remaining semesters to then distribute out the classes they need to take

// get method for parsing through the html file
export async function GET(request: Request) {
  const htmlText = readFileSync(
    "/Users/neesh/catalyst/app/parse/audit.html",
    "utf-8"
  ); // reads file at given path

  // initialize an error variable to be thrown if any variables are null,
  // and do this instead of an assert function to let the rest of the
  // code know there's a null
  const error = new Response(null, { status: 500 });

  const $ = cheerio.load(htmlText);

  const name = $("div.auditTitle").text().trim().split("\n")[0];
  console.log("+ NAME: ", name);

  const programCode = removeExtraSpaces(
    $("div.auditHeader div:nth-child(4)").text().trim()
  );
  if (!programCode || programCode != "CS-B-CSCI-BSCS") return error;
  console.log("+ PROGRAM CODE: ", programCode);

  const requirementsContainer = $("#auditRequirements").html(); // use . for class, # for id,
  // use.html() first to load html
  if (!requirementsContainer) return error;
  const title = $(requirementsContainer)
    .find(".reqTitle")
    .first()
    .text() // do .text() to get the individual text string
    .trim(); // class reqTitle
  console.log("+ TITLE: ", title);

  const reqBody = $(requirementsContainer).find(".reqBody").first().html();
  if (!reqBody) return error; // html might return null, so return early to avoid issues
  const takenCourses = getTakenCourses($, reqBody);
  if (!takenCourses) return error;

  const majorReqDiff = diffCourses(takenCourses, CSRequirements);

  const concentrationTitle = $(
    "#auditRequirements .requirement:nth-child(2) h3"
  )
    .text()
    .split("Requirement: ")[1]
    .trim();
  console.log("+ CONCENTRATION: ", concentrationTitle);

  let requirements: Requirement[] = [
    {
      type: "major_requirement",
      title: "COMPUTER SCIENCE MAJOR REQUIREMENTS",
      subreqs: majorReqDiff,
    },
  ];

  if (concentrationTitle.includes("NO CONCENTRATION")) {
    console.log("No concentration");
  } else if (concentrationTitle.includes("HUCC")) {
    const concentrationReqBody = $(
      "#auditRequirements .requirement:nth-child(2) .reqBody"
    ).html();
    if (!concentrationReqBody) return error;
    const concentrationTakenCourses = getTakenCourses($, concentrationReqBody);
    if (!concentrationTakenCourses) return error;

    const diff = diffCourses(concentrationTakenCourses, HUCCRequiremenets);
    requirements.push({
      type: "major_requirement",
      title: "HUCC REQUIREMENTS",
      subreqs: diff,
    });
  }

  const NUPathRequirements = getAllNUPathRequirements($);

  const result: ParseResult = {
    programCode,
    title,
    name,
    requirements: [...requirements, ...NUPathRequirements],
  };

  return new Response(JSON.stringify(result, undefined, 2), { status: 200 });
}

export const getTakenCourses = ($: cheerio.CheerioAPI, htmlText: string) => {
  const subreqBodies = $(htmlText).find(".subreqBody"); // class auditSubrequirements
  if (!subreqBodies) return null;
  const takenCourses: string[] = [];
  subreqBodies.each((i, el) => {
    const title = $(el).find("span").first().text().trim().split("\n")[0]; // span is the first child of subreqBody
    if (!title) return;
    // console.log("+ SUBREQ: ", title);
    const classes = $(el).find("tr.takenCourse").toArray(); // class class // table row
    classes.forEach((c) => {
      const course = $(c).find("td.course").text().trim().replace(" ", ""); // td is the child of takenCourse
      const ccode = $(c).find("td.ccode").text().trim();
      const description = removeExtraSpaces(
        $(c).find("td.description").text().trim().replaceAll("\n", "")
      );

      // console.log("| \tCOURSE: ", course, " ", description);

      if (course.includes(" ")) {
        takenCourses.push(course);
      } else {
        const courseNameParts = course.match(/^([a-zA-Z]+)(\d+)$/);
        if (!courseNameParts) return;
        const courseName = courseNameParts[1];
        const courseNumber = courseNameParts[2];

        takenCourses.push(`${courseName} ${courseNumber}`);
      }
    });
  });
  return takenCourses;
};

export const removeExtraSpaces = (str: string) => {
  return str.replace(/\s+/g, " ");
};
