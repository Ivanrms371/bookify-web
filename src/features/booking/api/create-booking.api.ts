import { useMutation, type UseMutationResult } from '@tanstack/react-query';
export const createBooking = async () => {};
export function useCreateBooking(): UseMutationResult<unknown, Error, unknown> {
  return useMutation({ mutationFn: createBooking });
}
