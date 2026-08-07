import { motion } from "framer-motion";
import { SectionHeader } from "./Section";
import railGps from "@/assets/project-railgps-tracker.jpg";
import eduFeedback from "@/assets/project-edufeedback.jpg";
import careConnectAsset from "@/assets/care-connect.png.asset.json";
import finSightAsset from "@/assets/finsight-ai.png.asset.json";
import kailoraAsset from "@/assets/kailora-wallpaper.png.asset.json";

const projects = [
  {
    img: careConnectAsset.url,
    n: "01",
    name: "Care Connect",
    tag: "Healthcare Platform",
    desc: "End-to-end healthcare management — doctor appointments, video consultations, and a clinical admin dashboard built for real-world patient care.",
    stack: ["JavaScript", "Node.js", "MongoDB", "WebRTC"],
    link: "https://care-connect-ten-alpha.vercel.app/",
  },
  {
    img: railGps,
    n: "02",
    name: "Rail GPS Tracker",
    tag: "Mobile / Android",
    desc: "Android app that records 1080p video with a real-time GPS overlay burned into the feed, plus frame-by-frame CSV export for railway inspections.",
    stack: ["Kotlin", "Android", "Camera2", "GPS", "CSV"],
    link: "https://github.com/Krishnamishra03/RailGps_Tracker",
  },
  {
    img: eduFeedback,
    n: "03",
    name: "EduFeedback",
    tag: "EdTech / Android",
    desc: "Modern Android app for academic feedback collection — QR form sharing & scanning, real-time response analytics for admins, teachers, and students.",
    stack: ["Kotlin", "Jetpack Compose", "QR", "Firebase"],
    link: "https://github.com/Krishnamishra03/EduFeedback",
  },
  {
    img: finSightAsset.url,
    n: "04",
    name: "FinSight AI",
    tag: "AI Finance / Android",
    desc: "Kotlin-built AI finance app that scans receipts, tracks spending, and delivers private offline financial advice through an on-device intelligence layer.",
    stack: ["Kotlin", "Android", "AI/ML", "Llama 3.3", "Jetpack Compose"],
    link: "https://finsight-sparkle.lovable.app/",
  },
  {
    img: kailoraAsset.url,
    n: "05",
    name: "Kailora Wallpaper",
    tag: "Wallpaper Platform",
    desc: "Premium wallpaper website with curated 4K collections, category discovery, favorites, and a cinematic dark gallery built for creators.",
    stack: ["React", "Next.js", "CDN", "Stripe"],
    link: "https://www.kailoralabs.in/",
  },
];

export function Projects() {
  return (
    <section id="work" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="04 / Selected Works"
          title={<>Cinematic projects,<br />shipped to <span className="text-aurora">production.</span></>}
        />
        <div className="grid gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-20">
          {projects.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: (i % 2) * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative ${i % 2 === 1 ? "md:translate-y-16" : ""}`}
            >
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative mb-6 overflow-hidden rounded-3xl glass-panel p-1.5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-card">
                    <img
                      src={p.img}
                      alt={`${p.name} — ${p.tag}`}
                      width={1280}
                      height={960}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute left-5 top-5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    {p.n} · {p.tag}
                  </div>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-3">
                    <h3 className="font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-aurora">
                      {p.name}
                    </h3>
                    <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-1.5 grid size-10 shrink-0 place-items-center rounded-full border border-border text-sm transition-all group-hover:bg-foreground group-hover:text-background">
                    ↗
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
