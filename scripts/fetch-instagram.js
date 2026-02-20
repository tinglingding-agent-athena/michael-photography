/**
 * Instagram Feed Fetcher
 * 
 * To use this script:
 * 1. Go to https://developers.facebook.com and create an app
 * 2. Add "Instagram Basic Display" to your app
 * 3. Add a test user for your Instagram account
 * 4. Get the access token
 * 5. Run: INSTAGRAM_TOKEN=your_token node scripts/fetch-instagram.js
 * 
 * This will fetch your Instagram posts and save them to src/data/instagram.js
 */

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID; // Optional, can be 'me'

const PORTRAIT_FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
const UNDERWATER_FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';

// Placeholder data - used when no token is available
const PLACEHOLDER_PORTRAIT = [
  { id: '1', mediaUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400', caption: 'Elegance' },
  { id: '2', mediaUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', caption: 'Natural beauty' },
  { id: '3', mediaUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', caption: 'The gaze' },
  { id: '4', mediaUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', caption: 'Masculine' },
  { id: '5', mediaUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', caption: 'Confidence' },
  { id: '6', mediaUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400', caption: 'Soul' },
  { id: '7', mediaUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400', caption: 'Radiance' },
  { id: '8', mediaUrl: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400', caption: 'Warmth' },
];

const PLACEHOLDER_UNDERWATER = [
  { id: 'u1', mediaUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400', caption: 'Deep blue' },
  { id: 'u2', mediaUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400', caption: 'Serenity' },
  { id: 'u3', mediaUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400', caption: 'Ocean dream' },
  { id: 'u4', mediaUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', caption: 'Tropical' },
  { id: 'u5', mediaUrl: 'https://images.unsplash.com/photo-1582967788606-a171f1080ca8?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1582967788606-a171f1080ca8?w=400', caption: 'Coral' },
  { id: 'u6', mediaUrl: 'https://images.unsplash.com/photo-1576510100040-87e7f71754f1?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1576510100040-87e7f71754f1?w=400', caption: 'Diver' },
  { id: 'u7', mediaUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400', caption: 'Manta' },
  { id: 'u8', mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400', caption: 'Shore' },
];

async function fetchInstagramMedia(fields) {
  const url = `https://graph.instagram.com/${INSTAGRAM_USER_ID || 'me'}/media?fields=${fields}&access_token=${INSTAGRAM_TOKEN}&limit=20`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Instagram API error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.data;
}

function formatPost(post) {
  return {
    id: post.id,
    mediaUrl: post.media_url || post.thumbnail_url,
    thumbnailUrl: post.thumbnail_url || post.media_url,
    caption: post.caption || '',
    permalink: post.permalink,
    timestamp: post.timestamp
  };
}

function generateDataFile(portraitPosts, underwaterPosts) {
  const formatArray = (posts) => posts.map(p => `  {
    id: '${p.id}',
    mediaUrl: '${p.mediaUrl}',
    thumbnailUrl: '${p.thumbnailUrl}',
    caption: '${p.caption.replace(/'/g, "\\'")}',
    permalink: '${p.permalink}',
    timestamp: '${p.timestamp}'
  }`).join(',\n');

  return `// Auto-generated by Instagram fetcher script
// Run: INSTAGRAM_TOKEN=your_token node scripts/fetch-instagram.js

export const portraitPosts = [
${formatArray(portraitPosts)}
];

export const underwaterPosts = [
${formatArray(underwaterPosts)}
];
`;
}

async function main() {
  if (!INSTAGRAM_TOKEN) {
    console.log('⚠️ No INSTAGRAM_TOKEN provided');
    console.log('Using placeholder data. To fetch real Instagram posts:');
    console.log('  1. Get an Instagram Basic Display access token');
    console.log('  2. Run: INSTAGRAM_TOKEN=your_token node scripts/fetch-instagram.js');
    console.log('');
    console.log('Using placeholder images instead.');
    return;
  }

  console.log('📸 Fetching Instagram posts...');
  
  try {
    const portraitMedia = await fetchInstagramMedia(PORTRAIT_FIELDS);
    const underwaterMedia = await fetchInstagramMedia(UNDERWATER_FIELDS);
    
    const portraitPosts = portraitMedia.slice(0, 12).map(formatPost);
    const underwaterPosts = underwaterMedia.slice(0, 12).map(formatPost);
    
    const content = generateDataFile(portraitPosts, underwaterPosts);
    const fs = await import('fs');
    
    fs.writeFileSync('./src/data/instagram.js', content);
    
    console.log(`✅ Fetched ${portraitPosts.length} portrait posts`);
    console.log(`✅ Fetched ${underwaterPosts.length} underwater posts`);
    console.log('✅ Saved to src/data/instagram.js');
    
  } catch (error) {
    console.error('❌ Error fetching Instagram data:', error.message);
    process.exit(1);
  }
}

main();
