import type { Animal } from '@prisma/client';
export type Pet = Animal & { follows: number; editable: boolean };
