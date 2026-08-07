import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "./Section";

type Node = {
  name: string;
  x: number; // px offset in isometric plane
  y: number;
  z: number; // elevation
  color: string;
  glow?: boolean;
  size?: "sm" | "md";
  category: string;
  proficiency: number; // 0-100
  years: number;
  tagline: string;
  description: string;
  docs: string;
};

const nodes: Node[] = [
  { name: "REACT", x: -140, y: -140, z: 60, color: "oklch(0.85 0.15 200)", glow: true, category: "Frontend", proficiency: 95, years: 4, tagline: "Declarative UI library", description: "Composable component architecture powering every product I ship, from marketing sites to complex dashboards.", docs: "https://react.dev" },
  { name: "NEXT.JS", x: 140, y: -140, z: 70, color: "oklch(0.95 0.02 260)", glow: true, category: "Framework", proficiency: 92, years: 3, tagline: "Full-stack React framework", description: "App router, server components, ISR — my default for shipping production-grade web apps.", docs: "https://nextjs.org" },
  { name: "TS", x: -140, y: 140, z: 45, color: "oklch(0.75 0.15 250)", category: "Language", proficiency: 94, years: 4, tagline: "Typed JavaScript at scale", description: "Strict types across UI, API and shared contracts to keep large codebases safe and refactorable.", docs: "https://www.typescriptlang.org" },
  { name: "NODE", x: 140, y: 140, z: 80, color: "oklch(0.82 0.18 150)", glow: true, category: "Runtime", proficiency: 90, years: 4, tagline: "JavaScript runtime", description: "REST and streaming APIs, background workers and CLIs across MERN and edge deployments.", docs: "https://nodejs.org" },
  { name: "MONGO", x: -240, y: 0, z: 30, color: "oklch(0.78 0.16 150)", category: "Database", proficiency: 85, years: 3, tagline: "Document database", description: "Schema-flexible data modeling with aggregation pipelines and Atlas search for MERN products.", docs: "https://www.mongodb.com" },
  { name: "GRAPHQL", x: 240, y: 0, z: 35, color: "oklch(0.72 0.21 320)", category: "API", proficiency: 82, years: 2, tagline: "Typed API query layer", description: "Federated schemas, code-generated hooks and precise data fetching for complex UIs.", docs: "https://graphql.org" },
  { name: "RN", x: 0, y: -260, z: 55, color: "oklch(0.78 0.18 300)", glow: true, category: "Mobile", proficiency: 88, years: 3, tagline: "React Native", description: "Cross-platform iOS + Android apps with native modules, Reanimated and the new architecture.", docs: "https://reactnative.dev" },
  { name: "FIREBASE", x: 0, y: 260, z: 25, color: "oklch(0.84 0.15 80)", category: "Backend", proficiency: 84, years: 3, tagline: "App backend platform", description: "Auth, Firestore, Cloud Functions and FCM for realtime mobile and web experiences.", docs: "https://firebase.google.com" },
  { name: "DOCKER", x: -260, y: -260, z: 20, color: "oklch(0.8 0.14 220)", size: "sm", category: "DevOps", proficiency: 78, years: 2, tagline: "Container runtime", description: "Reproducible dev environments and multi-stage builds shipped through CI/CD pipelines.", docs: "https://www.docker.com" },
  { name: "GITHUB", x: 260, y: 260, z: 20, color: "oklch(0.75 0.02 260)", size: "sm", category: "Tooling", proficiency: 96, years: 5, tagline: "Source + Actions", description: "PR-driven workflows, GitHub Actions pipelines, releases and package publishing.", docs: "https://github.com" },
  { name: "TAILWIND", x: 260, y: -260, z: 20, color: "oklch(0.82 0.15 200)", size: "sm", category: "Styling", proficiency: 95, years: 3, tagline: "Utility-first CSS", description: "Design-token driven styling with custom themes, animations and glassmorphic systems.", docs: "https://tailwindcss.com" },
  { name: "EXPRESS", x: -260, y: 260, z: 20, color: "oklch(0.78 0.14 140)", size: "sm", category: "Backend", proficiency: 86, years: 4, tagline: "Node.js web framework", description: "REST endpoints, auth middleware and modular service layers for MERN stack APIs.", docs: "https://expressjs.com" },
];

