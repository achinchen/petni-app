import type { AnimalInfo } from 'server/usecases/animal';
import BaseInfo from './BaseInfo';
import Metadata from './Metadata';
import AppearanceInfo from './AppearanceInfo';
import ContactNote from './ContactNote';
import Photo from './Photo';

type Props = { pet: AnimalInfo };

export default function Pet({ pet }: Props) {
  const { imageUrl } = pet;
  const withImage = Boolean(imageUrl);

  return (
    <main flex="~ col lg:row" justify="center" m="lg:10" h="lg:145">
      <Photo>
        <BaseInfo
          display="lg:none"
          mt="auto"
          z="2"
          color={withImage ? 'white' : 'black'}
        />
      </Photo>
      <div m="4 lg:0" flex="~ col 1" max-w="lg:100" text="sm">
        <BaseInfo display="lt-lg:none" />
        <Metadata />
        <AppearanceInfo />
        <ContactNote />
      </div>
    </main>
  );
}
