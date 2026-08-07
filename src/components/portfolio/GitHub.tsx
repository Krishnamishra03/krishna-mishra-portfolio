import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./Section";

const USERNAME = "Krishnamishra03";
const PROFILE_URL = `https://github.com/${USERNAME}`;

type Day = { date: string; count: number; level: number };

function Heatmap({ days }: { days: Day[] }) {
  const cells = days.length
    ? days.slice(-7 * 26 * 1).map((d) => d.level)
    : Array.from({ length: 7 * 26 }, () => 0);
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
          className={`size-3 rounded-[3px] ${colors[l] ?? colors[0]}`}
        />
      ))}
    </div>
  );
}

export function GitHub() {
  const [days, setDays] = useState<Day[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [stats, setStats] = useState([
    { k: "Repositories", v: "—" },
    { k: "Stars earned", v: "—" },
    { k: "Contributions / yr", v: "—" },
    { k: "Top language", v: "—" },
  ]);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
        ]);
        const user = await userRes.json();
        const repos: Array<{ stargazers_count: number; language: string | null }> =
          await reposRes.json();
        if (!alive || !Array.isArray(repos)) return;

        const starsEarned = repos.reduce((a, r) => a + (r.stargazers_count ?? 0), 0);
        const langCount = new Map<string, number>();
        repos.forEach((r) => {
          if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);
        });
        const topLang =
          [...langCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

        setStats((s) => [
          { k: "Repositories", v: String(user?.public_repos ?? repos.length) },
          { k: "Stars earned", v: String(starsEarned) },
          s[2],
          { k: "Top language", v: topLang },
        ]);
      } catch {
        /* keep placeholders */
      }

      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
        );
        const data = await res.json();
        if (!alive || !Array.isArray(data?.contributions)) return;
        setDays(data.contributions);
        const t = data?.total?.lastYear ?? null;
        setTotal(t);
        if (t != null) {
          setStats((s) =>
            s.map((x) => (x.k === "Contributions / yr" ? { ...x, v: String(t) } : x)),
          );
        }
      } catch {
        /* keep placeholders */
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="relative bg-card/20 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="06 / Open Source"
          title={<>A consistent <span className="text-aurora">commit</span> cadence.</>}
          description="Shipping code in the open. These numbers are pulled live from my GitHub profile."
        />
        <div className="glass-panel rounded-3xl p-8 md:p-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <a
                href={PROFILE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
              >
                @{USERNAME}
              </a>
              <div className="mt-1 font-display text-2xl font-semibold">
                {total != null ? total.toLocaleString() : "—"} contributions in the last year
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
          <div className="overflow-x-auto pb-2"><Heatmap days={days} /></div>
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
          <div className="mt-8">
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-aurora/60 hover:text-foreground"
            >
              View profile on GitHub →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}