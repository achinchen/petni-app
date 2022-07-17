import type { MouseEvent } from 'react';
import { Fragment } from 'react';

type Props = {
  isOpen: boolean;
  children: JSX.Element;
  title?: string;
  onClose?: () => void;
};

export default function Panel({
  isOpen = false,
  onClose,
  title = '',
  children
}: Props) {
  const onClickDialog = (event: MouseEvent) => event.stopPropagation();

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
        {title && (
          <p m="0" text="base" color="black">
            {title}
          </p>
        )}
        {children}
      </dialog>
    </Fragment>
  );
}
