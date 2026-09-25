import { useMutation, type UseMutationResult } from '@tanstack/react-query';

export function useCreateBooking(): UseMutationResult<unknown, Error, unknown> {
  return useMutation({});
}
