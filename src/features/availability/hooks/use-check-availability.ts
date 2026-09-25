import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { availabilityApi } from '../api/availability-api';
import type {
  CheckSlotAvailabilityResponse,
  UseCheckAvailabilityParams,
} from '../types/availability-types';

export function useCheckSlotAvailability(): UseMutationResult<
  CheckSlotAvailabilityResponse,
  Error,
  UseCheckAvailabilityParams
> {
  return useMutation({
    mutationFn: (params) => availabilityApi.checkSlotAvailability(params),
  });
}
