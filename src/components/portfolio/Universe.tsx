import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "./Section";

const orbits: { r: number; dur: number; items: { name: string; angle: number }[] }[] = [
  {
    r: 130,
    dur: 28,
    items: [
      { name: "React", angle: 0 },
      { name: "Next.js", angle: 120 },
      { name: "TypeScript", angle: 240 },
    ],
  },
  {
    r: 210,
    dur: 44,
    items: [
      { name: "Node.js", angle: 30 },
      { name: "Express", angle: 150 },
      { name: "MongoDB", angle: 270 },
    ],
  },
  {
    r: 300,
    dur: 64,
    items: [
      { name: "Firebase", angle: 0 },
      { name: "React Native", angle: 90 },
      { name: "Docker", angle: 180 },
      { name: "GitHub", angle: 270 },
    ],
  },
];

export function Universe() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // Mouse parallax
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const on = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--mx", `${cx * 18}px`);
      el.style.setProperty("--my", `${cy * 18}px`);
    };
    el.addEventListener("mousemove", on);
    return () => el.removeEventListener("mousemove", on);
  }, []);

  return (
    <section id="universe" ref={ref} className="relative overflow-hidden px-6 py-32">
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

        <motion.div
          ref={stage}
          style={{ rotate: rot }}
          className="relative mx-auto grid h-[640px] w-full max-w-[720px] place-items-center [perspective:1200px]"
        >
          {/* rings */}
          {orbits.map((o) => (
            <div
              key={o.r}
              className="absolute rounded-full border border-white/8"
              style={{
                width: o.r * 2,
                height: o.r * 2,
                transform: "translate(var(--mx,0), var(--my,0)) rotateX(62deg)",
              }}
            />
          ))}

          {/* core */}
          <div className="relative z-10 grid h-32 w-32 place-items-center">
            <div className="absolute inset-0 animate-aurora rounded-full bg-aurora/30 blur-3xl" />
            <div className="relative grid h-28 w-28 place-items-center rounded-full bg-foreground text-background shadow-2xl">
              <div className="text-center">
                <div className="font-display text-xl font-bold leading-none">KM</div>
                <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.3em]">core</div>
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
                return (
                  <div
                    key={it.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: x, top: y, animation: `spin ${o.dur}s linear infinite reverse` }}
                  >
                    <div className="group relative">
                      <div className="absolute inset-0 rounded-full bg-aurora/30 blur-xl transition-opacity opacity-40 group-hover:opacity-90" />
                      <div className="glass-panel relative grid h-14 w-14 place-items-center rounded-full px-2 text-center font-mono text-[10px] font-medium text-foreground transition-transform group-hover:scale-110">
                        {it.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}