import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "./Magnetic";

export function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };
  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="glass-panel relative overflow-hidden rounded-[32px] p-8 md:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-aurora/20 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-10 h-80 w-80 rounded-full bg-violet-500/15 blur-[120px]" />
          <div className="relative grid gap-12 md:grid-cols-[1fr_1.1fr]">
            <div className="space-y-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-aurora">08 / Contact</span>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                Let&apos;s build <br />
                <span className="text-aurora">something premium.</span>
              </h2>
              <p className="max-w-sm text-pretty text-muted-foreground">
                I take on a small number of projects each quarter. Tell me what you&apos;re building — I usually reply within a day.
              </p>
              <div className="space-y-3 pt-4">
                <a href="mailto:krishanamishra913@gmail.com" className="block font-display text-lg underline decoration-border underline-offset-8 transition-all hover:decoration-foreground">
                  krishanamishra913@gmail.com
                </a>
                <div className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  <a className="hover:text-foreground" href="https://github.com/Krishnamishra03" target="_blank" rel="noreferrer noopener">GitHub</a>
                  <a className="hover:text-foreground" href="https://www.linkedin.com/in/krishna-mishra-4199a3250/" target="_blank" rel="noreferrer noopener">LinkedIn</a>
                  <a className="hover:text-foreground" href="https://x.com/Thekrishna02" target="_blank" rel="noreferrer noopener">Twitter</a>
                </div>
              </div>
            </div>
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" />
                <Field label="Email" name="email" type="email" />
              </div>
              <Field label="Phone" name="phone" type="tel" required={false} />
              <TextareaField label="Message" name="message" />
              <Magnetic as="div" strength={0.25} radius={160} className="mt-2 w-full">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full rounded-xl bg-foreground py-3.5 text-sm font-semibold text-background transition-all hover:opacity-90"
                >
                  {sent ? "Sent ✓  I'll be in touch" : "Send transmission"}
                </motion.button>
              </Magnetic>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required = true }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block space-y-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-aurora/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-aurora/20"
      />
    </label>
  );
}

function TextareaField({ label, name }: { label: string; name: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <textarea
        name={name}
        required
        rows={5}
        className="w-full resize-none rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-aurora/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-aurora/20"
      />
    </label>
  );
}
