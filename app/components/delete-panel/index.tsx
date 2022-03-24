import { Fragment, MouseEvent } from 'react';
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
  const onClickDialog = (event: MouseEvent) => event.stopPropagation();
  const onClickCancel = (event: MouseEvent) => {
    onCancel?.();
    onClose();
  };

  return (
    <Fragment>
      <div
        position="fixed"
        top="0"
        left="0"
        z="1"
        w="screen"
        h="screen"
        bg="gray-50"
        bg-opacity="66"
        backdrop="blur-4"
        hidden={!isOpen}
        onClick={onClose}
      />
      <dialog
        id="delete-panel"
        open={isOpen}
        position="absolute"
        z="1"
        w="70"
        h="39"
        border="none rounded-xl"
        shadow="default"
        px="14"
        py="10"
        onClick={onClickDialog}
      >
        <p m="0" text="base" color="black">
          {TITLE}
        </p>
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
      </dialog>
    </Fragment>
  );
}
