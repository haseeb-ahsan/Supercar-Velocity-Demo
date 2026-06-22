import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MOCK_VEHICLES } from '@/lib/mock-vehicles';
import VehicleGallery from '@/components/VehicleGallery';
import EnquiryForm from '@/components/EnquiryForm';
import ShareVehicleButton from '@/components/ShareVehicleButton';
import CurrencyPrice from '@/components/CurrencyPrice';
import { formatMileage } from '@/lib/format';
import DialerStats from '@/components/DialerStats';

// Pre-render every mock vehicle's page at build time rather than on
// every request, since this is static demo data, this is the same
// pattern Phase 2 will replace with a real database-backed version
// of this same function (fetching real vehicle IDs from Neon).
export function generateStaticParams() {
  return MOCK_VEHICLES.map((v) => ({ id: v.id }));
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = MOCK_VEHICLES.find((v) => v.id === id);

  if (!vehicle) {
    notFound();
  }

  const vehicleName = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${vehicleName} listed on Supercar Velocity.`
  );

  return (
    <main className='pt-28 sm:pt-32 pb-24 px-6 sm:px-10 lg:px-16'>
      <div className='max-w-7xl mx-auto'>
        {/* Title row */}
        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8'>
          <div>
            <p className='font-body text-xs tracking-widest uppercase text-accent mb-2'>
              {vehicle.year} &middot; {vehicle.bodyType} &middot;{' '}
              {vehicle.colour}
            </p>
            <h1 className='font-heading text-4xl sm:text-5xl text-text'>
              {vehicleName}
            </h1>
          </div>
          <div className='flex items-center gap-4'>
            <p className='font-heading text-3xl text-accent'>
              <CurrencyPrice amount={vehicle.price} />
            </p>
            <ShareVehicleButton vehicleName={vehicleName} />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* Left: gallery, description, specs, performance */}
          <div className='lg:col-span-2 space-y-12'>
            <VehicleGallery images={vehicle.images} alt={vehicleName} />

            <section>
              <h2 className='font-heading text-2xl text-text mb-4'>
                Description
              </h2>
              <p className='font-body text-sm sm:text-base leading-relaxed text-text-muted'>
                {vehicle.description}
              </p>
            </section>

            <section>
              <h2 className='font-heading text-2xl text-text mb-4'>
                Technical Specification
              </h2>
              <dl className='divide-y divide-text/10 border-y border-text/10'>
                <SpecRow
                  label='Mileage'
                  value={formatMileage(vehicle.mileage)}
                />
                <SpecRow label='Transmission' value={vehicle.transmission} />
                <SpecRow label='Fuel Type' value={vehicle.fuelType} />
                <SpecRow label='Body Type' value={vehicle.bodyType} />
                <SpecRow label='Colour' value={vehicle.colour} />
                {Object.entries(vehicle.specs).map(([label, value]) => (
                  <SpecRow key={label} label={label} value={value} />
                ))}
              </dl>
            </section>

            <section>
              <h2 className='font-heading text-2xl text-text mb-4'>
                Performance
              </h2>
              <DialerStats performance={vehicle.performance} />
            </section>

            {/* WhatsApp inline contact, in addition to the site-wide
                floating button, since the brief calls this out
                specifically for the vehicle detail page */}
            <a
              href={`https://wa.me/4477768444957?text=${whatsappMessage}`}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-3 border border-accent/40 px-6 py-3.5 font-body text-xs tracking-widest uppercase text-text hover:bg-accent hover:text-background transition-colors duration-300'
            >
              Message Us About This Vehicle
            </a>
          </div>

          {/* Right: the three required forms */}
          <div className='space-y-8'>
            <div className='bg-surface p-6 sm:p-8 border border-text/10'>
              <EnquiryForm variant='reserve' vehicleName={vehicleName} />
            </div>
            <div className='bg-surface p-6 sm:p-8 border border-text/10'>
              <EnquiryForm variant='finance' vehicleName={vehicleName} />
            </div>
            <div className='bg-surface p-6 sm:p-8 border border-text/10'>
              <EnquiryForm variant='general' vehicleName={vehicleName} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex items-center justify-between py-3.5'>
      <dt className='font-body text-xs tracking-widest uppercase text-text-muted'>
        {label}
      </dt>
      <dd className='font-body text-sm text-text'>{value}</dd>
    </div>
  );
}
