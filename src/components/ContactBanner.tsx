
import Link from "next/link";

export default function ContactBanner() {
  return (
    <section className="px-6 sm:px-10 lg:px-16 py-24 sm:py-32 bg-surface">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-body text-xs tracking-widest uppercase text-accent mb-3">
          Speak To Us
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text max-w-3xl mx-auto leading-tight">
          Have a vehicle in mind we haven&rsquo;t listed yet?
        </h2>
        <p className="mt-5 font-body text-sm sm:text-base text-text-muted max-w-xl mx-auto">
          Our sourcing team can locate it. Tell us what you&rsquo;re looking
          for and we&rsquo;ll come back to you, usually within one business day.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-accent text-background font-body font-semibold text-sm tracking-wide uppercase px-8 py-4 hover:bg-text transition-colors duration-300"
          >
            Contact Us
          </Link>
          <Link
            href="/sell-your-car"
            className="inline-flex items-center justify-center border border-text/40 text-text font-body font-medium text-sm tracking-wide uppercase px-8 py-4 hover:border-text transition-colors duration-300"
          >
            Sell Your Car
          </Link>
        </div>
      </div>
    </section>
  );
}


