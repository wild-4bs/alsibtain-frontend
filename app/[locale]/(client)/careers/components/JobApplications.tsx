import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

const jobCategories = [
  {
    id: 1,
    title: "ENGINEERING & PLANNING",
    openings: null,
  },
  {
    id: 2,
    title: "PROJECT MANAGEMENT",
    openings: 20,
  },
  {
    id: 3,
    title: "REAL ESTATE & SALES",
    openings: null,
  },
  {
    id: 4,
    title: "ADMINISTRATION & OPERATIONS",
    openings: null,
  },
  {
    id: 5,
    title: "FINANCE & INVESTMENT",
    openings: null,
  },
];

const jobs = [
  {
    id: 1,
    title: "Wordpress Developer",
    experience: "2 Years",
    deadline: "2025-11-11",
  },
  {
    id: 2,
    title: "Javascript",
    experience: "1 Years",
    deadline: "2025-11-11",
  },
  {
    id: 3,
    title: "Apps Developer",
    experience: "3 Years",
    deadline: "2025-11-11",
  },
  {
    id: 4,
    title: "IOS Developer",
    experience: "2 Years",
    deadline: "2025-11-11",
  },
  {
    id: 5,
    title: "Node JS Developer",
    experience: "3 Years",
    deadline: "2025-11-11",
  },
];

export const JobApplications = () => {
  return (
    <section className="mt-22">
      <Container>
        <header className="text-center">
          <h2 className="mb-2 text-lg font-medium">Come join us</h2>
          <h3 className="mb-5 font-bold text-4xl">Career Openings</h3>
          <p className="mb-11 text-sm">
            We’re always looking for creative, talented self-starters to join
            the Al-sabtain family. <br /> Check out our open roles below and
            fill out an application.
          </p>
        </header>
        <div className="flex gap-12 max-xl:flex-col">
          <ul>
            {jobCategories.map((category, i) => (
              <li key={i}>
                <button
                  className={clsx(
                    "py-1.5 text-lg hover:text-white/70 duration-200 cursor-pointer font-medium",
                    {
                      "text-primary hover:text-primary!":
                        category.openings == 20,
                    }
                  )}
                >
                  {category.title}{" "}
                  {category.openings && <>({category.openings})</>}
                </button>
              </li>
            ))}
          </ul>
          <ul className="w-full flex-1 flex flex-col gap-5">
            {jobs.map((job, i) => (
              <div
                key={i}
                className="py-6 bg-white px-8 flex rounded-sm items-center text-black hover:bg-white/95 duration-300 hover:[&>button]:text-black"
              >
                <div className="flex items-center w-full max-md:flex-col max-md:items-start gap-2">
                  <h3 className="font-medium text-xl md:w-[40%]">
                    {job.title}
                  </h3>
                  <dl className="flex items-center md:gap-28 max-md:gap-10">
                    <div className="flex flex-col gap-1">
                      <dt className="font-medium text-base text-subtitle-color">
                        Experience
                      </dt>
                      <dd className="font-medium text-lg">{job.experience}</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="font-medium text-base text-subtitle-color">
                        Deadline
                      </dt>
                      <dd className="font-medium text-lg">{job.deadline}</dd>
                    </div>
                  </dl>
                </div>
                <Link href={`/careers/${job.id}`}>
                  <Button
                    variant={"ghost"}
                    className="text-subtitle-color duration-300 hover:bg-black/20"
                  >
                    <ArrowRight className="size-5" />
                  </Button>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};
