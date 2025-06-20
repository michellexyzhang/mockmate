import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const text: string | null = data.get("text") as string | null;

  const uploadDir = join(process.cwd(), "public", "uploads");

  try {
    await mkdir(uploadDir, { recursive: true });

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join(uploadDir, file.name);
      await writeFile(path, buffer);
      console.log(`File saved to ${path}`);
      return NextResponse.json({ success: true, path: `/uploads/${file.name}` });
    } else if (text) {
      const fileName = `pasted-text-${Date.now()}.txt`;
      const path = join(uploadDir, fileName);
      await writeFile(path, text);
      console.log(`Text saved to ${path}`);
      return NextResponse.json({ success: true, path: `/uploads/${fileName}` });
    } else {
      return NextResponse.json({ success: false, error: "No file or text found" });
    }
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ success: false, error: "Error saving data" });
  }
} 