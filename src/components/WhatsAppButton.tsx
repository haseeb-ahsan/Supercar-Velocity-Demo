
'use client';

export default function WhatsAppButton() {
  return (
    <a
      href='https://wa.me/4477768444957'
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Chat with us on WhatsApp'
      className='group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-accent/60 bg-surface shadow-2xl shadow-black/60 transition-all duration-300 hover:bg-accent'
    >
      <svg
        viewBox='0 0 24 24'
        width='24'
        height='24'
        fill='none'
        className='text-accent transition-colors duration-300 group-hover:text-background'
      >
        <path
          d='M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Z'
          stroke='currentColor'
          strokeWidth='1.4'
        />
        <path
          d='M8.3 8.5c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.4-.1.1-.3.3-.4.4-.1.1-.3.3-.1.5.1.3.7 1.1 1.5 1.8 1 .9 1.8 1.2 2.1 1.3.2.1.4.1.5-.1.1-.1.6-.7.8-.9.2-.2.3-.2.5-.1.2.1 1.4.6 1.6.8.2.1.4.2.4.3.1.4.1.8-.1 1.2-.2.4-1.1 1-1.9 1-.8.1-1.6 0-3.2-.7-2.6-1.1-4.2-3.7-4.4-3.9-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.8-2.1Z'
          fill='currentColor'
        />
      </svg>
    </a>
  );
}


