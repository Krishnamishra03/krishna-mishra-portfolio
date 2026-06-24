import { motion } from "framer-motion";
import { SectionHeader } from "./Section";

function Heatmap() {
  const cells = Array.from({ length: 7 * 26 }, (_, i) => {
    const seed = Math.sin(i * 12.9898) * 43758.5453;
    const r = seed - Math.floor(seed);
    return r < 0.45 ? 0 : r < 0.7 ? 1 : r < 0.85 ? 2 : r < 0.95 ? 3 : 4;
  });
  const colors = [
    "bg-white/[0.04]",
    "bg-aurora/20",
    "bg-aurora/40",
    "bg-aurora/60",
    "bg-aurora/90",
  ];
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-1">
      {cells.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 26) * 0.01, duration: 0.4 }}
          className={`size-3 rounded-[3px] ${colors[l]}`}
        />
      ))}
    </div>
  );
}

const stats = [
  { k: "Repositories", v: "48" },
  { k: "Stars earned", v: "320" },
  { k: "Commits / yr", v: "1.2k" },
  { k: "Top language", v: "TS" },
];

export function GitHub() {
  return (
    <section className="relative bg-card/20 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="06 / Open Source"
          title={<>A consistent <span className="text-aurora">commit</span> cadence.</>}
          description="Shipping code in the open. Numbers refresh from GitHub in production deploys."
        />
        <div className="glass-panel rounded-3xl p-8 md:p-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                @krishna-mishra
              </div>
              <div className="mt-1 font-display text-2xl font-semibold">
                1,248 contributions in the last year
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span>Less</span>
              <span className="size-3 rounded-[3px] bg-white/[0.04]" />
              <span className="size-3 rounded-[3px] bg-aurora/20" />
              <span className="size-3 rounded-[3px] bg-aurora/40" />
              <span className="size-3 rounded-[3px] bg-aurora/60" />
              <span className="size-3 rounded-[3px] bg-aurora/90" />
              <span>More</span>
            </div>
          </div>
          <div className="overflow-x-auto pb-2"><Heatmap /></div>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.k}>
                <div className="font-display text-3xl font-bold">{s.v}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}