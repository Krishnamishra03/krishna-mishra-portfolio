import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "./Section";

type Node = {
  name: string;
  x: number; // px offset in isometric plane
  y: number;
  z: number; // elevation
  color: string;
  glow?: boolean;
  size?: "sm" | "md";
};

const nodes: Node[] = [
  { name: "REACT", x: -140, y: -140, z: 60, color: "oklch(0.85 0.15 200)", glow: true },
  { name: "NEXT.JS", x: 140, y: -140, z: 70, color: "oklch(0.95 0.02 260)", glow: true },
  { name: "TS", x: -140, y: 140, z: 45, color: "oklch(0.75 0.15 250)" },
  { name: "NODE", x: 140, y: 140, z: 80, color: "oklch(0.82 0.18 150)", glow: true },
  { name: "MONGO", x: -240, y: 0, z: 30, color: "oklch(0.78 0.16 150)" },
  { name: "GRAPHQL", x: 240, y: 0, z: 35, color: "oklch(0.72 0.21 320)" },
  { name: "RN", x: 0, y: -260, z: 55, color: "oklch(0.78 0.18 300)", glow: true },
  { name: "FIREBASE", x: 0, y: 260, z: 25, color: "oklch(0.84 0.15 80)" },
  { name: "DOCKER", x: -260, y: -260, z: 20, color: "oklch(0.8 0.14 220)", size: "sm" },
  { name: "GITHUB", x: 260, y: 260, z: 20, color: "oklch(0.75 0.02 260)", size: "sm" },
  { name: "TAILWIND", x: 260, y: -260, z: 20, color: "oklch(0.82 0.15 200)", size: "sm" },
  { name: "EXPRESS", x: -260, y: 260, z: 20, color: "oklch(0.78 0.14 140)", size: "sm" },
];

export function Universe() {
  const ref = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
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
          {/* HUD left */}
          <div className="pointer-events-none absolute left-0 top-1/2 z-20 hidden w-56 -translate-y-1/2 flex-col gap-3 md:flex">
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

          {/* Isometric stage */}
          <div
            ref={stage}
            className="relative mx-auto flex h-[640px] w-full max-w-4xl items-center justify-center [perspective:1400px]"
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
                  <div
                    key={n.name}
                    className="group absolute left-1/2 top-1/2 grid place-items-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.1]"
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
                  </div>
                );
              })}
            </div>
          </div>

          {/* HUD right */}
          <div className="pointer-events-none absolute right-0 top-1/2 z-20 hidden w-56 -translate-y-1/2 flex-col gap-3 md:flex">
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
    </section>
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