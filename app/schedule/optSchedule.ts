import { Course, Semester, Cycle, Subreq } from "../types";
import { readFileSync } from "fs";
import { getTakenCourses } from '../parse/route';
import { CSRequirements } from "../lib/cs-requirements";
import * as cheerio from "cheerio";
import diffCourses from "../lib/diffCourses";
import { findCSCourse } from "../lib/getCSCatalog"
import stringifyObj from "../lib/printObj";

export async function optSchedule(desiredSemesters: Semester[], remainingCourses: Subreq[]) {
    console.log("remaining courses "+ stringifyObj(remainingCourses))
    const prereqFrequency: Map<string, number> = new Map();
    

    // const remainingCourse: [string, number][] = (await Promise.all(
    //     remainingCourses.map((course, credits) => [getCourses(course), course.])
    // )).flat(); // Flattens the array of arrays into a single array

    let remaining: [string, number][] = await getCourses(remainingCourses);
    
    await Promise.all(remainingCourses.map(async (course) => {
        const prerequisites = await getPrerequisites(course); 
        // Implement getPrerequisites to fetch prereqs for a course
        prerequisites.forEach(prereq => {

            prereqFrequency.set(
                prereq,
                (prereqFrequency.get(prereq) || 0) + 1
            );
            
        });
    }));
    desiredSemesters.forEach((element, index) => {
        if(element.season == 'Spring'|| element.season == 'Fall') {
            let creditsAdded = 0;
            // let bestId: string | null = null;
            while(creditsAdded <= 19 && remaining.length != 0) {
                console.log(prereqFrequency, remaining.length, creditsAdded);
                if (prereqFrequency.size != 0) { // PREREQS
                    const maxValue = Math.max(...prereqFrequency.values());
                    const bestId = getByValue(prereqFrequency, maxValue)
                    if (bestId) {
                        console.log("Next best option is " + bestId);
                        element.courses.push(bestId);
                        prereqFrequency.delete(bestId);
                        const course = remaining.find(([courseId, _]) => courseId == bestId);
                        remaining = remaining.filter(([courseId, _]) => courseId !== bestId);
                        console.log(remaining);
                        if (course) creditsAdded += course[1];
                    }
                }
                else { // PICK FROM ACTUAL COURSES
                    const [randomId, hours] = remaining[Math.floor(Math.random() * remaining.length)];
                    console.log("Next best option is " + randomId);
                    element.courses.push(randomId);
                    prereqFrequency.delete(randomId);
                    remaining = remaining.filter(([courseId, _]) => courseId !== randomId);
                    creditsAdded += hours;
                }
            }
            
        }
        else {
            const creditsAdded = 0;
            // while(creditsAdded <= 10) {
                
            // }
            
        }
        
    })

    console.log(desiredSemesters)
    
}

async function getPrerequisites(subreq: Subreq): Promise<string[]> {
    const prereqs: string[] = [];

    for (const subreqCourse of subreq.coursesToTake) {
        if (subreqCourse.type === 'course') {
            // Await the result of the asynchronous function
            const course = await findCSCourse(subreqCourse.courseId);
            console.log("this is the course!! " + course);
            if (course) {
                // Assuming `course.preReqs` is an array of strings (course IDs)
                prereqs.push(...course.preReqs);
                // `index` can be replaced by any logic that fits your key scheme
            }
        } else {
            // Handle cases where the type isn't 'course'
            // You might choose to return an empty array or continue the loop
            continue;
        }
    }
    return prereqs;
}

// course id and credits
async function getCourses(subreqList: Subreq[]) {
    const finalCourses: [string, number][] = [];

    await Promise.all(subreqList.map(async (subreq) => {
        await Promise.all(subreq.coursesToTake.map(async (subreqcourse) => {
            if (subreqcourse.type == "course") {
                const course = await findCSCourse(subreqcourse.courseId);
                if (course != null) {
                    const hours = course.hours;
                    finalCourses.push([course.id, hours])
                }
            }
        }))
    }))

    return finalCourses;
    
    // for (const subreqCourse of subreq.coursesToTake) {
    //     if (subreqCourse.type === 'course') {
    //         // Await the result of the asynchronous function
    //         const course = await findCSCourse(subreqCourse.courseId);
    //         console.log("this is the course!! " + course);
    //         if (course) {
    //             courses.push(course.id); 
    //         }
    //     } else {
    //         return [];
    //     }
    // }
    // return courses;
}

function getByValue(map: Map<string, number>, searchValue: number): string | null {
    for (const [key, value] of map.entries()) {
        if (value === searchValue) {
            return key; // Return the [string, number] key with the search value
        }
    }

    const firstEntry = map.entries().next();
    if (!firstEntry.done) {
        return firstEntry.value[0]; // Return the first key if no match is found
    }

    return null; // Return null if no key is found
}
