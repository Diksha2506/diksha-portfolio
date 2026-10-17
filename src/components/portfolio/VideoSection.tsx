import { Play } from "lucide-react";
import { links } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

export function VideoSection() {
  return (
    <section id="about" className="relative py-20" aria-label="Introduction video">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          title="More Than Just a Profile"
          subtitle="A quick introduction to who I am and what I build."
        />
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-secondary via-card to-lavender card-shadow">
            {links.videoUrl ? (
              <video
                src={links.videoUrl}
                controls
                className="aspect-video w-full"
                aria-label="Introduction video"
              />
            ) : (
              <div className="grid aspect-video w-full place-items-center">
                <div className="text-center">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground card-shadow transition-transform hover:scale-105">
                    <Play className="h-8 w-8 fill-current" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-muted-foreground">
                    Intro video coming soon
                  </p>
                </div>
              </div>
            )}
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            My journey, interests and projects.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
