import type { User } from 'server/entities/user';
import upsertUser from '.';
import { db } from '~/utils/db/index.server';
import { USER } from 'spec/mock/constants/user';

let user: User;
afterAll(async () => {
  const deleteUser = db.user.deleteMany({ where: { id: USER.id } });
  await db.$transaction([deleteUser]);
  await db.$disconnect();
});

const { id, ...payload } = USER;

describe('user', () => {
  test('create user: not exist', async () => {
    await upsertUser(payload);
    user = await db.user.findUniqueOrThrow({
      where: { email: payload.email }
    });
    expect(user).toBeTruthy();
  });

  test('update user: exist', async () => {
    const email = 'update@exmaple.com';
    await upsertUser({ ...payload, email });
    const user = await db.user.findUnique({
      where: { email }
    });
    expect(user!.email).toBe(email);
  });

  test('return user', async () => {
    const result = await upsertUser(payload);
    user = await db.user.findFirstOrThrow({
      where: { email: payload.email }
    });
    expect(result).toEqual(user);
  });
});
