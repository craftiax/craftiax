import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/app/utils/config";

export async function POST(request: NextRequest) {
  try {
    const metadata = await request.json();
    const options = {
      pinataMetadata: {
        name: `${metadata.name} Metadata`,
      },
    };
    const uploadData = await pinata.upload.json(metadata);
    const ipfsHash = uploadData.IpfsHash;
    return NextResponse.json({ ipfsHash }, { status: 200 });
  } catch (e) {
    console.error("Error uploading metadata:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
