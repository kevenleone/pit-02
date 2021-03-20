import React from "react";
import dompurify from "dompurify";

export default function HTML({ className, html }) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: dompurify.sanitize(html) }}
    />
  );
}
