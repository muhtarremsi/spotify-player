'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function PlayerContent() {
  const searchParams = useSearchParams();
  const trackId = searchParams.get('id') || '4cOdK2wG2ZIB99Z9P9q0nc'; // Default Song
  const [track, setTrack] = useState(null);

  useEffect(() => {
    fetch(`/api/track?id=${trackId}`)
      .then(res => res.json())
      .then(data => setTrack(data));
  }, [trackId]);

  if (!track) return <div className="p-8 text-white opacity-50 italic">Suche Track...</div>;

  return (
    <main className="flex min-h-screen items-center justify-center bg-transparent p-4">
      <div className="group relative flex w-full max-w-sm items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-4 shadow-2xl backdrop-blur-md transition-all hover:border-green-500/50">
        
        {/* Album Cover */}
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
          <img src={track.albumImage} alt="Cover" className="h-full w-full object-cover" />
        </div>

        {/* Info & Audio */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <h1 className="truncate text-lg font-bold text-white">{track.title}</h1>
          <p className="truncate text-sm text-gray-400">{track.artist}</p>
          
          <div className="mt-2 flex items-center gap-2">
            {track.previewUrl ? (
              <audio controls className="h-6 w-full opacity-70 invert transition-opacity hover:opacity-100">
                <source src={track.previewUrl} type="audio/mpeg" />
              </audio>
            ) : (
              <span className="text-[10px] uppercase tracking-widest text-green-500/70 font-semibold">
                Live on Spotify
              </span>
            )}
          </div>
        </div>

        {/* Spotify Logo Icon */}
        <div className="absolute right-2 top-2 opacity-20 group-hover:opacity-100 transition-opacity">
          <svg className="h-5 w-5 fill-green-500" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.492 17.306c-.214.351-.67.461-1.021.247-2.822-1.725-6.375-2.116-10.56-1.16-.398.091-.8-.162-.892-.56-.091-.399.162-.801.56-.892 4.582-1.047 8.513-.604 11.666 1.321.351.215.461.67.247 1.021zm1.464-3.26c-.27.439-.844.581-1.284.311-3.227-1.983-8.151-2.559-11.97-1.397-.497.151-1.023-.13-1.174-.627-.151-.498.13-1.023.627-1.174 4.364-1.325 9.813-.679 13.518 1.597.439.27.581.844.311 1.284zm.135-3.39c-3.874-2.3-10.274-2.512-14.01-1.378-.595.181-1.222-.152-1.403-.747-.181-.595.152-1.222.747-1.403 4.29-1.302 11.362-1.046 15.8 1.59.535.318.708 1.008.39 1.543-.318.535-1.008.708-1.543.39z"/>
          </svg>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlayerContent />
    </Suspense>
  );
}