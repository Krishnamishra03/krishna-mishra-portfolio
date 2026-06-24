import { motion } from "framer-motion";
import { SectionHeader } from "./Section";
import careConnect from "@/assets/project-care-connect.jpg";
import railway from "@/assets/project-railway.jpg";
import gyan from "@/assets/project-gyan-ai.jpg";
import wallpaper from "@/assets/project-wallpaper.jpg";

const projects = [
  {
    img: careConnect,
    n: "01",
    name: "Care Connect",
    tag: "Healthcare Platform",
    desc: "End-to-end healthcare management — doctor appointments, video consultations, Razorpay payments, and a clinical admin dashboard.",
    stack: ["Next.js", "Node.js", "MongoDB", "Razorpay", "WebRTC"],
  },
  {
    img: railway,
    n: "02",
    name: "Rail-Vision Detection",
    tag: "AI / Computer Vision",
    desc: "YOLO-powered pole detection along railway corridors, with GPS-tagged inspection and automated CSV reporting.",
    stack: ["Python", "YOLOv8", "OpenCV", "FastAPI", "GPS"],
  },
  {
    img: gyan,
    n: "03",
    name: "Gyan AI",
    tag: "Smart Agriculture",
    desc: "Voice + vision farming assistant for the field — multilingual chatbot, crop image recognition, and intelligent recommendations.",
    stack: ["React Native", "OpenAI", "Firebase", "Vision API"],
  },
  {
    img: wallpaper,
    n: "04",
    name: "Lumen Wallpapers",
    tag: "Mobile App",
    desc: "Curated premium wallpaper app — categories, favorites, high-res downloads, and a refined dark interface.",
    stack: ["React Native", "Firebase", "Expo"],
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
              <a href="#" className="block">
                <div className="relative mb-6 overflow-hidden rounded-3xl glass-panel p-1.5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-card">
                    <img
                      src={p.img}
                      alt={`${p.name} — ${p.tag}`}
                      width={1600}
                      height={1024}
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