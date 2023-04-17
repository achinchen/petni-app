import type { User } from 'server/entities/user';

export const USERS = [
  {
    id: 100,
    email: 'example@example.com',
    imageUrl: 'https://example.com',
    name: 'example-user'
  },
  {
    email: 'another-example@example.com',
    imageUrl: 'https://another-example.com',
    name: 'another-example-user'
  }
];

export const USER = USERS[0] as User;

export const EXISTED_USER = USERS[1];
