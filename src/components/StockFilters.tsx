
"use client";

import { useCurrency } from "@/context/CurrencyContext";

export type StockFilterState = {
  search: string;
  makes: Set<string>;
  bodyTypes: Set<string>;
  transmissions: Set<string>;
  fuelTypes: Set<string>;
  colours: Set<string>;
  maxPrice: number;
  minYear: number;
  maxMileage: number;
};

export type StockFilterBounds = {
  makes: string[];
  bodyTypes: string[];
  transmissions: string[];
  fuelTypes: string[];
  colours: string[];
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  maxMileage: number;
};

function toggleInSet(set: Set<string>, value: string): Set<string> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
}) {
  if (options.length === 0) return null;
  return (
    <fieldset>
      <legend className="font-body text-xs tracking-widest uppercase text-accent mb-3">
        {label}
      </legend>
      <div className="space-y-2.5">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2.5 font-body text-sm text-text-muted hover:text-text transition-colors duration-200 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.has(option)}
              onChange={() => onChange(toggleInSet(selected, option))}
              className="h-3.5 w-3.5 accent-[var(--accent)] cursor-pointer"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function StockFilters({
  filters,
  setFilters,
  bounds,
  resultCount,
  onClearAll,
}: {
  filters: StockFilterState;
  setFilters: (updater: (prev: StockFilterState) => StockFilterState) => void;
  bounds: StockFilterBounds;
  resultCount: number;
  onClearAll: () => void;
}) {
  const { format } = useCurrency();

  return (
    <div className="space-y-10">
      <div>
        <label className="font-body text-xs tracking-widest uppercase text-accent mb-3 block">
          Search
        </label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          placeholder="Make or model&hellip;"
          className="w-full bg-background border border-text/20 px-4 py-3 font-body text-sm text-text placeholder:text-text-muted focus:border-accent transition-colors duration-200"
        />
      </div>

      <div>
        <label className="font-body text-xs tracking-widest uppercase text-accent mb-3 flex items-center justify-between">
          <span>Max Price</span>
          <span className="text-text-muted normal-case tracking-normal">
            {format(filters.maxPrice)}
          </span>
        </label>
        <input
          type="range"
          min={bounds.minPrice}
          max={bounds.maxPrice}
          step={1000}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
          }
          className="w-full accent-[var(--accent)] cursor-pointer"
        />
      </div>

      <div>
        <label className="font-body text-xs tracking-widest uppercase text-accent mb-3 flex items-center justify-between">
          <span>Max Mileage</span>
          <span className="text-text-muted normal-case tracking-normal">
            {filters.maxMileage.toLocaleString()} mi
          </span>
        </label>
        <input
          type="range"
          min={0}
          max={bounds.maxMileage}
          step={500}
          value={filters.maxMileage}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxMileage: Number(e.target.value) }))
          }
          className="w-full accent-[var(--accent)] cursor-pointer"
        />
      </div>

      <div>
        <label className="font-body text-xs tracking-widest uppercase text-accent mb-3 block">
          Year, {filters.minYear}+
        </label>
        <input
          type="range"
          min={bounds.minYear}
          max={bounds.maxYear}
          step={1}
          value={filters.minYear}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, minYear: Number(e.target.value) }))
          }
          className="w-full accent-[var(--accent)] cursor-pointer"
        />
      </div>

      <CheckboxGroup
        label="Make"
        options={bounds.makes}
        selected={filters.makes}
        onChange={(next) => setFilters((prev) => ({ ...prev, makes: next }))}
      />
      <CheckboxGroup
        label="Body Type"
        options={bounds.bodyTypes}
        selected={filters.bodyTypes}
        onChange={(next) => setFilters((prev) => ({ ...prev, bodyTypes: next }))}
      />
      <CheckboxGroup
        label="Transmission"
        options={bounds.transmissions}
        selected={filters.transmissions}
        onChange={(next) => setFilters((prev) => ({ ...prev, transmissions: next }))}
      />
      <CheckboxGroup
        label="Fuel Type"
        options={bounds.fuelTypes}
        selected={filters.fuelTypes}
        onChange={(next) => setFilters((prev) => ({ ...prev, fuelTypes: next }))}
      />
      <CheckboxGroup
        label="Colour"
        options={bounds.colours}
        selected={filters.colours}
        onChange={(next) => setFilters((prev) => ({ ...prev, colours: next }))}
      />

      <button
        type="button"
        onClick={onClearAll}
        className="w-full border border-text/20 py-3 font-body text-xs tracking-widest uppercase text-text-muted hover:border-accent hover:text-accent transition-colors duration-300"
      >
        Clear All Filters
      </button>

      <p className="font-body text-xs text-text-muted">
        {resultCount} {resultCount === 1 ? "vehicle" : "vehicles"} match
      </p>
    </div>
  );
}


