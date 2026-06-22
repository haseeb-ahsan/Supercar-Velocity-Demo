
import { Vehicle } from "@/types/vehicle";

// Mock data for Phase 0 / Phase 1. In Phase 2 this file's contents
// get replaced by real queries to the Neon database, but every
// component that imports MOCK_VEHICLES keeps working unchanged,
// since they all expect the same Vehicle[] shape.
//
// IMPORTANT — currency: every `price` below is in GBP (pounds), since
// CurrencyContext treats GBP as the base/canonical currency and
// converts outward from it to USD/EUR for display. If you add a
// vehicle, enter its price in GBP, not USD. Mixing currencies here
// silently produces wrong displayed prices in every other currency.
export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: "ferrari-296-gtb",
    make: "Ferrari",
    model: "296 GTB",
    year: 2023,
    price: 369000,
    mileage: 1200,
    transmission: "Automatic",
    fuelType: "Hybrid",
    bodyType: "Coupe",
    colour: "Rosso Corsa",
    images: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1600&auto=format&fit=crop",
    ],
    description:
      "A landmark in Ferrari's hybrid era, pairing a twin-turbo V6 with electric assistance for breathtaking response.",
    specs: { Engine: "3.0L V6 Twin-Turbo Hybrid", Power: "819 hp", Drivetrain: "RWD" },
    performance: { "0-60 mph": "2.9s", "Top Speed": "205 mph" },
    status: "available",
  },
  {
    id: "lamborghini-huracan-evo",
    make: "Lamborghini",
    model: "Huracán EVO",
    year: 2022,
    price: 289000,
    mileage: 3400,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Coupe",
    colour: "Verde Mantis",
    images: [
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=1600&auto=format&fit=crop",
    ],
    description:
      "Naturally aspirated V10 theatre, sharpened with Lamborghini's rear-wheel steering and adaptive aero.",
    specs: { Engine: "5.2L V10", Power: "631 hp", Drivetrain: "RWD" },
    performance: { "0-60 mph": "2.9s", "Top Speed": "202 mph" },
    status: "available",
  },
  {
    id: "porsche-911-turbo-s",
    make: "Porsche",
    model: "911 Turbo S",
    year: 2023,
    price: 248000,
    mileage: 2100,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Coupe",
    colour: "Jet Black Metallic",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
    ],
    description:
      "The benchmark everyday supercar, all-wheel drive confidence with genuine track-day pace.",
    specs: { Engine: "3.7L Flat-6 Twin-Turbo", Power: "640 hp", Drivetrain: "AWD" },
    performance: { "0-60 mph": "2.6s", "Top Speed": "205 mph" },
    status: "available",
  },
  {
    id: "bentley-continental-gt",
    make: "Bentley",
    model: "Continental GT Speed",
    year: 2022,
    price: 274000,
    mileage: 4800,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Grand Tourer",
    colour: "Beluga Black",
    images: [
      "https://images.unsplash.com/photo-1632245889029-e406faaa34cd?q=80&w=1600&auto=format&fit=crop",
    ],
    description:
      "Handcrafted British luxury wrapped around a W12 engine, built to devour continents in total comfort.",
    specs: { Engine: "6.0L W12 Twin-Turbo", Power: "650 hp", Drivetrain: "AWD" },
    performance: { "0-60 mph": "3.5s", "Top Speed": "208 mph" },
    status: "reserved",
  },
  {
    id: "aston-martin-db12",
    make: "Aston Martin",
    model: "DB12",
    year: 2024,
    price: 245000,
    mileage: 600,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Coupe",
    colour: "Onyx Black",
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop",
    ],
    description:
      "Aston Martin's 'Super Tourer', sharper and more powerful, without losing its grand touring manners.",
    specs: { Engine: "4.0L V8 Twin-Turbo", Power: "671 hp", Drivetrain: "RWD" },
    performance: { "0-60 mph": "3.5s", "Top Speed": "202 mph" },
    status: "available",
  },
  {
    id: "mclaren-750s",
    make: "McLaren",
    model: "750S",
    year: 2024,
    price: 332000,
    mileage: 950,
    transmission: "Automatic",
    fuelType: "Petrol",
    bodyType: "Coupe",
    colour: "Burnished Aluminium",
    images: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1600&auto=format&fit=crop",
    ],
    description:
      "McLaren's lightest road car in years, razor-edge handling from a carbon tub and a featherweight body.",
    specs: { Engine: "4.0L V8 Twin-Turbo", Power: "740 hp", Drivetrain: "RWD" },
    performance: { "0-60 mph": "2.7s", "Top Speed": "206 mph" },
    status: "available",
  },
];


