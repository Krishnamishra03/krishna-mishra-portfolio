import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { SectionHeader } from "./Section";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return controls.stop;
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

const stats = [
  { v: 20, s: "+", label: "Projects shipped" },
  { v: 5, s: "+", label: "Clients served" },
  { v: 15, s: "+", label: "Technologies" },
  { v: 150, s: "+", label: "GitHub commits" },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="01 / About"
          title={
            <>
              An engineer who treats code
              <br />
              like <span className="text-aurora">industrial design.</span>
            </>
          }
          description="I obsess over scalable architecture, sub-second interactions, and interfaces that feel inevitable. Three years deep into shipping production systems across web, mobile, and AI."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel relative overflow-hidden rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-aurora/10 blur-2xl" />
              <div className="font-display text-5xl font-bold tracking-tight text-foreground">
                <Counter value={s.v} suffix={s.s} />
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {[
            {
              t: "Experience",
              d: "Hands-on with the full product lifecycle — discovery, architecture, build, ship, iterate.",
            },
            {
              t: "Education",
              d: "Computer Science, with focused study in distributed systems, ML, and HCI.",
            },
            {
              t: "Philosophy",
              d: "Design and engineering are the same discipline. Both reward restraint and detail.",
            },
          ].map((c) => (
            <div key={c.t} className="border-l border-border pl-6">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-aurora">{c.t}</div>
              <p className="text-pretty text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
