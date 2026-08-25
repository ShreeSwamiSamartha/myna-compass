import { createFileRoute } from "@tanstack/react-router";
import { Card, Flow, Page, Principle, Section, Table, Tag } from "../components/system";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "From Question to Care — Myna Journey Measurement" },
      {
        name: "description",
        content:
          "Measuring progression through a meaningful health journey rather than optimising conversations or sessions.",
      },
      { property: "og:title", content: "From Question to Care — Myna Journey Measurement" },
      {
        property: "og:description",
        content: "Journey stages, measurement hierarchy and an illustrative proof pathway.",
      },
    ],
  }),
  component: Journey,
});

const stages = [
  "Concern identified",
  "Information / triage",
  "Recommended action",
  "Referral",
  "Service / consultation",
  "Follow-up",
  "Outcome",
];

const hierarchy = [
  ["Reach", "Output"],
  ["Engagement", "Output"],
  ["Behaviour", "Intermediate"],
  ["Service uptake", "Closer to impact"],
  ["Health outcome", "Closer to impact"],
  ["Impact evidence", "Attribution"],
];

function Journey() {
  return (
    <Page
      eyebrow="Tab 2 — Journey"
      title="From Question to Care"
      subtitle="Myna should measure progression through a meaningful health journey rather than optimize only conversations or sessions."
    >
      <Section title="Journey stages" note="No percentages are invented">
        <Table
          headers={["Stage", "Users", "Conversion", "Drop-off", "Evidence source"]}
          rows={stages.map((s, i) => [
            <span className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">{i + 1}</span>
              {s}
            </span>,
            "TBD",
            "TBD",
            "TBD",
            <Tag kind="missing">TBD — requires data</Tag>,
          ])}
        />
      </Section>

      <Section title="Measurement hierarchy">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <ol className="space-y-3">
              {hierarchy.map(([name, kind], i) => (
                <li key={name} className="flex items-baseline justify-between gap-4 border-b border-border pb-2 last:border-0">
                  <span className="text-sm">
                    <span className="mr-3 font-mono text-xs text-muted-foreground">{i + 1}</span>
                    {name}
                  </span>
                  <span className="label-caps text-muted-foreground">{kind}</span>
                </li>
              ))}
            </ol>
          </Card>
          <Card className="flex items-center">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Reach and engagement are outputs. Service uptake and health outcomes are closer to
              impact. Attribution requires stronger evidence — research design, comparison groups
              or validated linkage — not more dashboard tiles.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        title="Anaemia — illustrative proof pathway"
        note="Illustrative framework — actual Myna baseline and outcome data required"
      >
        <Card className="space-y-5">
          <Tag kind="illustrative">Illustrative example</Tag>
          <Flow
            dense
            steps={[
              { label: "Screen", meta: "TBD — requires data" },
              { label: "Result", meta: "TBD — requires data" },
              { label: "Counselling", meta: "TBD — requires data" },
              { label: "Intervention", meta: "TBD — requires data" },
              { label: "Referral", meta: "TBD — requires data" },
              { label: "Follow-up", meta: "TBD — requires data" },
              { label: "Repeat haemoglobin", meta: "TBD — requires data" },
              { label: "Outcome", meta: "TBD — requires data" },
            ]}
          />
          <p className="text-sm text-muted-foreground">
            This pathway is shown because it is structurally complete end-to-end, not because it
            has been established as Myna's highest priority. Priority selection requires Myna
            prevalence, capability and feasibility data.
          </p>
        </Card>
      </Section>

      <Principle>
        Strategic question: is this pathway important because it is measurable, or measurable
        because it is strategically important?
      </Principle>
    </Page>
  );
}
