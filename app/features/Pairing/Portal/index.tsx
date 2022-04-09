import { usePairContext } from '../context';
import { HeaderPortal } from '~/components/layout/header';
import IconButton from '~/components/IconButton';
import { Fragment } from 'react';

export default function Portal() {
  const { showPanel } = usePairContext();
  const state = '篩選';

  return (
    <HeaderPortal {...(!showPanel && { bg: 'transparent' })}>
      <Fragment>
        <IconButton
          pr="4"
          py="4"
          iconAttributifyOptions={{ w: 5 }}
          icon="ArrowLeft"
          bg="transparent"
        />
        <div m="auto">{state}</div>
        {!showPanel && (
          <IconButton
            pl="4"
            py="4"
            bg="transparent"
            iconAttributifyOptions={{ w: 7 }}
            icon="Filter"
          />
        )}
      </Fragment>
    </HeaderPortal>
  );
}
