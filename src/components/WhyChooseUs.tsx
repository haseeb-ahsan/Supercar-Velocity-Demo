
'use client';

import { motion } from 'framer-motion';

const PILLARS = [
  {
    title: 'Premium Vehicle Selection',
    copy: 'Every car in our collection is hand-selected for condition, history, and pedigree, then inspected before it ever reaches the showroom floor.',
  },
  {
    title: 'International Vehicle Sourcing',
    copy: 'Looking for a specific configuration or a left-hand-drive example? Our network reaches dealers and private collections across three continents.',
  },
  {
    title: 'Flexible Finance Solutions',
    copy: 'From structured HP agreements to balloon finance for collectors, we tailor terms around the vehicle and the client, not a one-size product.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className='px-6 sm:px-10 lg:px-16 py-24 sm:py-32 bg-surface'>
      <div className='max-w-7xl mx-auto'>
        <div className='max-w-2xl mb-16'>
          <p className='font-body text-xs tracking-widest uppercase text-accent mb-3'>
            Why Supercar Velocity
          </p>
          <h2 className='font-heading text-4xl sm:text-5xl text-text'>
            Built on trust, not just inventory.
          </h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              // 3D Effect: The component tilts towards the cursor
              whileHover={{
                rotateY: 5,
                rotateX: 5,
                z: 10,
                scale: 1.02,
              }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              // Perspective style makes the 3D rotation look real
              className='bg-black/20 p-8 border border-text/10 perspective'
            >
              <span
                className='block h-px w-10 bg-accent mb-6'
                aria-hidden='true'
              />
              <h3 className='font-heading text-2xl text-text mb-4'>
                {pillar.title}
              </h3>
              <p className='font-body text-sm leading-relaxed text-text-muted'>
                {pillar.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


