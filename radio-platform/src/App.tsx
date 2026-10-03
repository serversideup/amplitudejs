import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, AudioLines, Heart, Headphones, Menu, Music2, Pause, Play, Search, SkipBack, SkipForward, Volume2, Waves, X } from 'lucide-react';
import { resolveTimelinePosition } from '../shared/timeline';
import { RadioAudioEngine } from './audioEngine';
import { currentOffsetSeconds, decidePlayback } from './playback';
import { type Channel, type Episode, type NowPlaying, usePlayerStore } from './playerStore';

const palette = ['#aee9d5', '#f4c99a', '#b5b6f2', '#f19883', '#a9c4e3'];

const demoChannels: Channel[] = [
  { id: 'demo-after-hours', slug: 'after-hours', name: 'Demo Radio', genre: 'Demo audio', type: 'simulated', description: 'Sample MP3 tracks for player testing.', cycleStart: '2026-09-28T00:00:00.000Z', segments: [
    { position: 0, title: 'Demo Track 01', artist: null, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', durationSeconds: 372 },
    { position: 1, title: 'Demo Track 02', artist: null, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', durationSeconds: 415 },
    { position: 2, title: 'Demo Track 03', artist: null, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', durationSeconds: 390 },
    { position: 3, title: 'Demo Track 04', artist: null, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', durationSeconds: 426 },
  ], episodes: [] },
  { id: 'demo-daylight', slug: 'daylight-fm', name: 'SomaFM Indie Pop (demo)', genre: 'Demo stream', type: 'live', streamUrl: 'https://ice1.somafm.com/indiepop-128-mp3', segments: [], episodes: [] },
  { id: 'demo-forma', slug: 'forma', name: 'SomaFM Drone Zone (demo)', genre: 'Demo stream', type: 'live', streamUrl: 'https://ice1.somafm.com/dronezone-128-mp3', segments: [], episodes: [] },
  { id: 'demo-sundown', slug: 'sundown-club', name: 'SomaFM Groove Salad (demo)', genre: 'Demo stream', type: 'live', streamUrl: 'https://ice1.somafm.com/groovesalad-128-mp3', segments: [], episodes: [] },
  { id: 'demo-podcast', slug: 'ajn-podcasts', name: 'Demo Episodes', genre: 'Sample audio', type: 'on_demand', segments: [], episodes: [
    { id: 'episode-listening', title: 'Demo Episode 01', description: 'Sample MP3 for player testing; episode metadata was not supplied.', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', durationSeconds: null },
    { id: 'episode-train', title: 'Demo Episode 02', description: 'Sample MP3 for player testing; episode metadata was not supplied.', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', durationSeconds: null },
  ] },
];

export type EpisodeFilter = { show?: string; type?: string };
export type EpisodeFacet = { show: string | null; type: string | null; count: number };
const SHOW_LABELS: Record<string, string> = { 'alex-jones': 'Alex Jones', 'war-room': 'War Room', 'sunday-night-live': 'Sunday Night Live' };
const TYPE_LABELS: Record<string, string> = { full_show: 'Full shows', hour: 'Hours', special: 'Specials', segment: 'Segments', live: 'Live' };
const TYPE_BADGES: Record<string, string> = { full_show: 'FULL SHOW', hour: 'HOUR', special: 'SPECIAL', segment: 'SEGMENT', live: 'LIVE' };

function episodesUrl(slug: string, filter: EpisodeFilter, cursor?: string | null) {
  const url = new URL(`/api/channels/${encodeURIComponent(slug)}/episodes`, window.location.origin);
  url.searchParams.set('limit', '24');
  if (filter.show) url.searchParams.set('show', filter.show);
  if (filter.type) url.searchParams.set('type', filter.type);
  if (cursor) url.searchParams.set('cursor', cursor);
  return url;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remaining = Math.floor(seconds % 60);
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}` : `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
}

export default function App() {
  const channels = usePlayerStore(state => state.channels);
  const channel = usePlayerStore(state => state.currentChannel);
  const playing = usePlayerStore(state => state.playing);
  const volume = usePlayerStore(state => state.volume);
  const nowPlaying = usePlayerStore(state => state.nowPlaying);
  const episode = usePlayerStore(state => state.activeEpisode);
  const position = usePlayerStore(state => state.position);
  const duration = usePlayerStore(state => state.duration);
  const setChannels = usePlayerStore(state => state.setChannels);
  const mergeChannel = usePlayerStore(state => state.mergeChannel);
  const tune = usePlayerStore(state => state.tune);
  const setPlaying = usePlayerStore(state => state.setPlaying);
  const setVolume = usePlayerStore(state => state.setVolume);
  const setNowPlaying = usePlayerStore(state => state.setNowPlaying);
  const setEpisode = usePlayerStore(state => state.setEpisode);
  const setProgress = usePlayerStore(state => state.setProgress);

  const activeRef = useRef<HTMLAudioElement>(null);
  const warmRef = useRef<HTMLAudioElement>(null);
  const engineRef = useRef<RadioAudioEngine | null>(null);
  const loadedContent = useRef(new Set<string>());
  const lastActionKey = useRef<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [episodePages, setEpisodePages] = useState<Record<string, string | null>>({});
  const [loadingEpisodes, setLoadingEpisodes] = useState<string | null>(null);
  const [episodeFilters, setEpisodeFilters] = useState<Record<string, EpisodeFilter>>({});
  const [episodeFacets, setEpisodeFacets] = useState<Record<string, EpisodeFacet[]>>({});
  const filteredChannels = useMemo(() => channels.filter(item => `${item.name} ${item.genre} ${item.city}`.toLowerCase().includes(search.toLowerCase())), [channels, search]);
  const channelIndex = channels.findIndex(item => item.id === channel?.id);
  const localTimeline = channel?.type === 'simulated' && channel.cycleStart ? resolveTimelinePosition(channel.segments, channel.cycleStart) : null;
  const activeSegment = nowPlaying?.segment ?? localTimeline?.segment ?? channel?.segments[nowPlaying?.segmentIndex ?? 0];
  const title = episode?.title ?? nowPlaying?.title ?? activeSegment?.title ?? channel?.currentTitle ?? channel?.name ?? 'Tune in';
  const artist = episode ? 'AJN Podcasts' : nowPlaying?.artist ?? activeSegment?.artist ?? channel?.currentArtist ?? 'Independent radio';
  const album = episode ? channel?.name : nowPlaying?.album ?? channel?.currentAlbum;
  const stationColor = palette[Math.max(0, channelIndex) % palette.length];

  useEffect(() => {
    if (!activeRef.current || !warmRef.current) return;
    const engine = new RadioAudioEngine(activeRef.current, warmRef.current);
    engine.setVolume(volume);
    engineRef.current = engine;
    return () => { engine.dispose(); engineRef.current = null; };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const catalog: Channel[] = [];
      let cursor: string | null = null;
      do {
        const url = new URL('/api/channels', window.location.origin);
        url.searchParams.set('limit', '100');
        if (cursor) url.searchParams.set('cursor', cursor);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Channel API unavailable');
        const data = await response.json();
        catalog.push(...data.channels);
        cursor = data.nextCursor ?? null;
      } while (cursor && mounted);
      if (mounted && catalog.length) setChannels(catalog);
    })().catch(error => { console.info('Using demo radio catalog while the API is unavailable.', error); if (mounted) setChannels(demoChannels); });
    return () => { mounted = false; };
  }, [setChannels]);

  useEffect(() => {
    if (!channel || channel.type === 'live') return;
    if (channel.type === 'simulated' && channel.segments.length) { loadedContent.current.add(channel.slug); return; }
    if (channel.type === 'on_demand' && channel.episodes.length) { loadedContent.current.add(channel.slug); return; }
    if (loadedContent.current.has(channel.slug)) return;
    loadedContent.current.add(channel.slug);
    const endpoint = channel.type === 'simulated' ? `/api/channels/${encodeURIComponent(channel.slug)}/content` : `/api/channels/${encodeURIComponent(channel.slug)}/episodes?limit=24`;
    fetch(endpoint).then(response => { if (!response.ok) throw new Error('Channel content unavailable'); return response.json(); }).then(data => {
      if (channel.type === 'simulated') mergeChannel(channel.slug, { segments: data.segments ?? [] });
      else {
        mergeChannel(channel.slug, { episodes: data.episodes ?? [] });
        setEpisodePages(value => ({ ...value, [channel.slug]: data.nextCursor ?? null }));
      }
    }).catch(error => { loadedContent.current.delete(channel.slug); console.info('Could not load channel details.', error); });
  }, [channel, mergeChannel]);

  useEffect(() => { engineRef.current?.setVolume(volume); }, [volume]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    const segment = nowPlaying?.segment ?? localTimeline?.segment ?? channel?.segments[nowPlaying?.segmentIndex ?? 0];
    const offsetSeconds = currentOffsetSeconds(nowPlaying?.offsetSeconds ?? localTimeline?.offsetSeconds, nowPlaying?.receivedAt, performance.now());
    const action = decidePlayback({ channel, playing, episode, segment, offsetSeconds });
    if (action.kind !== 'simulated' && lastActionKey.current === action.key) return; // metadata updates must not reload live/episode audio
    lastActionKey.current = action.key;
    const fail = () => setPlaying(false);
    if (action.kind === 'pause') engine.pause();
    else if (action.kind === 'live') void engine.playStream(action.url, { onGiveUp: fail }).catch(() => undefined); // engine retries with backoff
    else if (action.kind === 'episode') void engine.playEpisode(action.url).catch(fail);
    else engine.playSimulatedSegment(action.segment, action.offsetSeconds, () => { void fetchCurrentPosition(true); }, fail);
  }, [channel, playing, episode, nowPlaying, setPlaying]);

  useEffect(() => {
    if (!channel || channel.type === 'on_demand') return;
    let alive = true;
    const apply = (metadata: NowPlaying) => {
      if (!alive) return;
      setNowPlaying({ ...metadata, receivedAt: performance.now() });
    };
    const refresh = () => fetch(`/api/channels/${encodeURIComponent(channel.slug)}/now-playing`).then(response => { if (!response.ok) throw new Error('Now playing unavailable'); return response.json(); }).then(apply).catch(() => {
      if (channel.type !== 'simulated' || !channel.cycleStart) return;
      const fallback = resolveTimelinePosition(channel.segments, channel.cycleStart);
      if (fallback) apply({ type: 'simulated', ...fallback, segmentIndex: fallback.segmentIndex, offsetSeconds: fallback.offsetSeconds, serverTime: new Date().toISOString() });
    });
    void refresh();
    let previousEventId: string | null = null;
    const events = typeof EventSource !== 'undefined' ? new EventSource(`/api/channels/${encodeURIComponent(channel.slug)}/events`) : null;
    events?.addEventListener('now-playing', event => {
      try {
        const metadata = JSON.parse((event as MessageEvent).data) as NowPlaying;
        const eventId = metadata.segment ? `${metadata.segment.id ?? metadata.segmentIndex}:${metadata.segment.title}:${metadata.segment.artist ?? ''}` : null;
        if (channel.type === 'simulated' && eventId && previousEventId === eventId) return;
        if (eventId) previousEventId = eventId;
        apply(metadata);
      } catch (error) { console.warn('Invalid now-playing event', error); }
    });
    const fallbackTimer = !events && channel.type === 'simulated' ? window.setInterval(refresh, 15000) : undefined;
    return () => { alive = false; events?.close(); if (fallbackTimer) clearInterval(fallbackTimer); };
  }, [channel, setNowPlaying]);

  useEffect(() => {
    if (!channel || channel.type !== 'simulated') return;
    if (!channel.segments.length) return;
    const index = nowPlaying?.segmentIndex ?? 0;
    engineRef.current?.warmNext(channel.segments[(index + 1) % channel.segments.length]);
  }, [channel, nowPlaying?.segmentIndex]);

  const fetchCurrentPosition = async (promote = false) => {
    if (!channel || channel.type !== 'simulated') return;
    try {
      const response = await fetch(`/api/channels/${encodeURIComponent(channel.slug)}/now-playing`);
      if (!response.ok) return;
      const metadata = await response.json();
      setNowPlaying({ ...metadata, receivedAt: performance.now() });
      if (metadata.segment) {
        const offset = metadata.offsetSeconds ?? 0;
        if (promote) void engineRef.current?.promoteWarm(metadata.segment, offset, () => { void fetchCurrentPosition(true); }, () => setPlaying(false));
        else engineRef.current?.playSimulatedSegment(metadata.segment, offset, () => { void fetchCurrentPosition(true); }, () => setPlaying(false));
      }
    } catch { /* The event stream will retry when the connection returns. */ }
  };

  useEffect(() => {
    if (!('mediaSession' in navigator) || typeof MediaMetadata === 'undefined' || !channel) return;
    navigator.mediaSession.metadata = new MediaMetadata({ title, artist, album: album ?? channel.name });
    navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
    const trackDuration = channel.type === 'simulated' ? activeSegment?.durationSeconds ?? duration : duration;
    if (trackDuration > 0 && 'setPositionState' in navigator.mediaSession) {
      try { navigator.mediaSession.setPositionState({ duration: trackDuration, playbackRate: 1, position: Math.min(position, trackDuration) }); } catch { /* Browser has no active media session yet. */ }
    }
    navigator.mediaSession.setActionHandler('play', () => setPlaying(true));
    navigator.mediaSession.setActionHandler('pause', () => setPlaying(false));
    navigator.mediaSession.setActionHandler('nexttrack', () => { if (channels.length) tune(channels[(channelIndex + 1) % channels.length]); });
    navigator.mediaSession.setActionHandler('previoustrack', () => { if (channels.length) tune(channels[(channelIndex - 1 + channels.length) % channels.length]); });
  }, [channel, channels, channelIndex, title, artist, album, playing, position, duration, activeSegment, setPlaying, tune]);

  const togglePlayback = () => setPlaying(!playing);
  const playEpisode = (podcast: Channel, item: Episode) => { tune(podcast); setEpisode(item); };
  const tuneAdjacent = (direction: number) => { if (channels.length) tune(channels[(channelIndex + direction + channels.length) % channels.length]); };
  const loadMoreEpisodes = async (podcast: Channel) => {
    const cursor = episodePages[podcast.slug];
    if (!cursor || loadingEpisodes) return;
    setLoadingEpisodes(podcast.slug);
    try {
      const response = await fetch(episodesUrl(podcast.slug, episodeFilters[podcast.slug] ?? {}, cursor));
      if (!response.ok) throw new Error('Could not load more episodes');
      const data = await response.json();
      mergeChannel(podcast.slug, { episodes: [...podcast.episodes, ...(data.episodes ?? [])] });
      setEpisodePages(value => ({ ...value, [podcast.slug]: data.nextCursor ?? null }));
    } catch (error) { console.warn(error); }
    finally { setLoadingEpisodes(null); }
  };
  const applyEpisodeFilter = async (podcast: Channel, next: EpisodeFilter) => {
    setEpisodeFilters(value => ({ ...value, [podcast.slug]: next }));
    setLoadingEpisodes(podcast.slug);
    try {
      const response = await fetch(episodesUrl(podcast.slug, next));
      if (!response.ok) throw new Error('Could not filter episodes');
      const data = await response.json();
      mergeChannel(podcast.slug, { episodes: data.episodes ?? [] });
      setEpisodePages(value => ({ ...value, [podcast.slug]: data.nextCursor ?? null }));
    } catch (error) { console.warn(error); }
    finally { setLoadingEpisodes(null); }
  };
  const podcasts = channels.filter(item => item.type === 'on_demand');
  const podcastSlugs = podcasts.map(item => item.slug).join(',');
  useEffect(() => {
    let alive = true;
    for (const slug of podcastSlugs.split(',').filter(Boolean)) {
      fetch(`/api/channels/${encodeURIComponent(slug)}/episodes/facets`).then(response => response.ok ? response.json() : null).then(data => {
        if (alive && data?.facets) setEpisodeFacets(value => ({ ...value, [slug]: data.facets }));
      }).catch(() => undefined);
    }
    return () => { alive = false; };
  }, [podcastSlugs]);
  const progress = duration > 0 ? Math.min(100, (position / duration) * 100) : activeSegment?.durationSeconds ? Math.min(100, ((position || nowPlaying?.offsetSeconds || 0) / activeSegment.durationSeconds) * 100) : 0;

  return <div className="radio-shell" style={{ '--station': stationColor, '--station-glow': `${stationColor}40` } as CSSProperties}>
    <header className="topbar"><a className="brand" href="#top"><span className="brand-icon"><AudioLines size={17}/></span><span>ajn<span className="brand-light">radio</span></span><span className="brand-dot">.</span></a><nav className="top-links"><a className="top-link active" href="#stations">STATIONS</a><a className="top-link" href="#podcasts">PODCASTS</a><a className="top-link" href="#about">ABOUT</a></nav><div className="top-actions"><button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(value => !value)}><Search size={17}/></button><button className="listen-button" onClick={togglePlayback}>{playing ? 'ON AIR' : 'LISTEN'}<ArrowUpRight size={14}/></button><button className="mobile-menu" aria-label="Menu" onClick={() => document.getElementById('stations')?.scrollIntoView({ behavior: 'smooth' })}><Menu size={20}/></button></div></header>

    <main id="top"><section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/>INDEPENDENT RADIO FOR THE IN-BETWEEN</div><h1>A frequency<br/>of <em>your own.</em></h1><p className="hero-desc">Good music, thoughtfully found. Broadcasting from everywhere, for wherever you are.</p><a href="#stations" className="explore-link">FIND YOUR FREQUENCY <ArrowDownRight size={15}/></a><div className="hero-note"><span>✳</span> Curated by people, played for everyone.</div></div>
      <div className="dial-stage"><div className="dial-glow"/><div className="dial-orbit orbit-one"/><div className="dial-orbit orbit-two"/><motion.div className="radio-dial" animate={{ rotate: Math.max(0, channelIndex) * (360 / Math.max(1, channels.length)) }} transition={{ type: 'spring', stiffness: 52, damping: 15 }}><svg viewBox="0 0 360 360" className="dial-svg" role="img" aria-label="Tuning dial"><defs><filter id="dialGlow"><feGaussianBlur stdDeviation="7" result="blur"/><feFlood floodColor={stationColor} floodOpacity=".45"/><feComposite in2="blur" operator="in"/><feComposite in="SourceGraphic"/></filter></defs><circle cx="180" cy="180" r="151" fill="none" stroke="rgba(222,239,229,.17)"/><circle cx="180" cy="180" r="142" fill="none" stroke="rgba(222,239,229,.35)" strokeDasharray="1 8"/>{Array.from({ length: 41 }, (_, i) => { const angle = ((i / 40) * 260 - 130 - 90) * Math.PI / 180; const major = i % 5 === 0; const inner = major ? 108 : 116; return <g key={i}><line x1={180 + Math.cos(angle) * 124} y1={180 + Math.sin(angle) * 124} x2={180 + Math.cos(angle) * inner} y2={180 + Math.sin(angle) * inner} stroke={major ? 'rgba(239,248,238,.72)' : 'rgba(239,248,238,.3)'} strokeWidth={major ? 1.5 : 1}/>{major && <text x={180 + Math.cos(angle) * 91} y={183 + Math.sin(angle) * 91} fill="rgba(239,248,238,.66)" fontSize="9" textAnchor="middle" fontFamily="DM Mono">{(87.5 + i * .5).toFixed(1)}</text>}</g>; })}<circle cx="180" cy="180" r="72" fill="#09100f" stroke="rgba(232,247,237,.2)"/><circle cx="180" cy="180" r="60" fill="rgba(255,255,255,.02)" stroke={stationColor} strokeOpacity=".5" filter="url(#dialGlow)"/><text x="180" y="169" textAnchor="middle" fill={stationColor} fontSize="9" letterSpacing="3" fontFamily="DM Mono">AJN RADIO</text><text x="180" y="192" textAnchor="middle" fill="#f3f4e9" fontSize="16" fontWeight="700" fontFamily="Manrope">{channel?.frequency ?? 'DEMO'}</text><text x="180" y="209" textAnchor="middle" fill="rgba(233,242,232,.53)" fontSize="8" letterSpacing="1.6" fontFamily="DM Mono">MHz</text><path d="M180 25 L175 39 L185 39 Z" fill={stationColor} filter="url(#dialGlow)"/></svg></motion.div><div className="dial-caption"><span className="dial-live-dot"/>{channel?.city ?? 'DEMO STATION'}<span className="caption-slash">/</span>{channel?.type === 'live' ? 'LIVE SIGNAL' : channel?.type === 'on_demand' ? 'PODCAST' : '24/7 BROADCAST'}</div><div className="signal-strength"><span>STEREO</span><div><i/><i/><i/><i/><i/></div><span>HI-FI</span></div></div>
    </section>

    <section className="now-playing backdrop-blur-md bg-white/5 border border-white/10"><div className="now-art"><div className="art-sun"/><div className="art-horizon"/><span className="art-index">AJN — 0{Math.max(1, channelIndex + 1)}</span><Music2 size={20} className="art-note"/></div><div className="track-info"><div className="section-label"><span className="playing-eq"><i/><i/><i/></span>NOW PLAYING</div><div className="track-title">{title}</div><div className="track-subtitle">{artist}<span>·</span><span>{album ?? channel?.name ?? 'AJN Radio'}</span></div><div className="track-progress"><span>{formatTime(position || nowPlaying?.offsetSeconds || 0)}</span><div className="progress-line"><i style={{ width: `${progress}%` }}/></div><span>{channel?.type === 'live' ? 'LIVE' : formatTime(activeSegment?.durationSeconds ?? duration)}</span></div></div><div className="player-controls"><button aria-label="Previous channel" className="player-skip" onClick={() => tuneAdjacent(-1)}><SkipBack size={17} fill="currentColor"/></button><button aria-label={playing ? 'Pause' : 'Play'} className="play-button" onClick={togglePlayback}>{playing ? <Pause size={19} fill="currentColor"/> : <Play size={19} fill="currentColor"/>}</button><button aria-label="Next channel" className="player-skip" onClick={() => tuneAdjacent(1)}><SkipForward size={17} fill="currentColor"/></button><button aria-label="Save station" className={`like-button ${favorite ? 'liked' : ''}`} onClick={() => setFavorite(value => !value)}><Heart size={17} fill={favorite ? 'currentColor' : 'none'}/></button></div><div className="listener-count"><span className="listener-live"><i/>LIVE</span></div></section>

    <section className="station-section" id="stations"><div className="section-heading"><div><div className="section-label">THE SELECTED FREQUENCIES</div><h2>Find your <em>station.</em></h2></div><div className="station-heading-right"><span className="station-count">{String(channels.length).padStart(2, '0')} CHANNELS</span>{searchOpen && <label className="search-field"><Search size={14}/><input autoFocus value={search} onChange={event => setSearch(event.target.value)} placeholder="Find a frequency"/><button aria-label="Close search" onClick={() => { setSearchOpen(false); setSearch(''); }}><X size={14}/></button></label>}<button className="all-stations" onClick={() => setSearchOpen(value => !value)}>SEARCH CHANNELS <ArrowUpRight size={13}/></button></div></div><div className="station-grid">{filteredChannels.filter(item => item.type !== 'on_demand').map((item, index) => { const color = palette[index % palette.length]; return <button key={item.id} className={`station-card backdrop-blur-md bg-black/20 border border-white/10 ${channel?.id === item.id ? 'selected' : ''}`} style={{ '--card-accent': color } as CSSProperties} onClick={() => tune(item)}><span className="station-number">0{index + 1}</span><span className="station-status">{item.type === 'live' ? <><i/>LIVE</> : <><Waves size={12}/>24/7</>}</span><div className="station-card-art"><div className="card-art-shape shape-a"/><div className="card-art-shape shape-b"/><AudioLines size={16}/></div><span className="station-card-title">{item.name}</span><span className="station-card-genre">{item.genre}</span><span className="station-card-bottom"><span>{item.city}</span><span className="station-frequency">{item.frequency} <small>FM</small></span></span></button>; })}</div></section>

    <PodcastShelf podcasts={podcasts} activeSlug={channel?.slug} onSelect={tune} onPlay={playEpisode} cursors={episodePages} loading={loadingEpisodes} onLoadMore={loadMoreEpisodes} facets={episodeFacets} filters={episodeFilters} onFilter={applyEpisodeFilter} />

    <section className="quote-banner" id="about"><div className="quote-mark">“</div><p>Radio should feel like <em>someone left the light on</em> for you.</p><span>— THE AJN RADIO PROMISE</span><div className="quote-signal"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div></section>
    </main><footer className="footer"><a className="brand" href="#top"><span className="brand-icon"><AudioLines size={15}/></span><span>ajn<span className="brand-light">radio</span></span><span className="brand-dot">.</span></a><span>INDEPENDENT RADIO · BROADCAST FROM EVERYWHERE</span><span className="footer-right">MADE FOR THE MOMENTS IN BETWEEN <span>© 2026</span></span></footer>
    <audio ref={activeRef} preload="auto" onTimeUpdate={event => setProgress(event.currentTarget.currentTime, Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}/><audio ref={warmRef} preload="auto" className="sr-only" onTimeUpdate={event => setProgress(event.currentTarget.currentTime, Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}/><div className="volume-control"><Volume2 size={15}/><input aria-label="Volume" type="range" min="0" max="100" value={Math.round(volume * 100)} onChange={event => setVolume(Number(event.target.value) / 100)}/></div>
  </div>;
}

type PodcastShelfProps = {
  podcasts: Channel[];
  activeSlug?: string;
  onSelect: (channel: Channel) => void;
  onPlay: (channel: Channel, episode: Episode) => void;
  cursors: Record<string, string | null>;
  loading: string | null;
  onLoadMore: (channel: Channel) => void;
  facets: Record<string, EpisodeFacet[]>;
  filters: Record<string, EpisodeFilter>;
  onFilter: (channel: Channel, filter: EpisodeFilter) => void;
};

function PodcastShelf({ podcasts, activeSlug, onSelect, onPlay, cursors, loading, onLoadMore, facets, filters, onFilter }: PodcastShelfProps) {
  // Show one podcast channel at a time: the tuned one, otherwise the first.
  const visible = podcasts.find(podcast => podcast.slug === activeSlug) ?? podcasts[0];
  const shown = visible ? [visible] : [];
  return <section className="podcast-section" id="podcasts">
    <div className="section-heading"><div><div className="section-label">WHEN YOU’RE READY TO LISTEN</div><h2>Not live. <em>Still lovely.</em></h2></div><span className="podcast-aside">A FEW GOOD CONVERSATIONS, ON YOUR TIME.</span></div>
    <div className="podcast-channels">{podcasts.map(podcast => <button key={podcast.id} className={`podcast-channel ${visible?.slug === podcast.slug ? 'selected' : ''}`} onClick={() => onSelect(podcast)}><Headphones size={14}/><span>{podcast.name}</span><small>{podcast.genre}</small></button>)}</div>
    {shown.map(podcast => {
      const list = facets[podcast.slug] ?? [];
      const shows = [...new Set(list.map(facet => facet.show).filter((value): value is string => Boolean(value)))];
      const types = [...new Set(list.map(facet => facet.type).filter((value): value is string => Boolean(value)))];
      if (shows.length < 2 && types.length < 2) return null;
      const filter = filters[podcast.slug] ?? {};
      const chip = (label: string, selected: boolean, onClick: () => void) => <button key={label} type="button" aria-pressed={selected} className={`filter-chip ${selected ? 'selected' : ''}`} onClick={onClick}>{label}</button>;
      return <div className="episode-filters" key={`filters-${podcast.id}`} aria-label={`Filter ${podcast.name}`}>
        <span className="section-label">{podcast.name.toUpperCase()}</span>
        {chip('All shows', !filter.show, () => onFilter(podcast, { ...filter, show: undefined }))}
        {shows.map(show => chip(SHOW_LABELS[show] ?? show, filter.show === show, () => onFilter(podcast, { ...filter, show })))}
        <span className="filter-gap"/>
        {chip('All types', !filter.type, () => onFilter(podcast, { ...filter, type: undefined }))}
        {types.map(type => chip(TYPE_LABELS[type] ?? type, filter.type === type, () => onFilter(podcast, { ...filter, type })))}
      </div>;
    })}
    <div className="episode-grid">{shown.flatMap(podcast => podcast.episodes.map((item, index) => <button className="episode-card" key={item.id} onClick={() => onPlay(podcast, item)}><span className="episode-cover" style={{ '--cover-accent': palette[(index + 1) % palette.length] } as CSSProperties}><span>AJN<br/>STUDIO</span><Headphones size={20}/></span><span className="episode-meta"><span className="section-label">{podcast.name.toUpperCase()}{item.showType ? ` · ${TYPE_BADGES[item.showType] ?? item.showType.toUpperCase()}` : ''}</span><strong>{item.title}</strong>{item.airDate ? <small>Aired {item.airDate}</small> : item.description ? <small>{item.description}</small> : null}{item.needsReview ? <small>Date needs review</small> : null}<span className="episode-play"><Play size={12} fill="currentColor"/> LISTEN TO EPISODE <span>{item.durationSeconds ? formatTime(item.durationSeconds) : ''}</span></span></span></button>))}</div>
    {shown.map(podcast => cursors[podcast.slug] && <button key={`more-${podcast.id}`} className="load-more" disabled={loading === podcast.slug} onClick={() => onLoadMore(podcast)}>{loading === podcast.slug ? 'LOADING…' : `MORE FROM ${podcast.name.toUpperCase()}`} <ArrowDownRight size={14}/></button>)}
  </section>;
}
