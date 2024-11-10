import { ChevronRight, CornerDownRight } from "lucide-react";
import { NUPath, ParseResult, SubreqCourse } from "../types";
import { ReactNode } from "react";
import { motion, Variant, Variants } from "framer-motion";

export const NUPathFullNames: Record<NUPath, string> = {
  ND: "Natural and Designed World",
  EI: "Creative Expression/Innovation",
  IC: "Interpreting Culture",
  FQ: "Formal and Quantitative Reasoning",
  SI: "Societies and Institutions",
  AD: "Analyzing/Using Data",
  DD: "Difference and Diversity",
  ER: "Ethical Reasoning",
  WF: "First Year Writing",
  WI: "Writing Intensive",
  WD: "Advanced Writing in the Disciplines",
  EX: "Integration Experience",
  CE: "Capstone Experience",
};

export default function Dash({ parseResults }: { parseResults: ParseResult }) {
  const requirements = parseResults.requirements;
  console.log(requirements);

  const fadeInUpVariants: Variants = {
    initial: { opacity: 0, y: 10, filter: "blur(4px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="flex gap-6 mt-16 w-fit mx-auto min-w-[90%] justify-center px-6">
      <motion.div
        initial="initial"
        animate="animate"
        className="border-4 rounded-lg w-2/5 p-4 flex flex-col gap-2 h-[50vw] overflow-y-auto"
      >
        <motion.h2
          variants={fadeInUpVariants}
          className="text-2xl font-semibold ml-4"
        >
          Completed:
        </motion.h2>
        <motion.div variants={fadeInUpVariants} className="flex flex-col gap-2">
          {requirements
            .filter((requirement) => requirement.type == "major_requirement")
            .map((req, i) => (
              <motion.div
                key={i}
                variants={fadeInUpVariants}
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
                        {subreq.coursesTaken.map((c, i) => (
                          <CourseChip index={i} courseId={c} key={i} />
                        ))}
                      </div>
                    </div>
                  ))}
              </motion.div>
            ))}
        </motion.div>
        <div className="flex flex-col gap-2 ml-4">
          <h3 className="text-lg font-semibold">NUPath</h3>
          {requirements
            .filter(
              (requirement) =>
                requirement.type == "satisfied_nupath_requirement"
            )
            .map((requirement, i) => (
              <div key={i} className="flex flex-col gap-1">
                <h4>
                  <motion.span
                    variants={{
                      initial: { opacity: 0, y: 10, filter: "blur(4px)" },
                      animate: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { delay: i * 0.05 },
                      },
                    }}
                    className="p-1 border border-zinc-600 text-zinc-400 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-sm text-sm font-mono mr-2"
                  >
                    [{requirement.nupath}]
                  </motion.span>
                  <span className="font-semibold text-zinc-300">
                    {NUPathFullNames[requirement.nupath]}
                  </span>
                </h4>
                <div className="ml-4 flex items-center gap-1">
                  <CornerDownRight className="size-5 text-zinc-600" />
                  <CourseChip index={i} courseId={requirement.courseId} />
                </div>
              </div>
            ))}
        </div>
      </motion.div>
      <motion.div
        initial="initial"
        animate="animate"
        className="border-4 w-2/5 p-4 flex flex-col gap-2 h-[50vw] overflow-y-auto"
      >
        <motion.h2
          variants={fadeInUpVariants}
          className="text-2xl font-semibold ml-4"
        >
          Requirements not yet fulfilled:
        </motion.h2>
        <motion.div variants={fadeInUpVariants} className="flex flex-col gap-2">
          {requirements
            .filter((requirement) => requirement.type == "major_requirement")
            .map((req, i) => (
              <motion.div
                key={i}
                variants={fadeInUpVariants}
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
                      <motion.div className="flex flex-row flex-wrap gap-1">
                        {subreq.coursesToTake.map((c, i) => (
                          <SubreqCourseChip index={i} course={c} key={i} />
                        ))}
                      </motion.div>
                    </div>
                  ))}
              </motion.div>
            ))}
        </motion.div>
        <div className="flex flex-col gap-2 ml-4">
          <h3 className="text-lg font-semibold">NUPath</h3>
          {requirements
            .filter((requirement) => requirement.type == "nupath_requirement")
            .map((requirement, i) => (
              <div key={i}>
                <h4 className="">
                  <motion.span
                    variants={{
                      initial: { opacity: 0, y: 10, filter: "blur(4px)" },
                      animate: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { delay: i * 0.05 },
                      },
                    }}
                    className="p-1 border border-zinc-600 text-zinc-400 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-sm text-sm font-mono mr-2"
                  >
                    [{requirement.nupath}]
                  </motion.span>
                  <motion.span className="font-semibold text-zinc-300">
                    {NUPathFullNames[requirement.nupath]}
                  </motion.span>
                </h4>
              </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
}

export function SubreqCourseChip({
  course,
  courseChip,
  courseRangeChip,
  index,
}: {
  course: SubreqCourse;
  courseChip?: (courseId: string) => ReactNode;
  courseRangeChip?: (courseId: string) => ReactNode;
  index: number;
}) {
  return (
    <motion.div className="w-fit">
      {course.type == "course" ? (
        <div
          key="course-chip"
          className="flex items-center bg-zinc-900 border-t border-t-zinc-600 border-b border-b-zinc-600 rounded-md"
        >
          {courseChip ? (
            courseChip(course.courseId)
          ) : (
            <CourseChip index={index} courseId={course.courseId} />
          )}
          {course.or.map((c, i) => (
            <div key={i} className="flex items-center">
              <span className="text-xs font-semibold text-zinc-500 mx-1.5">
                OR
              </span>
              {courseChip ? (
                courseChip(c)
              ) : (
                <CourseChip index={i + index} courseId={c} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          {courseRangeChip ? (
            courseRangeChip(course.aboveCourseId)
          ) : (
            <div
              key="course-range-chip"
              className="px-2 py-0.5 w-fit rounded-md bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-600"
            >
              <p className="text-zinc-500 font-mono font-semibold uppercase text-sm inline">
                {course.aboveCourseId.split(" ")[0]}
              </p>
              <ChevronRight className="size-[18px] inline-block text-zinc-300 align-text-bottom" />
              <p className="text-zinc-300 font-semibold inline">
                {course.aboveCourseId.split(" ")[1]}
              </p>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

export function CourseChip({
  index,
  courseId,
}: {
  index: number;
  courseId: string;
}) {
  return (
    <motion.div
      className="px-2 py-0.5 w-fit rounded-md bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-600 z-10"
      key={index}
      variants={{
        initial: { opacity: 0, y: 10, filter: "blur(4px)" },
        animate: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { delay: index * 0.05 },
        },
      }}
    >
      <p className="text-zinc-500 font-mono font-semibold uppercase text-sm inline mr-1">
        {courseId.split(" ")[0]}
      </p>
      <p className="text-zinc-300 font-semibold inline">
        {courseId.split(" ")[1]}
      </p>
    </motion.div>
  );
}
