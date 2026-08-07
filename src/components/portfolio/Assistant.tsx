import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const prompts: { q: string; a: string }[] = [
  { q: "Who is Krishna?", a: "A Software Engineer focused on full-stack web and mobile — MERN, Next.js, React Native, and AI integrations." },
  { q: "Show projects", a: "Care Connect, Rail-Vision, Gyan AI, Lumen Wallpapers. Scroll to the Work section for the full case studies." },
  { q: "Show skills", a: "Frontend (React/Next/TS), Backend (Node/Express), Mobile (React Native), Databases (Mongo, Firebase), and AI tooling." },
  { q: "How to contact?", a: "Use the contact form at the bottom, or email hello@krishna.dev — replies within 24h." },
  { q: "Download resume", a: "Tap the Download Résumé button in the hero, or type `download` in the terminal." },
];

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="AI assistant"
        className="fixed bottom-5 right-5 z-[80] grid h-12 w-12 place-items-center rounded-full bg-foreground text-background shadow-2xl transition-transform hover:scale-105 active:scale-95"
      >
        <span className="relative">
          <span className="absolute inset-0 -m-1 animate-ping rounded-full bg-aurora/40" />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
            <circle cx="12" cy="12" r="3.2" />
          </svg>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel fixed bottom-20 right-5 z-[80] w-[min(360px,90vw)] overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-aurora/20 text-[10px] font-bold text-aurora">AI</span>
              <div>
                <div className="text-sm font-semibold">Ask about Krishna</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">offline · scripted</div>
              </div>
            </div>
            <div className="space-y-2 p-3">
              {prompts.map((p, i) => (
                <button
                  key={p.q}
                  onClick={() => setActive(i === active ? null : i)}
                  className="w-full rounded-xl border border-border/60 px-3 py-2 text-left text-sm transition-colors hover:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{p.q}</span>
                    <span className="text-aurora">{active === i ? "−" : "+"}</span>
                  </div>
                  <AnimatePresence initial={false}>
                    {active === i && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-2 overflow-hidden text-xs leading-relaxed text-muted-foreground"
                      >
                        {p.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}