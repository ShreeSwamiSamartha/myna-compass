import type { ReactNode } from "react";

export type Evidence = "verified" | "proxy" | "hypothesis" | "missing" | "illustrative";

const evidenceStyles: Record<Evidence, string> = {
  verified: "border-verified/40 text-verified bg-verified/8",
  proxy: "border-proxy/40 text-proxy bg-proxy/8",
  hypothesis: "border-hypothesis/40 text-hypothesis bg-hypothesis/8",
  missing: "border-missing/40 text-missing bg-missing/8",
  illustrative: "border-primary/30 text-primary bg-primary/6",
};

export function Tag({
  kind = "missing",
  children,
}: {
  kind?: Evidence;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 label-caps ${evidenceStyles[kind]}`}
    >
      {children}
    </span>
  );
}

export function Page({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10 md:py-16">
      <header className="max-w-3xl">
        {eyebrow ? <p className="label-caps text-primary">{eyebrow}</p> : null}
        <h1 className="mt-3 text-3xl leading-tight md:text-5xl">{title}</h1>
        {subtitle ? (
          <p className="mt-4 text-base text-muted-foreground md:text-lg">{subtitle}</p>
        ) : null}
      </header>
      <div className="mt-12 space-y-14">{children}</div>
    </div>
  );
}

export function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3">
        <h2 className="text-xl md:text-2xl">{title}</h2>
        {note ? <p className="text-sm text-muted-foreground">{note}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-border bg-card p-5 ${className}`}>{children}</div>
  );
}

export function Kpi({
  label,
  value,
  caption,
  kind = "missing",
}: {
  label: string;
  value: string;
  caption: string;
  kind?: Evidence;
}) {
  return (
    <Card className="flex flex-col justify-between gap-4">
      <p className="label-caps text-muted-foreground">{label}</p>
      <div>
        <p className="font-serif text-3xl text-foreground/85">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{caption}</p>
      </div>
      <Tag kind={kind}>{kind === "missing" ? "Data required" : kind}</Tag>
    </Card>
  );
}

export function Flow({
  steps,
  dense = false,
}: {
  steps: { label: string; meta?: string }[];
  dense?: boolean;
}) {
  return (
    <ol className="flex flex-col gap-0">
      {steps.map((s, i) => (
        <li key={s.label} className="flex items-stretch gap-4">
          <div className="flex w-6 flex-col items-center">
            <span className="mt-4 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {i < steps.length - 1 ? <span className="w-px flex-1 bg-border" /> : null}
          </div>
          <div className={dense ? "pb-3 pt-2" : "pb-5 pt-2"}>
            <p className="text-sm font-medium">{s.label}</p>
            {s.meta ? <p className="text-sm text-muted-foreground">{s.meta}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-surface/60">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left label-caps text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border last:border-0 align-top">
              {r.map((c, j) => (
                <td
                  key={j}
                  className={`px-4 py-4 ${j === 0 ? "font-medium" : "text-muted-foreground"}`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Principle({ children }: { children: ReactNode }) {
  return (
    <blockquote className="rounded-lg border-l-2 border-primary bg-secondary/50 px-6 py-5">
      <p className="font-serif text-xl leading-snug md:text-2xl">{children}</p>
    </blockquote>
  );
}

export type DecisionState = "BUILD" | "MODIFY" | "VALIDATE" | "DEFER" | "STOP";

const decisionStyles: Record<DecisionState, string> = {
  BUILD: "bg-verified text-background",
  MODIFY: "bg-proxy text-background",
  VALIDATE: "bg-hypothesis text-background",
  DEFER: "bg-missing text-background",
  STOP: "bg-destructive text-destructive-foreground",
};

export function Decision({ state }: { state: DecisionState }) {
  return (
    <span
      className={`inline-flex rounded-sm px-2 py-1 label-caps ${decisionStyles[state]}`}
    >
      {state}
    </span>
  );
}
