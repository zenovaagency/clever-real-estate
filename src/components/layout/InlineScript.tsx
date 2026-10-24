"use client";

/**
 * Render-blocking inline script that runs on the server-rendered HTML only.
 * On the client it is emitted as inert `text/plain`, which avoids React's
 * dev warning about rendering <script> tags (see Next.js "Preventing flash").
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
