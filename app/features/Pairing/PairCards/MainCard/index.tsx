import Icon from '~/components/icon';
import { getMockPet } from '../utils';
import { getIconByGenderAndFamily } from '~/utils';

export default function MainCard() {
  const { image, id, location, gender, family } = getMockPet();

  const icon = getIconByGenderAndFamily({ gender, family });
  return (
    <div
      position="relative"
      w="80"
      h="118"
      p="3"
      m="auto"
      bg="cover"
      overflow="hidden"
      border="rounded-12 12 white"
      shadow="card"
      transform="rotate--5 translate-y"
      flex="~ col"
      after="
            absolute
            left-0
            bottom-0
            h-1/3
            w-100%
            content-empty
            bg-gradient-to-b
            from-transparent
            via-black/80
            to-black
            z--1
          "
      style={{
        backgroundImage: `url(${image})`
      }}
    >
      <Icon
        role="button"
        icon="Info"
        w="12"
        ml="auto"
        transform="rotate-5"
        shadow="default"
        cursor="pointer"
      />
      <div
        mt="auto"
        mb="3"
        mx="3"
        flex="~"
        justify="between"
        items="center"
        transform="rotate-5"
      >
        <button
          flex="~"
          justify="center"
          items="center"
          w="12"
          h="12"
          border="rounded-1/2"
          bg="white"
          shadow="default"
        >
          <Icon icon="Close" w="7" />
        </button>
        <div color="white" m="0">
          <span flex="~" text="4.5" font="medium">
            {id}
            <Icon ml="2" icon={icon} />
          </span>
          <div text="sm">{location}</div>
        </div>
        <button
          flex="~"
          justify="center"
          items="center"
          w="12"
          h="12"
          border="rounded-1/2"
          bg="white"
          shadow="default"
        >
          <Icon icon="LoveActiveFill" w="10" />
        </button>
      </div>
    </div>
  );
}
