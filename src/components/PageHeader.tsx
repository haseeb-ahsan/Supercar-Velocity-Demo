
"use client";

import { motion } from "framer-motion";

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="px-6 sm:px-10 lg:px-16 pt-36 sm:pt-44 pb-16 sm:pb-20 border-b border-text/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto"
      >
        <p className="font-body text-xs tracking-widest uppercase text-accent mb-3">
          {eyebrow}
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 font-body text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
}


