import type { LoaderData } from '~/routes/pets/:id';
import { Fragment } from 'react';
import { useLoaderData } from '@remix-run/react';
import Card from '~/components/common/Card';
import { formatDate } from '~/utils';

export default function Metadata() {
  const { pet } = useLoaderData<LoaderData>();
  const { code, openAt } = pet;

  return (
    <Card flex="~ col sm:row" justify="between" color="gray-450" mb="3">
      <Fragment>
        <div>
          <div text="xl" font="medium" color="black">
            {code}
          </div>
          <div>{openAt && formatDate(openAt)}</div>
        </div>
        <div flex="~ col" text="sm:right">
          <span text="xl" font="medium" color="black">
            {pet.follows}
          </span>
          followers
        </div>
      </Fragment>
    </Card>
  );
}
