
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MOCK_VEHICLES } from "@/lib/mock-vehicles";
import { Vehicle } from "@/types/vehicle";
import PageHeader from "@/components/PageHeader";
import VehicleGrid from "@/components/VehicleGrid";
import StockFilters, {
  StockFilterBounds,
  StockFilterState,
} from "@/components/StockFilters";

type SortKey = "default" | "price-asc" | "price-desc" | "year-desc" | "mileage-asc";

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort();
}

function computeBounds(vehicles: Vehicle[]): StockFilterBounds {
  const prices = vehicles.map((v) => v.price);
  const years = vehicles.map((v) => v.year);
  const mileages = vehicles.map((v) => v.mileage);
  return {
    makes: uniqueSorted(vehicles.map((v) => v.make)),
    bodyTypes: uniqueSorted(vehicles.map((v) => v.bodyType)),
    transmissions: uniqueSorted(vehicles.map((v) => v.transmission)),
    fuelTypes: uniqueSorted(vehicles.map((v) => v.fuelType)),
    colours: uniqueSorted(vehicles.map((v) => v.colour)),
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    minYear: Math.min(...years),
    maxYear: Math.max(...years),
    maxMileage: Math.max(...mileages),
  };
}

function defaultFilters(bounds: StockFilterBounds): StockFilterState {
  return {
    search: "",
    makes: new Set(),
    bodyTypes: new Set(),
    transmissions: new Set(),
    fuelTypes: new Set(),
    colours: new Set(),
    maxPrice: bounds.maxPrice,
    minYear: bounds.minYear,
    maxMileage: bounds.maxMileage,
  };
}

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "year-desc", label: "Year: Newest First" },
  { value: "mileage-asc", label: "Mileage: Lowest First" },
];

export default function StockPage() {
  const bounds = useMemo(() => computeBounds(MOCK_VEHICLES), []);
  const [filters, setFilters] = useState<StockFilterState>(() => defaultFilters(bounds));
  const [sort, setSort] = useState<SortKey>("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    let result = MOCK_VEHICLES.filter((v) => {
      if (search && !`${v.make} ${v.model}`.toLowerCase().includes(search)) return false;
      if (filters.makes.size > 0 && !filters.makes.has(v.make)) return false;
      if (filters.bodyTypes.size > 0 && !filters.bodyTypes.has(v.bodyType)) return false;
      if (filters.transmissions.size > 0 && !filters.transmissions.has(v.transmission))
        return false;
      if (filters.fuelTypes.size > 0 && !filters.fuelTypes.has(v.fuelType)) return false;
      if (filters.colours.size > 0 && !filters.colours.has(v.colour)) return false;
      if (v.price > filters.maxPrice) return false;
      if (v.year < filters.minYear) return false;
      if (v.mileage > filters.maxMileage) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "year-desc":
        result = [...result].sort((a, b) => b.year - a.year);
        break;
      case "mileage-asc":
        result = [...result].sort((a, b) => a.mileage - b.mileage);
        break;
      default:
        break;
    }
    return result;
  }, [filters, sort]);

  const clearAll = () => setFilters(defaultFilters(bounds));

  return (
    <main>
      <PageHeader
        eyebrow="Inventory"
        title="The Full Collection"
        description="Every vehicle currently available, reserved, or recently placed. Filter by make, body style, price, or specification to find the one."
      />

      <div className="px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32">
              <StockFilters
                filters={filters}
                setFilters={setFilters}
                bounds={bounds}
                resultCount={filtered.length}
                onClearAll={clearAll}
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4 mb-8">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 border border-text/20 px-4 py-2.5 font-body text-xs tracking-widest uppercase text-text hover:border-accent transition-colors duration-300"
              >
                Filters
                <span className="text-accent">({filtered.length})</span>
              </button>
              <p className="hidden lg:block font-body text-sm text-text-muted">
                Showing {filtered.length} of {MOCK_VEHICLES.length} vehicles
              </p>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="bg-surface border border-text/20 px-4 py-2.5 font-body text-xs tracking-widest uppercase text-text focus:border-accent transition-colors duration-200 cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    Sort: {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <VehicleGrid vehicles={filtered} />
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-[80] h-full w-full max-w-sm overflow-y-auto bg-surface px-6 py-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <p className="font-heading text-xl text-text">Filters</p>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="relative h-9 w-9"
                >
                  <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-text" />
                  <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-text" />
                </button>
              </div>
              <StockFilters
                filters={filters}
                setFilters={setFilters}
                bounds={bounds}
                resultCount={filtered.length}
                onClearAll={clearAll}
              />
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-8 w-full bg-accent text-background font-body text-xs tracking-widest uppercase py-3.5"
              >
                Show {filtered.length} {filtered.length === 1 ? "Vehicle" : "Vehicles"}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}


