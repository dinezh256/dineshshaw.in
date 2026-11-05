import { readFile } from "node:fs/promises";
import path from "node:path";

export default async function handler(_req, res) {
  const pdfPath = path.join(
    process.cwd(),
    "public",
    "resume",
    "Dinesh_Shaw_Resume.pdf",
  );

  try {
    const pdf = await readFile(pdfPath);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Dinesh_Shaw_Resume.pdf"',
    );
    res.setHeader("Content-Length", pdf.length);
    res.status(200).send(pdf);
  } catch {
    res.status(404).json({ error: "Resume PDF has not been generated yet." });
  }
}
