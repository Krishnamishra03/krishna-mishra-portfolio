import { motion } from "framer-motion";
import { SectionHeader } from "./Section";

const groups: {
  title: string;
  label: string;
  items: { name: string; level: number }[];
}[] = [
  {
    title: "Frontend",
    label: "Core focus",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind", level: 95 },
      { name: "JavaScript", level: 96 },
    ],
  },
  {
    title: "Backend",
    label: "Architecture",
    items: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 88 },
      { name: "PHP", level: 70 },
      { name: "REST API", level: 92 },
    ],
  },
  {
    title: "Database",
    label: "Persistence",
    items: [
      { name: "MongoDB", level: 88 },
      { name: "MySQL", level: 80 },
      { name: "Firebase", level: 85 },
    ],
  },
  {
    title: "Android / iOS",
    label: "Native",
    items: [
      { name: "React Native", level: 88 },
      { name: "Kotlin", level: 86 },
      { name: "Swift", level: 78 },
      { name: "UIKit", level: 74 },
      { name: "Flutter", level: 70 },
    ],
  },
  {
    title: "Cloud",
    label: "Infrastructure",
    items: [
      { name: "AWS S3", level: 84 },
      { name: "Microsoft Azure", level: 78 },
      { name: "Firebase", level: 86 },
      { name: "Vercel", level: 92 },
    ],
  },
  {
    title: "AI / ML",
    label: "Intelligent",
    items: [
      { name: "Large Language Models (LLMs)", level: 82 },
      { name: "Scikit-learn", level: 78 },
      { name: "Data Preprocessing", level: 80 },
      { name: "Generative AI", level: 85 },
    ],
  },
  {
    title: "Tools",
    label: "Workflow",
    items: [
      { name: "Git", level: 92 },
      { name: "GitHub", level: 95 },
      { name: "Postman", level: 88 },
      { name: "VS Code", level: 98 },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(oklch(1 0 0 / 1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="mx-auto max-w-7xl">
        {/* Desktop header + grid */}
        <div className="hidden md:block">
          <SectionHeader
            eyebrow="02 / Stack"
            title={
              <>
                A galaxy of tools,
                <br />
                wielded with <span className="text-aurora">intent.</span>
              </>
            }
            description="Selected with care for performance, developer ergonomics, and longevity. No fads."
          />
        </div>

        {/* Desktop grid */}
        <div className="hidden gap-5 md:grid sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: i * 0.06,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-panel group relative overflow-hidden rounded-2xl p-6 transition-all hover:border-aurora/40"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-aurora/0 blur-3xl transition-all duration-700 group-hover:bg-aurora/20" />
              <div className="mb-5 flex items-baseline justify-between">
                <h3 className="font-display text-xl font-semibold">{g.title}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <ul className="space-y-3">
                {g.items.map((it) => (
                  <li key={it.name} className="group/row">
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-foreground/90">{it.name}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {it.level}
                      </span>
                    </div>
                    <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${it.level}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: 1.1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-aurora to-violet-400"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Mobile cinematic vertical flow */}
        <div className="md:hidden">
          <header className="mb-14">
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-lg font-bold text-aurora">02</span>
              <div className="h-px w-8 bg-aurora/50" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Technical Stack
              </span>
            </div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight">
              Skills <span className="text-muted-foreground/40">&</span>{" "}
              <span className="text-aurora">Expertise</span>
            </h2>
          </header>

          <div className="relative space-y-14 pl-6">
            <div className="absolute left-[9px] top-1 bottom-0 w-px bg-gradient-to-b from-aurora/50 via-border to-transparent" />
            {groups.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                <div
                  className="absolute left-[-17px] top-1.5 size-2 rounded-full"
                  style={{
                    backgroundColor: i === 0 ? "var(--aurora)" : "var(--border)",
                    boxShadow:
                      i === 0
                        ? "0 0 10px color-mix(in oklab, var(--aurora) 80%, transparent)"
                        : undefined,
                  }}
                />
                <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {g.label}
                </span>
                <h3 className="mb-4 font-display text-2xl font-semibold">
                  {g.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it.name}
                      className="rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm"
                    >
                      {it.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-border pt-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
              Continuous Learning
            </span>
            <div className="h-1 w-12 bg-gradient-to-r from-aurora to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
