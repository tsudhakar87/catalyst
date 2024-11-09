import { Course } from "../types";
import { NUPath, } from "../types";
import { convertToNUPath } from "../types";
import { readFileSync } from "fs"; // file system library that comes with node.js
import * as cheerio from "cheerio"; // entire cheerio library for parsing


export async function getCSCatalog() {


  const $ = await cheerio.fromURL("https://catalog.northeastern.edu/undergraduate/computer-information-science/computer-science/#coursestext");
  const courses: Course[] = [];

  const requirementsContainer = $("#content-container").html();
  if (requirementsContainer) {
    const courseDescriptions = $(requirementsContainer).find(".courseblock");
    courseDescriptions.each((index, element) => {
      const id = $(element).text().trim().substring(0, 7);
      const descriptionString = $(element).text().split(".  (")[0];
      const description = descriptionString.substring(11, descriptionString.length);
      const otherReqsList = $(element).find(".courseblockextra");

      const preReqs: Set<string> = new Set();
      const coReqs: Set<string> = new Set();
      const nupathReqs: Set<NUPath> = new Set();
      if (description.includes("Advanced Writing")) {
        nupathReqs.add("WD")
      }
      if (description.includes("First Year Writing")) {
        nupathReqs.add("WF")
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
        nupath: Array.from(nupathReqs)
      };

      courses.push(course);
    })

    return courses;
  }
}