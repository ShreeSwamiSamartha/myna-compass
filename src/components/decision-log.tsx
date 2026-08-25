import { Tag, Table } from "./system";

const entries = [
  {
    decision: "Modify donor request",
    date: "TBD",
    evidence:
      "Outcome objective valid; proposed implementation requires disproportionate engineering effort",
    stakeholders: "Programme lead, donor relations, engineering",
    why: "Same outcome reachable through an existing capability at lower cost",
    outcome: "Donor objective met without displacing reliability work",
    measurement: "TBD — requires data",
    review: "TBD",
    call: "Validate alternative implementation",
  },
  {
    decision: "Instrument journey completion before new features",
    date: "TBD",
    evidence: "No end-to-end journey measurement currently available",
    stakeholders: "Product, engineering, M&E",
    why: "Every later prioritisation call depends on this baseline",
    outcome: "Journey funnel becomes observable",
    measurement: "Stage-level completion events",
    review: "TBD",
    call: "Build",
  },
];

export function DecisionLog({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/20" onClick={onClose}>
      <aside
        className="h-full w-full max-w-3xl overflow-y-auto bg-background p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="label-caps text-primary">Cross-system</p>
            <h2 className="mt-2 text-3xl">Decision Log</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              A durable record of what was decided, on what evidence, and when it will be
              reviewed. Entries below are illustrative.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-sm border border-border px-3 py-1.5 label-caps text-muted-foreground transition-colors hover:bg-secondary"
          >
            Close
          </button>
        </div>

        <div className="mt-6">
          <Tag kind="illustrative">Illustrative example</Tag>
        </div>

        <div className="mt-6 space-y-6">
          {entries.map((e) => (
            <div key={e.decision} className="rounded-lg border border-border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-serif text-xl">{e.decision}</h3>
                <span className="label-caps text-muted-foreground">Date: {e.date}</span>
              </div>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  ["Evidence used", e.evidence],
                  ["Stakeholders", e.stakeholders],
                  ["Decision", e.call],
                  ["Why", e.why],
                  ["Expected outcome", e.outcome],
                  ["Measurement", e.measurement],
                  ["Review date", e.review],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="label-caps text-muted-foreground">{k}</dt>
                    <dd className="mt-1 text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-xl">What did we consciously NOT build?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Product leadership includes deciding what to defer or stop. Illustrative entries.
          </p>
          <div className="mt-4">
            <Table
              headers={["Feature", "Reason", "Opportunity cost", "Evidence", "Revisit trigger"]}
              rows={[
                [
                  "Broad new AI capability",
                  "Outcome link unproven; safety review incomplete",
                  "Engineering time otherwise spent on reliability",
                  <Tag kind="hypothesis">Hypothesis</Tag>,
                  "Validated demand + safety review passed",
                ],
                [
                  "Identity-linked longitudinal tracking",
                  "Consent and legal architecture not yet defined",
                  "Delays outcome attribution",
                  <Tag kind="missing">Missing</Tag>,
                  "Privacy-preserving linkage design approved",
                ],
                [
                  "Additional dashboard surfaces",
                  "Creates reporting, not decisions",
                  "Low — avoided",
                  <Tag kind="missing">TBD</Tag>,
                  "A named decision requires a new view",
                ],
              ]}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
