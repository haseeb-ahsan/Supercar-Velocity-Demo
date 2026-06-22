
import PageHeader from '@/components/PageHeader';
import SellYourCarForm from '@/components/SellYourCarForm';

export default function SellYourCarPage() {
  return (
    <main className='min-h-screen bg-black pt-20'>
      <PageHeader
        eyebrow="Sell Your Car"
        title="Sell Your Vehicle"
        description="We are actively seeking the world's finest prestige, performance, and luxury automobiles."
      />

      <div className='max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16'>
        {/* Left Side: The Process */}
        <div className='space-y-12'>
          <section>
            <h2 className='text-2xl font-heading text-white mb-6'>
              A Seamless Brokerage
            </h2>
            <p className='text-text-muted leading-relaxed'>
              We take the complexity out of selling high-value assets. From
              professional photography and marketing to vetting potential buyers
              and handling the secure transfer of funds, we manage every aspect
              of the sale.
            </p>
          </section>

          <div className='space-y-6'>
            {[
              {
                step: '01',
                title: 'Enquiry',
                desc: 'Share the vehicle details and your expectations.',
              },
              {
                step: '02',
                title: 'Valuation',
                desc: 'We review the market data and provide a professional appraisal.',
              },
              {
                step: '03',
                title: 'Handover',
                desc: 'We manage logistics and ensure a secure, instant payment.',
              },
            ].map((item) => (
              <div key={item.step} className='flex gap-6'>
                <span className='font-heading text-2xl text-accent/30'>
                  {item.step}
                </span>
                <div>
                  <h4 className='font-heading text-lg text-white'>
                    {item.title}
                  </h4>
                  <p className='font-body text-sm text-text-muted'>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Enquiry Form */}
        <div className='bg-surface p-8 border border-text/10'>
          <SellYourCarForm />
        </div>
      </div>
    </main>
  );
}


