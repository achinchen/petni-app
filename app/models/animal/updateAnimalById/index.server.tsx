import type { Animal, User } from '@prisma/client';
import type { EditingAnimal } from '~/models/animal/type';
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
  if (family) updatePayload.family = family;
  if (color) updatePayload.color = color;
  if (gender) updatePayload.gender = gender;
  if (size) updatePayload.size = size;
  if (name) updatePayload.name = name;
  if (imageUrl) updatePayload.imageUrl = imageUrl;
  if (location) updatePayload.location = location;
  if (tel) updatePayload.tel = tel;
  if (note) updatePayload.note = note;

  const record = await db.animal.update({
    data: updatePayload,
    where: {
      id
    }
  });

  return record;
};
