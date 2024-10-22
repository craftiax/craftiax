interface UserProfile {
  address: string;
  isCreator: boolean;
  craftsUploaded: number;
  username: string;
  creatorSince: Date;
}

// This is a mock implementation. Replace with actual API calls or blockchain interactions.
const mockProfiles: { [key: string]: UserProfile } = {};

                                                                                                                                                                                                                                                                                                                                       export const getUserProfile = async (address: string): Promise<UserProfile> => {
  if (!mockProfiles[address]) {
    mockProfiles[address] = {
      address,
      isCreator: false,
      craftsUploaded: 0,
      username: `User_${address.slice(0, 6)}`,
      creatorSince: new Date(),
    };
  }
  return mockProfiles[address];
};

export const becomeCreator = async (address: string): Promise<UserProfile> => {
  if (!mockProfiles[address]) {
    throw new Error("User not found");
  }
  mockProfiles[address] = {
    ...mockProfiles[address],
    isCreator: true,
    creatorSince: new Date(),
  };
  return mockProfiles[address];
};
