import { NextResponse } from 'next/server';
import { db } from '../../utils/firebaseAdmin';

async function createCollectionsAndDummyData() {
  const collections = [
    {
      name: 'users',
      data: [
        { username: 'user1', email: 'user1@example.com', isCreator: false },
        { username: 'creator1', email: 'creator1@example.com', isCreator: true },
      ]
    },
    {
      name: 'creators',
      data: [
        { name: 'Creator 1', bio: 'Amazing artist', avatarUrl: '/creator1.jpg' },
        { name: 'Creator 2', bio: 'Talented designer', avatarUrl: '/creator2.jpg' },
      ]
    },
    {
      name: 'nfts',
      data: [
        { title: 'Cosmic Dreams', image: '/nft1.jpeg', flaresReceived: 42, totalUSDC: 250 },
        { title: 'Digital Oasis', image: '/nft2.jpg', flaresReceived: 28, totalUSDC: 180 },
      ]
    },
    {
      name: 'collections',
      data: [
        { name: 'Neon Dreamscapes', coverImage: '/collection1.jpg', itemCount: 10, totalFlares: 156 },
        { name: 'Cyberpunk Avatars', coverImage: '/collection2.jpg', itemCount: 25, totalFlares: 342 },
      ]
    },
    {
      name: 'flares',
      data: [
        { nftId: 'Cosmic Dreams', amount: 5, userId: 'user1' },
        { nftId: 'Digital Oasis', amount: 3, userId: 'user1' },
      ]
    },
  ];

  for (const collection of collections) {
    const collectionRef = db.collection(collection.name);
    for (const doc of collection.data) {
      await collectionRef.add(doc);
    }
  }
}

export async function GET(request: Request) {
  if (!db) {
    return NextResponse.json({ 
      message: 'Firebase not initialized', 
      error: 'Firebase admin SDK initialization failed' 
    }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  if (action === 'create') {
    try {
      await createCollectionsAndDummyData();
      return NextResponse.json({ 
        message: 'Collections and dummy data created successfully' 
      }, { status: 200 });
    } catch (error) {
      console.error('Error creating collections and dummy data:', error);
      return NextResponse.json({ 
        message: 'Error creating collections and dummy data', 
        error: error.message 
      }, { status: 500 });
    }
  }

  try {
    const collections = ['users', 'creators', 'nfts', 'collections', 'flares'];
    let totalDocuments = 0;

    for (const collectionName of collections) {
      const snapshot = await db.collection(collectionName).get();
      totalDocuments += snapshot.size;
    }

    return NextResponse.json({ 
      message: `Connected successfully. Found ${totalDocuments} total documents across all collections.` 
    }, { status: 200 });
  } catch (error) {
    console.error('Firebase connection error:', error);
    return NextResponse.json({ 
      message: 'Error connecting to Firebase', 
      error: error.message 
    }, { status: 500 });
  }
}
