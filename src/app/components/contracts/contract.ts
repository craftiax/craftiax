const artistPaymentContractAddress = '0x16e86C7A4f8fAFF49141e79a37845aaD22FF4a5C';

const artistPaymentContractAbi = [
  {
    type: 'function',
    name: 'payArtist',
    inputs: [{ name: 'artistAddress', type: 'address' }],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    name: 'PaymentProcessed',
    inputs: [
      { name: 'artist', type: 'address', indexed: true },
      { name: 'artistAmount', type: 'uint256', indexed: false },
      { name: 'craftiaxFee', type: 'uint256', indexed: false },
    ],
  },
] as const;

export const contracts = [
  {
    address: artistPaymentContractAddress,
    abi: artistPaymentContractAbi,
    functionName: 'payArtist',
    args: [],
  },
];

// You can also export individual elements if needed
export { artistPaymentContractAddress, artistPaymentContractAbi };
