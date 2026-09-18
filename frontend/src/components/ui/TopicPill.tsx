import type { ReactNode } from "react";

interface Props {
  active: boolean;
  icon: ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}

export function TopicPill({ active, icon, title, subtitle, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-3 rounded-full p-3 text-left transition-all duration-200 ${
        active ? "bg-gold-400/15 shadow-[0_0_24px_-6px_rgba(244,223,166,0.5)]" : "bg-void-800/60 hover:bg-void-700/70"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          active ? "bg-gold-400/20 text-gold-300" : "bg-void-700 text-nebula-300"
        }`}
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className={`truncate text-sm font-semibold ${active ? "text-gold-300" : "text-starlight-50"}`}>
          {title}
        </span>
        <span className="truncate text-xs text-starlight-500">{subtitle}</span>
      </span>
      {active && (
        <svg
          viewBox="0 0 24 24"
          className="ml-auto h-4 w-4 shrink-0 text-gold-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
