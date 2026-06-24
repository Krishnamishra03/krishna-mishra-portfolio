import { motion } from "framer-motion";
import { SectionHeader } from "./Section";

const services = [
  { n: "01", t: "Full Stack Web Development", d: "Production React, Next.js and Node systems. Type-safe end to end." },
  { n: "02", t: "Mobile App Development", d: "React Native apps shipped to App Store and Play Store, fully native feel." },
  { n: "03", t: "Admin Dashboard Development", d: "Data-dense dashboards with real-time charts, RBAC, and audit trails." },
  { n: "04", t: "API Integration", d: "REST, GraphQL, webhooks. Payment, auth, mapping, comms — wired cleanly." },
  { n: "05", t: "AI Powered Applications", d: "LLM agents, computer vision pipelines, voice assistants, embeddings." },
  { n: "06", t: "UI / UX Design", d: "Interfaces engineered like industrial design — precise, calm, intentional." },
];

export function Services() {
  return (
    <section id="services" className="relative bg-card/20 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="03 / Services"
          title={<>Engineered offerings,<br />priced like <span className="text-aurora">infrastructure.</span></>}
        />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-background p-8 transition-colors hover:bg-card md:p-10"
            >
              <div className="mb-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                <span>{s.n}</span>
                <span className="opacity-0 transition-opacity group-hover:opacity-100">↗</span>
              </div>
              <h3 className="mb-3 font-display text-2xl font-semibold tracking-tight">{s.t}</h3>
              <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              <div className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-aurora to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}