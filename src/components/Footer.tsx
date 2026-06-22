
import Link from 'next/link';
import Logo from './Logo';

const SITEMAP = [
  { href: '/stock', label: 'Stock' },
  { href: '/finance', label: 'Finance' },
  { href: '/sell-your-car', label: 'Sell Your Car' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'WhatsApp', href: 'https://wa.me/10000000000' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
];

export default function Footer() {
  return (
    <footer className='border-t border-text/10 bg-background'>
      <div className='mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-16'>
        <div className='grid grid-cols-1 gap-12 sm:grid-cols-3'>
          <div>
            <Logo />
            <p className='mt-6 max-w-xs font-body text-sm leading-relaxed text-text-muted'>
              A curated collection of supercars, hypercars, and prestige
              vehicles, sourced internationally and finished to the standard our
              clients expect.
            </p>
          </div>

          <div>
            <p className='font-body text-xs tracking-widest uppercase text-accent mb-5'>
              Navigate
            </p>
            <ul className='space-y-3'>
              {SITEMAP.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className='font-body text-sm text-text-muted hover:text-accent transition-colors duration-300'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className='font-body text-xs tracking-widest uppercase text-accent mb-5'>
              Get in touch
            </p>
            <ul className='space-y-3 font-body text-sm text-text-muted'>
              <li>07776 8444957</li>
              <li>info@supercarvelocity.com</li>
              <li>Eastbourne Rd, Felbridge</li>
              <li>Lingfield, RH7 6HN</li>
            </ul>
            <div className='mt-6 flex gap-5'>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-body text-xs tracking-widest uppercase text-text-muted hover:text-accent transition-colors duration-300 border-b border-text/20 hover:border-accent pb-1'
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-16 flex flex-col gap-4 border-t border-text/10 pt-8 sm:flex-row sm:items-center sm:justify-between'>
          <p className='font-body text-xs text-text-muted'>
            &copy; {new Date().getFullYear()} Supercar Velocity. All rights
            reserved.
          </p>
          <p className='font-body text-xs text-text-muted'>
            Prices shown are indicative and subject to change. See{' '}
            <Link href='/disclaimer' className='underline hover:text-accent'>
              disclaimer
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}


