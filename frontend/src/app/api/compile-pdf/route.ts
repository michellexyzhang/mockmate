import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { latex } = await req.json();
    // Forward the LaTeX to your backend Python service
    const backendRes = await fetch("http://localhost:8000/compile-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latex }),
    });
    if (!backendRes.ok) {
      return new NextResponse("Failed to compile PDF", { status: 500 });
    }
    const pdfBuffer = await backendRes.arrayBuffer();
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=mock-questions.pdf",
      },
    });
  } catch (e) {
    return new NextResponse("Error compiling PDF", { status: 500 });
  }
} 