import { Subreq } from "../types";

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
  // initialize a variable to store the courses that are still needed
  const newRequirements: Subreq[] = [];
  let takenCourses = taken;

  const invalidateCourse = (courseId: string) => {
    // remove this course from takenCourses
    takenCourses = takenCourses.filter(course => course != courseId);
  }

  // loop through each subreq category
  for (const category of requirements) {
    // loop through each course in the category
    // console.log(`Checking category ${category.title} (${category.courses.length})`);
    let numRequired = category.numRequired;
    const dec = () => numRequired = Math.max(0, numRequired - 1);
    let courses = [];
    for (const course of category.courses) {
      // check if the course is in the taken courses
      if (course.type == "course") {
        if (!takenCourses.includes(course.courseId) && !course.or.some(c => takenCourses.includes(c))) {
          courses.push(course);
        } else {
          // console.log(`Used course ${course.courseId} to satisfy ${category.title}`);
          dec();
          invalidateCourse(course.courseId);
          if (numRequired == 0) {
            courses = [];
            break;
          }
        }
      }
      else if (course.type == "courseRange") {
        // check if the course is in the taken courses
        for (const takenCourse of takenCourses) {
          if (isCourseGreater(takenCourse, course.aboveCourseId)) {
            // console.log(`Used course ${takenCourse} to satisfy ${category.title}`);
            dec();
            invalidateCourse(takenCourse);
          }
          else {
            courses.push(course);
          }
        }
        if (numRequired == 0) {
          courses = [];
          break;
        }
      }
    }
    newRequirements.push({ title: category.title, courses: courses, numRequired: numRequired });
  }

  return newRequirements;
}