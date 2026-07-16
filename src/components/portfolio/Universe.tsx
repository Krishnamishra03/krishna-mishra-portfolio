import { useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "./Section";

type Cat = "frontend" | "backend" | "mobile" | "infra";
const catColor: Record<Cat, string> = {
  frontend: "oklch(0.82 0.18 165)",
  backend: "oklch(0.78 0.16 230)",
  mobile: "oklch(0.72 0.21 300)",
  infra: "oklch(0.84 0.15 80)",
};

const orbits: {
  r: number;
  dur: number;
  items: { name: string; angle: number; cat: Cat }[];
}[] = [
  {
    r: 140,
    dur: 28,
    items: [
      { name: "React", angle: 0, cat: "frontend" },
      { name: "Next.js", angle: 120, cat: "frontend" },
      { name: "TypeScript", angle: 240, cat: "frontend" },
    ],
  },
  {
    r: 230,
    dur: 44,
    items: [
      { name: "Node.js", angle: 30, cat: "backend" },
      { name: "Express", angle: 150, cat: "backend" },
      { name: "MongoDB", angle: 270, cat: "backend" },
    ],
  },
  {
    r: 320,
    dur: 64,
    items: [
      { name: "Firebase", angle: 0, cat: "infra" },
      { name: "React Native", angle: 90, cat: "mobile" },
      { name: "Docker", angle: 180, cat: "infra" },
      { name: "GitHub", angle: 270, cat: "infra" },
    ],
  },
];

export function Universe() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const lift = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Mouse parallax
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const on = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--mx", `${cx * 26}px`);
      el.style.setProperty("--my", `${cy * 26}px`);
    };
    el.addEventListener("mousemove", on);
    return () => el.removeEventListener("mousemove", on);
  }, []);

  // deterministic starfield
  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        const r2 = ((i * 2654435761) % 233280) / 233280;
        const r3 = ((i * 16807) % 233280) / 233280;
        return {
          left: r * 100,
          top: r2 * 100,
          size: 1 + r3 * 1.6,
          delay: r * 6,
          op: 0.25 + r2 * 0.55,
        };
      }),
    [],
  );

  return (
    <section id="universe" ref={ref} className="relative overflow-hidden px-6 py-32">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.18_0.03_260)_0%,transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(1 0 0 / .4) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / .4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-foreground"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              opacity: s.op,
              animation: `twinkle ${4 + s.delay}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="03 / Digital Universe"
          title={
            <>
              A constellation of tools,
              <br />
              orbiting <span className="text-aurora">one craft.</span>
            </>
          }
          align="center"
        />

        {/* shooting stars */}
        <div className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute h-px w-24 bg-gradient-to-r from-transparent via-aurora to-transparent"
              style={{
                top: `${20 + i * 25}%`,
                left: "-10%",
                animation: `shoot 9s ease-in ${i * 3.5}s infinite`,
                filter: "drop-shadow(0 0 6px oklch(0.85 0.15 200 / 0.8))",
              }}
            />
          ))}
        </div>

        <div className="relative mt-8 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          {/* Left HUD */}
          <div className="hidden flex-col gap-3 lg:flex">
            <HudCard label="Active stacks" value="14" sub="languages · frameworks" dot={catColor.frontend} />
            <HudCard label="Cloud regions" value="6" sub="multi-region deploys" dot={catColor.infra} />
            <Legend />
          </div>

          <motion.div
            ref={stage}
            style={{ rotate: rot, y: lift }}
            className="relative mx-auto grid h-[680px] w-full max-w-[720px] place-items-center [perspective:1400px]"
          >
            {/* aurora bloom */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="h-[420px] w-[420px] rounded-full bg-aurora/15 blur-[120px] animate-aurora" />
            </div>

            {/* radar sweep */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div
                className="h-[640px] w-[640px] rounded-full opacity-40"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, oklch(0.85 0.15 200 / 0.35) 30deg, transparent 60deg)",
                  WebkitMask: "radial-gradient(circle, transparent 40%, #000 41%, #000 100%)",
                  mask: "radial-gradient(circle, transparent 40%, #000 41%, #000 100%)",
                  animation: "spin 12s linear infinite",
                }}
              />
            </div>

            {/* cross reticle */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-30">
              <div className="h-full w-px bg-gradient-to-b from-transparent via-aurora/40 to-transparent" />
            </div>
            <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-30">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-aurora/40 to-transparent" />
            </div>

            {/* layered rings */}
            {orbits.map((o, idx) => (
              <div
                key={`r-${o.r}`}
                className="absolute rounded-full"
                style={{
                  width: o.r * 2,
                  height: o.r * 2,
                  transform: `translate(var(--mx,0), var(--my,0)) rotateX(62deg) rotateZ(${idx * 6}deg)`,
                  border: "1px solid oklch(1 0 0 / 0.09)",
                  boxShadow: "inset 0 0 60px oklch(1 0 0 / 0.04)",
                }}
              >
                {/* highlight arc */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(from ${idx * 90}deg, transparent 0deg, ${catColor[(["frontend", "backend", "infra"] as Cat[])[idx]]}/50 35deg, transparent 90deg)`,
                    WebkitMask: "radial-gradient(transparent calc(50% - 1.5px), #000 calc(50% - 1px), #000 50%, transparent calc(50% + 0.5px))",
                    mask: "radial-gradient(transparent calc(50% - 1.5px), #000 calc(50% - 1px), #000 50%, transparent calc(50% + 0.5px))",
                    animation: `spin ${o.dur * 1.6}s linear infinite`,
                    opacity: 0.7,
                  }}
                />
                {/* dashed ring */}
                <div
                  className="absolute inset-2 rounded-full"
                  style={{
                    border: "1px dashed oklch(1 0 0 / 0.07)",
                  }}
                />
              </div>
            ))}

            {/* core */}
            <div className="relative z-10 grid h-36 w-36 place-items-center">
              <div className="absolute inset-0 animate-aurora rounded-full bg-aurora/40 blur-3xl" />
              <div
                className="absolute inset-[-10px] rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, oklch(0.82 0.18 165 / .9), transparent 35%, oklch(0.78 0.16 230 / .8), transparent 70%, oklch(0.72 0.21 300 / .9), transparent)",
                  WebkitMask: "radial-gradient(transparent 58%, #000 60%, #000 64%, transparent 66%)",
                  mask: "radial-gradient(transparent 58%, #000 60%, #000 64%, transparent 66%)",
                  animation: "spin 14s linear infinite",
                }}
              />
              <div className="glass-panel relative grid h-28 w-28 place-items-center rounded-full !border-white/15 bg-background/70 shadow-2xl">
                <div className="text-center">
                  <div className="font-display text-2xl font-extrabold leading-none tracking-tight">
                    <span className="text-aurora">KM</span>
                  </div>
                  <div className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.32em] text-muted-foreground">
                    core · v3
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                    <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-emerald-400/90">online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* orbiting nodes */}
            {orbits.map((o, oi) => (
              <div
                key={oi}
                className="absolute"
                style={{
                  width: o.r * 2,
                  height: o.r * 2,
                  transform: "translate(var(--mx,0), var(--my,0))",
                  animation: `spin ${o.dur}s linear infinite`,
                }}
              >
                {o.items.map((it) => {
                  const rad = (it.angle * Math.PI) / 180;
                  const x = Math.cos(rad) * o.r + o.r;
                  const y = Math.sin(rad) * o.r + o.r;
                  const c = catColor[it.cat];
                  return (
                    <div
                      key={it.name}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: x, top: y, animation: `spin ${o.dur}s linear infinite reverse` }}
                    >
                      <div className="group relative" data-cursor>
                        <div
                          className="absolute -inset-3 rounded-full opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                          style={{ background: c }}
                        />
                        <div className="glass-panel relative grid h-16 w-16 place-items-center rounded-2xl px-2 text-center transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                          <div className="flex flex-col items-center gap-1">
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ background: c, boxShadow: `0 0 12px ${c}` }}
                            />
                            <span className="font-mono text-[9px] font-semibold tracking-tight text-foreground">
                              {it.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* HUD ticks */}
            <Corners />

            {/* coordinate readout */}
            <div className="pointer-events-none absolute left-2 top-2 font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground/80">
              <div>SYS · KM-CORE</div>
              <div className="text-aurora/80">28.61° N / 77.20° E</div>
            </div>
            <div className="pointer-events-none absolute bottom-2 right-2 text-right font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground/80">
              <div>SIGNAL · STABLE</div>
              <div className="text-emerald-400/90">◉ REC 00:{new Date().getMinutes().toString().padStart(2, "0")}:12</div>
            </div>
          </motion.div>

          {/* Right HUD */}
          <div className="hidden flex-col gap-3 lg:flex">
            <HudCard label="Projects shipped" value="40+" sub="web · mobile · ai" dot={catColor.mobile} align="right" />
            <HudCard label="Uptime SLA" value="99.98%" sub="last 12 months" dot={catColor.backend} align="right" />
            <HudCard label="Frameworks" value="React · RN · Next" sub="primary toolkit" dot={catColor.frontend} align="right" />
          </div>
        </div>

        {/* Telemetry ticker */}
        <div className="relative mt-12 overflow-hidden rounded-2xl glass-panel">
          <div className="flex items-center gap-8 whitespace-nowrap px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground [animation:ticker_40s_linear_infinite]">
            {[
              "◉ TypeScript · 98%",
              "◉ React · 96%",
              "◉ Node.js · 92%",
              "◉ React Native · 90%",
              "◉ MongoDB · 88%",
              "◉ Next.js · 94%",
              "◉ Firebase · 86%",
              "◉ Docker · 82%",
              "◉ GraphQL · 80%",
              "◉ Tailwind · 97%",
            ]
              .concat([
                "◉ TypeScript · 98%",
                "◉ React · 96%",
                "◉ Node.js · 92%",
                "◉ React Native · 90%",
                "◉ MongoDB · 88%",
                "◉ Next.js · 94%",
                "◉ Firebase · 86%",
                "◉ Docker · 82%",
                "◉ GraphQL · 80%",
                "◉ Tailwind · 97%",
              ])
              .map((t, i) => (
                <span key={i} className="text-foreground/70">
                  <span className="text-aurora">{t.slice(0, 2)}</span>
                  {t.slice(2)}
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HudCard({
  label,
  value,
  sub,
  dot,
  align = "left",
}: {
  label: string;
  value: string;
  sub: string;
  dot: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`glass-panel rounded-2xl p-4 ${align === "right" ? "text-right" : "text-left"}`}
    >
      <div className={`flex items-center gap-2 ${align === "right" ? "justify-end" : ""}`}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot, boxShadow: `0 0 10px ${dot}` }} />
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{label}</span>
      </div>
      <div className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">{value}</div>
      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{sub}</div>
    </div>
  );
}

function Legend() {
  const items: { label: string; cat: Cat }[] = [
    { label: "Frontend", cat: "frontend" },
    { label: "Backend", cat: "backend" },
    { label: "Mobile", cat: "mobile" },
    { label: "Infra", cat: "infra" },
  ];
  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Legend</div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {items.map((i) => (
          <div key={i.label} className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: catColor[i.cat], boxShadow: `0 0 10px ${catColor[i.cat]}` }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/80">{i.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Corners() {
  const cls = "absolute h-4 w-4 border-aurora/50";
  return (
    <>
      <span className={`${cls} left-0 top-0 border-l border-t`} />
      <span className={`${cls} right-0 top-0 border-r border-t`} />
      <span className={`${cls} bottom-0 left-0 border-b border-l`} />
      <span className={`${cls} bottom-0 right-0 border-b border-r`} />
    </>
  );
}