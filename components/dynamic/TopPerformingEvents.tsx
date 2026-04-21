interface TopEvent {
  id: string;
  name: string;
  score: number;
  outOf: number;
}

interface TopPerformingEventsProps {
  events: TopEvent[];
}

export function TopPerformingEvents({ events }: TopPerformingEventsProps) {
  return (
    <div className="flex flex-col gap-3 h-full">
      {events.map((ev) => (
        <div
          key={ev.id}
          className="flex-1 bg-white rounded-xl border border-neutral-200 px-4 py-6 flex flex-col justify-center"
        >
          <p className="text-sm text-neutral-500 leading-tight">{ev.name}</p>
          <p className="text-2xl md:text-3xl text-neutral-900 mt-2">
            {ev.score}
            <span className="text-2xl md:text-3xl text-neutral-900">/{ev.outOf}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
