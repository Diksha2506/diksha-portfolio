import { useState } from "react";
import { Award, Briefcase, ExternalLink, GraduationCap, Sparkles, X } from "lucide-react";
import { certifications, education, experience } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

function EmptyState({ icon: Icon, text }: { icon: typeof Sparkles; text: string }) {
  return (
    <Reveal className="mx-auto max-w-md rounded-3xl border border-dashed bg-card p-10 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-lavender text-lavender-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <p className="mt-4 font-semibold">{text}</p>
      <p className="mt-1 text-sm text-muted-foreground">New entries will appear here soon.</p>
    </Reveal>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-secondary/50 py-20" aria-label="Experience">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading title="Experience & Learning" />
        {experience.length === 0 ? (
          <EmptyState icon={Sparkles} text="Every project is a step forward." />
        ) : (
          <ol className="relative space-y-8 border-l-2 border-primary/30 pl-8">
            {experience.map((e, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <li className="relative">
                  <span className="absolute -left-[45px] grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Briefcase className="h-4 w-4" />
                  </span>
                  <div className="rounded-2xl border bg-card p-6 card-shadow">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">{e.duration}</p>
                    <h3 className="mt-1 text-lg font-bold">{e.role}</h3>
                    <p className="text-sm font-medium text-deep">{e.organization}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{e.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {e.skills.map((s) => (
                        <span key={s} className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium">{s}</span>
                      ))}
                    </div>
                    {e.certificateUrl && (
                      <a href={e.certificateUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-deep">
                        View certificate <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export function Certifications() {
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <section className="py-20" aria-label="Certifications">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title="Certifications & Achievements" />
        {certifications.length === 0 ? (
          <EmptyState icon={Award} text="Certifications on the way." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c, i) => (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-5 card-shadow transition-shadow hover:shadow-md">
                  {/* Small rectangular certificate preview */}
                  <div className="flex items-center justify-center rounded-xl border border-border/50 bg-secondary/40 p-2">
                    {c.imageUrl ? (
                      <button
                        type="button"
                        onClick={() => setPreview(c.imageUrl)}
                        className="group relative flex h-[85px] w-[135px] items-center justify-center overflow-hidden rounded-lg bg-card/60 p-1 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label={`Enlarge ${c.name}`}
                      >
                        <img
                          src={c.imageUrl}
                          alt={c.name}
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      </button>
                    ) : (
                      <div className="flex h-[85px] w-[135px] items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-lavender">
                        <Award className="h-8 w-8 text-primary/60" />
                      </div>
                    )}
                  </div>

                  {/* Details below preview */}
                  <div className="mt-4 flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="line-clamp-2 font-bold leading-snug text-foreground">
                        {c.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {c.organization} · {c.date}
                      </p>
                    </div>

                    {c.credentialUrl && (
                      <div className="pt-4">
                        <a
                          href={c.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-deep"
                        >
                          Verify <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
      {preview && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-foreground/70 p-4" onClick={() => setPreview(null)} role="dialog" aria-modal="true">
          <button className="absolute right-4 top-4 rounded-full bg-card p-2" aria-label="Close"><X className="h-5 w-5" /></button>
          <img src={preview} alt="Certificate preview" className="max-h-[85vh] rounded-2xl" />
        </div>
      )}
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="bg-secondary/50 py-20" aria-label="Education">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading title="Academic Background" />
        <Reveal>
          <div className="flex flex-col gap-6 rounded-3xl border bg-card p-8 card-shadow sm:flex-row">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-deep text-primary-foreground">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xl font-bold">{education.institution}</h3>
              <p className="mt-1 font-medium text-deep">{education.degree}</p>
              <span className="mt-3 inline-block rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-lavender-foreground">
                {education.status}
              </span>
              {education.cgpa && <p className="mt-3 text-sm"><strong>CGPA:</strong> {education.cgpa}</p>}
              {education.coursework.length > 0 && (
                <p className="mt-2 text-sm text-muted-foreground"><strong className="text-foreground">Coursework:</strong> {education.coursework.join(", ")}</p>
              )}
              {education.achievements.length > 0 && (
                <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                  {education.achievements.map((a) => <li key={a}>{a}</li>)}
                </ul>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
