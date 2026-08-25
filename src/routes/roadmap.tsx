import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  Decision,
  Flow,
  Page,
  Section,
  Table,
  Tag,
  type DecisionState,
} from "../components/system";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap Decision Engine — Myna Product System" },
      {
        name: "description",
        content:
          "Keep the existing roadmap. Add an evidence-based decision layer across field evidence, donor objectives, engineering reality, measurement and privacy.",
      },
      { property: "og:title", content: "Roadmap Decision Engine — Myna Product System" },
      {
        property: "og:description",
        content: "Keep the existing roadmap. Add an evidence-based decision layer.",
      },
    ],
  }),
  component: Roadmap,
});

const rows: {
  initiative: string;
  field: string;
  donor: string;
  fit: string;
  eng: string;
  meas: string;
  privacy: string;
  decision: DecisionState;
}[] = [
  {
    initiative: "Reliability / latency improvement",
    field: "Team reports latency and blank-page issues",
    donor: "Enabling — underpins every funded journey",
    fit: "Strong",
    eng: "TBD — requires baseline",
    meas: "Instrumentation required",
    privacy: "Low risk",
    decision: "BUILD",
  },
  {
    initiative: "Existing donor-requested feature",
    field: "TBD",
    donor: "Committed",
    fit: "Validate",
    eng: "TBD — effort estimate required",
    meas: "Output measurable; outcome TBD",
    privacy: "Validate",
    decision: "MODIFY",
  },
  {
    initiative: "Anaemia journey pilot",
    field: "Proxy — external population evidence",
    donor: "TBD",
    fit: "Validate",
    eng: "TBD",
    meas: "Feasible with referral + follow-up instrumentation",
    privacy: "Consent design required",
    decision: "VALIDATE",
  },
  {
    initiative: "New AI capability",
    field: "TBD",
    donor: "TBD",
    fit: "Validate",
    eng: "High — capacity unknown",
    meas: "Outcome link unproven",
    privacy: "Safety review required",
    decision: "DEFER",
  },
  {
    initiative: "Database / technical refactoring",
    field: "Not user-visible",
    donor: "None directly",
    fit: "Enabling",
    eng: "TBD",
    meas: "Reliability proxy metrics",
    privacy: "Data-handling review",
    decision: "VALIDATE",
  },
];

const states: [DecisionState, string][] = [
  ["BUILD", "Strong evidence + strategic fit + feasible + measurable"],
  ["MODIFY", "Outcome is legitimate but proposed solution can be improved"],
  ["VALIDATE", "Potentially valuable but evidence insufficient"],
  ["DEFER", "Important but capacity/dependency prevents immediate execution"],
  ["STOP", "Weak evidence / low strategic fit / poor resource economics"],
];

function Roadmap() {
  return (
    <Page
      eyebrow="Tab 3 — Roadmap Decision Engine"
      title="Roadmap Decision Engine"
      subtitle="Keep the existing roadmap. Add an evidence-based decision layer."
    >
      <Card>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Myna's roadmap should remain responsive to donor commitments, but every initiative
          should also be evaluated against field evidence, strategic fit, engineering reality,
          measurement feasibility, privacy/safety and resource constraints.
        </p>
      </Card>

      <Section title="Illustrative roadmap examples" note="Not actual current roadmap items">
        <Tag kind="illustrative">Illustrative example</Tag>
        <Table
          headers={[
            "Initiative",
            "User / field evidence",
            "Donor objective",
            "Strategic fit",
            "Engineering reality",
            "Measurement",
            "Privacy / safety",
            "Decision",
          ]}
          rows={rows.map((r) => [
            r.initiative,
            r.field,
            r.donor,
            r.fit,
            r.eng,
            r.meas,
            r.privacy,
            <Decision state={r.decision} />,
          ])}
        />
      </Section>

      <Section title="Decision states">
        <div className="grid gap-3 md:grid-cols-2">
          {states.map(([s, d]) => (
            <Card key={s} className="flex items-start gap-4">
              <Decision state={s} />
              <p className="text-sm text-muted-foreground">{d}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Decision flow" note="Every initiative passes through the same gates">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <Flow
              dense
              steps={[
                { label: "Existing roadmap" },
                { label: "Field evidence" },
                { label: "Donor objective" },
                { label: "Strategic fit" },
                { label: "Engineering feasibility" },
                { label: "Privacy / safety" },
                { label: "Measurement feasibility" },
                { label: "Cost / capacity" },
                { label: "BUILD / MODIFY / VALIDATE / DEFER / STOP" },
              ]}
            />
          </Card>
          <Card>
            <h3 className="text-lg">Questions I would ask before accepting a requirement</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                "What outcome are we trying to achieve?",
                "Why this user/problem?",
                "What evidence do we have?",
                "Is this the only way to achieve the outcome?",
                "Can we reuse an existing capability?",
                "What engineering capacity does it consume?",
                "What gets delayed?",
                "How will we know whether it worked?",
                "What privacy/consent implications exist?",
              ].map((q) => (
                <li key={q} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-primary">—</span>
                  {q}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>
    </Page>
  );
}
