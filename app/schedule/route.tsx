import { optSchedule } from "./optSchedule";
import { Course, Semester, Cycle, Subreq, Requirement } from "../types";

export async function GET(request: Request) {
  const semesters: Semester[] = [
    {
      season: "Spring",
      year: 2025,
      courses: []
    },
    {
      season: "Summer 1",
      year: 2025,
      courses: []
    },
    {
      season: "Spring",
      year: 2026,
      courses: []
    },
    {
      season: "Summer 1",
      year: 2026,
      courses: []
    },
    {
      season: "Spring",
      year: 2027,
      courses: []
    },
    {
      season: "Summer 1",
      year: 2027,
      courses: []
    }
  ];

  const reqs: Requirement[] = [
    {
        "type": "major_requirement",
        "title": "Computer Science Major Requirements",
        "subreqs": [
            {
                "title": "Computer Science Overview",
                "coursesToTake": [],
                "coursesTaken": [
                    "CS 1200",
                    "CS 1210"
                ],
                "numRequired": 0
            },
            {
                "title": "Computer Science Fundamental Requirements",
                "coursesToTake": [],
                "coursesTaken": [
                    "CS 1800",
                    "CS 2500",
                    "CS 2510"
                ],
                "numRequired": 0
            },
            {
                "title": "Computer Science Required Courses",
                "coursesToTake": [
                    {
                        "type": "course",
                        "courseId": "CS 4500",
                        "or": [
                            "CS 4530"
                        ],
                        "and": []
                    }
                ],
                "coursesTaken": [
                    "CS 3000",
                    "CS 3500",
                    "CS 3650",
                    "CS 3800",
                    "CS 2810"
                ],
                "numRequired": 1
            },
            {
                "title": "Security Required Course",
                "coursesToTake": [],
                "coursesTaken": [
                    "CY 2550"
                ],
                "numRequired": 0
            },
            {
                "title": "Presentation Requirement",
                "coursesToTake": [],
                "coursesTaken": [
                    "THTR 1125"
                ],
                "numRequired": 0
            },
            {
                "title": "Khoury Elective Courses",
                "coursesToTake": [
                    {
                        "type": "courseRange",
                        "aboveCourseId": "CS 2500"
                    },
                    {
                        "type": "courseRange",
                        "aboveCourseId": "CY 2000"
                    },
                    {
                        "type": "courseRange",
                        "aboveCourseId": "DS 2500"
                    },
                    {
                        "type": "courseRange",
                        "aboveCourseId": "IS 2000"
                    }
                ],
                "coursesTaken": [
                    "CS 2990"
                ],
                "numRequired": 1
            }
        ]
    },
    {
        "type": "major_requirement",
        "title": "Human-Centered Computing Requirements",
        "subreqs": [
            {
                "title": "Required",
                "coursesToTake": [
                    {
                        "type": "course",
                        "courseId": "IS 4300",
                        "or": [],
                        "and": []
                    }
                ],
                "coursesTaken": [
                    "IS 4800"
                ],
                "numRequired": 1
            },
            {
                "title": "Optional",
                "coursesToTake": [
                    {
                        "type": "course",
                        "courseId": "CS 4120",
                        "or": [],
                        "and": []
                    },
                    {
                        "type": "course",
                        "courseId": "CS 4520",
                        "or": [],
                        "and": []
                    },
                    {
                        "type": "course",
                        "courseId": "CS 4550",
                        "or": [],
                        "and": []
                    },
                    {
                        "type": "course",
                        "courseId": "DS 4200",
                        "or": [],
                        "and": []
                    },
                    {
                        "type": "course",
                        "courseId": "IS 2000",
                        "or": [],
                        "and": []
                    }
                ],
                "coursesTaken": [],
                "numRequired": 2
            }
        ]
    },
    {
        "type": "satisfied_nupath_requirement",
        "nupath": "EI",
        "courseId": "THTR 1125"
    },
    {
        "type": "nupath_requirement",
        "nupath": "IC"
    },
    {
        "type": "satisfied_nupath_requirement",
        "nupath": "FQ",
        "courseId": "MATH 1341"
    },
    {
        "type": "satisfied_nupath_requirement",
        "nupath": "SI",
        "courseId": "PSYC 1101"
    },
    {
        "type": "satisfied_nupath_requirement",
        "nupath": "AD",
        "courseId": "CS 2510"
    },
    {
        "type": "nupath_requirement",
        "nupath": "DD"
    },
    {
        "type": "satisfied_nupath_requirement",
        "nupath": "ER",
        "courseId": "INAM 2000"
    },
    {
        "type": "satisfied_nupath_requirement",
        "nupath": "WF",
        "courseId": "ENGW 1111"
    },
    {
        "type": "nupath_requirement",
        "nupath": "WI"
    },
    {
        "type": "nupath_requirement",
        "nupath": "WD"
    },
    {
        "type": "nupath_requirement",
        "nupath": "EX"
    },
    {
        "type": "nupath_requirement",
        "nupath": "CE"
    }
]
const allSubreqs = reqs.filter(r => r.type == "major_requirement").flatMap(r => r.subreqs);
       
  const schedule = await optSchedule(semesters, allSubreqs);
  
  return new Response(JSON.stringify({schedule}), {
    status: 200
  })
}