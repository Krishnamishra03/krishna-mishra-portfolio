import { motion } from "framer-motion";
import { SectionHeader } from "./Section";

const timeline = [
  {
    range: "May 2025 — Aug 2025",
    org: "Zidio Development",
    role: "Web Developer Intern",
    bullets: [
      "Shipped frontend features across a multi-tenant SaaS dashboard.",
      "Refined UI systems — typography, spacing, motion — for clarity.",
      "Triaged and resolved production bugs with focused, minimal PRs.",
      "Collaborated via Git on a fast-moving distributed team.",
    ],
  },
  {
    range: "2023 — Present",
    org: "Independent",
    role: "Full Stack & Mobile Developer",
    bullets: [
      "Delivered Care Connect, Rail-Vision AI, Gyan AI, and more.",
      "End-to-end delivery: architecture, build, ship, iterate.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="05 / Chronicle"
          title={<>The path so far,<br />one <span className="text-aurora">ship</span> at a time.</>}
        />
        <div className="relative pl-8 md:pl-12">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
          <div className="space-y-16">
            {timeline.map((e, i) => (
              <motion.div
                key={e.org + i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid gap-6 md:grid-cols-[200px_1fr]"
              >
                <div className="absolute -left-8 top-1.5 md:-left-12">
                  <span className="relative grid size-3 place-items-center rounded-full bg-aurora">
                    <span className="absolute inset-0 animate-ping rounded-full bg-aurora opacity-40" />
                  </span>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    {e.range}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-aurora">{e.org}</div>
                </div>
                <div>
                  <h3 className="mb-4 font-display text-2xl font-semibold tracking-tight">{e.role}</h3>
                  <ul className="space-y-2 text-pretty text-muted-foreground">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}