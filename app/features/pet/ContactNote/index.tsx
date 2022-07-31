import type { LoaderData } from '~/routes/pets/:id';
import { Fragment } from 'react';
import { useLoaderData } from '@remix-run/react';
import { getTelephoneLink, getAddressLink } from '~/utils';
import Card from '~/components/common/Card';

export default function ContactNote() {
  const { pet } = useLoaderData<LoaderData>();
  const { tel, address, note } = pet;

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
