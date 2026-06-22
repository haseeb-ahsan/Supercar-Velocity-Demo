import PageHeader from "@/components/PageHeader";

const SECTIONS = [
  {
    title: "Vehicle Information Accuracy",
    body: "While every effort is made to ensure vehicle descriptions, specifications, mileage, and imagery are accurate at the time of publication, errors and omissions may occur. Supercar Velocity does not warrant that all information presented is complete or error-free, and recommends an independent inspection before purchase.",
  },
  {
    title: "Pricing Changes",
    body: "Vehicle prices displayed on this website are subject to change without notice and do not constitute a binding offer. Final pricing is confirmed at the point of sale and may be affected by vehicle availability, specification changes, or market conditions.",
  },
  {
    title: "Finance Approvals",
    body: "Finance quotes and indicative figures provided through this website are estimates only and are subject to status, lender approval, and a full application. Submitting an enquiry does not guarantee finance approval, and final terms are determined by the relevant lending partner.",
  },
  {
    title: "Website Usage Terms",
    body: "Use of this website constitutes acceptance of these terms. Content, layout, and vehicle listings are provided for general informational purposes and may be amended, removed, or updated at any time without prior notice.",
  },
  {
    title: "Limitation of Liability",
    body: "Supercar Velocity shall not be liable for any direct, indirect, or consequential loss arising from the use of, or reliance on, information presented on this website, to the fullest extent permitted by law.",
  },
];

export default function DisclaimerPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Legal"
        title="Disclaimer"
        description="Please read the following carefully before using this website or relying on the information it contains."
      />

      <div className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* TODO: this entire page is placeholder copy and must be
              reviewed and finalised by the client's lawyer before
              launch, per the brief's requirement (Section 11). Do not
              treat this text as legally sufficient as written. */}
          <div className="border border-accent/30 bg-surface px-5 py-4">
            <p className="font-body text-xs leading-relaxed text-text-muted">
              <span className="text-accent font-semibold">Placeholder legal text.</span>{" "}
              The content on this page is a draft and has not been reviewed by a
              qualified lawyer. It must be finalised before the website goes live.
            </p>
          </div>

          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="font-heading text-2xl text-text mb-3">{s.title}</h2>
              <p className="font-body text-sm leading-relaxed text-text-muted">{s.body}</p>
            </section>
          ))}

          <p className="font-body text-xs text-text-muted pt-6 border-t border-text/10">
            Last updated: placeholder — to be set upon legal review.
          </p>
        </div>
      </div>
    </main>
  );
}
