import { useState, useMemo } from 'react';
import {
  addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, isSameMonth, isBefore, isAfter, isSameDay, startOfToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Demo-only: a few dates marked unavailable per room type, to show the interaction.
// Wire this up to real availability data from your backend when ready.
const MOCK_UNAVAILABLE = [5, 6, 14, 21, 22];

export default function BookingCalendar({ checkIn, checkOut, onSelect }) {
  const [month, setMonth] = useState(startOfMonth(startOfToday()));
  const today = startOfToday();

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month));
    const end = endOfWeek(endOfMonth(month));
    return eachDayOfInterval({ start, end });
  }, [month]);

  const isUnavailable = (d) => MOCK_UNAVAILABLE.includes(d.getDate()) && isSameMonth(d, month);

  const handleClick = (d) => {
    if (isBefore(d, today) || isUnavailable(d)) return;
    if (!checkIn || (checkIn && checkOut)) {
      onSelect(d, null);
    } else if (isBefore(d, checkIn)) {
      onSelect(d, null);
    } else {
      onSelect(checkIn, d);
    }
  };

  const inRange = (d) => checkIn && checkOut && isAfter(d, checkIn) && isBefore(d, checkOut);

  return (
    <div className="bg-white/60 border border-ink/10 rounded-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setMonth(addMonths(month, -1))} aria-label="Previous month" className="p-1.5 hover:bg-ink/5 rounded-full">
          <ChevronLeft size={18} />
        </button>
        <span className="font-display text-lg">{format(month, 'MMMM yyyy')}</span>
        <button onClick={() => setMonth(addMonths(month, 1))} aria-label="Next month" className="p-1.5 hover:bg-ink/5 rounded-full">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-ink-light mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => {
          const outside = !isSameMonth(d, month);
          const past = isBefore(d, today);
          const unavailable = isUnavailable(d);
          const selected = (checkIn && isSameDay(d, checkIn)) || (checkOut && isSameDay(d, checkOut));
          const disabled = past || unavailable;

          return (
            <button
              key={d.toISOString()}
              onClick={() => handleClick(d)}
              disabled={disabled}
              className={[
                'aspect-square text-sm rounded-full flex items-center justify-center transition-colors',
                outside && 'text-ink/25',
                disabled && !outside && 'text-ink/25 line-through cursor-not-allowed',
                selected && 'bg-clay text-stone font-semibold',
                inRange(d) && !selected && 'bg-marigold/30',
                !disabled && !selected && !outside && 'hover:bg-pine/10',
              ].filter(Boolean).join(' ')}
            >
              {format(d, 'd')}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-ink-light mt-4">
        Struck-through dates are unavailable (demo data). Select a check-in date, then a check-out date.
      </p>
    </div>
  );
}
