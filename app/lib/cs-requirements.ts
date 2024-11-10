import { Subreq } from "../types";

export const CSRequirements: Subreq[] = [
  {
    title: "Computer Science Overview",
    coursesToTake: [
      {
        type: "course",
        courseId: "CS 1200",
        or: [],
        and: [],
      },
      {
        type: "course",
        courseId: "CS 1210",
        or: [],
        and: [],
      }
    ],
    coursesTaken: [],
    numRequired: 2,
  },
  {
    title: "Computer Science Fundamental Requirements",
    coursesToTake: [
      {
        type: "course",
        courseId: "CS 1800",
        or: [],
        and: ["CS 1802"]
      },
      {
        type: "course",
        courseId: "CS 2500",
        or: [],
        and: ["CS 2501"]
      },
      {
        type: "course",
        courseId: "CS 2510",
        or: [],
        and: ["CS 2511"]
      },
    ],
    coursesTaken: [],
    numRequired: 3,
  },
  {
    title: "Computer Science Required Courses",
    coursesToTake: [
      {
        type: "course",
        courseId: "CS 3000",
        or: [],
        and: []
      },
      {
        type: "course",
        courseId: "CS 3500",
        or: [],
        and: ["CS 3501"]
      },
      {
        type: "course",
        courseId: "CS 3650",
        or: [],
        and: []
      },
      {
        type: "course",
        courseId: "CS 3800",
        or: [],
        and: []
      },
      {
        type: "course",
        courseId: "CS 4500",
        or: ["CS 4530"],
        and: []
      },
      {
        type: "course",
        courseId: "DS 3000",
        or: ["CS 2810"],
        and: []
      }
    ],
    coursesTaken: [],
    numRequired: 6,
  },
  {
    title: "Security Required Course",
    coursesToTake: [
      {
        type: "course",
        courseId: "CY 2550",
        or: [],
        and: []
      }
    ],
    coursesTaken: [],
    numRequired: 1
  },
  {
    title: "Presentation Requirement",
    coursesToTake: [
      {
        type: "course",
        courseId: "COMM 1112",
        or: [],
        and: []
      },
      { type: "course", courseId: "COMM 1113", or: [], and: [] },
      { type: "course", courseId: "COMM 1210", or: [], and: [] },
      { type: "course", courseId: "COMM 1511", or: [], and: [] },
      { type: "course", courseId: "THTR 1125", or: [], and: [] },
      { type: "course", courseId: "THTR 1130", or: [], and: [] },
      { type: "course", courseId: "THTR 1180", or: [], and: [] },
      { type: "course", courseId: "THTR 2345", or: [], and: [] }
    ],
    coursesTaken: [],
    numRequired: 1
  },
  {
    title: "Khoury Elective Courses",
    coursesToTake: [
      {
        type: "courseRange",
        aboveCourseId: "CS 2500"
      },
      {
        type: "courseRange",
        aboveCourseId: "CY 2000"
      },
      {
        type: "courseRange",
        aboveCourseId: "DS 2500"
      },
      {
        type: "courseRange",
        aboveCourseId: "IS 2000"
      }
    ],
    coursesTaken: [],
    numRequired: 2,
  }
]

export const HUCCRequiremenets: Subreq[] = [
  {
    title: "Required",
    coursesToTake: [
      {
        type: "course",
        courseId: "IS 4300",
        or: [],
        and: []
      },
      {
        type: "course",
        courseId: "IS 4800",
        or: [],
        and: []
      }
    ],
    coursesTaken: [],
    numRequired: 2,
  },
  {
    title: "Optional",
    coursesToTake: [
      {
        type: "course",
        courseId: "CS 4120",
        or: [],
        and: []
      },
      {
        type: "course",
        courseId: "CS 4520",
        or: [],
        and: []
      },
      {
        type: "course",
        courseId: "CS 4550",
        or: [],
        and: []
      },
      {
        type: "course",
        courseId: "DS 4200",
        or: [],
        and: []
      },
      {
        type: "course",
        courseId: "IS 2000",
        or: [],
        and: [],
      }
    ],
    coursesTaken: [],
    numRequired: 2,
  }
]