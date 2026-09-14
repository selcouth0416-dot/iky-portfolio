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
  description:
    "Small habits, simple routines, and the things that keep my day moving.",
  cover: "/assets/routine/cover.jpg",

  tracks: [
    {
      title: "Morning Gym & Start the Day",
      artist: "Morning Routine",
      file: "/assets/routine/track-1.mp3",
    },
    {
      title: "Work & Build",
      artist: "Work Routine",
      file: "/assets/routine/track-2.mp3",
    },
    {
      title: "Learning & Reading",
      artist: "Learning Routine",
      file: "/assets/routine/track-3.mp3",
    },
    {
      title: "Relax & Reset",
      artist: "Night Routine",
      file: "/assets/routine/track-4.mp3",
    },
  ],
};
