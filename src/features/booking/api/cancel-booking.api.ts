import { useMutation, type UseMutationResult } from '@tanstack/react-query';
export const cancelBooking = async () => {};
export function useCancelBooking(): UseMutationResult<unknown, Error, unknown> {
  return useMutation({ mutationFn: cancelBooking });
}
