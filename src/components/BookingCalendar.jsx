import { useState, useMemo } from 'react';
import {
  addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, isSameMonth, isBefore, isAfter, isSameDay, startOfToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { bookedNightSet, rangeConflicts } from '../api/stay';

const iso = (d) => format(d, 'yyyy-MM-dd');

// bookedRanges: [{ checkIn, checkOut }] of confirmed stays ('YYYY-MM-DD'). A stay occupies the
// nights from check-in up to, but not including, check-out, so the check-out day stays free.
export default function BookingCalendar({ checkIn, checkOut, onSelect, bookedRanges = [] }) {
  const [month, setMonth] = useState(startOfMonth(startOfToday()));
  const today = startOfToday();

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month));
    const end = endOfWeek(endOfMonth(month));
    return eachDayOfInterval({ start, end });
  }, [month]);

  const booked = useMemo(() => bookedNightSet(bookedRanges), [bookedRanges]);
  const choosingCheckOut = !!checkIn && !checkOut;

  // A day is unavailable as a check-in if that night is taken. While choosing check-out it is
  // unavailable if the stay would run through a taken night (or is not after check-in).
  const isUnavailable = (d) => {
    if (isBefore(d, today)) return true;
    if (choosingCheckOut && isAfter(d, checkIn)) return rangeConflicts(iso(checkIn), iso(d), booked);
    if (choosingCheckOut && isSameDay(d, checkIn)) return true;
    return booked.has(iso(d));
  };

  const handleClick = (d) => {
    if (isUnavailable(d)) return;
    if (choosingCheckOut && isAfter(d, checkIn)) {
      onSelect(checkIn, d);
    } else {
      onSelect(d, null);
    }
  };

  const inRange = (d) => checkIn && checkOut && isAfter(d, checkIn) && isBefore(d, checkOut);

  return (
    <div className="bg-white/60 border border-ink/10 rounded-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={() => setMonth(addMonths(month, -1))} aria-label="Previous month" className="p-1.5 hover:bg-ink/5 rounded-full">
          <ChevronLeft size={18} />
        </button>
        <span className="font-display text-lg">{format(month, 'MMMM yyyy')}</span>
        <button type="button" onClick={() => setMonth(addMonths(month, 1))} aria-label="Next month" className="p-1.5 hover:bg-ink/5 rounded-full">
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
          const unavailable = isUnavailable(d) && !past;
          const selected = (checkIn && isSameDay(d, checkIn)) || (checkOut && isSameDay(d, checkOut));
          const disabled = past || unavailable;

          return (
            <button
              type="button"
              key={d.toISOString()}
              onClick={() => handleClick(d)}
              disabled={disabled}
              className={[
                'aspect-square text-sm rounded-full flex items-center justify-center transition-colors',
                outside && 'text-ink/25',
                disabled && !outside && !selected && 'text-ink/25 line-through cursor-not-allowed',
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
        Struck-through dates are unavailable. Select a check-in date, then a check-out date.
      </p>
    </div>
  );
}
