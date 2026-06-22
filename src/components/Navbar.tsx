
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { useCurrency } from "@/context/CurrencyContext";
import { CURRENCIES, CURRENCY_ORDER } from "@/lib/currency";

const NAV_LINKS = [
  { href: "/stock", label: "Stock" },
  { href: "/finance", label: "Finance" },
  { href: "/sell-your-car", label: "Sell Your Car" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function CurrencySwitcher({ compact = false }: { compact?: boolean }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1.5 font-body text-xs tracking-widest uppercase text-text-muted hover:text-accent transition-colors duration-300 ${
          compact ? "py-2" : ""
        }`}
      >
        <span className="text-accent">{CURRENCIES[currency].symbol}</span>
        {currency}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            role="listbox"
            className="absolute right-0 mt-3 w-44 border border-text/10 bg-surface shadow-2xl shadow-black/60"
          >
            {CURRENCY_ORDER.map((code) => (
              <button
                key={code}
                role="option"
                aria-selected={currency === code}
                onClick={() => {
                  setCurrency(code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-3 text-left font-body text-xs tracking-wide transition-colors duration-200 hover:bg-background ${
                  currency === code ? "text-accent" : "text-text-muted"
                }`}
              >
                <span>
                  {code} <span className="text-text-muted">&middot; {CURRENCIES[code].label}</span>
                </span>
                <span>{CURRENCIES[code].symbol}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the mobile menu on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const solid = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-background/90 backdrop-blur-md border-b border-text/10"
            : "bg-gradient-to-b from-background/70 via-background/20 to-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16 py-4">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-body text-xs tracking-widest uppercase transition-colors duration-300 ${
                  pathname === link.href ? "text-accent" : "text-text-muted hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-8">
            <CurrencySwitcher />
            <Link
              href="/contact"
              className="border border-accent/60 text-text font-body text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-accent hover:text-background transition-colors duration-300"
            >
              Enquire
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="lg:hidden relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          >
            <span className="h-px w-6 bg-text" />
            <span className="h-px w-6 bg-text" />
            <span className="h-px w-4 self-end bg-text" />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-text/10">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="relative h-10 w-10"
              >
                <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-text" />
                <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-text" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className={`block font-heading text-4xl py-3 border-b border-text/10 ${
                      pathname === link.href ? "text-accent" : "text-text"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 * NAV_LINKS.length }}
              className="flex items-center justify-between px-8 py-8 border-t border-text/10"
            >
              <CurrencySwitcher compact />
              <Link
                href="/contact"
                className="bg-accent text-background font-body text-xs tracking-widest uppercase px-6 py-3"
              >
                Enquire
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


