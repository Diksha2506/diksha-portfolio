import { useState, useRef, useEffect, useMemo } from "react";
import { BookOpen, ExternalLink, Brain, Globe, Eye, Cpu, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { projectCategories, projects, type Project } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

const categoryIcon: Record<Project["category"], React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  "AI/ML": Brain,
  "Blockchain & AI": ShieldCheck,
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
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  const total = filtered.length;

  // Viewport intersection observer to run autoplay only when in view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Internal buffer: clone items 3 times [Set 0] [Set 1 (Center)] [Set 2]
  const displayItems = useMemo(() => {
    if (total <= 1) return filtered;
    return [...filtered, ...filtered, ...filtered];
  }, [filtered, total]);

  // Track position index in the tripled array, starting at the beginning of middle set
  const [offsetIndex, setOffsetIndex] = useState(total);
  const [withTransition, setWithTransition] = useState(true);

  // Sync starting index when filter or total changes
  useEffect(() => {
    setWithTransition(false);
    setOffsetIndex(total);
  }, [filter, total]);

  // Step function that advances continuously forward or backward
  const step = (direction: "next" | "prev") => {
    if (total <= 1) return;
    setWithTransition(true);
    setOffsetIndex((prev) => (direction === "next" ? prev + 1 : prev - 1));
  };

  // When transition ends, check if we entered Set 2 or Set 0 and instantaneously re-center to Set 1 without animation
  const handleTransitionEnd = () => {
    if (total <= 1) return;

    // If we've reached the end of the middle set (into Set 2), teleport back to Set 1 invisibly
    if (offsetIndex >= total * 2) {
      setWithTransition(false);
      setOffsetIndex((prev) => prev - total);
    } else if (offsetIndex < total) {
      // If stepped backward into Set 0, teleport forward to Set 1 invisibly
      setWithTransition(false);
      setOffsetIndex((prev) => prev + total);
    }
  };

  // Manual arrow navigation: moves one card, pauses autoplay, resumes after 3 seconds
  const handleManualNav = (direction: "next" | "prev") => {
    setIsPaused(true);
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);

    step(direction);
  };

  // Autoplay timer: advances one project card every 3 seconds continuously in one direction
  useEffect(() => {
    if (!isInView || isPaused || total <= 1) return;

    const timer = setInterval(() => {
      setWithTransition(true);
      setOffsetIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [isInView, isPaused, total]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-secondary/50 py-20"
      aria-label="All projects"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Centered Heading */}
        <SectionHeading
          title="All Projects"
          subtitle="Explore all my projects, or filter by domain."
        />

        {/* Filter Categories */}
        <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist">
          {projectCategories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              onClick={() => {
                setFilter(c);
              }}
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

        {/* Compact Carousel with Previous / Next Arrows on Either Side */}
        <div className="relative flex items-center gap-2 sm:gap-4">
          {/* Previous Button on Left */}
          <button
            type="button"
            onClick={() => handleManualNav("prev")}
            aria-label="Previous project"
            className="flex-shrink-0 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full border bg-card text-foreground shadow-md transition-all hover:scale-105 hover:border-primary hover:bg-secondary cursor-pointer active:scale-95 z-10"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Carousel Viewport (Showing 3 cards on desktop, 2 on tablet, 1 on mobile) */}
          <div className="relative min-w-0 flex-1 overflow-hidden py-4">
            <div
              onTransitionEnd={handleTransitionEnd}
              className={`flex gap-6 ${withTransition ? "transition-transform duration-500 ease-out" : ""}`}
              style={{
                transform: `translateX(calc(-${offsetIndex} * (100% + 24px) / 3))`,
              }}
            >
              {displayItems.map((p, idx) => (
                <article
                  key={`${p.title}-${idx}`}
                  className="group flex flex-col flex-shrink-0 overflow-hidden rounded-2xl border bg-card card-shadow transition-all duration-300 hover:-translate-y-1 hover:card-shadow-hover w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)]"
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
            </div>
          </div>

          {/* Next Button on Right */}
          <button
            type="button"
            onClick={() => handleManualNav("next")}
            aria-label="Next project"
            className="flex-shrink-0 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full border bg-card text-foreground shadow-md transition-all hover:scale-105 hover:border-primary hover:bg-secondary cursor-pointer active:scale-95 z-10"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
