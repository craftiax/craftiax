const flareArtContractAddress = '0x4DA872187c009c46583b4A5815017Bb4792f04BE' as const;
const flareArtContractAbi = [
  {
    type: 'function',
    name: 'flareArt',
    inputs: [
      { type: 'uint256', name: 'artId' },
      { type: 'string', name: 'artistName' },
      { type: 'address', name: 'artistAddress' }
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'craftiax_flare',
    inputs: [
      { type: 'uint256', name: 'artId' },
      { type: 'uint256', name: 'artistId' },
      { type: 'address', name: 'artistAddress' },
      { type: 'address', name: 'craftiaxAddress' }
    ],
    outputs: [],
    stateMutability: 'payable',
  },
] as const;

export const contracts = [
  {
    address: flareArtContractAddress,
    abi: flareArtContractAbi,
  },
];