export function Universe() {
  const ref = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Node | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const on = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--tiltX", `${60 - cy * 6}deg`);
      el.style.setProperty("--tiltZ", `${-30 + cx * 8}deg`);
    };
    el.addEventListener("mousemove", on);
    return () => el.removeEventListener("mousemove", on);
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <section id="universe" ref={ref} className="relative overflow-hidden px-6 py-32">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-[15%] h-[420px] w-[420px] rounded-full bg-aurora/10 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[10%] h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(1 0 0 / .4) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / .4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="03 / Digital Universe"
          title={
            <>
              A multi-dimensional map of the
              <br />
              stacks I <span className="text-aurora">build with.</span>
            </>
          }
          align="center"
        />

        <motion.div style={{ y: lift }} className="relative mt-12">
          {/* Desktop: HUD left */}
          <div className="pointer-events-none absolute left-0 top-1/2 z-20 hidden w-56 -translate-y-1/2 flex-col gap-3 lg:flex">
            <HudCard title="System Status" accent="oklch(0.85 0.15 200)">
              <div className="space-y-2">
                <Bar value={82} color="oklch(0.85 0.15 200)" />
                <Bar value={54} color="oklch(0.78 0.18 300)" />
                <Bar value={96} color="oklch(0.82 0.18 150)" />
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                LATENCY · 14ms<br />UPTIME · 99.98%
              </div>
            </HudCard>
            <HudCard title="Deploy Regions" accent="oklch(0.82 0.18 150)">
              <ul className="font-mono text-[10px] uppercase tracking-widest text-foreground/70 space-y-1">
                <li>◉ ap-south-1 · mumbai</li>
                <li>◉ eu-west-1 · dublin</li>
                <li>◉ us-east-1 · virginia</li>
              </ul>
            </HudCard>
          </div>

          {/* Desktop: Isometric stage */}
          <div
            ref={stage}
            className="relative mx-auto hidden h-[640px] w-full max-w-4xl items-center justify-center [perspective:1400px] md:flex"
          >
            <div
              className="relative transition-transform duration-500 ease-out"
              style={{
                transform:
                  "rotateX(var(--tiltX,60deg)) rotateZ(var(--tiltZ,-30deg))",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Grid floor */}
              <div
                className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 border border-white/[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, oklch(1 0 0 / .06) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / .06) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
              {/* Radial floor glow */}
              <div
                className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.85 0.15 200 / 0.25), transparent 65%)",
                }}
              />

              {/* Connection lines (SVG on floor plane) */}
              <svg
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                width="720"
                height="720"
                viewBox="-360 -360 720 720"
              >
                <defs>
                  <linearGradient id="line-g" x1="0" x2="1">
                    <stop offset="0%" stopColor="oklch(0.85 0.15 200)" stopOpacity="0" />
                    <stop offset="50%" stopColor="oklch(0.85 0.15 200)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="oklch(0.78 0.18 300)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {nodes.map((n) => (
                  <line
                    key={n.name}
                    x1="0"
                    y1="0"
                    x2={n.x}
                    y2={n.y}
                    stroke="url(#line-g)"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                  />
                ))}
              </svg>

              {/* Core */}
              <div
                className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-aurora/60 bg-aurora/15 shadow-[0_0_60px_oklch(0.85_0.15_200/0.35)] backdrop-blur-xl"
                style={{ transform: "translate3d(-50%, -50%, 90px)" }}
              >
                <div className="absolute inset-0 animate-pulse rounded-2xl border-2 border-aurora/30" />
                <div className="text-center">
                  <div className="font-display text-3xl font-extrabold tracking-tighter text-foreground">KM</div>
                  <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.3em] text-aurora">core</div>
                </div>
              </div>

              {/* Nodes */}
              {nodes.map((n) => {
                const s = n.size === "sm" ? 64 : 80;
                return (
                  <button
                    type="button"
                    key={n.name}
                    onClick={() => setActive(n)}
                    aria-label={`Open ${n.name} details`}
                    className="group absolute left-1/2 top-1/2 grid place-items-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-white/40 hover:bg-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora cursor-pointer"
                    data-cursor
                    style={{
                      width: s,
                      height: s,
                      transform: `translate3d(calc(-50% + ${n.x}px), calc(-50% + ${n.y}px), ${n.z}px)`,
                      boxShadow: n.glow ? `0 0 32px ${n.color.replace(")", " / 0.35)")}` : undefined,
                    }}
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <span
                        className="font-mono text-[10px] font-bold tracking-tight"
                        style={{ color: n.color }}
                      >
                        {n.name}
                      </span>
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: n.color, boxShadow: `0 0 10px ${n.color}` }}
                      />
                    </div>
                    {/* z-pillar */}
                    <span
                      className="pointer-events-none absolute left-1/2 top-full w-px -translate-x-1/2 bg-gradient-to-b from-white/20 to-transparent"
                      style={{ height: n.z }}
                    />
                    {/* hover tooltip */}
                    <span
                      className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/60 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/80 opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100"
                    >
                      {n.category} · {n.proficiency}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop: HUD right */}
          <div className="pointer-events-none absolute right-0 top-1/2 z-20 hidden w-56 -translate-y-1/2 flex-col gap-3 lg:flex">
            <HudCard title="Active Protocols" accent="oklch(0.78 0.18 300)">
              <ul className="font-mono text-[10px] uppercase tracking-widest text-foreground/70 space-y-1">
                <li>&gt; GraphQL mesh</li>
                <li>&gt; Firebase auth</li>
                <li>&gt; MongoDB atlas</li>
                <li>&gt; Tailwind JIT</li>
                <li>&gt; RN new arch</li>
              </ul>
            </HudCard>
            <HudCard title="Build Signal" accent="oklch(0.82 0.18 150)">
              <div className="flex items-end gap-1">
                {[30, 50, 40, 70, 55, 80, 65, 90, 75, 95].map((h, i) => (
                  <span
                    key={i}
                    className="w-1.5 rounded-sm bg-emerald-400/80"
                    style={{ height: h * 0.4 }}
                  />
                ))}
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-emerald-400/90">
                ◉ stable · 42rps
              </div>
            </HudCard>
          </div>

          {/* Mobile: Helical constellation */}
          <div className="relative mx-auto max-w-md md:hidden">
            {/* Starfield */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute h-px w-px rounded-full bg-white/80"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: 0.2 + Math.random() * 0.5,
                    boxShadow: `0 0 ${4 + Math.random() * 6}px oklch(1 0 0 / ${0.3 + Math.random() * 0.4})`,
                  }}
                />
              ))}
            </div>

            {/* Central data stream */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-aurora/40 via-aurora/20 to-transparent" />
            <div className="absolute left-6 top-0 bottom-0 w-px overflow-hidden">
              <div
                className="h-32 w-full bg-gradient-to-b from-transparent via-aurora to-transparent"
                style={{ animation: "stream 2.5s linear infinite" }}
              />
            </div>

            {/* Core node */}
            <div className="relative mb-10 ml-14 flex items-center gap-4">
              <div className="relative grid h-18 w-18 shrink-0 place-items-center rounded-2xl border border-aurora/60 bg-aurora/15 shadow-[0_0_50px_oklch(0.85_0.15_200/0.4)] backdrop-blur-xl">
                <div className="absolute inset-0 animate-pulse rounded-2xl border-2 border-aurora/30" />
                <div className="text-center">
                  <div className="font-display text-2xl font-extrabold tracking-tighter text-foreground">KM</div>
                  <div className="font-mono text-[7px] uppercase tracking-[0.3em] text-aurora">core</div>
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-aurora">Digital Universe</div>
                <div className="text-xs text-muted-foreground">Tap any node to inspect the stack.</div>
              </div>
            </div>

            {/* Mobile node cards — helical alternating */}
            <div className="relative space-y-6">
              {nodes.map((n, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <button
                    type="button"
                    key={n.name}
                    onClick={() => setActive(n)}
                    className={`group relative flex w-[calc(100%-3.5rem)] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-left backdrop-blur-md transition-all duration-300 active:scale-[0.97] hover:border-white/30 hover:bg-white/[0.09] ${isLeft ? "ml-14" : "ml-14 flex-row-reverse"}`}
                    data-cursor
                  >
                    {/* Connector arc */}
                    <svg
                      className={`pointer-events-none absolute top-1/2 h-8 w-8 -translate-y-1/2 text-aurora/30 ${isLeft ? "-left-8" : "-right-8 rotate-180"}`}
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M32 16 C 20 16, 20 4, 0 4"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="3 4"
                      />
                    </svg>

                    {/* Waypoint dot on stream */}
                    <span
                      className="absolute -left-[34px] top-1/2 size-2.5 -translate-y-1/2 rounded-full border border-white/20"
                      style={{
                        background: n.color,
                        boxShadow: `0 0 14px ${n.color}`,
                      }}
                    />

                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border font-mono text-[10px] font-bold"
                      style={{
                        color: n.color,
                        borderColor: `${n.color.replace(")", " / 0.25)")}`,
                        background: `linear-gradient(135deg, ${n.color.replace(")", " / 0.18)")}, ${n.color.replace(")", " / 0.05)")})`,
                        boxShadow: n.glow ? `0 0 18px ${n.color.replace(")", " / 0.28)")}` : undefined,
                      }}
                    >
                      {n.name}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className={`flex items-center gap-2 ${isLeft ? "justify-between" : "justify-between flex-row-reverse"}`}>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">
                          {n.category}
                        </span>
                        <span className="font-mono text-[10px]" style={{ color: n.color }}>
                          {n.proficiency}%
                        </span>
                      </div>
                      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${n.proficiency}%`, background: n.color, boxShadow: `0 0 8px ${n.color}` }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile HUD stack */}
            <div className="mt-12 grid grid-cols-2 gap-3">
              <HudCard title="Status" accent="oklch(0.85 0.15 200)">
                <div className="space-y-1.5">
                  <Bar value={82} color="oklch(0.85 0.15 200)" />
                  <Bar value={96} color="oklch(0.82 0.18 150)" />
                </div>
                <div className="mt-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  LATENCY · 14ms
                </div>
              </HudCard>
              <HudCard title="Signal" accent="oklch(0.82 0.18 150)">
                <div className="flex items-end gap-0.5">
                  {[30, 50, 40, 70, 55, 80, 65, 90].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-sm bg-emerald-400/80"
                      style={{ height: h * 0.3 }}
                    />
                  ))}
                </div>
                <div className="mt-2 font-mono text-[9px] uppercase tracking-widest text-emerald-400/90">
                  ◉ stable
                </div>
              </HudCard>
            </div>
          </div>
        </motion.div>

        {/* Telemetry ticker */}
        <div className="relative mt-16 overflow-hidden rounded-2xl glass-panel [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex items-center gap-12 whitespace-nowrap px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground [animation:ticker_40s_linear_infinite]">
            {Array.from({ length: 2 }).flatMap((_, k) =>
              [
                "Deployment · success",
                "React Native engine · active",
                "Database sync · 100%",
                "Edge functions · global",
                "Core module · verified",
                "TypeScript · strict",
                "CI/CD · green",
                "Latency · 14ms",
              ].map((t, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-3">
                  <span className="text-aurora">◉</span>
                  <span className="text-foreground/70">{t}</span>
                </span>
              )),
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && <NodeModal node={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

function NodeModal({ node, onClose }: { node: Node; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${node.name} details`}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-8 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
        style={{
          backgroundImage: `radial-gradient(circle at top left, ${node.color.replace(")", " / 0.18)")}, transparent 60%)`,
        }}
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: node.color.replace(")", " / 0.35)") }}
        />
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-foreground/80 transition hover:bg-white/[0.12]"
        >
          ✕
        </button>

        <div className="relative">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: node.color, boxShadow: `0 0 10px ${node.color}` }}
            />
            {node.category}
          </div>
          <h3
            className="mt-3 font-display text-4xl font-bold tracking-tight"
            style={{ color: node.color }}
          >
            {node.name}
          </h3>
          <p className="mt-1 text-sm text-foreground/70">{node.tagline}</p>

          <p className="mt-6 text-sm leading-relaxed text-foreground/80">
            {node.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Stat label="Proficiency" value={`${node.proficiency}%`} color={node.color} />
            <Stat label="Experience" value={`${node.years}+ yrs`} color={node.color} />
          </div>

          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              <span>Mastery</span>
              <span>{node.proficiency}/100</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${node.proficiency}%` }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                style={{ background: node.color, boxShadow: `0 0 12px ${node.color}` }}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={node.docs}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-white/[0.14]"
            >
              Official docs
              <span aria-hidden>↗</span>
            </a>
            <a
              href="#projects"
              onClick={onClose}
              data-magnetic
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-background"
              style={{ background: node.color }}
            >
              See projects using {node.name}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/50">
        {label}
      </div>
      <div className="mt-1 font-display text-xl font-semibold" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

function HudCard({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pointer-events-auto rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
      <div className="mb-3 flex items-center gap-2">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
        />
        <span
          className="font-mono text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ color: accent }}
        >
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1 w-full overflow-hidden bg-white/10">
      <div
        className="h-full transition-all"
        style={{ width: `${value}%`, background: color, boxShadow: `0 0 8px ${color}` }}
      />
    </div>
  );
}