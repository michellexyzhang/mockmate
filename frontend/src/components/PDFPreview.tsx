import React from "react";

interface PDFPreviewProps {
  pdfUrl: string | null;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ pdfUrl }) => (
  <div className="mt-8 w-full max-w-4xl">
    <h2 className="text-2xl font-bold mb-2">PDF Preview</h2>
    {pdfUrl ? (
      <iframe src={pdfUrl} width="100%" height={600} style={{ border: "1px solid #ccc" }} />
    ) : (
      <p className="text-neutral-500">No PDF generated yet.</p>
    )}
  </div>
);

export default PDFPreview; 