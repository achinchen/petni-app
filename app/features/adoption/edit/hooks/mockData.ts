import type { Animal } from '@prisma/client';

export const ANIMAL: Animal = {
  id: 5,
  code: 'PETNI111719225030',
  size: 'Medium',
  color: 'WHITE',
  family: 'Dog',
  gender: 'Male',
  imageUrl: 'https://i.imgur.com/idqVweK.jpg',
  location: '台北市中正區',
  address: '台北市中正區',
  tel: 'test123',
  note: '',
  name: 'Agogo',
  openAt: null,
  createdAt: new Date('2022-07-19T14:50:30.477Z'),
  updatedAt: new Date('2022-07-19T15:02:20.195Z'),
  userId: 1
};
