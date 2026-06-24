import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`mb-14 flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-aurora">
        {eyebrow}
      </span>
      <h2 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}