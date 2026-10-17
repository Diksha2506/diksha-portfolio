import { useEffect, useState, type FormEvent } from "react";
import { ArrowUp, Check, Code2, Copy, Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { links, profile } from "@/data/portfolio";
import { Reveal } from "./Reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(links.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(String(f.get("subject")))}&body=${encodeURIComponent(body)}`;
  };
  const socials = [
    { href: links.linkedin, label: "LinkedIn", icon: LinkedinIcon },
    { href: links.github, label: "GitHub", icon: GithubIcon },
    { href: links.leetcode, label: "LeetCode", icon: Code2 },
  ].filter((s) => s.href);
  const input = "w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";

  return (
    <section id="contact" className="py-20" aria-label="Contact">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-secondary via-card to-lavender p-8 card-shadow sm:p-12">
          <div className="hero-blob pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full" />
          <div className="relative grid gap-10 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Let's Connect & <span className="text-gradient">Build Something Meaningful</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Open to internships, collaborations, hackathons and interesting technical opportunities.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <a href={`mailto:${links.email}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-deep">
                  <Mail className="h-4 w-4" /> {links.email}
                </a>
                <button onClick={copy} aria-label="Copy email" className="grid h-11 w-11 place-items-center rounded-full border bg-card text-deep transition-colors hover:border-primary">
                  {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold text-deep transition-all hover:-translate-y-0.5 hover:border-primary">
                    <s.icon className="h-4 w-4" /> {s.label}
                  </a>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border bg-card p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="name" required placeholder="Name" aria-label="Name" className={input} />
                  <input name="email" type="email" required placeholder="Email" aria-label="Email" className={input} />
                </div>
                <input name="subject" required placeholder="Subject" aria-label="Subject" className={input} />
                <textarea name="message" required rows={4} placeholder="Message" aria-label="Message" className={input} />
                <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-deep px-5 py-3 text-sm font-semibold text-deep-foreground transition-colors hover:bg-primary">
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <footer className="border-t py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-extrabold">{profile.name}</p>
          <p className="text-sm text-muted-foreground">{profile.tagline}</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          {["Home", "Projects", "Skills", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-primary">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary"><GithubIcon className="h-5 w-5" /></a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><LinkedinIcon className="h-5 w-5" /></a>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0 })} aria-label="Back to top" className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground card-shadow transition-colors hover:bg-deep">
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
}
