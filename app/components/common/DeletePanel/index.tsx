import type { MouseEvent } from 'react';
import Panel from '~/components/common/Panel';
import { TITLE, CANCEL, CONFIRM } from './constants';

type Props = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose: () => void;
};

export default function DeletePanel({
  onClose,
  onCancel,
  onConfirm,
  isOpen = false
}: Props) {
  const onClickCancel = (event: MouseEvent) => {
    onCancel?.();
    onClose();
  };

  return (
    <Panel title={TITLE} isOpen={isOpen}>
      <menu flex="~" justify="between" mt="6" p="0">
        <button
          py="2"
          px="4"
          text="base"
          bg="white"
          color="black"
          onClick={onClickCancel}
        >
          {CANCEL}
        </button>
        <button
          py="2"
          px="4"
          text="base"
          bg="white"
          color="status-active"
          onClick={onConfirm}
        >
          {CONFIRM}
        </button>
      </menu>
    </Panel>
  );
}
