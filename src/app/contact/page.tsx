import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

const DETAILS = [
  {
    label: "Office Address",
    value: "Eastbourne Rd, Felbridge, Lingfield, RH7 6HN",
  },
  { label: "Telephone", value: "07776 8444957" },
  { label: "Email", value: "info@supercarvelocity.com" },
  {
    label: "Business Hours",
    value: "Monday – Saturday, 9:00am – 6:00pm. Sunday by appointment.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact Us"
        title="Speak To Our Team"
        description="Whether you have a question about a specific vehicle, finance, or sourcing a car not currently listed, we're here to help."
      />

      <div className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: details + map */}
          <div className="space-y-12">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {DETAILS.map((d) => (
                <div key={d.label}>
                  <dt className="font-body text-xs tracking-widest uppercase text-accent mb-2">
                    {d.label}
                  </dt>
                  <dd className="font-body text-sm text-text leading-relaxed">{d.value}</dd>
                </div>
              ))}
            </dl>

            {/* Google Maps embed, free iframe, no API key required.
                Dark CSS overlay frame keeps it visually consistent
                with the rest of the site rather than a jarring bright
                rectangle of default Google Maps styling. */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] border border-text/10">
              <iframe
                src="https://www.google.com/maps?q=Eastbourne+Rd,+Felbridge,+Lingfield+RH7+6HN&output=embed"
                className="absolute inset-0 h-full w-full grayscale contrast-125 invert-[0.92]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Supercar Velocity location"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-text/10" />
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-surface p-6 sm:p-8 border border-text/10 h-fit">
            <h2 className="font-heading text-2xl text-text mb-1">Send a Message</h2>
            <p className="font-body text-xs text-text-muted mb-6">
              We typically reply within one business day.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
