 "use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, MoreHorizontal, Volume2 } from "lucide-react";
import { defaultRoutine, type RoutineData } from "@/data/routine";

export default function DailyRoutine() {
  const [routine, setRoutine] = useState<RoutineData>(defaultRoutine);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/assets/routine/routine.json", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (data?.tracks && Array.isArray(data.tracks)) {
          setRoutine({
            title: data.title || defaultRoutine.title,
            description: data.description || defaultRoutine.description,
            cover: data.cover || defaultRoutine.cover,
            tracks: data.tracks,
          });
        }
      })
      .catch(() => {});
  }, []);

  const current = routine.tracks[index] ?? routine.tracks[0];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    audio.src = current.file;
    audio.load();
    setProgress(0);
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }
  }, [current, playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    const onEnd = () => {
      setIndex((i) => (i + 1) % routine.tracks.length);
      setPlaying(true);
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, [routine.tracks.length]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const select = (i: number) => {
    setIndex(i);
    setPlaying(true);
  };

  const previous = () => setIndex((i) => (i - 1 + routine.tracks.length) % routine.tracks.length);
  const next = () => setIndex((i) => (i + 1) % routine.tracks.length);

  return (
    <div className="routine-card">
      <audio ref={audioRef} preload="metadata" />
      <div className="routine-heading">
        <div>
          <p className="eyebrow">MY ROUTINE</p>
          <h2>{routine.title}</h2>
          <p>{routine.description}</p>
        </div>
      </div>

      <div className="player-shell">
        <img src={routine.cover} alt="Daily Routine cover" className="routine-cover" />
        <div className="now-playing">
          <div className="track-meta">
            <strong>{current?.title ?? "No track"}</strong>
            <span>{current?.artist ?? "Add audio in GitHub"}</span>
          </div>
          <div className="player-actions">
            <button aria-label="Previous track" onClick={previous}><SkipBack size={16} /></button>
            <button className="play-main" aria-label={playing ? "Pause" : "Play"} onClick={toggle}>
              {playing ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}
            </button>
            <button aria-label="Next track" onClick={next}><SkipForward size={16} /></button>
            <button aria-label="More options" className="muted"><MoreHorizontal size={17} /></button>
          </div>
        </div>
      </div>

      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="routine-list">
        {routine.tracks.map((track, i) => (
          <button
            key={`${track.file}-${i}`}
            className={`routine-item ${i === index ? "selected" : ""}`}
            onClick={() => select(i)}
          >
            <span className="track-number">{String(i + 1).padStart(2, "0")}</span>
            <span className="track-copy">
              <strong>{track.title}</strong>
              <small>{track.artist}</small>
            </span>
            {i === index && <Volume2 size={14} />}
          </button>
        ))}
      </div>
    </div>
  );
}
