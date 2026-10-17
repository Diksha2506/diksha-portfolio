import { Download, Eye, FileText } from "lucide-react";
import { links } from "@/data/portfolio";
import { Reveal } from "./Reveal";

export function ResumeSection() {
  return (
    <section className="bg-secondary/50 py-20" aria-label="Resume">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            My Journey at a Glance
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            I'm a third-year B.Tech student in Artificial Intelligence & Data
            Science at VIT Pune. I enjoy working across the stack — from
            machine-learning models and computer-vision experiments to web
            applications and systems programming — and I learn best by
            building real projects.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-3xl border bg-card p-8 text-center card-shadow">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-secondary text-deep">
              <FileText className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-lg font-bold">Resume</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {links.resumeUrl
                ? "View or download my latest resume."
                : "Resume PDF will be available here soon."}
            </p>
            {links.resumeUrl && (
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={links.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-deep"
                >
                  <Eye className="h-4 w-4" /> View Resume
                </a>
                <a
                  href={links.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-sm font-semibold text-deep transition-colors hover:bg-secondary"
                >
                  <Download className="h-4 w-4" /> Download Resume
                </a>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
