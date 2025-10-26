"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavItem = { name: string; href: string; external?: boolean };

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Our Mission", href: "/about" },
  { name: "Business Solutions", href: "/pricing" },
  { name: "LogIn", href: "/login" },
];

const isActive = (path: string, href: string) =>
  href === "/" ? path === "/" : path.startsWith(href);

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function Brand() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2" aria-label="myCoder home">
      <Image src="/favicon.ico" alt="myCoder Logo" width={50} height={50} className="rounded-lg" />
      <span className="font-semibold tracking-tight text-slate-250">
        <span className="text-sky-400">my</span>
        <span className="text-slate-200">Coder</span>
        <span className="text-violet-400">FOUND</span>
      </span>
    </Link>
  );
}

function CtaButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cx("flex items-center gap-2", compact && "w-full justify-stretch")}>
      <a
        href="https://www.paypal.com/ncp/payment/CT5L5NEA7SA2Q"
        target="_blank"
        rel="noopener noreferrer"
        className={cx(
          "group inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold",
          "bg-gradient-to-r from-sky-500 to-violet-600 text-white shadow-lg shadow-violet-900/20",
          "ring-1 ring-white/10 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-sky-400"
        )}
      >
        Donate
        <span className="ml-2 inline-block rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-bold tracking-wide">❤</span>
      </a>
      <Link
        href="/login"
        className={cx(
          "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold",
          "bg-slate-900/60 text-slate-100 ring-1 ring-white/10 backdrop-blur",
          "hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-violet-400"
        )}
      >
        Volunteer
      </Link>
    </div>
  );
}

export default function Navbar() {
  // ✅ unconditionally call the hook
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="pointer-events-none absolute inset-0 h-16 bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50" />
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <Brand />

        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = !item.external && isActive(pathname, item.href);
            const base =
              "rounded-xl px-3 py-2 text-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400";
            return (
              <Link key={item.name} href={item.href} className={cx(base, active && "text-white bg-white/5")}>
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <CtaButtons />
        </div>

        <button
          className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 ring-1 ring-white/15 hover:bg-white/5 md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div
          ref={menuRef}
          className={cx(
            "fixed inset-x-0 top-16 z-40 origin-top rounded-b-2xl border-t border-white/10 bg-slate-950/95 backdrop-blur-md md:hidden min-h-[100dvh] pt-16",
            open ? "scale-y-100 opacity-100" : "pointer-events-none scale-y-95 opacity-0",
            "transition-all duration-200"
          )}
        >
          <div className="mx-auto max-w-7xl px-4 pb-4 pt-2">
            <div className="grid gap-1">
              {NAV_ITEMS.map((item) => (
                <Link key={item.name} href={item.href} className="rounded-xl px-3 py-2 text-lg font-medium text-slate-300 hover:text-white hover:bg-white/5">
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-3 border-t border-white/10 pt-3">
              <CtaButtons compact />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

