import { useMemo, useState } from "react";
import { ParseResult, Semester as SemesterType } from "../types";
import { CourseChip, NUPathFullNames, SubreqCourseChip } from "./dash";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function Schedule({
  parseResults,
}: {
  parseResults: ParseResult;
}) {
  const requirements = parseResults.requirements;
  const [numSemestersTaken, setNumSemestersTaken] = useState<number>(0);
  const [inputNumSemestersTaken, setInputNumSemestersTaken] =
    useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = useState<string>("");
  const [years, setYears] = useState<SemesterType[][]>(
    Array(4)
      .fill([])
      .map((_, i) => [
        { season: "Fall", courses: [], year: i + 1 },
        { season: "Spring", courses: [], year: i + 1 },
        { season: "Summer 1", courses: [], year: i + 1 },
        { season: "Summer 2", courses: [], year: i + 1 },
      ])
  );

  // add the course to the new semester, and remove it anywhere else
  const moveCourse = (courseId: string, newSemester: SemesterType) => {
    setYears(
      years.map((semesters) =>
        semesters.map((semester) => {
          if (
            semester.season === newSemester.season &&
            semester.year === newSemester.year
          ) {
            // Add course to target semester if not already there
            return semester.courses.includes(courseId)
              ? semester
              : { ...semester, courses: [...semester.courses, courseId] };
          } else {
            // Remove course from all other semesters
            return {
              ...semester,
              courses: semester.courses.filter((c) => c !== courseId),
            };
          }
        })
      )
    );
  };

  const moveNUPath = (nupath: string, newSemester: SemesterType) => {
    setYears(
      years.map((semesters) =>
        semesters.map((semester) => {
          if (
            semester.season === newSemester.season &&
            semester.year === newSemester.year
          ) {
            return { ...semester, courses: [...semester.courses, nupath] };
          }
          // remove nupath from all other semesters
          return {
            ...semester,
            courses: semester.courses.filter((c) => c !== nupath),
          };
        })
      )
    );
  };

  // remove all courses within the requirements that are already included in any of the years, but dont change the format of requirements
  const coursesToTake = useMemo(() => {
    return requirements.map((requirement) => {
      if (requirement.type == "major_requirement") {
        return {
          ...requirement,
          subreqs: requirement.subreqs.filter(
            (s) =>
              s.numRequired > 0 &&
              !s.coursesToTake.some((c) =>
                years
                  .flat()
                  .some((semester) =>
                    c.type == "course"
                      ? semester.courses.includes(c.courseId) ||
                        c.or.some((c) => semester.courses.includes(c))
                      : semester.courses.includes(c.aboveCourseId)
                  )
              )
          ),
        };
      }
      return requirement;
    });
  }, [requirements, years]);

  return (
    <div className="w-full h-full flex flex-row py-12 px-8 gap-4">
      <div className="w-1/4 bg-zinc-900 rounded-lg border border-zinc-800 overflow-y-auto max-h-[80vh] pb-8">
        <div className="flex flex-col gap-2">
          {coursesToTake
            .filter((requirement) => requirement.type == "major_requirement")
            .map((req, i) => (
              <div
                key={i}
                className="bg-zinc-900 rounded-3xl p-4 flex flex-col gap-2"
              >
                <h3 className="font-semibold text-lg">{req.title}</h3>
                {req.subreqs
                  .filter((s) => s.numRequired > 0)
                  .map((subreq, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <h4 className="font-semibold text-zinc-400">
                        {subreq.title}
                      </h4>
                      <div className="flex flex-row flex-wrap gap-1">
                        {subreq.coursesToTake.map((c, i) => (
                          <SubreqCourseChip
                            course={c}
                            key={i}
                            courseChip={(courseId) => (
                              <DraggableCourseChip
                                courseId={courseId}
                                setCurrentCourse={setCurrentCourse}
                              />
                            )}
                            courseRangeChip={(courseId) => (
                              <DraggableCourseRangeChip
                                courseId={courseId}
                                setCurrentCourse={setCurrentCourse}
                              />
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          <div className="flex flex-col gap-2 ml-4">
            <h3 className="text-lg font-semibold">NUPath</h3>
            {requirements
              .filter((requirement) => requirement.type == "nupath_requirement")
              .map((requirement, i) => (
                <div key={i}>
                  <h4 className="">
                    <DraggableNUPathChip
                      nupath={requirement.nupath}
                      setCurrentCourse={setCurrentCourse}
                    />
                    <span className="font-semibold text-zinc-300">
                      {NUPathFullNames[requirement.nupath]}
                    </span>
                  </h4>
                </div>
              ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {!inputNumSemestersTaken ? (
          <div className="w-3/4 flex justify-center items-center">
            <motion.div
              layoutId="schedule-layout"
              className="flex flex-col gap-2 ml-4 bg-zinc-900 p-8 rounded-xl h-fit"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
            >
              <h3 className="text-lg font-semibold">
                Number of Semesters Taken
              </h3>
              <Input
                type="number"
                value={numSemestersTaken}
                onChange={(e) =>
                  setNumSemestersTaken(
                    Math.max(parseInt(e.target.value), 0) || 0
                  )
                }
              />
              <div className="w-full justify-end flex mt-8">
                <button
                  onClick={() => {
                    setInputNumSemestersTaken(true);
                    // remove the first numSemestersTaken (fall and spring) semesters from the beginning of the years
                    let removed = 0;
                    const newYears = [...years];
                    while (removed < numSemestersTaken) {
                      // Remove first semester from first year that still has semesters
                      for (let i = 0; i < newYears.length; i++) {
                        if (newYears[i].length > 0) {
                          if (
                            newYears[i][0].season == "Fall" ||
                            newYears[i][0].season == "Spring"
                          )
                            removed++;
                          newYears[i] = newYears[i].slice(1);
                          break;
                        }
                      }
                      // If we couldn't find any years with semesters left, break
                      if (removed < numSemestersTaken) {
                        const hasRemainingSemesters = newYears.some(
                          (year) => year.length > 0
                        );
                        if (!hasRemainingSemesters) break;
                      }
                    }
                    // remove any years with no semesters left
                    setYears(newYears.filter((year) => year.length > 0));
                  }}
                  className="rounded-md px-4 py-1 bg-zinc-100 text-zinc-800 font-semibold transition-colors"
                >
                  Generate
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            layoutId="schedule-layout"
            className="w-3/4 bg-zinc-900 rounded-lg gap-8 border border-zinc-800 overflow-y-auto max-h-[80vh] p-8 flex flex-row overflow-x-auto"
          >
            {years.map((semesters, i) => (
              <Year
                key={i}
                semesters={semesters}
                year={i + 1}
                moveCourse={moveCourse}
                currentCourse={currentCourse}
                setCurrentCourse={setCurrentCourse}
                moveNUPath={moveNUPath}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const DraggableCourseChip = ({
  courseId,
  setCurrentCourse,
}: {
  courseId: string;
  setCurrentCourse: (courseId: string) => void;
}) => {
  return (
    <motion.div
      draggable
      className="cursor-grab w-fit"
      whileDrag={{ scale: 1.1 }}
      onDragStart={(e) => {
        setCurrentCourse(courseId);
      }}
      onDragEnd={() => {
        setCurrentCourse("");
      }}
    >
      <CourseChip courseId={courseId} />
    </motion.div>
  );
};

const DraggableCourseRangeChip = ({
  courseId,
  setCurrentCourse,
}: {
  courseId: string;
  setCurrentCourse: (courseId: string) => void;
}) => {
  return (
    <motion.div
      draggable
      className="cursor-grab"
      whileDrag={{ scale: 1.1 }}
      onDragStart={(e) => {
        setCurrentCourse(courseId);
      }}
      onDragEnd={() => {
        setCurrentCourse("");
      }}
    >
      <div
        key="course-chip"
        className="px-2 py-0.5 rounded-md bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-600 w-fit"
      >
        <p className="text-zinc-500 font-mono font-semibold uppercase text-sm inline">
          {courseId.split(" ")[0]}
        </p>
        <ChevronRight className="size-[18px] inline-block text-zinc-300 align-text-bottom" />
        <p className="text-zinc-300 font-semibold inline">
          {courseId.split(" ")[1]}
        </p>
      </div>
    </motion.div>
  );
};

const DraggableNUPathChip = ({
  nupath,
  setCurrentCourse,
}: {
  nupath: string;
  setCurrentCourse: (nupath: string) => void;
}) => {
  return (
    <motion.div
      draggable
      className="cursor-grab w-fit"
      whileDrag={{ scale: 1.1 }}
      onDragStart={(e) => {
        setCurrentCourse(nupath);
      }}
      onDragEnd={() => {
        setCurrentCourse("");
      }}
    >
      <div
        key="nupath-chip"
        className="px-1 py-0.5 rounded-md bg-gradient-to-b font-mono text-sm text-zinc-400 from-zinc-800 to-zinc-900 border border-zinc-600 w-fit"
      >
        [{nupath}]
      </div>
    </motion.div>
  );
};

const Year = ({
  semesters,
  year,
  moveCourse,
  moveNUPath,
  currentCourse,
  setCurrentCourse,
}: {
  semesters: SemesterType[];
  year: number;
  moveCourse: (courseId: string, newSemester: SemesterType) => void;
  moveNUPath: (nupath: string, newSemester: SemesterType) => void;
  currentCourse: string;
  setCurrentCourse: (courseId: string) => void;
}) => {
  return (
    <motion.div
      initial={{
        y: 8,
        opacity: 0,
        filter: "blur(8px)",
      }}
      animate={{
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          delay: year * 0.1,
        },
      }}
      className="flex flex-col gap-2 w-[24rem] shrink-0 p-4 bg-black/60 rounded-3xl"
    >
      <h2 className="text-2xl font-semibold text-zinc-300">Year {year}</h2>
      {semesters.map((s, i) => (
        <Semester
          key={i}
          semester={s}
          setCurrentCourse={setCurrentCourse}
          moveCourse={moveCourse}
          moveNUPath={moveNUPath}
          currentCourse={currentCourse}
        />
      ))}
    </motion.div>
  );
};

const Semester = ({
  semester,
  moveCourse,
  setCurrentCourse,
  currentCourse,
  moveNUPath,
}: {
  semester: SemesterType;
  moveCourse: (courseId: string, newSemester: SemesterType) => void;
  setCurrentCourse: (courseId: string) => void;
  currentCourse: string;
  moveNUPath: (nupath: string, newSemester: SemesterType) => void;
}) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  return (
    <div
      className={`flex flex-col gap-2 p-2 min-h-24 rounded-lg transition-colors ${
        isDraggingOver ? "bg-zinc-800/50" : ""
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={() => {
        setIsDraggingOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDraggingOver(false);
        if (currentCourse.length > 2) {
          moveCourse(currentCourse, semester);
        } else {
          moveNUPath(currentCourse, semester);
        }
      }}
    >
      <h3>{semester.season}</h3>
      <div className="w-fit">
        {semester.courses.map((c, i) => (
          <>
            {c.length > 2 ? (
              <DraggableCourseChip
                courseId={c}
                setCurrentCourse={setCurrentCourse}
                key={i}
              />
            ) : (
              <DraggableNUPathChip
                nupath={c}
                setCurrentCourse={setCurrentCourse}
                key={i}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};
