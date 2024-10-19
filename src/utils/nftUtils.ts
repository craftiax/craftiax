// src/utils/nftUtils.ts
export async function getNFTFlareDetails(id: string) {
  // Implement the logic to fetch NFT flare details
  // For now, return a mock object
  return {
    totalUSDC: "100",
    flares: [
      { user: "User1", flareAmount: "10", usdcAmount: "50", date: new Date() },
      { user: "User2", flareAmount: "5", usdcAmount: "25", date: new Date() },
    ],
  };
}
