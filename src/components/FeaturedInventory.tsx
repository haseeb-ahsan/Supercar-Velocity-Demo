
import Link from "next/link";
import { MOCK_VEHICLES } from "@/lib/mock-vehicles";
import VehicleGrid from "./VehicleGrid";

export default function FeaturedInventory() {
  return (
    <section className="px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-accent mb-3">
              The Collection
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl text-text">
              Featured Inventory
            </h2>
          </div>
          <Link
            href="/stock"
            className="font-body text-sm tracking-wide uppercase text-text-muted hover:text-accent transition-colors duration-300 border-b border-text/20 hover:border-accent pb-1 self-start sm:self-auto"
          >
            View All Stock &rarr;
          </Link>
        </div>

        <VehicleGrid vehicles={MOCK_VEHICLES.slice(0, 6)} />
      </div>
    </section>
  );
}


