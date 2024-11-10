import { Course } from "../types";
import { NUPath, } from "../types";
import { convertToNUPath } from "../types";
import { readFileSync } from "fs"; // file system library that comes with node.js
import * as cheerio from "cheerio"; // entire cheerio library for parsing
import stringifyObj from "./printObj";


export async function getCatalog(major: string): Promise<Course[] | null> {
  const majorsToURL = {
    CS: "https://catalog.northeastern.edu/undergraduate/computer-information-science/computer-science",
    IS: "https://catalog.northeastern.edu/course-descriptions/is/",
    DS: "https://catalog.northeastern.edu/undergraduate/computer-information-science/data-science",
    ENG: "https://catalog.northeastern.edu/course-descriptions/engw/",
    THTR: "https://catalog.northeastern.edu/course-descriptions/thtr/"
  }
  const url = majorsToURL[major.toUpperCase() as keyof typeof majorsToURL];
  if (!url) {
    return null;
  }
  const $ = await cheerio.fromURL(url);
  const courses: Course[] = [];

  const requirementsContainer = $("#content-container").html();
  if (requirementsContainer) {
    const courseDescriptions = $(requirementsContainer).find(".courseblock");
    courseDescriptions.each((index, element) => {
      const id = $(element).text().trim().substring(0, 7).replace(/\u00A0/g, ' ');;
      const descriptionString = $(element).text().split(".  (")[0];
      const description = descriptionString.substring(11, descriptionString.length);
      const otherReqsList = $(element).find(".courseblockextra");

      const preReqs: Set<string> = new Set();
      const coReqs: Set<string> = new Set();
      const nupathReqs: Set<NUPath> = new Set();

      let hours: number = 0;
      if (description.includes("Advanced Writing")) {
        nupathReqs.add("WD")
      }
      if (description.includes("First Year Writing")) {
        nupathReqs.add("WF")
      }

      const strHours = $(element).text().match(/\(([^)]+)\)/);

      if (strHours) {
        hours = parseInt(strHours[1]);
      }

      // TODO: abstract this later
      otherReqsList.each((index, element) => {
        if ($(element).text().includes("Prerequisite(s)")) {
          // Extract prerequisite text
          const prereqText = $(element).text().substring(17);
          const prereqIds = prereqText.match(/\b[A-Z]{2,4}\s?\d{2,4}\b/g);

          if (prereqIds) {
            prereqIds.forEach(id => preReqs.add(id));
          }
        }
        else if ($(element).text().includes("Corequisite(s)")) {
          // Extract prerequisite text
          const coreqText = $(element).text().substring(16);
          const coreqIds = coreqText.match(/\b[A-Z]{2,4}\s?\d{2,4}\b/g);

          if (coreqIds) {
            coreqIds.forEach(id => coReqs.add(id));
          }
        }
        else if ($(element).text().includes("Attribute(s)")) {

          const nupathText = $(element).text().substring(15).split(", ");

          if (nupathText) {
            nupathText.forEach(text => nupathReqs.add(convertToNUPath(text)));
          }
        }
      })

      const course: Course = {
        id: id,
        description: description,
        preReqs: Array.from(preReqs),
        coReqs: Array.from(coReqs),
        nupath: Array.from(nupathReqs),
        hours: hours
      };

      courses.push(course);
    })

    return courses;
  }
  return null;
}

// find a course in the catalog by its id
export function findCourse(catalog: Course[], courseId: string): Course | null {
  const major = courseId.replace(/\u00A0/g, ' ').split(" ")[0];
  const id = courseId.replace(/\u00A0/g, ' ').split(" ")[1];
  // console.log("Finding course " + id + " for major " + major);

  if (!catalog) {
    return null;
  }

  let foundCourse: Course | null = null;

  catalog.forEach((course, i) => {
    if (foundCourse) {
      return;
    }
    const curCourseId = course.id.trim().toLowerCase().replace(/\u00A0/g, ' ');;
    const courseID = id.trim().toLowerCase();

    if (curCourseId.includes(courseID)) {
      foundCourse = course;
      return;
    }
  });

  return foundCourse ?? null;  // Return the found course or null if not found
}


function printRawBytes(str: string) {
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    console.log(`Character: '${str[i]}', Code: ${code} (Hex: ${code.toString(16)})`);
  }
}