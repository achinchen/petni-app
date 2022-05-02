import { Fragment } from 'react';
import { getTelephoneLink, getAddressLink } from '~/utils';
import Card from '~/components/common/Card';
import { usePetContext } from '~/features/pet/context';

export default function ContactNote() {
  const { pet } = usePetContext();
  const { tel, address, note } = pet!;

  return (
    <Card flex="md:1" min-h="40">
      <Fragment>
        <address flex="~ col" font="medium">
          <a
            mb="2"
            href={getTelephoneLink(tel)}
            target="_blank"
            rel="noreferrer"
          >
            {tel}
          </a>
          <a
            mb="2"
            href={getAddressLink(address)}
            target="_blank"
            rel="noreferrer"
          >
            {address}
          </a>
        </address>
        {note}
      </Fragment>
    </Card>
  );
}
