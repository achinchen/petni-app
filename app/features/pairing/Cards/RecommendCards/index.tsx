import { Link } from '@remix-run/react';
import Icon from '~/components/common/Icon';
import { usePairContext } from '~/features/pairing/context';
import { getIconByGenderAndFamily } from '~/utils';

export default function RecommendCards() {
  const { recommendCards } = usePairContext();

  if (!recommendCards?.length) return null;

  return (
    <section display="none lg:flex" my="4" justify="center">
      {recommendCards.map(({ id, gender, family, location, imageUrl }) => (
        <Link
          key={id}
          flex="~"
          min-w="lg:44 xl:64"
          p="4"
          ml="4 first:0"
          border="rounded-3xl"
          overflow="hidden"
          bg="cover center white"
          shadow="default"
          to={`/pets/${id}`}
        >
          <div
            w="12"
            h="12"
            mr="2"
            border="rounded-1/2"
            bg="cover"
            style={{
              backgroundImage: `url(${imageUrl})`
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
        </Link>
      ))}
    </section>
  );
}
