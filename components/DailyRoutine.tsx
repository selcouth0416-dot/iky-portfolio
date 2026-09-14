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

const formatTitle = (value: string) =>
  value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default function DailyRoutine() {
  const [routine, setRoutine] = useState<RoutineData>(defaultRoutine);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/assets/routine/routine.json", {
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
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

  const current = routine.tracks[index] ?? routine.tracks[0];

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

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      if (!audio.duration) {
        setProgress(0);
        return;
      }

      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIndex(
        (currentIndex) =>
          (currentIndex + 1) % routine.tracks.length
      );

      setPlaying(true);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [routine.tracks.length]);

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
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
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
        (currentIndex + 1) % routine.tracks.length
    );

    setPlaying(true);
  };

  return (
    <section className="routine-card">
      <audio ref={audioRef} preload="metadata" />

      {/* HEADER */}

      <div className="routine-heading">
        <div className="routine-heading-copy">
          <span className="routine-label">
            DAILY ROTATION
          </span>

          <h2>Keep moving.</h2>

          <p>
            Small habits, simple routines, and the things
            that keep my day moving.
          </p>
        </div>

        <span className="routine-counter">
          {String(index + 1).padStart(2, "0")}
          <span>/</span>
          {String(routine.tracks.length).padStart(2, "0")}
        </span>
      </div>

      {/* PLAYER */}

      <div className="routine-player">
        <div className="routine-image">
          <img
            src={routine.cover}
            alt="Daily Routine"
          />

          <div className="routine-image-content">
            <span>DAILY ROUTINE</span>
            <strong>Keep moving.</strong>
          </div>
        </div>

        <div className="routine-player-content">
          <div className="routine-player-top">
            <span>NOW PLAYING</span>

            <small>
              {playing ? "PLAYING" : "PAUSED"}
            </small>
          </div>

          <div className="routine-current">
            <strong>
              {current
                ? formatTitle(current.title)
                : "No track"}
            </strong>

            <span>
              {current?.artist || "Add audio in GitHub"}
            </span>
          </div>

          <div className="routine-player-bottom">
            <div className="routine-progress">
              <span
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="routine-controls">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous track"
              >
                <SkipBack size={16} />
              </button>

              <button
                type="button"
                className="routine-play"
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
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
                onClick={next}
                aria-label="Next track"
              >
                <SkipForward size={16} />
              </button>

              <button
                type="button"
                className="routine-more"
                aria-label="More options"
              >
                <MoreHorizontal size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TRACK LIST */}

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
                {String(trackIndex + 1).padStart(2, "0")}
              </span>

              <span className="track-copy">
                <strong>
                  {formatTitle(track.title)}
                </strong>

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
