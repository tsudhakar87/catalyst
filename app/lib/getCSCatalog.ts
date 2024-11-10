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
}

export async function findCSCourse(courseId: string): Promise<Course | null> {
  const catalog = await getCSCatalog();

  if (!catalog) {
    return null;
  }

  let foundCourse: Course | null = null;

  catalog.forEach((course, i) => {
    // if (i != 40) return;
    const curCourseId = course.id.trim().toLowerCase();
    const courseID = courseId.trim().toLowerCase();

    for (let i = 0; i < courseID.length; i ++) {
      if (curCourseId.charAt(i) != courseID.charAt(i) && courseID.charAt(i) != ' ') {
        return;
      }
    }

    foundCourse = course;  // Set the found course
  });

  return foundCourse ?? null;  // Return the found course or null if not found
}


export async function findCSCoursesForNUPath(nupath: string) {
  // initialize a list of courses to be returned
  //const courses[] = [];
  // check if it's null
  // if (courses == null) {
  //   return null;
  // }
  // for each course in the catalog, go through the list of its nupaths (forEach?)
  
  // if that list of nupaths contains the nupath, then add that course to the initial list 
  // (forEach?, then contains or something?)
  // return list
}