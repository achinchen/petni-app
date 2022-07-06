import type { HOSPITALS } from '~/features/hospital/constants';

type HospitalsKey = keyof typeof HOSPITALS;
export type Hospital = typeof HOSPITALS[HospitalsKey][number];
