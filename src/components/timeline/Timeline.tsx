// src/components/timeline/Timeline.tsx
"use client";

import type { Variants } from "framer-motion";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";
import type { TimelineItem } from "@/data/timeline";

type Props = { items: TimelineItem[] };

// Simple year formatter
const yearFromISO = (iso: string) => new Date(iso).getFullYear();

export default function Timeline({ items }: Props) {
  // Ensure items are sorted ascending by date
  const sorted = useMemo(
    () => [...items].sort((a, b) => +new Date(a.dateISO) - +new Date(b.dateISO)),
    [items]
  );

  // Build a list of unique years for the “Jump to Year” row
  const years = useMemo(
    () => Array.from(new Set(sorted.map((i) => yearFromISO(i.dateISO)))),
    [sorted]
  );

  return (
    <section aria-labelledby="our-journey" className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h2 id="our-journey" className="text-2xl sm:text-3xl font-bold tracking-tight">
          Our Journey
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Scroll the timeline or jump to a specific year.
        </p>
        {/* Jump to Year (mobile-friendly horizontal scroll) */}
        <div className="mt-4 overflow-x-auto no-scrollbar">
          <ol className="flex gap-2 pr-2" aria-label="Jump to year">
            {years.map((y) => (
              <li key={y}>
                <a
                  href={`#y-${y}`}
                  className="inline-flex items-center rounded-full border border-neutral-700 px-3 py-1 text-xs hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {y}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </header>

      {/* Spine */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400/40 via-purple-400/40 to-cyan-400/40 md:block"
        />

        <ol className="space-y-8">
          {sorted.map((item, idx) => (
            <TimelineRow key={item.id} item={item} index={idx} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineRow({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px", once: true });
  const reduce = useReducedMotion();

  const isLeft = index % 2 === 0;

const variants: Variants = {
  hidden: { opacity: 0, x: isLeft ? -24 : 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      type: "spring",   // ✅ valid Framer Motion type
      damping: 22,
      stiffness: 180,
    },
  },
};

  const y = yearFromISO(item.dateISO);

  return (
    <li
      ref={ref}
      id={item.id}
      aria-labelledby={`${item.id}-title`}
      className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_2rem_1fr] md:items-stretch"
    >
      {/* Left column (or empty) */}
      <div className={`md:block ${isLeft ? "order-1" : "order-3"} hidden`} />

      {/* Center tick + year anchor (md+) */}
      <div className="relative order-2 hidden md:flex items-center justify-center">
        <div className="relative flex h-full items-center">
          {/* Tick */}
          <span
            aria-hidden="true"
            className="block h-3 w-3 rounded-full bg-cyan-400/80 ring-4 ring-cyan-400/10"
            title={String(y)}
          />
        </div>
      </div>

      {/* Card column (mobile full-width, md alternates) */}
      
<motion.article
  initial="hidden"
  animate={inView ? "show" : "hidden"}
  variants={
    reduce
      ? ({
          hidden: { opacity: 0 },
          show: { opacity: 1 },
        } as Variants) // ✅ cast to Variants
      : variants
  }
  className={`order-3 md:order-${isLeft ? "1" : "3"} rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 shadow-lg backdrop-blur`}
>
        {/* Year anchor (visible on mobile; md uses the spine) */}
        <a
          id={`y-${y}`}
          href={`#y-${y}`}
          aria-label={`Anchor for year ${y}`}
          className="mb-1 inline-flex items-center text-xs text-neutral-400 md:hidden"
        >
          {y}
        </a>

        <header className="mb-2">
          <h3 id={`${item.id}-title`} className="text-lg font-semibold">
            {item.title}
          </h3>
          <time dateTime={item.dateISO} className="block text-sm text-neutral-400">
            {new Date(item.dateISO).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </time>
        </header>

        <p className="text-sm leading-relaxed text-neutral-300">{item.summary}</p>

        {/* Media (optional) */}
        {item.media?.kind === "image" && (
          <div className="mt-3 overflow-hidden rounded-xl border border-neutral-800">
            <Image
              src={item.media.src}
              alt={item.media.alt}
              width={item.media.width ?? 960}
              height={item.media.height ?? 540}
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        {item.media?.kind === "video" && (
          <div className="mt-3 overflow-hidden rounded-xl border border-neutral-800">
            <video
              className="w-full"
              controls
              preload="none"
              poster={item.media.poster}
            >
              <source src={item.media.src} />
              {item.media.captionsVtt && <track kind="captions" src={item.media.captionsVtt} />}
            </video>
          </div>
        )}

        {/* Tags + CTA */}
        <footer className="mt-3 flex flex-wrap items-center gap-2">
          {item.tags?.map((t) => (
            <span
              key={t}
              className="inline-flex rounded-full border border-neutral-700 px-2 py-0.5 text-[11px] text-neutral-300"
            >
              {t}
            </span>
          ))}
          {item.cta && (
            <Link
              href={item.cta.href}
              target={item.cta.external ? "_blank" : undefined}
              rel={item.cta.external ? "noreferrer" : undefined}
              className="ml-auto inline-flex items-center rounded-lg bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-cyan-300 ring-1 ring-cyan-500/30 hover:bg-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {item.cta.label}
            </Link>
          )}
        </footer>

        {/* Skip link for keyboard users */}
        <a
          href={`#${item.id}-next`}
          className="sr-only focus:not-sr-only focus:mt-2 focus:inline-block focus:rounded-md focus:bg-neutral-800 focus:px-2 focus:py-1"
        >
          Skip to next milestone
        </a>
        <span id={`${item.id}-next`} className="sr-only" />
      </motion.article>
    </li>
  );
}
