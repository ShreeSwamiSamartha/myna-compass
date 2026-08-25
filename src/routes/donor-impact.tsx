import { createFileRoute } from "@tanstack/react-router";
import { Card, Flow, Page, Principle, Section, Table, Tag } from "../components/system";

export const Route = createFileRoute("/donor-impact")({
  head: () => ({
    meta: [
      { title: "Grant → Product → Outcome — Myna Donor & Impact View" },
      {
        name: "description",
        content:
          "Translating donor commitments into outcomes: grant objectives, product journeys, service uptake, outcomes and the next funding decision.",
      },
      { property: "og:title", content: "Grant → Product → Outcome — Myna Donor & Impact View" },
      {
        property: "og:description",
        content: "Donor requirements translated into outcomes, not blindly into features.",
      },
    ],
  }),
  component: DonorImpact,
});

const grantFields = [
  ["Funding", "TBD"],
  ["Objective", "Improve access to a defined women's-health pathway"],
  ["Target", "TBD"],
  ["Product intervention", "TBD"],
  ["Output KPI", "TBD"],
  ["Journey KPI", "TBD"],
  ["Outcome KPI", "TBD"],
  ["Evidence", "TBD"],
  ["Decision", "Scale / Modify / Stop"],
];

function DonorImpact() {
  return (
    <Page
      eyebrow="Tab 5 — Donor / Impact"
      title="Grant → Product → Outcome"
      subtitle="Donor requirements should be translated into outcomes, not blindly translated into features."
    >
      <Section title="Funding-to-evidence chain">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <Flow
              dense
              steps={[
                { label: "Grant" },
                { label: "Desired outcome" },
                { label: "Target population" },
                { label: "Intervention" },
                { label: "Product journey" },
                { label: "Behaviour" },
                { label: "Service uptake" },
                { label: "Outcome" },
                { label: "Evidence" },
                { label: "Next funding decision" },
              ]}
            />
          </Card>
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl">Illustrative grant</h3>
              <Tag kind="illustrative">Illustrative example</Tag>
            </div>
            <dl className="divide-y divide-border">
              {grantFields.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="label-caps text-muted-foreground">{k}</dt>
                  <dd className="text-right text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </Section>

      <Section title="Do not report only what we built">
        <Card>
          <Flow
            dense
            steps={[
              { label: "Features shipped", meta: "Activity" },
              { label: "Users reached", meta: "Output" },
              { label: "Journeys completed", meta: "Progression" },
              { label: "Services accessed", meta: "Closer to impact" },
              { label: "Outcomes observed", meta: "Impact" },
              { label: "Evidence generated", meta: "Attribution" },
            ]}
          />
        </Card>
      </Section>

      <Section title="Grant / product alignment" note="Scores are not fabricated">
        <Table
          headers={["Dimension", "Assessment", "Basis"]}
          rows={[
            ["User impact", "TBD", "Requires field evidence"],
            ["Strategic fit", "TBD", "Requires strategy alignment review"],
            ["Evidence", "TBD", "Requires evidence classification"],
            ["Outcome measurability", "TBD", "Requires instrumentation plan"],
            ["Reusability", "TBD", "Requires capability audit"],
            ["Engineering effort", "TBD", "Requires estimate"],
            ["Technical debt", "TBD", "Requires architecture review"],
            ["Donor commitment", "TBD", "Requires grant terms"],
          ].map(([d, v, b]) => [d, <Tag kind="missing">{v}</Tag>, b])}
        />
        <p className="text-sm text-muted-foreground">
          Assessment scale once data exists: Strong / Medium / Weak. Until then the honest value is
          TBD — requires data.
        </p>
      </Section>

      <Principle>
        Every donor requirement must answer one question: what outcome is actually being funded?
      </Principle>
    </Page>
  );
}
