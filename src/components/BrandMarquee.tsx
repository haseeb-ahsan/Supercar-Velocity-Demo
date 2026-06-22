
const BRANDS = [
  "Ferrari",
  "Lamborghini",
  "Porsche",
  "Bentley",
  "Rolls-Royce",
  "Aston Martin",
  "McLaren",
  "Mercedes-AMG",
  "BMW",
];

export default function BrandMarquee() {
  return (
    <section className="border-y border-text/10 bg-background py-12 overflow-hidden">
      <p className="text-center font-body text-xs tracking-widest uppercase text-text-muted mb-8 px-6">
        Brands We Source &amp; Trade
      </p>

      <div className="relative flex w-max">
        {/* Rendered twice back-to-back; the marquee animation moves
            exactly -50% so the seam between copies is never visible. */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="animate-marquee flex shrink-0 items-center gap-16 pr-16"
          >
            {BRANDS.map((brand) => (
              <span
                key={`${copy}-${brand}`}
                className="font-heading text-2xl sm:text-3xl text-text-muted/70 hover:text-accent transition-colors duration-300 whitespace-nowrap"
              >
                {brand}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}


