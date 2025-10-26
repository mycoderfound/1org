// src/data/timeline.ts
export type TimelineMedia =
  | { kind: "image"; src: string; alt: string; width?: number; height?: number }
  | { kind: "video"; src: string; poster?: string; captionsVtt?: string };

export type TimelineItem = {
  id: string;
  dateISO: `${number}-${number}-${number}`; // e.g., "2025-09-13"
  title: string;
  summary: string;
  tags?: string[];
  cta?: { label: string; href: string; external?: boolean };
  media?: TimelineMedia;
};

export const timelineItems: TimelineItem[] = [
  {
    id: "2020-04-01",
    dateISO: "2020-04-01",
    title: "Seeds of myCoder",
    summary:
      "Hannah introduces her kids to Scratch during the pandemic—planting the seeds for myCoder Foundation.",
    tags: ["origin", "family", "education"],
    media: { kind: "image", src: "/images/timeline/2020-seed.jpg", alt: "Hannah teaching Scratch at home" },
  },
  {
    id: "2023-11-01",
    dateISO: "2023-11-01",
    title: "Community Teaching Expands",
    summary:
      "Community tech classes grow via local partners, shaping our digital literacy & web fundamentals curriculum.",
    tags: ["community", "workshops"],
  },
  {
    id: "2024-06-09",
    dateISO: "2024-06-09",
    title: "Foundation Takes Shape",
    summary:
      "myCoder formalizes as a 501(c)(3)–driven initiative focused on digital & financial literacy.",
    tags: ["nonprofit", "mission"],
  },
  {
    id: "2024-08-16",
    dateISO: "2024-08-16",
    title: "400+ Participants Reached",
    summary:
      "Workshops and events surpass 400 total participants—confirming demand and impact.",
    tags: ["impact", "events"],
  },
  {
    id: "2024-12-16",
    dateISO: "2024-12-16",
    title: "Descript Partnership",
    summary:
      "Descript partners with myCoder—accelerating voiceover, transcription, and content workflows.",
    tags: ["partnerships", "media"],
  },
  {
    id: "2025-09-02",
    dateISO: "2025-09-02",
    title: "10-Week Pilot Goes Live",
    summary:
      "First pilot invites youth + parents (onsite/virtual) with a survey for case-study measurement.",
    tags: ["pilot", "measurement"],
    cta: { label: "Join the Club (Free)", href: "/join" },
  },
];
