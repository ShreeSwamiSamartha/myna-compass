import { createFileRoute } from "@tanstack/react-router";
import { Card, Kpi, Page, Principle, Section, Tag } from "../components/system";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Executive Overview — Myna Product & Impact System" },
      {
        name: "description",
        content:
          "From product activity to completed, measurable health journeys: the executive view of Myna's product decision system.",
      },
      { property: "og:title", content: "Executive Overview — Myna Product & Impact System" },
      {
        property: "og:description",
        content: "From product activity to completed, measurable health journeys.",
      },
    ],
  }),
  component: Executive,
});

const questions = [
  { key: "A", q: "Is the product working?", d: "Reliability and usability before growth." },
  {
    key: "B",
    q: "Are women progressing through meaningful journeys?",
    d: "Stage progression, not session counts.",
  },
  {
    key: "C",
    q: "Are we producing measurable outcomes?",
    d: "Service uptake and health outcomes, with honest attribution.",
  },
  {
    key: "D",
    q: "Are we allocating limited resources intelligently?",
    d: "Every build decision has an opportunity cost.",
  },
];

const kpis = [
  ["Women reached", "TBD", "Requires Myna programme data"],
  ["Activated women", "TBD", "Requires product analytics"],
  ["Completed health journeys", "TBD", "Requires journey instrumentation"],
  ["Verified care completions", "TBD", "Requires consented/referral data"],
  ["Verified outcomes", "TBD", "Requires outcome data"],
  ["Product reliability", "Baseline required", "Latency/error instrumentation"],
  ["Cost per completed journey", "TBD", "Requires grant + product cost data"],
  ["Evidence strength", "To establish", "Research + product evidence"],
] as const;

function Executive() {
  return (
    <Page
      eyebrow="Tab 1 — Executive"
      title="Myna Product & Impact Overview"
      subtitle="From product activity to completed, measurable health journeys."
    >
      <Section title="Four strategic questions" note="What this system exists to answer">
        <div className="grid gap-4 md:grid-cols-2">
          {questions.map((q) => (
            <Card key={q.key} className="flex gap-4">
              <span className="font-serif text-2xl text-primary">{q.key}</span>
              <div>
                <p className="font-medium">{q.q}</p>
                <p className="mt-1 text-sm text-muted-foreground">{q.d}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Indicator frame"
        note="No values are invented — each card states the instrumentation required"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map(([label, value, caption]) => (
            <Kpi key={label} label={label} value={value} caption={caption} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Every indicator must answer one question: what decision would this change? If nothing
          changes, we do not measure it.
        </p>
      </Section>

      <Principle>
        Core principle: a completed conversation is not the same thing as a completed health
        journey.
      </Principle>

      <Section title="Evidence legend" note="Applied consistently across every tab">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["verified", "Verified Myna data", "Directly available from Myna systems"],
            ["proxy", "External / proxy evidence", "Population or research data"],
            ["hypothesis", "Hypothesis", "Strategic assumption to validate"],
            ["missing", "Missing data", "Not currently captured"],
          ].map(([kind, title, desc]) => (
            <Card key={title} className="space-y-2">
              <Tag kind={kind as never}>{title}</Tag>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Operating principles">
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Don't optimize conversations. Optimize completed health journeys.",
            "Donor requirements should be translated into outcomes, not blindly translated into features.",
            "Behaviour is not the same as health outcome.",
            "Privacy and measurement must be designed together.",
            "With limited engineering capacity, prioritization means deciding what NOT to build.",
            "A dashboard should create decisions, not false confidence.",
          ].map((p, i) => (
            <li key={p} className="flex gap-3 border-b border-border pb-3 text-sm">
              <span className="font-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Section>
    </Page>
  );
}
