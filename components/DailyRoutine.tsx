"use client";

import { useEffect, useRef, useState } from "react";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  MoreHorizontal,
  Volume2,
} from "lucide-react";
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
            description:
              data.description || defaultRoutine.description,
            cover: data.cover || defaultRoutine.cover,
            tracks: data.tracks,
          });
        }
      })
      .catch(() => {});
  }, []);

  const current =
    routine.tracks[index] ?? routine.tracks[0];

  /* =========================
     AUDIO SOURCE
  ========================= */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !current) return;

    audio.src = current.file;
    audio.load();

    setProgress(0);

    if (playing) {
      audio.play().catch(() => {
        setPlaying(false);
      });
    }
  }, [current, playing]);

  /* =========================
     AUDIO EVENTS
  ========================= */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      if (!audio.duration) {
        setProgress(0);
        return;
      }

      setProgress(
        (audio.currentTime / audio.duration) * 100
      );
    };

    const handleEnded = () => {
      setIndex(
        (currentIndex) =>
          (currentIndex + 1) % routine.tracks.length
      );

      setPlaying(true);
    };

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );
    };
  }, [routine.tracks.length]);

  /* =========================
     PLAYER CONTROLS
  ========================= */

  const toggle = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => {
        setPlaying(true);
      })
      .catch(() => {
        setPlaying(false);
      });
  };

  const select = (trackIndex: number) => {
    setIndex(trackIndex);
    setPlaying(true);
  };

  const previous = () => {
    setIndex(
      (currentIndex) =>
        (currentIndex - 1 + routine.tracks.length) %
        routine.tracks.length
    );

    setPlaying(true);
  };

  const next = () => {
    setIndex(
      (currentIndex) =>
        (currentIndex + 1) %
        routine.tracks.length
    );

    setPlaying(true);
  };

  return (
    <section className="routine-card">
      <audio
        ref={audioRef}
        preload="metadata"
      />

      {/* =========================
          HEADER
      ========================= */}

      <div className="routine-heading">
        <div>
          <p className="eyebrow">DAILY ROTATION</p>

          <h2>{routine.title}</h2>

          <p className="routine-description">
            {routine.description}
          </p>
        </div>

        <span className="routine-counter">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(routine.tracks.length).padStart(2, "0")}
        </span>
      </div>

      {/* =========================
          FEATURE PLAYER
      ========================= */}

      <div className="player-shell">
        <div className="routine-image-wrap">
          <img
            src={routine.cover}
            alt="Daily Routine cover"
            className="routine-cover"
          />

          <div className="routine-image-overlay">
            <span>DAILY ROUTINE</span>

            <strong>
              Keep moving.
            </strong>
          </div>
        </div>

        <div className="now-playing">
          <div className="player-top">
            <span className="player-label">
              NOW PLAYING
            </span>

            <span className="player-status">
              {playing ? "PLAYING" : "PAUSED"}
            </span>
          </div>

          <div className="track-meta">
            <strong>
              {current?.title ?? "No track"}
            </strong>

            <span>
              {current?.artist ?? "Add audio in GitHub"}
            </span>
          </div>

          <div className="player-bottom">
            <div className="player-progress">
              <span
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="player-actions">
              <button
                type="button"
                aria-label="Previous track"
                onClick={previous}
              >
                <SkipBack size={16} />
              </button>

              <button
                type="button"
                className="play-main"
                aria-label={
                  playing ? "Pause" : "Play"
                }
                onClick={toggle}
              >
                {playing ? (
                  <Pause size={17} />
                ) : (
                  <Play
                    size={17}
                    fill="currentColor"
                  />
                )}
              </button>

              <button
                type="button"
                aria-label="Next track"
                onClick={next}
              >
                <SkipForward size={16} />
              </button>

              <button
                type="button"
                aria-label="More options"
                className="muted"
              >
                <MoreHorizontal size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          TRACK LIST
      ========================= */}

      <div className="routine-list">
        {routine.tracks.map((track, trackIndex) => {
          const isActive = trackIndex === index;

          return (
            <button
              type="button"
              key={`${track.file}-${trackIndex}`}
              className={`routine-item ${
                isActive ? "selected" : ""
              }`}
              onClick={() => select(trackIndex)}
            >
              <span className="track-number">
                {String(trackIndex + 1).padStart(
                  2,
                  "0"
                )}
              </span>

              <span className="track-copy">
                <strong>{track.title}</strong>

                <small>{track.artist}</small>
              </span>

              <span className="track-indicator">
                {isActive ? (
                  <Volume2 size={14} />
                ) : (
                  <span />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
