import placeholder from '~/images/favorites/placeholder.jpeg';

export enum Gender {
  Male = 'Male',
  Female = 'Female'
}

export const getMockPets = () =>
  Array.from({ length: 6 }, (_, index) => ({
    id: Math.ceil(Math.random() * 100000) - index,
    image: placeholder,
    gender: index % 2 ? Gender.Female : Gender.Male,
    location: '臺南市南區'
  }));

export const SUBTITLE = '快來接我回家吧，我會一直一直陪伴你。';
export const TITLE = '寵物名單';
