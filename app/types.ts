// course representation
// coming from course catalog
export type Course = {
  id: string;
  description: string;
  preReqs: string[];
  coReqs: string[];
  nupath: NUPath[];
  hours: number;
};

// coming from program requirements
export type SubreqCourse =
  | {
    type: "course";
    courseId: string;
    or: string[];
    and: string[];
  }
  | {
    type: "courseRange";
    aboveCourseId: string;
  };

// subreq representation
// coming from program requirements
export type Subreq = {
  title: string;
  coursesToTake: SubreqCourse[];
  coursesTaken: string[];
  numRequired: number;
};

export type Requirement = {
  type: "major_requirement"
  title: string;
  subreqs: Subreq[];
} | NUPathRequirement | { // a satisfied nupath requirement with the path that requires it
  type: "satisfied_nupath_requirement"
  nupath: NUPath;
  courseId: string;
}

export type NUPathRequirement = {
  type: "nupath_requirement";
  nupath: NUPath;
}

export type ParseResult = {
  programCode: string;
  title: string;
  name: string;
  requirements: Requirement[];
}

export type Semester = {
  season: "Spring" | "Fall" | "Summer 1" | "Summer 2",
  year: number
  courses: string[];
}

export type Cycle = "Spring" | "Fall";

export const NUPaths = ["ND", "EI", "IC", "FQ", "SI", "AD", "DD", "ER", "WF", "WD", "WI", "EX", "CE"];
export type NUPath = "ND" | "EI" | "IC" | "FQ" | "SI" | "AD" | "DD" | "ER" | "WF" |
  "WD" | "WI" | "EX" | "CE";

export function convertToNUPath(nupath: string) {
  if (nupath == 'NUpath Natural/Designed World') {
    return "ND";
  }
  else if (nupath == 'NUpath Creative Express/Innov') {
    return "EI";
  }
  else if (nupath == 'NUpath Interpreting Culture') {
    return "IC";
  }
  else if (nupath == 'NUpath Formal/Quant Reasoning') {
    return "FQ";
  }
  else if (nupath == 'NUpath Societies/Institutions') {
    return "SI";
  }
  else if (nupath == 'NUpath Analyzing/Using Data') {
    return "AD";
  }
  else if (nupath == 'NUpath Difference/Diversity') {
    return "DD";
  }
  else if (nupath == 'NUpath Ethical Reasoning') {
    return "ER";
  }
  else if (nupath == 'NUpath Writing Intensive') {
    return "WI";
  }
  else if (nupath == 'NUpath Integration Experience') {
    return "EX";
  }
  else {
    return "CE";
  }
}

