// import { Course, Semester, Cycle, Subreq } from "../types";
// import { readFileSync } from "fs";
// import { getTakenCourses } from '../parse/route';
// import { CSRequirements } from "../lib/cs-requirements";
// import * as cheerio from "cheerio";
// import diffCourses from "../lib/diffCourses";
// import { findCSCourse } from "../lib/getCSCatalog"
// import stringifyObj from "../lib/printObj";
// import { findCourse } from "../lib/getCatalog";

// export async function optSchedule(desiredSemesters: Semester[], remainingCourses: Subreq[]) {
//     const prereqFrequency: Map<string, { hours: number, numTimes: number }> = new Map();


//     // const remainingCourse: [string, number][] = (await Promise.all(
//     //     remainingCourses.map((course, credits) => [getCourses(course), course.])
//     // )).flat(); // Flattens the array of arrays into a single array

//     let remaining: [string, number][] = await getCourses(remainingCourses);
//     const allTaken = getAllTaken(remainingCourses);

//     await Promise.all(remainingCourses.map(async (course) => {
//         const prerequisites = await getPrerequisites(course);
//         // Process prerequisites and remove duplicates as we go
//         const seenPrereqs = new Set<string>();
//         prerequisites.forEach(prereq => {
//             // Skip if we've already processed this prerequisite
//             if (seenPrereqs.has(prereq[0]) || allTaken.includes(prereq[0])) {
//                 return;
//             }
//             seenPrereqs.add(prereq[0]);

//             // Count occurrences of this prereq in the original array
//             const numTimesInPrereqs = prerequisites.filter(p => p[0] === prereq[0]).length;
//             prereqFrequency.set(prereq[0], { hours: prereq[1], numTimes: numTimesInPrereqs });
//         });
//         // remove duplicates from remaining array
//         remaining = remaining.filter(p => !prerequisites.some(prereq => prereq[0] == p[0]));
//     }));
//     console.log(prereqFrequency, remaining);
//     // desiredSemesters.forEach((element, index) => {
//     //     if (element.season == 'Spring' || element.season == 'Fall') {
//     //         let creditsAdded = 0;
//     //         // let bestId: string | null = null;
//     //         while (creditsAdded <= 19 && remaining.length != 0) {
//     //             console.log({ prereqFrequency, remaining, creditsAdded });
//     //             if (prereqFrequency.size != 0) { // PREREQS
//     //                 const maxValue = Math.max(...prereqFrequency.values());
//     //                 const bestCourse = getByValue(prereqFrequency, maxValue)
//     //                 if (bestCourse) {
//     //                     const [bestId, bestHours] = bestCourse;
//     //                     console.log("Next best option is " + bestId);
//     //                     element.courses.push(bestId);
//     //                     prereqFrequency.delete(bestCourse);
//     //                     const course = remaining.find(([courseId, _]) => courseId == bestId);
//     //                     remaining = remaining.filter(([courseId, _]) => courseId !== bestId);
//     //                     console.log(remaining);
//     //                     if (course) creditsAdded += bestHours;
//     //                 }
//     //             }
//     //             else { // PICK FROM ACTUAL COURSES
//     //                 const [randomId, hours] = remaining[Math.floor(Math.random() * remaining.length)];
//     //                 console.log("Next best option is " + randomId);
//     //                 element.courses.push(randomId);
//     //                 prereqFrequency.delete([randomId, hours]);
//     //                 remaining = remaining.filter(([courseId, _]) => courseId !== randomId);
//     //                 creditsAdded += hours;
//     //             }
//     //         }

//     //     }
//     //     else {
//     //         const creditsAdded = 0;
//     //         // while(creditsAdded <= 10) {

//     //         // }

//     //     }
//     // })

//     // console.log(desiredSemesters)
// }

// async function getPrerequisites(subreq: Subreq): Promise<[string, number][]> {
//     const prereqs: [string, number][] = [];

//     for (const subreqCourse of subreq.coursesToTake) {
//         if (subreqCourse.type === 'course') {
//             console.log("+" + subreqCourse.courseId);
//             // Await the result of the asynchronous function
//             const course = await findCourse(subreqCourse.courseId);
//             if (course) {
//                 // Assuming `course.preReqs` is an array of strings (course IDs)
//                 const coursePrereqs = await Promise.all(course.preReqs.map(async (prereq) => {
//                     const prereqCourse = await findCourse(prereq);
//                     const major = prereq.replace(/\u00A0/g, ' ').split(" ")[0];
//                     const courseMajor = course.id.split(" ")[0];
//                     console.log(major, courseMajor);
//                     if (prereqCourse && major == courseMajor) {
//                         return [prereqCourse.id, prereqCourse.hours];
//                     }
//                     return null;
//                 }));


//                 console.log("course prereqs for " + course.id + " are " + stringifyObj(coursePrereqs));
//                 // console.log("course prereqs for " + course.id + " are " + stringifyObj(coursePrereqs));
//                 prereqs.push(...coursePrereqs.filter(Boolean) as [string, number][]);
//             }
//         } else {
//             // Handle cases where the type isn't 'course'
//             // You might choose to return an empty array or continue the loop
//             continue;
//         }
//     }
//     return prereqs;
// }

// // course id and credits
// async function getCourses(subreqList: Subreq[]) {
//     const finalCourses: [string, number][] = [];

//     await Promise.all(subreqList.map(async (subreq) => {
//         await Promise.all(subreq.coursesToTake.map(async (subreqcourse) => {
//             if (subreqcourse.type == "course") {
//                 const course = await findCSCourse(subreqcourse.courseId);
//                 if (course != null) {
//                     const hours = course.hours;
//                     finalCourses.push([course.id, hours])
//                 }
//             }
//         }))
//     }))

//     return finalCourses;

//     // for (const subreqCourse of subreq.coursesToTake) {
//     //     if (subreqCourse.type === 'course') {
//     //         // Await the result of the asynchronous function
//     //         const course = await findCSCourse(subreqCourse.courseId);
//     //         console.log("this is the course!! " + course);
//     //         if (course) {
//     //             courses.push(course.id); 
//     //         }
//     //     } else {
//     //         return [];
//     //     }
//     // }
//     // return courses;
// }

// function getByValue(map: Map<[string, number], number>, searchValue: number): [string, number] | null {
//     for (const [key, value] of map.entries()) {
//         if (value === searchValue) {
//             return key; // Return the [string, number] key with the search value
//         }
//     }

//     const firstEntry = map.entries().next();
//     if (!firstEntry.done) {
//         return firstEntry.value[0]; // Return the first key if no match is found
//     }

//     return null; // Return null if no key is found
// }


// function getAllTaken(subreqs: Subreq[]) {
//     const taken: string[] = [];
//     subreqs.forEach(subreq => {
//         subreq.coursesToTake.forEach(course => {
//             if (course.type == "course") {
//                 taken.push(course.courseId);
//             }
//         });
//     });
//     return taken;
// }