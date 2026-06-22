
"use client";

import { motion } from "framer-motion";
import { Vehicle } from "@/types/vehicle";
import VehicleCard from "./VehicleCard";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: (index % 6) * 0.08, // re-stagger every "page" rather than ever-growing delay
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function VehicleGrid({ vehicles }: { vehicles: Vehicle[] }) {
  if (vehicles.length === 0) {
    return (
      <div className="border border-text/10 bg-surface px-6 py-20 text-center">
        <p className="font-heading text-2xl text-text">No vehicles match those filters</p>
        <p className="mt-2 font-body text-sm text-text-muted">
          Try widening your search, or get in touch and our team will source one for you.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {vehicles.map((vehicle, index) => (
        <motion.div
          key={vehicle.id}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <VehicleCard vehicle={vehicle} />
        </motion.div>
      ))}
    </div>
  );
}


