import { addMinutes, format, parse } from 'date-fns';

export function addMinutesToTime(time: string, minutes: number): string {
  const date = parse(time, 'HH:mm', new Date());

  return format(addMinutes(date, minutes), 'HH:mm');
}
