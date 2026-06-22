
import PageHeader from '@/components/PageHeader';
import EnquiryForm from '@/components/EnquiryForm';
import WhyChooseUs from '@/components/WhyChooseUs';

export default function FinancePage() {
  return (
    <main className='min-h-screen bg-black pt-20'>
      <PageHeader
        eyebrow="Finance"
        title="Vehicle Finance"
        description="Tailored financial solutions for your next investment."
      />

      <div className='max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16'>
        {/* Left Side: Copy */}
        <div className='space-y-8'>
          <h2 className='text-3xl font-heading text-white'>
            Why Finance with Us?
          </h2>
          <p className='text-text-muted leading-relaxed'>
            We work with leading financial institutions to provide competitive,
            tailored finance packages. Whether you are looking for Hire
            Purchase, Personal Contract Purchase (PCP), or prestige vehicle
            leasing, we ensure a seamless and discreet experience.
          </p>
          <ul className='space-y-4 text-text-muted'>
            <li className='flex items-center gap-3'>
              ✓ Bespoke finance packages
            </li>
            <li className='flex items-center gap-3'>
              ✓ Competitive interest rates
            </li>
            <li className='flex items-center gap-3'>
              ✓ Fast, discreet decision process
            </li>
            <li className='flex items-center gap-3'>
              ✓ Expert guidance for collectors
            </li>
          </ul>
        </div>

        {/* Right Side: Enquiry Form */}
        <div className='bg-surface p-8 border border-text/10'>
          <EnquiryForm
            variant='finance'
            vehicleName=''
            vehicleLocked={false}
          />
        </div>
      </div>
      <WhyChooseUs />
    </main>
  );
}


