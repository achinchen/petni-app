import type { LoaderData } from '~/routes/pets/:id';
import { Fragment } from 'react';
import { useLoaderData } from '@remix-run/react';
import Card from '~/components/common/Card';
import { formatDate } from '~/utils';

export default function Metadata() {
  const { pet } = useLoaderData<LoaderData>();
  const { code, openAt, follows } = pet;

  return (
    <Card flex="~ col sm:row" justify="between" color="gray-450" mb="3">
      <Fragment>
        <div>
          <div text="xl" font="medium" color="black">
            {code}
          </div>
          {openAt && <div>{formatDate(new Date(openAt).toDateString())}</div>}
        </div>
        <div flex="~ col" text="sm:right">
          <span text="xl" font="medium" color="black">
            {follows}
          </span>
          followers
        </div>
      </Fragment>
    </Card>
  );
}
