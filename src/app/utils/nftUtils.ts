export async function getNFTFlareDetails(id: string) {
  // Implement the logic to fetch flare details
  // For now, return mock data
  return {
    totalUSDC: 1000,
    flares: [
      { user: 'User1', flareAmount: 50, usdcAmount: 500, date: new Date() },
      { user: 'User2', flareAmount: 30, usdcAmount: 300, date: new Date() },
    ]
  };
}
