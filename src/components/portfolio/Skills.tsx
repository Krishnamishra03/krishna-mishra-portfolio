import { motion } from "framer-motion";
import { SectionHeader } from "./Section";

const groups: { title: string; items: { name: string; level: number }[] }[] = [
  {
    title: "Frontend",
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
    items: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 88 },
      { name: "PHP", level: 70 },
      { name: "REST API", level: 92 },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "MongoDB", level: 88 },
      { name: "MySQL", level: 80 },
      { name: "Firebase", level: 85 },
    ],
  },
  {
    title: "Mobile",
    items: [
      { name: "React Native", level: 88 },
      { name: "Android", level: 72 },
    ],
  },
  {
    title: "Cloud",
    items: [
      { name: "Firebase", level: 86 },
      { name: "Vercel", level: 92 },
      { name: "Netlify", level: 85 },
    ],
  },
  {
    title: "Tools",
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-aurora to-violet-400"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}