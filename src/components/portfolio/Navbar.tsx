import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { links, profile } from "@/data/portfolio";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Featured", href: "#featured" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const sections = navItems.map((i) => i.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        if (!id) continue;
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(`#${sections[i]}`);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b bg-background/80 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="flex items-center gap-2.5">
          {profile.photoUrl ? (
            <img
              src={profile.photoUrl}
              alt={profile.name}
              className="h-9 w-9 rounded-full border border-border object-cover card-shadow"
            />
          ) : (
            <span
              className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-deep text-sm font-extrabold text-primary-foreground"
              aria-hidden="true"
            >
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          )}
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight">
              {profile.name}
            </span>
            {profile.navTagline && (
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {profile.navTagline}
              </span>
            )}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {active === item.href && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {links.resumeUrl && (
            <a
              href={links.resumeUrl}
              download
              className="hidden items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-deep sm:inline-flex lg:ml-2"
            >
              <Download className="h-3.5 w-3.5" />
              Download Resume
            </a>
          )}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-full p-2 text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t bg-background/95 backdrop-blur-md lg:hidden">
          <ul className="mx-auto max-w-6xl space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                    active === item.href
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            {links.resumeUrl && (
              <li className="pt-2">
                <a
                  href={links.resumeUrl}
                  download
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-deep"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
