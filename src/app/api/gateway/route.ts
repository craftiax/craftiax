import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ gatewayUrl: process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL });
}
