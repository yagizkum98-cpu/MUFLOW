import { SVGProps } from "react";

export type IconName = "building" | "users" | "store" | "map" | "settings" | "ai" | "api" | "chart" | "plus" | "check";

const paths: Record<IconName, string> = {
  building: "M4 21V5l8-3 8 3v16M8 9h2M14 9h2M8 13h2M14 13h2M10 21v-4h4v4",
  users: "M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  store: "M4 10h16l-1-6H5l-1 6ZM6 10v11h12V10M9 21v-6h6v6",
  map: "M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3ZM9 3v15M15 6v15",
  settings: "M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5ZM19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2 3.46-.08-.02a1.7 1.7 0 0 0-1.9.56l-.36.42h-4l-.36-.42a1.7 1.7 0 0 0-1.9-.56l-.08.02-2-3.46.06-.06A1.7 1.7 0 0 0 7.6 15L7.4 14H4v-4h3.4l.2-1a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2-3.46.08.02a1.7 1.7 0 0 0 1.9-.56l.36-.42h4l.36.42a1.7 1.7 0 0 0 1.9.56l.08-.02 2 3.46-.06.06A1.7 1.7 0 0 0 19.4 9l.2 1H23v4h-3.4l-.2 1Z",
  ai: "M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z",
  api: "M8 9 4 12l4 3M16 9l4 3-4 3M14 5l-4 14",
  chart: "M4 19V5M4 19h17M8 16v-5M13 16V8M18 16v-9",
  plus: "M12 5v14M5 12h14",
  check: "M20 6 9 17l-5-5",
};

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg aria-hidden="true" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" {...props}>
      <path d={paths[name]} />
    </svg>
  );
}
