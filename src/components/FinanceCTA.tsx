
import Link from "next/link";
import Image from "next/image";

export default function FinanceCTA() {
  return (
    <section className="relative px-6 sm:px-10 lg:px-16 py-24 sm:py-32 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2400&auto=format&fit=crop"
        alt="Detail shot of a supercar interior and dashboard"
        fill
        className="object-cover object-center grayscale opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
        <div className="max-w-xl">
          <p className="font-body text-xs tracking-widest uppercase text-accent mb-3">
            Finance
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-text leading-tight">
            Own it sooner than you think.
          </h2>
          <p className="mt-5 font-body text-sm sm:text-base leading-relaxed text-text-muted">
            Tailored finance from approved partners, structured around the
            vehicle and your circumstances. Get an indicative quote in
            minutes, no obligation.
          </p>
        </div>

        <Link
          href="/finance"
          className="inline-flex items-center justify-center self-start bg-accent text-background font-body font-semibold text-sm tracking-wide uppercase px-8 py-4 hover:bg-text transition-colors duration-300 whitespace-nowrap"
        >
          Arrange Finance
        </Link>
      </div>
    </section>
  );
}


