import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./Section";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      const duration = 1600;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setN(Math.round(eased * value));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    // fallback if already visible on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) run();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

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
          description="I build software that scales, performs, and lasts. Obsessed with clean architecture, lightning-fast user experiences, and products that people genuinely enjoy using. Over the past 1 year, I've designed and shipped production-ready web, mobile, and AI applications—transforming complex ideas into elegant, high-performance solutions."
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
              d: "Bachelor of Technology (B.Tech) in Computer Science & Engineering — building a strong foundation in Artificial Intelligence & Machine Learning (AI/ML), Software Engineering, Full-Stack Development, Cloud Computing, and scalable system design through academic learning and real-world projects. Computer Science, specializing in AI/ML, modern software development, and cloud technologies.",
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
