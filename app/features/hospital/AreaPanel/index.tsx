import type { AttributifyOptions } from '@unocss/preset-attributify';
import { useHospitalContext } from '~/features/hospital/context';
import { Area } from '~/features/hospital/constants';
import { AREA_LABEL, TITLE } from './constants';

type Props = {
  isDesktop?: boolean;
} & AttributifyOptions;

export default function HospitalAreaPanel({
  isDesktop,
  ...attributifyOptions
}: Props) {
  const { area: currentArea } = useHospitalContext();
  const getIsArea = (area: Area) => area === currentArea;

  return (
    <div
      w="100%"
      flex="~"
      justify="between"
      items="center"
      {...attributifyOptions}
    >
      <h1
        display="block lg:none"
        w="9 sm:100%"
        whitespace="nowrap"
        overflow="hidden"
        text="lg truncate"
        font="medium"
      >
        {TITLE}
      </h1>
      <div flex="~">
        {Object.entries(Area).map(([key, area]) => (
          <a
            href={`/hospital#${area}`}
            key={area}
            flex="inline"
            justify="center"
            w="16 md:24"
            py="2"
            border="rounded-md"
            bg="gray-50"
            font="medium"
            ml="1.5 md:3 first:0"
            aria-current={getIsArea(area)}
            {...(isDesktop && { bg: 'white' })}
            {...(getIsArea(area) && {
              bg: 'status-active',
              color: 'white'
            })}
          >
            {AREA_LABEL[area as Area]}
          </a>
        ))}
      </div>
    </div>
  );
}
