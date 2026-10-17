import { Brain, Code2, Database, Globe, Wrench } from "lucide-react";
import { skillCategories } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

const icons = [Code2, Brain, Globe, Database, Wrench];

export function Skills() {
  return (
    <section id="skills" className="py-20" aria-label="Skills">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="My Technical Toolkit"
          subtitle="Technologies and tools I use to learn, experiment and build."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const Icon = icons[i % icons.length] ?? Code2;
            return (
              <Reveal key={cat.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border bg-card p-6 card-shadow transition-all duration-300 hover:-translate-y-1 hover:card-shadow-hover">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`grid h-11 w-11 place-items-center rounded-xl ${i % 2 ? "bg-lavender text-lavender-foreground" : "bg-secondary text-deep"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <span key={s} className="rounded-full border bg-background px-3 py-1 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
