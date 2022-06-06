import { Fragment } from 'react';
import { usePairContext } from '~/features/pairing/context';
import { HeaderPortal } from '~/components/common/Layout/Header';
import IconButton from '~/components/common/IconButton';
import { STATE } from './constants';

export default function Portal() {
  const { showPanel, setShowPanel, refreshCards } = usePairContext();

  const state = showPanel ? STATE.FILTER : STATE.PAIRING;

  const onOpenPanel = () => setShowPanel(true);
  const onClosePanel = () => setShowPanel(false);

  return (
    <HeaderPortal {...(!showPanel && { bg: 'transparent' })}>
      <Fragment>
        {showPanel ? (
          <IconButton
            iconAttributifyOptions={{ w: 5 }}
            icon="ArrowLeft"
            onClick={onClosePanel}
            bg="transparent"
          />
        ) : (
          <IconButton
            iconAttributifyOptions={{ w: 6 }}
            icon="Undo"
            onClick={refreshCards}
            bg="transparent"
          />
        )}
        <div m="auto">{state}</div>
        <IconButton
          bg="transparent"
          iconAttributifyOptions={{ w: 6 }}
          icon="Filter"
          onClick={onOpenPanel}
          style={{ visibility: showPanel ? 'hidden' : 'visible' }}
        />
      </Fragment>
    </HeaderPortal>
  );
}
