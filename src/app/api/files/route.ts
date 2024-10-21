import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/app/utils/config";

export const runtime = 'edge'; // if you're using Edge runtime
// or
// export const runtime = 'nodejs'; // if you're using Node.js runtime

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const uploadData = await pinata.upload.file(file);
    const ipfsHash = uploadData.IpfsHash;
    return NextResponse.json({ ipfsHash }, { status: 200 });
  } catch (e) {
    console.error("Error uploading file:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
