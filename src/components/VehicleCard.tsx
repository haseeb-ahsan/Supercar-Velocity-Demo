
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Vehicle } from '@/types/vehicle';
import { formatMileage } from '@/lib/format';
import { useCurrency } from '@/context/CurrencyContext';

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [imgFailed, setImgFailed] = useState(false);
  const { format } = useCurrency();

  return (
    <Link
      href={`/stock/${vehicle.id}`}
      className='group block bg-surface overflow-hidden transition-transform duration-300 hover:-translate-y-1'
    >
      {/* Photo */}
      <div className='relative aspect-[4/3] overflow-hidden bg-surface'>
        {vehicle.status !== 'available' && (
          <span className='absolute left-0 top-5 z-10 bg-background/90 px-4 py-1.5 font-body text-[10px] tracking-[0.25em] uppercase text-accent border-y border-accent/40'>
            {vehicle.status === 'reserved' ? 'Reserved' : 'Sold'}
          </span>
        )}
        {imgFailed ? (
          // Graceful fallback so a dead/removed source photo never
          // shows a broken-image icon. Shows the make/model instead
          // on a dark gradient until a real photo replaces it.
          <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface to-background'>
            <span className='font-heading text-text-muted text-lg text-center px-6'>
              {vehicle.make} {vehicle.model}
            </span>
          </div>
        ) : (
          <Image
            src={vehicle.images[0]}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
              vehicle.status !== 'available' ? 'grayscale opacity-70' : ''
            }`}
            onError={() => setImgFailed(true)}
          />
        )}
      </div>

      {/* Details */}
      <div className='p-6'>
        <p className='font-body text-xs tracking-widest uppercase text-text-muted'>
          {vehicle.year} &middot; {vehicle.bodyType}
        </p>
        <h3 className='font-heading text-2xl text-text mt-1'>
          {vehicle.make} {vehicle.model}
        </h3>

        <div className='mt-4 flex items-center justify-between text-sm text-text-muted font-body'>
          <span>{formatMileage(vehicle.mileage)}</span>
          <span className='text-accent font-semibold text-base'>
            {format(vehicle.price)}
          </span>
        </div>

        <div className='mt-6 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-text font-body font-medium border-b border-text/30 pb-1 group-hover:border-accent group-hover:text-accent transition-colors duration-300'>
          View Details
          <span aria-hidden='true'>&rarr;</span>
        </div>
      </div>
    </Link>
  );
}


