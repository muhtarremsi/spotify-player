import { getTrackData } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'No ID' }, { status: 400 });

  try {
    const track = await getTrackData(id);
    return NextResponse.json({
      title: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      albumImage: track.album.images[0].url,
      previewUrl: track.preview_url, // Kann bei neuen Apps null sein (2026 Regel)
      link: track.external_urls.spotify
    });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}