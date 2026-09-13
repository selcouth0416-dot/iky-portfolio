export type RoutineTrack = {
  title: string;
  artist: string;
  file: string;
};

export type RoutineData = {
  title: string;
  description: string;
  cover: string;
  tracks: RoutineTrack[];
};

export const defaultRoutine: RoutineData = {
  title: "Daily Routine",
  description: "A curated collection of tracks that keep me in the zone and inspired while working.",
  cover: "/assets/routine/cover.jpg",
  tracks: [
    { title: "Track One", artist: "Add your artist", file: "/assets/routine/track-1.mp3" },
    { title: "Track Two", artist: "Add your artist", file: "/assets/routine/track-2.mp3" },
    { title: "Track Three", artist: "Add your artist", file: "/assets/routine/track-3.mp3" },
  ],
};
