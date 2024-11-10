import { Subreq, SubreqCourse } from "../types";
import { data } from "./catalogCSData";

// check if one course from the same department is a greater number than the other
function isCourseGreater(course1: string, course2: string) {
  const courseOnePrefix = course1.split(' ')[0];
  const courseTwoPrefix = course2.split(' ')[0];
  const courseOneNumber = course1.split(' ')[1];
  const courseTwoNumber = course2.split(' ')[1];
  if (courseOnePrefix == courseTwoPrefix) {
    if (parseInt(courseOneNumber) > parseInt(courseTwoNumber)) {
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
}

export default function diffCourses(taken: string[], requirements: Subreq[]) {
  let isSatisfied = false;
  // initialize a variable to store the courses that are still needed
  const newRequirements: Subreq[] = [];
  let takenCourses = taken;

  const invalidateCourse = (courseId: string) => {
    // remove this course from takenCourses
    const object = data.find(course => course.id == courseId);
    takenCourses = takenCourses.filter(course => course != courseId && !object?.coReqs.includes(course));
  }

  // loop through each subreq category
  for (const category of requirements) {
    // loop through each course in the category
    // console.log(`Checking category ${category.title} (${category.coursesToTake.length}, ${category.numRequired})`);
    let numRequired = category.numRequired;
    const dec = () => numRequired = Math.max(0, numRequired - 1);
    let courses: SubreqCourse[] = [];
    let trackedCourses: string[] = [];
    for (const course of category.coursesToTake) {
      console.log(takenCourses, numRequired, category.coursesToTake)
      // check if the course is in the taken courses
      if (course.type == "course") {
        const hasTakenCourse = takenCourses.includes(course.courseId) || course.or.some(c => takenCourses.includes(c));
        if (!hasTakenCourse) {
          courses.push(course);
        } else {
          const used = takenCourses.includes(course.courseId) ? course.courseId : course.or.find(c => takenCourses.includes(c));
          if (!used) continue;
          // console.log(`Used course ${used} to satisfy ${category.title}`);
          dec();
          invalidateCourse(used);
          trackedCourses.push(used);
          if (numRequired == 0) {
            isSatisfied = true;
            courses = [];
            break;
          }
        }
      }
      else if (course.type == "courseRange") {
        // check if the course is in the taken courses
        courses = category.coursesToTake;
        for (const takenCourse of takenCourses) {
          if (isCourseGreater(takenCourse, course.aboveCourseId)) {
            dec();
            invalidateCourse(takenCourse);
            trackedCourses.push(takenCourse);
          }
        }
        if (numRequired == 0) {
          isSatisfied = true;
          courses = [];
          break;
        }
      }
    }
    console.log(`Category ${category.title} has ${numRequired} courses left`);
    newRequirements.push({
      title: category.title, 
      coursesToTake: courses,
      coursesTaken: trackedCourses,
      numRequired: numRequired,
    });
  }

  return newRequirements;
}