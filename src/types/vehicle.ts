
// The shape of a single vehicle. Used for both the mock data now
// and the real database rows later in Phase 2, so the rest of the
// app never has to change when we swap the data source.
export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number; // stored in whole dollars, formatted for display
  mileage: number; // in miles
  transmission: "Automatic" | "Manual";
  fuelType: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  bodyType: string;
  colour: string;
  images: string[]; // first image is treated as the main/cover photo
  description: string;
  specs: Record<string, string>; // e.g. { "Engine": "4.0L V8 Twin-Turbo" }
  performance: Record<string, string>; // e.g. { "0-60 mph": "2.9s" }
  status: "available" | "reserved" | "sold";
};


