// components/TypeformIframe.tsx
"use client";
import React from "react";

type Props = {
  formId: string;
  hidden?: Record<string, string>;
  height?: number | string;
  className?: string;
};

export default function TypeformIframe({ formId, hidden, height = "70vh", className }: Props) {
  const params = new URLSearchParams(hidden || {}).toString();
  const src = `https://form.typeform.com/to/${formId}${params ? `?${params}` : ""}`;

  return (
    <iframe
      title="Typeform"
      src={src}
      className={className}
      style={{ width: "100%", height: typeof height === "number" ? `${height}px` : height, border: 0 }}
      loading="lazy"
      allow="camera; microphone; autoplay; encrypted-media;"
    />
  );
}
