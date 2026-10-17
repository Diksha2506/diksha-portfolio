import { useState, useRef, useEffect } from "react";
import { BookOpen, ExternalLink, Brain, Globe, Eye, Cpu, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { GithubIcon } from "./BrandIcons";
import { projectCategories, projects, type Project } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

const categoryIcon = {
  "AI/ML": Brain,
  "Web Development": Globe,
  "Computer Vision": Eye,
  Systems: Cpu,
};

function Cover({ project, large }: { project: Project; large?: boolean }) {
  const Icon = categoryIcon[project.category];
  return (
    <div className={`overflow-hidden ${large ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-gradient-to-br from-secondary via-card to-lavender transition-transform duration-500 group-hover:scale-105">
          <Icon className="h-12 w-12 text-primary/60" strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const items = [
    { href: project.githubUrl, label: "GitHub", icon: GithubIcon },
    { href: project.liveUrl, label: "Live Demo", icon: ExternalLink },
    { href: project.caseStudyUrl, label: "Case Study", icon: BookOpen },
  ].filter((i) => i.href);
  if (!items.length)
    return <p className="text-xs italic text-muted-foreground">Links coming soon</p>;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <a
          key={i.label}
          href={i.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold text-deep transition-colors hover:border-primary hover:bg-secondary"
        >
          <i.icon className="h-3.5 w-3.5" /> {i.label}
        </a>
      ))}
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
          {t}
        </span>
      ))}
    </div>
  );
}

export function FeaturedWork() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  return (
    <section id="featured" className="py-20" aria-label="Featured work">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="Featured Work"
          subtitle="A selection of projects where I turn ideas into working solutions."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-card card-shadow transition-all duration-300 hover:-translate-y-1 hover:card-shadow-hover">
                <Cover project={p} large />
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.category}</span>
                  <h3 className="text-lg font-bold leading-snug">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  <Tags tags={p.technologies} />
                  <div className="mt-auto pt-2">
                    <ProjectLinks project={p} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AllProjects() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  // Measure exact horizontal overflow distance so motion moves cards seamlessly
  useEffect(() => {
    const calculateDistance = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Padding offset buffer
        const overflow = Math.max(0, trackWidth - viewportWidth + 64);
        setMaxScroll(overflow);
      }
    };

    calculateDistance();
    window.addEventListener("resize", calculateDistance);
    return () => window.removeEventListener("resize", calculateDistance);
  }, [shown, filter]);

  // Hook scroll progression while targetRef is in viewport
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 140,
    mass: 0.1,
  });

  const x = useTransform(smoothProgress, [0, 1], ["0px", `-${maxScroll}px`]);

  // Manual button scroll helper to nudge the page through the pinned section
  const nudgeScroll = (direction: "left" | "right") => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const totalScrollableHeight = targetRef.current.offsetHeight - window.innerHeight;
      const step = totalScrollableHeight / Math.max(1, shown.length - 1);
      window.scrollBy({
        top: direction === "right" ? step : -step,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="projects"
      ref={targetRef}
      className="relative bg-secondary/50"
      style={{
        // Height controls the vertical scroll distance during which the horizontal animation runs
        height: `${Math.max(200, shown.length * 50 + 100)}vh`,
      }}
      aria-label="All projects"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden py-10 sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                All Projects
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Scroll vertically to explore my work horizontally.
              </p>
            </div>

            {/* Desktop Navigation Helper Arrows */}
            <div className="hidden items-center gap-2 sm:flex">
              <button
                onClick={() => nudgeScroll("left")}
                aria-label="Scroll projects backward"
                className="grid h-10 w-10 place-items-center rounded-full border bg-card text-foreground shadow-sm transition-all hover:border-primary hover:bg-secondary cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => nudgeScroll("right")}
                aria-label="Scroll projects forward"
                className="grid h-10 w-10 place-items-center rounded-full border bg-card text-foreground shadow-sm transition-all hover:border-primary hover:bg-secondary cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Filter Categories */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start" role="tablist">
            {projectCategories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  filter === c
                    ? "bg-primary text-primary-foreground card-shadow"
                    : "border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Moving Rail */}
        <div className="relative my-auto w-full overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 px-6 sm:px-12 w-max"
          >
            {shown.map((p) => (
              <article
                key={p.title}
                className="group flex w-[82vw] max-w-[340px] flex-shrink-0 flex-col overflow-hidden rounded-2xl border bg-card card-shadow transition-all duration-300 hover:-translate-y-1 hover:card-shadow-hover sm:w-[350px] lg:w-[380px]"
              >
                <Cover project={p} />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {p.category}
                  </span>
                  <h3 className="font-bold leading-snug line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>
                  <Tags tags={p.technologies} />
                  <div className="mt-auto pt-2">
                    <ProjectLinks project={p} />
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        {/* Bottom Progress Bar & Mobile indicator */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">
              Scroll down ↓ to view more
            </span>
            <div className="flex sm:hidden gap-2">
              <button
                onClick={() => nudgeScroll("left")}
                aria-label="Scroll left"
                className="grid h-8 w-8 place-items-center rounded-full border bg-card text-foreground shadow-sm hover:bg-secondary cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => nudgeScroll("right")}
                aria-label="Scroll right"
                className="grid h-8 w-8 place-items-center rounded-full border bg-card text-foreground shadow-sm hover:bg-secondary cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          {/* Subtle scroll progress line */}
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border/60">
            <motion.div
              style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
              className="h-full bg-primary"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
