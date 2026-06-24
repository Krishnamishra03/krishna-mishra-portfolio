import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#universe", label: "Universe" },
  { href: "#skills", label: "Stack" },
  { href: "#terminal", label: "Console" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 font-display text-sm font-bold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-[10px] font-bold text-background">KM</span>
          <span className="hidden sm:inline">Krishna Mishra</span>
        </a>
        <nav
          className={`hidden items-center gap-1 rounded-full px-2 py-1.5 text-sm transition-all md:flex ${
            scrolled ? "glass-panel" : "border border-transparent"
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-transform hover:scale-[1.02] active:scale-95 sm:text-sm"
        >
          Hire me
        </a>
      </div>
    </header>
  );
}