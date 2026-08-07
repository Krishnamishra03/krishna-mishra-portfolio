import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./Section";

type Line = { kind: "in" | "out"; text: string };

import resumeAsset from "@/assets/Krishna_Kumar_Mishra_Resume.pdf.asset.json";

const responses: Record<string, string[]> = {
  whoami: ["krishna_mishra — software engineer · full stack · mobile"],
  skills: [
    "frontend  : react, next.js, typescript, tailwind",
    "backend   : node.js, express, php",
    "mobile    : react native, android",
    "database  : mongodb, mysql, firebase",
    "tools     : git, github, postman, vscode",
  ],
  projects: [
    "01  care_connect          healthcare platform",
    "02  rail-vision           ai pole detection",
    "03  gyan_ai               smart agriculture",
    "04  lumen_wallpapers      mobile app",
  ],
  experience: [
    "zidio development · web developer intern",
    "→ frontend, ui polish, git collaboration, bug-fixing",
  ],
  github: ["github.com/Krishnamishra03 · 17 public repos · live stats in the open source section"],
  resume: ["krishna_kumar_mishra_resume.pdf — type `download` to fetch"],
  download: ["initiating download...", `→ ${resumeAsset.url}`],
  contact: ["mail: hello@krishna.dev", "scroll to #contact to send a message"],
  help: ["available: whoami, skills, projects, experience, github, resume, download, contact, clear"],
};

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "krishna-os v3.0 — type `help` to begin" },
  ]);
  const [val, setVal] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const submit = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    if (!c) return;
    if (c === "clear") {
      setLines([{ kind: "out", text: "" }]);
      return;
    }
    const out = responses[c] ?? [`command not found: ${c} — try \`help\``];
    setLines((l) => [...l, { kind: "in", text: c }, ...out.map((t) => ({ kind: "out" as const, text: t }))]);
  };

  return (
    <section id="terminal" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="05 / Console"
          title={
            <>
              An <span className="text-aurora">interactive</span> resume,
              <br />
              at the speed of keystrokes.
            </>
          }
        />
        <div
          onClick={() => input.current?.focus()}
          className="glass-panel mx-auto max-w-3xl overflow-hidden rounded-2xl"
        >
          <div className="flex items-center gap-2 border-b border-border/60 bg-white/[0.02] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-3 font-mono text-[11px] text-muted-foreground">~ /krishna — zsh</span>
          </div>
          <div
            ref={scroller}
            className="h-[340px] overflow-y-auto px-5 py-4 font-mono text-[13px] leading-relaxed"
          >
            {lines.map((l, i) =>
              l.kind === "in" ? (
                <div key={i} className="text-foreground">
                  <span className="text-aurora">➜</span>{" "}
                  <span className="text-violet-300">~</span> {l.text}
                </div>
              ) : (
                <div key={i} className="whitespace-pre text-muted-foreground">
                  {l.text}
                </div>
              ),
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(val);
                setVal("");
              }}
              className="mt-1 flex items-center gap-2 text-foreground"
            >
              <span className="text-aurora">➜</span>
              <span className="text-violet-300">~</span>
              <input
                ref={input}
                value={val}
                onChange={(e) => setVal(e.target.value)}
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/40"
                placeholder="type `help`"
              />
              <span className="inline-block h-4 w-[7px] animate-pulse bg-aurora" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}