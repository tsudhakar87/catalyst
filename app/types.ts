// course representation
// coming from course catalog
export type Course = {
  id: string;
  description: string;
  preReqs: string[];
  coReqs: string[];
  nupath: NUPath[];
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
  courses: SubreqCourse[];
  numRequired: number;
};

export type Requirement = {
  title: string;
  subreqs: Subreq[];
}

export type ParseResult = {
  programCode: string;
  title: string;
  name: string;
  requirements: Requirement[];
}


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

