import { createFileRoute } from "@tanstack/react-router";
import { Card, Flow, Page, Principle, Section, Table, Tag, type Evidence } from "../components/system";

export const Route = createFileRoute("/data-confidence")({
  head: () => ({
    meta: [
      { title: "Evidence & Data Confidence — Myna Product System" },
      {
        name: "description",
        content:
          "A confidence layer that prevents false precision: verified, proxy, hypothesis and missing evidence with required instrumentation.",
      },
      { property: "og:title", content: "Evidence & Data Confidence — Myna Product System" },
      {
        property: "og:description",
        content: "Preventing false precision across Myna's product and impact measurement.",
      },
    ],
  }),
  component: DataConfidence,
});

const levels: [Evidence, string, string][] = [
  ["verified", "Verified", "Directly available from Myna systems or validated internal data."],
  ["proxy", "Proxy", "External research/population data used because Myna-specific data is unavailable."],
  ["hypothesis", "Hypothesis", "Strategic assumption requiring validation."],
  ["missing", "Missing", "Myna currently does not capture the required information."],
];

const rows: [string, Evidence, string, string, string][] = [
  [
    "Latency",
    "missing",
    "Team reports latency / blank-page issues",
    "Actual latency/error distribution",
    "Instrument backend + frontend events",
  ],
  [
    "Referral completion",
    "missing",
    "Referral capability exists in some journeys",
    "End-to-end completion measurement",
    "Instrument referral funnel",
  ],
  [
    "Anaemia prevalence",
    "proxy",
    "External Maharashtra evidence may provide population-level context",
    "Myna-specific prevalence",
    "Compare with programme baseline",
  ],
  [
    "Vitamin D",
    "hypothesis",
    "Potentially measurable through before/after testing",
    "Strategic priority, prevalence, intervention feasibility and Myna capability",
    "Compare against alternative pathways",
  ],
  [
    "Clinical outcome",
    "missing",
    "Behavioural/product data is easier to collect",
    "Consent-aware longitudinal outcome linkage",
    "Define privacy-preserving measurement architecture",
  ],
];

function DataConfidence() {
  return (
    <Page
      eyebrow="Tab 4 — Data Confidence"
      title="Evidence & Data Confidence"
      subtitle="This layer exists to prevent false precision. Every claim carries its evidence class and the instrumentation it still requires."
    >
      <Section title="Evidence levels">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map(([kind, name, desc]) => (
            <Card key={name} className="space-y-3">
              <Tag kind={kind}>{name}</Tag>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Current evidence position" note="Illustrative of how each metric is classified">
        <Table
          headers={["Metric", "Status", "What we know", "What is missing", "Next action"]}
          rows={rows.map(([m, s, know, missing, next]) => [
            m,
            <Tag kind={s}>{s}</Tag>,
            know,
            missing,
            next,
          ])}
        />
      </Section>

      <Principle>I would rather show “data unavailable” than manufacture precision.</Principle>

      <Section title="Measurement architecture">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <Flow
              dense
              steps={[
                { label: "Aggregate behaviour" },
                { label: "Pseudonymous journey continuity where legitimately permitted" },
                { label: "Consented service linkage where appropriate" },
                { label: "Research cohorts / RCT evidence" },
                { label: "Outcome measurement" },
              ]}
            />
          </Card>
          <Card className="flex items-center">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="label-caps text-foreground">Privacy note — </span>
              Do not assume anonymity makes measurement impossible, and do not assume identity
              linkage is automatically permissible. Validate the legal, consent and technical
              architecture before implementing longitudinal linkage.
            </p>
          </Card>
        </div>
      </Section>
    </Page>
  );
}
