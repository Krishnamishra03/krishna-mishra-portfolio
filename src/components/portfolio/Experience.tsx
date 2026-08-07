import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./Section";

const timeline: Milestone[] = [
  {
    range: "Apr 2026 — Present",
    org: "Prudent Systems Pvt. Ltd.",
    role: "iOS Developer",
    tag: "Internship · On-site",
    accent: "oklch(0.75 0.17 45)",
    bullets: [
      "Building native iOS features in Swift for production apps.",
      "Shipping cross-platform screens with React Native.",
      "On-site in Bhopal, Madhya Pradesh — collaborating with the product team.",
    ],
  },
  {
    range: "May 2025 — Aug 2025",
    org: "Zidio Development",
    role: "Web Developer Intern",
    tag: "Internship",
    accent: "oklch(0.85 0.15 200)",
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
    tag: "Freelance · Studio",
    accent: "oklch(0.78 0.18 300)",
    bullets: [
      "Delivered Care Connect, Rail-Vision AI, Gyan AI, and more.",
      "End-to-end delivery: architecture, build, ship, iterate.",
    ],
  },
];

type Milestone = {
  range: string;
  org: string;
  role: string;
  tag: string;
  accent: string;
  bullets: string[];
};

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative px-6 py-32">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora/[0.06] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="05 / Chronicle"
          title={<>The path so far,<br />one <span className="text-aurora">ship</span> at a time.</>}
        />

        <div ref={ref} className="relative mt-16">
          {/* SVG winding path (desktop) — precisely tuned to card row centers */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="path-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.85 0.15 200)" />
                <stop offset="100%" stopColor="oklch(0.78 0.18 300)" />
              </linearGradient>
              <filter id="path-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>
            {/* Base dashed rail — snakes left, right, back */}
            <path
              d="M 500 0 C 200 180, 800 320, 500 500 C 200 680, 800 820, 500 1000"
              stroke="oklch(1 0 0 / 0.09)"
              strokeWidth="2"
              strokeDasharray="4 10"
              vectorEffect="non-scaling-stroke"
            />
            {/* Animated drawn path */}
            <motion.path
              d="M 500 0 C 200 180, 800 320, 500 500 C 200 680, 800 820, 500 1000"
              stroke="url(#path-g)"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: drawn }}
            />
            <motion.path
              d="M 500 0 C 200 180, 800 320, 500 500 C 200 680, 800 820, 500 1000"
              stroke="url(#path-g)"
              strokeWidth="8"
              strokeLinecap="round"
              filter="url(#path-glow)"
              opacity="0.45"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: drawn }}
            />
          </svg>

          {/* Mobile vertical rail */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-border to-transparent md:hidden" />

          <div className="relative flex flex-col gap-16 md:gap-0">
            {timeline.map((e, i) => (
              <PathCard key={e.org + i} step={e} index={i} total={timeline.length} />
            ))}
          </div>

          {/* Destination marker */}
          <div className="relative mt-16 flex flex-col items-center gap-3 md:mt-24">
            <span className="relative grid size-4 place-items-center rounded-full bg-aurora">
              <span className="absolute inset-0 animate-ping rounded-full bg-aurora opacity-50" />
              <span className="absolute -inset-4 rounded-full border border-aurora/40" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-aurora">
              Next chapter · loading
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PathCard({ step, index, total }: { step: Milestone; index: number; total: number }) {
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-1 items-center gap-6 pl-12 md:min-h-[420px] md:grid-cols-2 md:pl-0"
    >
      {/* Waypoint node — sits on the path centerline */}
      <div className="absolute left-4 top-6 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <span className="relative grid place-items-center">
          <span
            className="absolute h-16 w-16 rounded-full opacity-40 blur-2xl"
            style={{ background: step.accent }}
          />
          <span
            className="absolute size-8 animate-ping rounded-full opacity-20"
            style={{ background: step.accent }}
          />
          <span
            className="relative grid size-6 place-items-center rounded-full border-2 border-background"
            style={{ background: step.accent, boxShadow: `0 0 24px ${step.accent}` }}
          >
            <span className="size-1.5 rounded-full bg-background" />
          </span>
          <span className="mt-3 hidden font-mono text-[9px] uppercase tracking-[0.28em] text-foreground/60 md:block">
            0{index + 1} / 0{total}
          </span>
        </span>
      </div>

      {/* Connector branch from path to card (desktop) */}
      <div
        className={`pointer-events-none absolute top-1/2 hidden h-px -translate-y-1/2 md:block ${
          isLeft ? "right-1/2 mr-3 w-[14%]" : "left-1/2 ml-3 w-[14%]"
        }`}
        style={{
          background: `linear-gradient(${isLeft ? "to left" : "to right"}, ${step.accent}, transparent)`,
        }}
      />

      {/* Card — alternating side on desktop */}
      <div
        className={
          isLeft
            ? "md:col-start-1 md:pr-24 md:text-right"
            : "md:col-start-2 md:pl-24"
        }
      >
        <div
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/25"
          style={{ boxShadow: `0 20px 60px -30px ${step.accent}` }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${isLeft ? "top right" : "top left"}, ${step.accent.replace(")", " / 0.12)")}, transparent 60%)`,
            }}
          />
          <div className={`relative flex flex-wrap items-center gap-3 ${isLeft ? "md:justify-end" : ""}`}>
            <span
              className="rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.24em]"
              style={{ borderColor: `${step.accent.replace(")", " / 0.4)")}`, color: step.accent }}
            >
              {step.tag}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {step.range}
            </span>
          </div>
          <h3 className="relative mt-3 font-display text-2xl font-semibold tracking-tight">
            {step.role}
          </h3>
          <div className="relative mt-1 text-sm font-semibold" style={{ color: step.accent }}>
            {step.org}
          </div>
          <ul className={`relative mt-5 space-y-2 text-pretty text-muted-foreground ${isLeft ? "md:text-right" : ""}`}>
            {step.bullets.map((b) => (
              <li key={b} className={`flex gap-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                <span
                  className="mt-2 size-1 shrink-0 rounded-full"
                  style={{ background: step.accent }}
                />
                <span className={`flex-1 ${isLeft ? "md:text-right" : ""}`}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Spacer on opposite side */}
      <div className={isLeft ? "hidden md:col-start-2 md:block" : "hidden md:col-start-1 md:row-start-1 md:block"} />
    </motion.div>
  );
}