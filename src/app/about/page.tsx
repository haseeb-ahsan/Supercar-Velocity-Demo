import PageHeader from "@/components/PageHeader";

const VALUES = [
  { title: "Integrity", copy: "Every vehicle's history, condition, and provenance is disclosed honestly, before you ever ask." },
  { title: "Discretion", copy: "Our clients value privacy as much as performance. Enquiries, finance, and transactions are handled in confidence." },
  { title: "Expertise", copy: "Decades of combined experience in prestige and performance vehicles inform every car we select." },
  { title: "Service", copy: "From first enquiry to handover and beyond, you work with the same dedicated point of contact." },
];

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About Us"
        title="Built on Trust and Pedigree"
        description="Supercar Velocity is a luxury automotive marketplace, connecting discerning buyers with exceptional vehicles."
      />

      <div className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto space-y-20">
          {/* Company Introduction */}
          <section>
            <p className="font-body text-xs tracking-widest uppercase text-accent mb-3">
              Company Introduction
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text mb-5">
              A different kind of dealership.
            </h2>
            <p className="font-body text-sm sm:text-base leading-relaxed text-text-muted">
              Supercar Velocity specialises in supercars, hypercars, prestige SUVs, and
              performance vehicles for high-net-worth individuals, business owners,
              collectors, and enthusiasts worldwide. We are not a volume dealer. Every
              vehicle in our collection is hand-selected, inspected, and brought to
              market with the same care you would expect when buying through a private
              broker, backed by the structure and accountability of an established
              dealership.
            </p>
          </section>

          {/* Our Mission */}
          <section>
            <p className="font-body text-xs tracking-widest uppercase text-accent mb-3">
              Our Mission
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text mb-5">
              Make exceptional ownership effortless.
            </h2>
            <p className="font-body text-sm sm:text-base leading-relaxed text-text-muted">
              Our mission is to remove the friction, uncertainty, and guesswork from
              buying or selling a high-value vehicle. That means transparent pricing,
              honest condition reporting, structured finance, and a sales team that
              treats every enquiry, regardless of size, with the same level of
              attention.
            </p>
          </section>

          {/* Our Values */}
          <section>
            <p className="font-body text-xs tracking-widest uppercase text-accent mb-3">
              Our Values
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text mb-10">
              What guides every transaction.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {VALUES.map((v) => (
                <div key={v.title} className="bg-surface p-6 border border-text/10">
                  <span className="block h-px w-8 bg-accent mb-4" aria-hidden="true" />
                  <h3 className="font-heading text-xl text-text mb-2">{v.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-text-muted">
                    {v.copy}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Customer Commitment */}
          <section>
            <p className="font-body text-xs tracking-widest uppercase text-accent mb-3">
              Customer Commitment
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text mb-5">
              Our word, after the sale too.
            </h2>
            <p className="font-body text-sm sm:text-base leading-relaxed text-text-muted">
              Our relationship with a client does not end at handover. Every vehicle is
              sold with full transparency on its history and condition, and our team
              remains available for questions about your purchase, future servicing
              guidance, or sourcing your next vehicle, long after you have driven away.
            </p>
          </section>

          {/* Vehicle Sourcing Expertise */}
          <section>
            <p className="font-body text-xs tracking-widest uppercase text-accent mb-3">
              Vehicle Sourcing Expertise
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text mb-5">
              If it exists, we can likely find it.
            </h2>
            <p className="font-body text-sm sm:text-base leading-relaxed text-text-muted">
              Looking for a specific configuration, a rare colourway, or a
              left-hand-drive example not currently in our showroom? Our sourcing team
              draws on relationships with dealers, collectors, and auction houses to
              locate vehicles that rarely reach the open market.
            </p>
          </section>

          {/* International Network */}
          <section>
            <p className="font-body text-xs tracking-widest uppercase text-accent mb-3">
              International Network
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text mb-5">
              Sourcing across borders.
            </h2>
            <p className="font-body text-sm sm:text-base leading-relaxed text-text-muted">
              Our network extends beyond any single market, allowing us to source and
              place vehicles for international buyers, manage cross-border logistics,
              and navigate import requirements, so the complexity of an international
              purchase stays with us, not with you.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
