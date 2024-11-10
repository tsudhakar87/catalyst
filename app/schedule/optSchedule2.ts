import { findCourse, getCatalog } from "../lib/getCatalog";
import stringifyObj from "../lib/printObj";
import { Course, Semester, Subreq, SubreqCourse } from "../types";

const courseCache: Record<string, Course> = {};

/*
  1. Get all taken courses
  2. Get all NUPath requirements
  3. Get a list of all courses to take, plus any prerequisites they have that aren't already taken, plus their co-reqs
  4. Get a list of all NUPath requirements that aren't satisfied (including with #3)
*/

export async function optSchedule2(desiredSemesters: Semester[], subreqs: Subreq[]) {
  const catalogs = await getAllCatalogs();
  const allTaken = getAllTaken(subreqs, (major) => catalogs[major as keyof typeof catalogs] as Course[]);
  const filteredSubreqs = subreqs.filter(subreq => subreq.numRequired > 0);

  const allCourses: Course[] = [];

  for (const subreq of filteredSubreqs) {
    const courses = solveSubreq(subreq, allTaken, catalogs);
    allCourses.push(...courses);
  }
  console.log(allCourses);
  return allCourses;
}

function solveSubreq(subreq: Subreq, allTaken: Course[], catalogs: Record<string, Course[]>): Course[] {
  const toTake = subreq.coursesToTake;
  if (toTake.length == subreq.numRequired && toTake.every(course => course.type == "course")) { // Don't need to choose courses for this subreq
    return toTake.map(course => getCourse(course.courseId, catalogs[getCourseMajor(course.courseId)])).filter(course => course != null) as Course[];
  }
  // simulate every possible course selection, choosing courses that are "cs" if possible
  const courseSelections = getCourseSelections(subreq, allTaken, catalogs);

  const chosen = chooseFromCombinations(courseSelections, allTaken, catalogs);
  return chosen.map(c => getCourse(c, catalogs[getCourseMajor(c)])).filter(c => c != null) as Course[]
}

// simulate every possible course selection, choosing courses that are "cs" if possible.
// if there are multiple courses that are "cs" and the same number of courses that are not "cs", choose the ones that are "cs"
function getCourseSelections(subreq: Subreq, allTaken: Course[], catalogs: Record<string, Course[]>): SubreqCourse[][] {
  function getCombinations<T>(arr: T[], n: number): T[][] {
    if (n === 0) return [[]];
    if (arr.length === 0) return [];

    const [first, ...rest] = arr;
    const combsWithFirst = getCombinations(rest, n - 1).map(comb => [first, ...comb]);
    const combsWithoutFirst = getCombinations(rest, n);

    return [...combsWithFirst, ...combsWithoutFirst];
  }
  const combinations = getCombinations(subreq.coursesToTake, subreq.numRequired);
  return combinations;
}

// prefer courses that are "cs". if still more than one, choose the one with the least number of prereqs
function chooseFromCombinations(combinations: SubreqCourse[][], allTaken: Course[], catalogs: Record<string, Course[]>): string[] {
  const scores: Record<string, number> = {};
  combinations.map((c) => [c, c.filter(isCS).length] as [SubreqCourse[], number]).forEach(([c, cs]) => {
    scores[c.map(getId).join(",")] = cs;
  });
  combinations.map((c) => [c,
    getCoursesPrereqs(
      c.filter(c => c.type == "course").map(c => c.courseId), // only consider courses
      (major) => catalogs[major as keyof typeof catalogs] as Course[])] as [SubreqCourse[], Course[]]
  )
    .forEach(([c, prereqs]) => {
      // filter out courses that are already taken
      const filtered = c.filter(c => !allTaken.some(t => t.id == getId(c))); // filter out all courses where one of allTaken is a prereq
      scores[c.map(getId).join(",")] = filtered.length;
    });
  const minPrereqs = Object.entries(scores).sort((a, b) => a[1] - b[1])[0];
  return minPrereqs[0].split(",").map(c => c.trim());
}

function getCourse(courseId: string, catalog: Course[]): Course | null {
  if (courseCache[courseId]) {
    return courseCache[courseId];
  }
  const course = findCourse(catalog, courseId);
  if (course) {
    courseCache[courseId] = course;
  }
  return course;
}

function getCoursesPrereqs(courseIds: string[], getCatalog: (major: string) => Course[]): Course[] {
  const prereqs: Course[] = [];
  for (const courseId of courseIds) {
    prereqs.push(...getCoursePrereqs(courseId, getCatalog));
  }
  return prereqs;
}

function getCoursePrereqs(courseId: string, getCatalog: (major: string) => Course[]): Course[] {
  const course = getCourse(courseId, getCatalog(getCourseMajor(courseId)));
  if (!course) {
    return [];
  }
  const prereqs: Course[] = [];
  for (const prereq of course.preReqs) {
    const prereqCourse = getCourse(prereq, getCatalog(getCourseMajor(prereq)));
    if (prereqCourse) {
      prereqs.push(prereqCourse);
    }
  }
  return prereqs;
}

function getAllTaken(subreqs: Subreq[], getCatalog: (major: string) => Course[]): Course[] {
  const taken: Course[] = [];
  subreqs.forEach(subreq => {
    subreq.coursesTaken.forEach(courseId => {
      const catalog = getCatalog(getCourseMajor(courseId));
      const course = getCourse(courseId, catalog);
      if (course) {
        taken.push(course);
      }
    });
  });
  return taken;
}

async function getAllCatalogs() {
  const CS = await getCatalog("CS");
  const IS = await getCatalog("IS");
  const DS = await getCatalog("DS");
  const ENG = await getCatalog("ENG");
  const THTR = await getCatalog("THTR");
  return { CS, IS, DS, ENG, THTR } as Record<string, Course[]>;
}

function getCourseMajor(courseId: string) {
  return courseId.replace(/\u00A0/g, ' ').split(" ")[0].toUpperCase();
}

function getCourseNumber(courseId: string) {
  return courseId.replace(/\u00A0/g, ' ').split(" ")[1];
}

function isCS(course: SubreqCourse) {
  return course.type == "course" ? course.courseId.startsWith("CS") : course.aboveCourseId.startsWith("CS");
}

function getId(course: SubreqCourse) {
  return course.type == "course" ? course.courseId : course.aboveCourseId;
}