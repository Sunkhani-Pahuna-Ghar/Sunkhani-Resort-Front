import { addDays, format, parseISO } from "date-fns";
import type { BookedRange } from "./booking";

/** Nights a stay occupies: [checkIn, checkOut). Returns YYYY-MM-DD strings. */
export function nightsOf(checkIn: string, checkOut: string): string[] {
  const out: string[] = [];
  let d = parseISO(checkIn);
  const end = parseISO(checkOut);
  while (d < end) {
    out.push(format(d, "yyyy-MM-dd"));
    d = addDays(d, 1);
  }
  return out;
}

/** Set of nights that are already taken. Check-out day itself stays free (back-to-back allowed). */
export function bookedNightSet(ranges: BookedRange[]): Set<string> {
  const s = new Set<string>();
  for (const r of ranges) for (const n of nightsOf(r.checkIn, r.checkOut)) s.add(n);
  return s;
}

/** True when any night of [checkIn, checkOut) is taken, or the range is empty/reversed. */
export function rangeConflicts(checkIn: string, checkOut: string, booked: Set<string>): boolean {
  const nights = nightsOf(checkIn, checkOut);
  return nights.length === 0 || nights.some((n) => booked.has(n));
}
