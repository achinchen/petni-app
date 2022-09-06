import type { Animal, User } from '@prisma/client';
import type { EditingAnimal } from '~/models/Animal/type';
import { db } from '~/utils/db/index.server';

export default async (
  payload: EditingAnimal,
  user: User
): Promise<Animal | null> => {
  const animal = await db.animal.findFirst({
    where: {
      AND: [
        {
          userId: user.id
        },
        {
          id: payload.id
        }
      ]
    }
  });

  if (!animal) return null;

  const {
    id,
    color,
    family,
    gender,
    size,
    name,
    imageUrl,
    location,
    tel,
    note
  } = payload;

  let updatePayload = {} as EditingAnimal;
  updatePayload.family ??= family;
  updatePayload.color ??= color;
  updatePayload.gender ??= gender;
  updatePayload.size ??= size;
  updatePayload.name ??= name;
  updatePayload.imageUrl ??= imageUrl;
  updatePayload.location ??= location;
  updatePayload.tel ??= tel;
  updatePayload.note ??= note;

  try {
    const record = await db.animal.update({
      data: updatePayload,
      where: {
        id
      }
    });
    return record;
  } catch (error) {
    console.error(error);
    return null;
  }
};
