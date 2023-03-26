import type { Animal } from 'server/entities/animal';
import type { User } from 'server/entities/user';
import type { Prisma } from '@prisma/client';
import type { LooseAnimal } from 'server/gateways/animal/index';
import { db } from '~/utils/db/index.server';

export default async function updateById(
  payload: LooseAnimal,
  userId: User['id']
): Promise<Animal | null> {
  const animal = await db.animal.findFirst({
    where: {
      AND: [
        {
          userId
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

  let updatePayload = {} as Prisma.AnimalUncheckedUpdateInput;
  updatePayload.family ??=
    family as Prisma.EnumFamilyFieldUpdateOperationsInput;
  updatePayload.color ??= color;
  updatePayload.gender ??=
    gender as Prisma.EnumGenderFieldUpdateOperationsInput;
  updatePayload.size ??= size as Prisma.EnumSizeFieldUpdateOperationsInput;
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
    return record as unknown as Animal;
  } catch (error) {
    console.error(error);
    return null;
  }
}
