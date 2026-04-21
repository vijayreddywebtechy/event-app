import { Smile, Meh, Frown } from "lucide-react";

interface FeedbackItem {
  label: string;
  value: number;
  color: string;
  icon: "outstanding" | "exceeds" | "satisfactory" | "below" | "unsatisfactory";
}

const FEEDBACK_ITEMS: FeedbackItem[] = [
  { label: "Outstanding", value: 80, color: "#6d28d9", icon: "outstanding" },
  { label: "Exceeds Expectations", value: 60, color: "#1d4ed8", icon: "exceeds" },
  { label: "Satisfactory", value: 65, color: "#06b6d4", icon: "satisfactory" },
  { label: "Below Standard", value: 40, color: "#0891b2", icon: "below" },
  { label: "Unsatisfactory", value: 45, color: "#0e7490", icon: "unsatisfactory" },
];

function FeedbackIcon({ type, strokeWidth }: { type: FeedbackItem["icon"], strokeWidth?: number }) {
  const cls = "h-6 w-6 shrink-0 text-neutral-900";
  if (type === "outstanding" || type === "exceeds") return <Smile className={cls} strokeWidth={strokeWidth} />;
  if (type === "satisfactory") return <Meh className={cls} strokeWidth={strokeWidth} />;
  return <Frown className={cls} strokeWidth={strokeWidth} />;
}

interface FeedbackBarsProps {
  items?: FeedbackItem[];
}

export function FeedbackBars({ items = FEEDBACK_ITEMS }: FeedbackBarsProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col gap-5 justify-between h-full min-h-[260px]">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <FeedbackIcon type={item.icon} strokeWidth={1.5}/>
            <span className="text-sm text-neutral-900">{item.label}</span>
          </div>
          <div className="h-3.5 w-full rounded-full bg-neutral-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${item.value}%`, backgroundColor: item.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
