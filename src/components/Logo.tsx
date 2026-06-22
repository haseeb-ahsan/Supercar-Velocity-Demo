import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link
      href='/'
      aria-label='Supercar Velocity — Home'
      className='flex items-center gap-3 shrink-0'
    >
      <Image
        src='/just-logo.png'
        alt='Supercar Velocity'
        width={42}
        height={46}
        priority
      />

      <span
        className='
       text-white
       uppercase
       tracking-[0.2em]
       sm:tracking-[0.25em]
       text-xs
       sm:text-sm
       font-heading
       font-medium
     '
      >
        SUPERCAR VELOCITY
      </span>
    </Link>
  );
}
