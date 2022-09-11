import { Fragment } from 'react';
import { usePairContext } from '~/features/pairing/context';
import { HeaderPortal } from '~/components/common/Layout/Header';
import IconButton from '~/components/common/IconButton';
import { Tune, ChevronLeft, Undo } from '~/components/common/Icon';
import { STATE, LABEL } from './constants';

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
            label={LABEL.BACK}
            icon={ChevronLeft}
            onClick={onClosePanel}
            bg="transparent"
          />
        ) : (
          <IconButton
            label={LABEL.REFRESH}
            icon={Undo}
            onClick={refreshCards}
            bg="transparent"
          />
        )}
        <div m="auto">{state}</div>
        <IconButton
          aria-hidden={showPanel}
          label={LABEL.FILTER}
          bg="transparent"
          icon={Tune}
          onClick={onOpenPanel}
          style={{ visibility: showPanel ? 'hidden' : 'visible' }}
        />
      </Fragment>
    </HeaderPortal>
  );
}
