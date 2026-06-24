import { motion } from "framer-motion";
import { SectionHeader } from "./Section";

type Cert = {
  title: string;
  issuer: string;
  year: string;
  id: string;
  skills: string[];
  accent: string;
  featured?: boolean;
};

const certs: Cert[] = [
  {
    title: "Meta Front-End Developer",
    issuer: "Meta · Coursera",
    year: "2025",
    id: "MFE-2K25-014",
    skills: ["React", "UI Systems", "Accessibility"],
    accent: "oklch(0.82 0.18 165)",
    featured: true,
  },
  {
    title: "AWS Certified Developer — Associate",
    issuer: "Amazon Web Services",
    year: "2024",
    id: "AWS-DEV-A-9821",
    skills: ["Lambda", "DynamoDB", "S3", "CI/CD"],
    accent: "oklch(0.84 0.15 80)",
  },
  {
    title: "Google UX Design Professional",
    issuer: "Google · Coursera",
    year: "2024",
    id: "GUX-PRO-4471",
    skills: ["Research", "Prototyping", "Figma"],
    accent: "oklch(0.78 0.16 230)",
  },
  {
    title: "MongoDB Associate Developer",
    issuer: "MongoDB University",
    year: "2023",
    id: "MDB-ADEV-3120",
    skills: ["Aggregation", "Indexing", "Atlas"],
    accent: "oklch(0.72 0.21 300)",
  },
  {
    title: "React Native — The Practical Guide",
    issuer: "Academind",
    year: "2023",
    id: "RN-PR-7765",
    skills: ["Expo", "Native Modules", "Animations"],
    accent: "oklch(0.82 0.18 165)",
  },
  {
    title: "Stripe Certified Integration Engineer",
    issuer: "Stripe",
    year: "2025",
    id: "STR-CIE-2208",
    skills: ["Payments", "Webhooks", "Subscriptions"],
    accent: "oklch(0.78 0.16 230)",
  },
];

export function Certificates() {
  return (
    <section id="certificates" className="relative overflow-hidden px-6 py-32">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-aurora/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(1 0 0 / .4) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / .4) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="07 / Certifications"
            title={
              <>
                Receipts for the craft.
                <br />
                <span className="text-aurora">Verified. Stamped. Signed.</span>
              </>
            }
          />
          <div className="hidden items-center gap-3 pb-14 md:flex">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Issued · 2023 → 2025
            </span>
            <span className="h-px w-16 bg-gradient-to-r from-aurora to-transparent" />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-6">
          {certs.map((c, i) => (
            <CertCard key={c.id} cert={c} index={i} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              All credentials are verifiable on issuer registries
            </span>
          </div>
          <a
            href="#contact"
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/80 underline decoration-aurora/40 underline-offset-4 transition-colors hover:text-aurora"
          >
            Request transcript →
          </a>
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert, index }: { cert: Cert; index: number }) {
  const span = cert.featured ? "md:col-span-3" : "md:col-span-2";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative ${span}`}
    >
      <div
        className="absolute inset-0 -z-10 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: cert.accent }}
      />
      <div className="glass-panel relative h-full overflow-hidden rounded-3xl p-6 transition-all duration-500 group-hover:-translate-y-1">
        {/* accent stripe */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${cert.accent}, transparent)`,
          }}
        />
        {/* corner sigil */}
        <div className="absolute right-5 top-5 grid h-14 w-14 place-items-center">
          <div
            className="absolute inset-0 rounded-full opacity-30 blur-md"
            style={{ background: cert.accent }}
          />
          <div className="relative grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-background/60">
            <div
              className="absolute inset-1 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, ${cert.accent}, transparent 40%, ${cert.accent} 70%, transparent)`,
                WebkitMask:
                  "radial-gradient(transparent 60%, #000 62%, #000 68%, transparent 70%)",
                mask: "radial-gradient(transparent 60%, #000 62%, #000 68%, transparent 70%)",
                animation: "spin 14s linear infinite",
              }}
            />
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-foreground">
              {cert.year}
            </span>
          </div>
        </div>

        {/* meta */}
        <div className="mb-10 flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: cert.accent, boxShadow: `0 0 10px ${cert.accent}` }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {cert.issuer}
          </span>
        </div>

        {/* title */}
        <h3 className="max-w-[80%] font-display text-xl font-bold leading-tight tracking-tight text-foreground md:text-2xl">
          {cert.title}
        </h3>

        {/* skills */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {cert.skills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/80"
            >
              {s}
            </span>
          ))}
        </div>

        {/* id strip */}
        <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            ID · <span className="text-foreground/90">{cert.id}</span>
          </div>
          <a
            href="#"
            data-cursor
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/80 transition-colors group-hover:text-aurora"
          >
            Verify →
          </a>
        </div>

        {/* watermark */}
        <div className="pointer-events-none absolute -bottom-10 -right-6 font-display text-[120px] font-extrabold leading-none tracking-tighter text-foreground/[0.025]">
          {cert.year}
        </div>
      </div>
    </motion.div>
  );
}