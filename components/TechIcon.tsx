import {
  siReact,
  siNextdotjs,
  siTailwindcss,
  siTypescript,
  siNodedotjs,
  siExpress,
  siMysql,
  siMongodb,
} from "simple-icons";

const icons = {
  react: siReact,
  next: siNextdotjs,
  tailwind: siTailwindcss,
  typescript: siTypescript,
  node: siNodedotjs,
  express: siExpress,
  mysql: siMysql,
  mongodb: siMongodb,
} as const;

export default function TechIcon({ name }: { name: keyof typeof icons }) {
  const icon = icons[name];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="tech-icon"
      role="img"
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}
