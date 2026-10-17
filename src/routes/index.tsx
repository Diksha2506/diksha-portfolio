import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { VideoSection } from "@/components/portfolio/VideoSection";
import { ResumeSection } from "@/components/portfolio/ResumeSection";
import { AllProjects, FeaturedWork } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Certifications, Education, ExperienceSection } from "@/components/portfolio/Experience";
import { Contact, Footer } from "@/components/portfolio/Contact";

const title = "Diksha Rade — AI & Data Science Portfolio";
const description =
  "Portfolio of Diksha Rade, B.Tech AI & Data Science student at VIT Pune — projects in machine learning, computer vision, web development and systems.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <VideoSection />
        <ResumeSection />
        <FeaturedWork />
        <AllProjects />
        <Skills />
        <ExperienceSection />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
