
const flareArtContractAddress = process.env.CONTRACT_ADDRESS as `0x${string}`;
const flareArtContractAbi = [
  {
    type: 'function',
    name: 'flareArt',
    inputs: [
      { type: 'uint256', name: 'artId' },
      { type: 'string', name: 'artistName' },
      { type: 'address', name: 'artistAddress' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
] as const;

export const flareArtContract = {
  address: flareArtContractAddress,
  abi: flareArtContractAbi,
  functionName: 'flareArt',
};
