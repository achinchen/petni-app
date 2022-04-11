import { useState } from 'react';
import Icon from '~/components/icon';
import { getMockPet } from '../utils';
import { getIconByGenderAndFamily } from '~/utils';

export default function RecommendCards() {
  const [pets] = useState(
    Array.from({ length: 3 }, (_, index) => getMockPet(index))
  );

  return (
    <section display="none lg:flex" my="4" justify="center">
      {pets.map(({ id, gender, family, location, image }) => (
        <div
          key={id}
          flex="~"
          min-w="xl:64"
          p="4"
          ml="4 first:0"
          border="rounded-3xl"
          overflow="hidden"
          bg="white"
          shadow="default"
        >
          <div
            w="12"
            h="12"
            mr="2"
            border="rounded-1/2"
            bg="cover"
            style={{
              backgroundImage: `url(${image})`
            }}
          />
          <div>
            <span flex="~" text="4.5" font="medium">
              {id}
              <Icon
                ml="2"
                icon={getIconByGenderAndFamily({ gender, family })}
              />
            </span>
            <div text="sm" color="gray-450">
              {location}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
