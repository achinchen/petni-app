import { Gender, Family } from '~/constants';
import { IMAGE_MISSING, PLACEHOLDER_IMG } from '~/constants/pet';
import image from '~/assets/images/placeholder.jpg';

const PET = {
  id: 238721,
  code: 'W09C0429-03',
  gender: Gender.Female,
  family: Family.Dog,
  image,
  location: '桃園市新屋區',
  color: '虎斑白色',
  openAt: '2022.01.28',
  address: '桃園市新屋區永興里3鄰藻礁路1668號',
  tel: '03-4861760',
  note: '本站動物皆採現場互動面談後評估能否認養，不接受系統上的預約。',
  followers: 130
};

type Props = {
  children?: JSX.Element;
};

export default function Photo({ children }: Props) {
  const { image, family } = PET;
  const withImage = Boolean(image);
  const style = withImage ? { backgroundImage: `url(${image})` } : {};

  return (
    <a
      flex="~ col"
      position="relative"
      top="0"
      left="0"
      w="screen md:107"
      h="40vh md:145"
      max-h="sm:150"
      p="3"
      mr="4"
      bg="cover gray-50"
      overflow="hidden"
      border="none md:rounded-8 md:12 white"
      shadow="default"
      href={image}
      target="_blank"
      rel="noreferrer"
      after="
        position-absolute
        left-0
        bottom-0
        h-1/3
        w-100%
        content-empty
        bg-gradient-to-b
        from-transparent
        via-black/50
        md:via-black/50
        to-black"
      {...(!withImage && { after: 'display-none' })}
      style={style}
    >
      {!withImage && (
        <figure flex="~ col" items="center" m="auto">
          <img src={PLACEHOLDER_IMG[family]} alt={IMAGE_MISSING} w="16" />
          <figcaption text="base" mt="2" color="status-general">
            {IMAGE_MISSING}
          </figcaption>
        </figure>
      )}
      {children}
    </a>
  );
}
