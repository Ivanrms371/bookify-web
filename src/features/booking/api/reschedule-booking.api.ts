import { useMutation, type UseMutationResult } from '@tanstack/react-query';
export const rescheduleBooking = async () => {};
export function useRescheduleBooking(): UseMutationResult<unknown, Error, unknown> {
  return useMutation({ mutationFn: rescheduleBooking });
}
