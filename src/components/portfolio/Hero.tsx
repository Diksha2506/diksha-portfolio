import { motion } from "motion/react";
import { ArrowRight, Download, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { links, profile } from "@/data/portfolio";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-16"
      aria-label="Introduction"
    >
      <div className="hero-blob pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full" />
      <div className="hero-blob pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:py-28">
        {/* Photo */}
        <motion.div {...fade(0)} className="mx-auto">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-primary/30 via-secondary to-lavender" />
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="relative h-72 w-64 rounded-[2.5rem] border-8 border-card object-cover card-shadow sm:h-96 sm:w-80"
              />
            ) : (
              <div
                className="relative grid h-72 w-64 place-items-center rounded-[2.5rem] border-8 border-card bg-gradient-to-br from-primary to-deep card-shadow sm:h-96 sm:w-80"
                role="img"
                aria-label="Profile photo placeholder"
              >
                <span className="text-6xl font-extrabold text-primary-foreground">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Copy */}
        <div className="text-center lg:text-left">
          <motion.p
            {...fade(0.1)}
            className="mb-3 inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-deep"
          >
            {profile.greeting}
          </motion.p>
          <motion.h1
            {...fade(0.2)}
            className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>
          <motion.p
            {...fade(0.25)}
            className="mt-4 text-2xl font-bold sm:text-3xl"
          >
            <span className="text-gradient">{profile.headline}</span>
          </motion.p>
          <motion.p
            {...fade(0.35)}
            className="mt-1 text-sm font-semibold uppercase tracking-widest text-primary"
          >
            {profile.subtitle}
          </motion.p>
          <motion.p
            {...fade(0.4)}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground lg:mx-0"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            {...fade(0.5)}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-deep"
            >
              Explore My Projects
              <ArrowRight className="h-4 w-4" />
            </a>
            {links.resumeUrl && (
              <a
                href={links.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card px-6 py-3 text-sm font-semibold text-deep transition-all hover:bg-secondary"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            )}
          </motion.div>

          <motion.div
            {...fade(0.6)}
            className="mt-6 flex items-center justify-center gap-3 lg:justify-start"
          >
            {[
              { href: links.github, icon: GithubIcon, label: "GitHub" },
              { href: links.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
              { href: links.leetcode, icon: Code2, label: "LeetCode" },
            ]
              .filter((s) => s.href)
              .map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border bg-card text-muted-foreground transition-all hover:border-primary hover:text-primary"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
