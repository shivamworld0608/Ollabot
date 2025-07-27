import React, { useRef, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export default function PDFViewer({ file, pageNumber = 1, textStart, textEnd }) {
  const containerRef = useRef(null);

  // Highlighting logic
  useEffect(() => {
    const tryHighlight = () => {
      const textLayer = containerRef.current?.querySelector('.rpv-core__text-layer');
      if (!textLayer) return;

      const textNodes = Array.from(textLayer.querySelectorAll('span'));
      let total = 0;

      for (const span of textNodes) {
        const len = span.textContent.length;
        const s = total;
        const e = total + len;

        if (e >= textStart && s <= textEnd) {
          span.style.backgroundColor = 'yellow';
        }
        total = e;
      }
    };

    const interval = setInterval(tryHighlight, 300); // wait for rendering
    return () => clearInterval(interval);
  }, [textStart, textEnd]);

  return (
    <div ref={containerRef} style={{ height: '700px' }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={file}
          initialPage={pageNumber - 1}
        />
      </Worker>
    </div>
  );
}
