import Icon from '~/components/common/Icon';
import { Hospital } from './types';
import { City } from '~/features/hospital/constants';
import { LABEL_OF_OPEN_DURING_COVID } from './constants';
import { getTelephoneLink, getAddressLink } from './utils';

type Props = {
  city: City;
  hospitals: Hospital[];
};

export default function HospitalCards({ city, hospitals }: Props) {
  return (
    <div grid="~ cols-1 md:cols-2 lg:cols-3 gap-2">
      {hospitals.map(
        ({ NAME, TEL, ADDRESS, OPEN_DURING_COVID = false }, index) => (
          <section
            key={`${city}-${index}`}
            h="26.5"
            shadow="default"
            border="rounded-2xl"
            bg="white"
            p="3"
            position="relative"
          >
            <header font="medium">{NAME}</header>
            <address flex="~ col" text="sm">
              <a
                href={getTelephoneLink(TEL)}
                target="_blank"
                my="2"
                rel="noreferrer"
              >
                {TEL}
              </a>
              <a
                href={getAddressLink(ADDRESS)}
                target="_blank"
                rel="noreferrer"
              >
                {ADDRESS}
              </a>
            </address>
            {OPEN_DURING_COVID ? (
              <span
                color="status-active"
                position="absolute"
                top="3"
                right="3"
                text="sm"
              >
                {LABEL_OF_OPEN_DURING_COVID}
              </span>
            ) : null}
            <a
              href={getTelephoneLink(TEL)}
              target="_blank"
              position="absolute"
              right="3"
              bottom="3"
              bg="black"
              p="2"
              border="rounded-1/2"
              rel="noreferrer"
            >
              <Icon icon="Phone"></Icon>
            </a>
          </section>
        )
      )}
    </div>
  );
}
